import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import PDFDocument from "pdfkit";

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Helper function to generate PDF in memory
const generatePDFBuffer = async (data: any): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];

      doc.on("data", (buffer) => buffers.push(buffer));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", reject);

      // --- PDF CONTENT ---
      
      // Branding / Header
      doc.fontSize(24).font('Helvetica-Bold').fillColor('#002b32').text("NEXUS INTERIOR STUDIO", { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(12).font('Helvetica').fillColor('#7c9ca0').text("CLIENT CONSULTATION REQUEST", { align: 'center', characterSpacing: 2 });
      doc.moveDown(3);

      const drawSection = (title: string, content: string | undefined, content2?: string) => {
        doc.fontSize(14).font('Helvetica-Bold').fillColor('#003b44').text(title);
        doc.moveTo(doc.x, doc.y + 5).lineTo(doc.x + 500, doc.y + 5).lineWidth(1).strokeColor('#eaf4f4').stroke();
        doc.moveDown(1);
        doc.fontSize(12).font('Helvetica').fillColor('#002b32').text(content || "Not provided");
        if (content2) {
          doc.moveDown(0.5);
          doc.text(content2);
        }
        doc.moveDown(2);
      };

      // Client Information
      drawSection(
        "Client Information",
        `Name: ${data.name}`,
        `Email: ${data.email}\nPhone: ${data.phone || "Not provided"}`
      );

      // Service Requested
      drawSection("Service Requested", data.service);

      // Project Brief
      drawSection("Project Brief", data.details || "No description provided.");

      // Submission Date
      const dateStr = new Date().toLocaleString("en-US", { timeZone: "UTC", dateStyle: "full", timeStyle: "short" }) + " UTC";
      drawSection("Submission Date", dateStr);

      // Footer
      doc.moveDown(2);
      doc.fontSize(10).font('Helvetica-Oblique').fillColor('#a0b0b2').text("Generated automatically by Nexus Studio System.", { align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, service, details } = data;

    // Validation
    if (!name || !email || !service) {
      return NextResponse.json({ error: "Missing required fields: name, email, and service." }, { status: 400 });
    }

    // 1. Save to Supabase
    if (supabase) {
      const { error: dbError } = await supabase
        .from('consultation_requests')
        .insert([{
          name,
          email,
          phone: phone || null,
          service,
          project_description: details || ""
        }]);
        
      if (dbError) {
        console.error("Supabase insert error:", dbError);
        // Continue even if DB fails, so email still sends
      }
    } else {
      console.warn("Supabase credentials missing. Skipping database insert.");
    }

    // 2. Generate PDF
    const pdfBuffer = await generatePDFBuffer(data);

    // 3. Send Email to Studio (with PDF)
    const studioEmailStr = "nexusinteriorstudio@gmail.com"; 
    // Note: Resend requires a verified domain. Using 'onboarding@resend.dev' as sender for testing if no domain is verified.
    // In production, change 'onboarding@resend.dev' to 'hello@yourdomain.com'
    const senderAddress = "onboarding@resend.dev"; 

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      // Send to Studio
      await resend.emails.send({
        from: `Nexus Website <${senderAddress}>`,
        to: studioEmailStr,
        replyTo: email,
        subject: `New Consultation Request - ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2>New Consultation Request</h2>
            <p>A new consultation request has been submitted.</p>
            <ul>
              <li><strong>Client:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${phone || "Not provided"}</li>
              <li><strong>Service:</strong> ${service}</li>
            </ul>
            <p><strong>Project Brief:</strong><br/>${details || "None provided"}</p>
            <p><em>Please see the attached PDF for a full formatted brief.</em></p>
          </div>
        `,
        attachments: [
          {
            filename: `${name.replace(/\\s+/g, "_")}_Consultation_Brief.pdf`,
            content: pdfBuffer,
          }
        ]
      });

      // 4. Send Confirmation Email to Client
      // Note: This requires a verified domain on Resend. If using the testing 'onboarding' domain, this will fail unless the client email is the verified one.
      try {
         await resend.emails.send({
          from: `Nexus Interior Studio <${senderAddress}>`,
          to: email,
          subject: "We've Received Your Consultation Request",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 30px; color: #002b32; max-width: 600px; margin: 0 auto; border: 1px solid #eaf4f4; border-radius: 8px;">
              <h2 style="font-weight: 300;">Thank you for reaching out to Nexus Interior Studio.</h2>
              <p style="line-height: 1.6; color: #4a6b6f;">We have received your consultation request and will review your project details shortly.</p>
              <p style="line-height: 1.6; color: #4a6b6f;">Our team will contact you within 24–48 hours to coordinate your design session.</p>
              <br/>
              <p style="color: #002b32; font-weight: bold;">Regards,<br/>Nexus Interior Studio</p>
            </div>
          `
        });
      } catch (clientEmailError) {
        console.warn("Could not send client email (likely due to unverified domain on Resend):", clientEmailError);
      }
    } else {
      console.warn("RESEND_API_KEY missing. Skipping email dispatch.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API contact error:", error);
    return NextResponse.json(
      { error: "Failed to process consultation request." },
      { status: 500 }
    );
  }
}

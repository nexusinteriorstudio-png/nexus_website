import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";

export async function GET() {
  try {
    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      // Create document
      const doc = new PDFDocument({
        margin: 50,
        size: 'A4'
      });

      const buffers: Buffer[] = [];
      doc.on("data", (buffer) => buffers.push(buffer));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", reject);

      // Initialize AcroForm feature
      doc.initForm();

      // --- 1. Background Graphics (Gray triangles/bands on left) ---
      doc.save();
      // Triangle 1 (Top left dark gray)
      doc.polygon([0, 0], [150, 0], [0, 150]).fill('#a1a1aa'); // zinc-400
      
      // Band 1 (Lighter gray overlay)
      doc.polygon([0, 50], [250, 0], [0, 250]).fillOpacity(0.5).fill('#e4e4e7'); // zinc-200
      
      // Band 2 (Mid gray)
      doc.polygon([0, 150], [200, 150], [0, 350]).fillOpacity(0.5).fill('#d4d4d8'); // zinc-300
      
      // Band 3 (Lower triangle)
      doc.polygon([0, 250], [300, 0], [0, 450]).fillOpacity(0.3).fill('#e4e4e7');
      doc.restore();

      // --- 2. Logo (Top Right) ---
      // "Nexus"
      doc.font('Times-BoldItalic').fontSize(54).fillColor('#000000')
         .text('Nexus', 350, 40, { align: 'right' });
      // "INTERIOR STUDIO"
      doc.font('Helvetica').fontSize(12).fillColor('#52525b') // zinc-600
         .text('INTERIOR STUDIO', 350, 90, { align: 'right', characterSpacing: 2 });

      // --- 3. INVOICE Title ---
      doc.font('Times-Bold').fontSize(36).fillColor('#0f172a')
         .text('INVOICE', 50, 150);

      // --- 4. Header Details ---
      doc.font('Helvetica-Bold').fontSize(10).fillColor('#000000');
      doc.text('INVOICE NO: ', 50, 230);
      doc.formText('InvoiceNo', 120, 227, 100, 15, { value: '01' });

      doc.text('Date: ', 350, 230);
      doc.formText('Date', 385, 227, 150, 15, { value: 'DD MMM, YYYY' });

      doc.text('Bill to: ', 50, 250);
      doc.formText('BillTo', 90, 247, 300, 15, { value: 'CLIENT NAME / COMPANY' });

      // --- 5. Table Layout ---
      const tableTop = 300;
      doc.moveTo(50, tableTop).lineTo(545, tableTop).lineWidth(0.5).strokeColor('#a1a1aa').dash(2, { space: 2 }).stroke();
      
      // Table Headers
      doc.undash();
      doc.font('Helvetica-Bold').fontSize(10).fillColor('#000000');
      doc.text('Item', 60, tableTop + 10);
      doc.text('Description', 120, tableTop + 10);
      doc.text('Price', 400, tableTop + 5);
      doc.fontSize(6).text('AFTER DISCOUNT', 390, tableTop + 16);
      doc.fontSize(10).text('Discount', 480, tableTop + 10);

      const tableHeadersBottom = tableTop + 30;
      doc.moveTo(50, tableHeadersBottom).lineTo(545, tableHeadersBottom).lineWidth(0.5).strokeColor('#a1a1aa').dash(2, { space: 2 }).stroke();

      // Table Rows (Interactive Fields)
      doc.undash();
      doc.font('Helvetica').fontSize(9);
      
      let rowY = tableHeadersBottom + 10;
      const rowHeight = 35; // taller rows for multi-line desc
      for (let i = 1; i <= 8; i++) {
        // Item No
        doc.text(`${i}`, 65, rowY + 5);
        
        // Description Field (Multiline)
        doc.formText(`Desc_${i}`, 120, rowY, 250, rowHeight - 5, { multiline: true });
        
        // Price Field
        doc.formText(`Price_${i}`, 390, rowY + 5, 70, 15);
        
        // Discount Field
        doc.formText(`Discount_${i}`, 480, rowY + 5, 60, 15);

        rowY += rowHeight;
      }

      // --- 6. Totals Section ---
      const totalsY = rowY + 20;
      doc.font('Helvetica-Bold').fontSize(12).fillColor('#000000');
      
      doc.text('Paid Amount : ', 300, totalsY);
      doc.formText('PaidAmount', 400, totalsY - 2, 120, 16);
      
      doc.text('Total Amount : ', 300, totalsY + 25);
      doc.formText('TotalAmount', 400, totalsY + 23, 120, 16);
      
      doc.text('Due Amount : ', 300, totalsY + 50);
      doc.formText('DueAmount', 400, totalsY + 48, 120, 16);

      // --- 7. Bank Details ---
      const bankY = 650;
      doc.font('Helvetica-Bold').fontSize(9).fillColor('#000000');
      doc.text('Title : ', 50, bankY);
      doc.font('Helvetica').text('Nexus Interior Studio', 80, bankY);

      doc.font('Helvetica-Bold').text('Account number : ', 50, bankY + 15);
      doc.font('Helvetica').text('2820363269333', 135, bankY + 15);

      doc.font('Helvetica-Bold').text('IBAN : ', 50, bankY + 30);
      doc.font('Helvetica').text('PK51UNIL0109000363269333', 85, bankY + 30);

      doc.font('Helvetica-Bold').text('Bank : ', 50, bankY + 45);
      doc.font('Helvetica').text('United Bank Limited', 85, bankY + 45);

      // Footer divider
      const footerY = bankY + 70;
      doc.moveTo(50, footerY).lineTo(545, footerY).lineWidth(0.5).strokeColor('#d4d4d8').dash(2, { space: 2 }).stroke();

      // Footer contact text
      doc.undash();
      doc.font('Helvetica').fontSize(6).fillColor('#a1a1aa')
         .text('IF YOU HAVE ANY QUESTION PLEASE CONTACT : NEXUSINTERIORSTUDIO@GMAIL.COM', 50, footerY + 15, { align: 'center', characterSpacing: 1 });

      // Finalize PDF
      doc.end();
    });

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Nexus_Invoice_Template.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF template" }, { status: 500 });
  }
}

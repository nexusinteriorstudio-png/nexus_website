"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Calendar as CalendarIcon, MapPin, Mail, Phone } from "lucide-react";
import { PopupModal, useCalendlyEventListener } from "react-calendly";

export function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Set rootElement for accessibility once mounted on the client
    setRootElement(document.body);
  }, []);

  // Listen to Calendly events to trigger the success state when a booking is completed
  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("Calendly profile viewed"),
    onDateAndTimeSelected: () => console.log("Date selected"),
    onEventScheduled: (e) => {
      console.log("Event scheduled!", e);
      setIsOpen(false);
      setIsBooked(true);
    },
  });

  return (
    <section id="contact" className="relative bg-background pt-16 md:pt-24 pb-12 md:pb-16 overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-96 h-96 bg-[#003b44]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">

          {/* Left Side: Editorial Content */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7c9ca0]">
                Private Consultation
              </span>
              <h2 className="text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl font-display leading-[1.1]">
                Begin your <br />
                project
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Let&apos;s co-create a space that reflects your narrative, philosophy, and lifestyle. Schedule an initial consultation with our design studio.
            </p>

            <div className="pt-6 space-y-6">
              <div className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border group-hover:border-[#7c9ca0]/50 transition-colors">
                  <Mail size={16} className="text-[#7c9ca0]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/60">Email Us</p>
                  <a href="mailto:nexusinteriorstudio@gmail.com" className="text-sm font-medium">nexusinteriorstudio@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border group-hover:border-[#7c9ca0]/50 transition-colors">
                  <Phone size={16} className="text-[#7c9ca0]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/60">Call Studio</p>
                  <a href="tel:+92 335 1229411" className="text-sm font-medium">+92 335 1229411</a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-muted-foreground group">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border">
                  <MapPin size={16} className="text-[#7c9ca0]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/60">Location</p>
                  <p className="text-sm font-medium">Karachi, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Consultation Box */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-md border border-border p-8 md:p-14 transition-all duration-300 min-h-[400px] flex flex-col justify-center">

              {isBooked ? (
                /* Success Message */
                <div className="flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eaf4f4] text-[#002b32] shadow-sm">
                    <CheckCircle2 size={40} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-light text-foreground font-display">Thank you for your inquiry.</h3>
                    <p className="text-muted-foreground max-w-md mx-auto text-base leading-relaxed">
                      Your consultation has been scheduled successfully. We look forward to learning more about your project and will send you a calendar invitation shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsBooked(false)}
                    className="mt-6 px-6 py-2 border border-border text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground transition-all rounded-full"
                  >
                    Book Another Session
                  </button>
                </div>
              ) : (
                /* CTA Box */
                <div className="flex flex-col items-center justify-center text-center space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl font-light text-foreground font-display tracking-tight">Ready to Transform Your Space?</h3>
                    <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
                      Select a date and time that works best for you. During our initial session, we'll discuss your vision, budget, and how our studio can bring your project to life.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#eaf4f4] text-[#002b32] font-semibold text-sm uppercase tracking-widest px-8 py-5 rounded-full hover:bg-white transition-all group cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <CalendarIcon size={18} />
                    <span>Book a Design Consultation</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-xs text-muted-foreground/40 uppercase tracking-widest font-medium">
                    Powered by Calendly
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Calendly Popup Modal */}
      {rootElement && (
        <PopupModal
          url="https://calendly.com/nexusinteriorstudio/initial-design-consultation" // Dummy URL - to be replaced by the user
          onModalClose={() => setIsOpen(false)}
          open={isOpen}
          rootElement={rootElement}
        />
      )}
    </section>
  );
}

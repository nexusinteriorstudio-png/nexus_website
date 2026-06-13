"use client";

import Link from "next/link";



export function FooterSection() {
  return (
    <footer id="contact" className="bg-background">


      {/* Bottom Bar */}
      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground md:w-1/3">
            © 2026 Nexus Interior Studio. All rights reserved.
          </p>

          <div className="flex justify-center md:w-1/3">
            <Link href="#hero" className="text-lg font-medium tracking-widest text-foreground">
              NEXUS
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-end gap-4 md:w-1/3">
            <Link
              href="https://www.instagram.com/nexus_interior_studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Instagram
            </Link>
            <Link
              href="https://www.behance.net/nexusinteriorstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Behance
            </Link>
            <Link
              href="https://www.linkedin.com/in/haider-tahir-ba3081394/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              LinkedIn
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=61576132814193"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

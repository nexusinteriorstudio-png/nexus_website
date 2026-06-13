import { FileDown, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function InvoiceGeneratorPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-zinc-100 p-8 text-center">
        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileDown className="w-8 h-8 text-zinc-900" />
        </div>
        
        <h1 className="text-3xl font-serif text-zinc-900 mb-2">Invoice Template</h1>
        <p className="text-zinc-500 mb-8">
          Download your interactive PDF invoice template. You can open this file in any modern browser or Adobe Reader to fill out the details before saving or printing.
        </p>

        <div className="space-y-4 mb-8 text-left">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-600">Pre-styled with Nexus Interior Studio branding</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-600">Fillable text fields for items, prices, and client details</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-600">Built-in bank transfer instructions</p>
          </div>
        </div>

        <a
          href="/api/invoice-template"
          download
          className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          <FileDown className="w-5 h-5" />
          Download Template
        </a>
        
        <div className="mt-6">
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 underline underline-offset-4">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

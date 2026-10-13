import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-border text-center space-y-4 shadow-sm">
        <span className="font-mono font-bold text-4xl text-primary block">404</span>
        <h1 className="font-heading font-bold text-2xl text-ink-900">Page Not Found</h1>
        <p className="text-xs text-ink-500">
          The requested page or diagnostic path doesn&apos;t exist in CareerIQ.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

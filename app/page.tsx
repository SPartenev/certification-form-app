import { CertificationForm } from "@/components/certification-form"
import { LanguageSelector } from "@/components/language-selector"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto py-8">
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>
        <CertificationForm />
      </div>
    </div>
  )
}

import { CertificationForm } from "@/components/certification-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto py-8">
        <CertificationForm />
      </div>
    </div>
  )
}

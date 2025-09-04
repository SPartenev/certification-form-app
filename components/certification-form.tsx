"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Building2, Shield, Leaf, Lock, Utensils, Car, AlertTriangle, Send } from "lucide-react"

interface FormData {
  applicationTypes: string[]
  organizationName: string
  eik: string
  contactPerson: string
  email: string
  phone: string
  additionalInfo: string
  standards: string[]
  certificationScope: string
  sites: Array<{
    address: string
    processes: string
    employees: string
    type: string
  }>
  multiSiteManagement: string[]
  outsourcedProcesses: string
  consultantServices: string
  regulatoryRequirements: string
  developNewProducts: string
  manufactureProducts: string
  otherCertifications: string
  auditLanguage: string
  auditDeadline: string
  filledBy: string
  iso45001: {
    hazards: string
    chemicals: string
    installations: string
    regulations: string
    offSitePersonnel: string
    accidents: string
    lawsuits: string
  }
  iso14001: {
    aspects: string
    location: string
    requirements: string
    indirectAspects: string
    risks: string
    automation: string
  }
  iso27001: {
    category1: string
    category2: string
    category3: string
    category4: string
    category5: string
    category6: string
    employees: {
      readOnly: string
      noPhysicalAccess: string
      limitedAccess: string
      fullAccessRestricted: string
    }
  }
  iso22000: {
    haccp: string
    products: string
    automation: string
  }
  iso39001: {
    applicableStatements: string[]
    requirements: string
    nonApplicable: string
    accidents: string
  }
  iso37001: {
    processesOutOfScope: string
    countries: string
    requirements: string
    sites: Array<{
      address: string
      type: string
      totalEmployees: string
      processes: { [key: string]: string }
    }>
    lowRiskEmployees: string
    controlledEntities: string
    controllingEntities: string
    investigations: string
    publicRevenue: string
    additionalInfo: string
  }
  transfer: {
    validCertificate: string
    reasons: string
    complaints: string
    requirements: string
    documents: string[]
  }
  integrated: {
    statements: string[]
  }
}

export function CertificationForm() {
  const [formData, setFormData] = useState<FormData>({
    applicationTypes: [],
    organizationName: "",
    eik: "",
    contactPerson: "",
    email: "",
    phone: "",
    additionalInfo: "",
    standards: [],
    certificationScope: "",
    sites: [{ address: "", processes: "", employees: "", type: "" }],
    multiSiteManagement: [],
    outsourcedProcesses: "",
    consultantServices: "",
    regulatoryRequirements: "",
    developNewProducts: "",
    manufactureProducts: "",
    otherCertifications: "",
    auditLanguage: "",
    auditDeadline: "",
    filledBy: "",
    iso45001: {
      hazards: "",
      chemicals: "",
      installations: "",
      regulations: "",
      offSitePersonnel: "",
      accidents: "",
      lawsuits: "",
    },
    iso14001: {
      aspects: "",
      location: "",
      requirements: "",
      indirectAspects: "",
      risks: "",
      automation: "",
    },
    iso27001: {
      category1: "",
      category2: "",
      category3: "",
      category4: "",
      category5: "",
      category6: "",
      employees: {
        readOnly: "",
        noPhysicalAccess: "",
        limitedAccess: "",
        fullAccessRestricted: "",
      },
    },
    iso22000: {
      haccp: "",
      products: "",
      automation: "",
    },
    iso39001: {
      applicableStatements: [],
      requirements: "",
      nonApplicable: "",
      accidents: "",
    },
    iso37001: {
      processesOutOfScope: "",
      countries: "",
      requirements: "",
      sites: [{ address: "", type: "", totalEmployees: "", processes: {} }],
      lowRiskEmployees: "",
      controlledEntities: "",
      controllingEntities: "",
      investigations: "",
      publicRevenue: "",
      additionalInfo: "",
    },
    transfer: {
      validCertificate: "",
      reasons: "",
      complaints: "",
      requirements: "",
      documents: [],
    },
    integrated: {
      statements: [],
    },
  })

  const handleStandardChange = (standard: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      standards: checked ? [...prev.standards, standard] : prev.standards.filter((s) => s !== standard),
    }))
  }

  const handleApplicationTypeChange = (value: string, label: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      applicationTypes: checked
        ? [...prev.applicationTypes, label]
        : prev.applicationTypes.filter((t) => t !== label),
    }))
  }

  const addSite = () => {
    setFormData((prev) => ({
      ...prev,
      sites: [...prev.sites, { address: "", processes: "", employees: "", type: "" }],
    }))
  }

  const updateSite = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      sites: prev.sites.map((site, i) => (i === index ? { ...site, [field]: value } : site)),
    }))
  }

  const handleMultiSiteChange = (item: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      multiSiteManagement: checked
        ? [...prev.multiSiteManagement, item]
        : prev.multiSiteManagement.filter((i) => i !== item),
    }))
  }

  const standardsConfig = [
    { id: "iso9001", label: "ISO 9001:2015", icon: Building2, color: "bg-orange-500" },
    { id: "iso22000", label: "ISO 22000:2018", icon: Utensils, color: "bg-orange-500" },
    { id: "iso45001", label: "ISO 45001:2018", icon: Shield, color: "bg-orange-500" },
    { id: "iso39001", label: "ISO 39001:2012", icon: Car, color: "bg-orange-500" },
    { id: "iso14001", label: "ISO 14001:2015", icon: Leaf, color: "bg-orange-500" },
    { id: "iso27001", label: "ISO/IEC 27001:2022", icon: Lock, color: "bg-orange-500" },
    { id: "iso37001", label: "ISO 37001:2016", icon: AlertTriangle, color: "bg-orange-500" },
  ]

  const multiSiteOptions = [
    "Организацията има една обща система за управление за всички площадки.",
    "Организацията има единно централно управление, което е част от нея и не е възложено на външен изпълнител.",
    "Централното управление има правомощия да разработва, внедрява и поддържа единната система за управление за всички площадки в обхвата на сертификация.",
    "Провежда се общ преглед от ръководството за централното управление и площадките.",
    "Всички площадки са включени в програмата за вътрешни одити на организацията.",
    "Централното управление носи отговорност за събирането и анализа на данни от всички площадки.",
    "Централното управление има право и възможност да налага следните промени в процесите на отделните площадки.",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const submissionData = {
      metadata: {
        submittedAt: new Date().toISOString(),
        submittedBy: formData.filledBy || "Unknown",
        organizationName: formData.organizationName,
        eik: formData.eik,
        formVersion: "1.0",
        applicationId: `CERT-${Date.now()}`
      },
      formData: formData,
      selectedStandards: formData.standards,
      applicationTypes: formData.applicationTypes
    }
    
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/25e22ef0-4a01-4ff5-a694-aa8f8058cb71'
    
    try {
      const n8nResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      })
      
      if (n8nResponse.ok) {
        console.log("Данните са изпратени успешно към n8n")
        alert(`✅ Заявката е изпратена успешно!\n\n📧 Email уведомление е изпратено\n🆔 ID на заявката: ${submissionData.metadata.applicationId}`)
      } else {
        console.error("Грешка при изпращане към n8n:", n8nResponse.status)
        alert(`⚠️ Има проблем с изпращането на заявката.\n\nГрешка: ${n8nResponse.status}\nМоля опитайте отново или се свържете с поддръжката.`)
      }
    } catch (error) {
      console.error("Мрежова грешка при изпращане към n8n:", error)
      
      const failedSubmissions = JSON.parse(localStorage.getItem('failedSubmissions') || '[]')
      failedSubmissions.push({
        timestamp: new Date().toISOString(),
        data: submissionData,
        applicationId: submissionData.metadata.applicationId
      })
      localStorage.setItem('failedSubmissions', JSON.stringify(failedSubmissions))
      
      alert(`⚠️ Няма връзка със сървъра.\n\nДанните са запазени локално за по-късно изпращане.\nID на заявката: ${submissionData.metadata.applicationId}\n\nПроверете интернет връзката и опитайте отново.`)
    }
    
    console.log("Form submitted:", submissionData)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-stone-50 min-h-screen p-6">
      <Card className="border-stone-200 shadow-lg">
        <CardHeader className="bg-white border-b border-stone-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Incert-logo.jpg-RAjgjQOKJOMd1EiYNh1iCzND85lVgK.jpeg"
                alt="INCERT Logo"
                className="h-12 w-auto"
              />
            </div>
            <div className="text-right">
              <div className="text-sm text-stone-500">Стр. 1 от 10</div>
              <div className="text-sm text-stone-500">Заявка за сертификация (8/19.2.25)</div>
              <div className="text-sm text-stone-500">www.incert.bg</div>
            </div>
          </div>
          <div className="mt-4">
            <CardTitle className="text-2xl font-bold text-stone-800">Заявка за сертификация</CardTitle>
            <CardDescription className="text-stone-600 mt-2">
              Попълнената заявка можете да изпратите като използвате бутона най-долу "Изпрати заявката"
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="border-stone-200 bg-white">
          <CardHeader className="bg-orange-50">
            <CardTitle className="text-stone-800">Вид на заявката</CardTitle>
            <CardDescription>Можете да изберете няколко вида заявки</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "new", label: "Нова сертификация" },
                { value: "change", label: "Промяна в сертификация" },
                { value: "renewal", label: "Подновяване" },
                { value: "transfer", label: "Трансфер" },
              ].map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 p-3 border border-stone-200 rounded-lg hover:bg-orange-50 hover:border-orange-200"
                >
                  <Checkbox
                    id={option.value}
                    checked={formData.applicationTypes.includes(option.label)}
                    onCheckedChange={(checked) => handleApplicationTypeChange(option.value, option.label, checked as boolean)}
                  />
                  <Label htmlFor={option.value} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-stone-200 bg-white">
          <CardHeader className="bg-orange-50">
            <CardTitle className="text-stone-800 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-orange-600" />
              Секция 1. Данни за организацията
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="organizationName">Име на организацията *</Label>
                <Input
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, organizationName: e.target.value }))}
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eik">ЕИК *</Label>
                <Input
                  id="eik"
                  value={formData.eik}
                  onChange={(e) => setFormData((prev) => ({ ...prev, eik: e.target.value }))}
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPerson">Лице за контакт (име и длъжност) *</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => setFormData((prev) => ({ ...prev, contactPerson: e.target.value }))}
                className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Имейл *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Допълнителна информация</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => setFormData((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                placeholder="напр. относно искана промяна или друга информация от значение"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-stone-200 bg-white">
          <CardHeader className="bg-orange-50">
            <CardTitle className="text-stone-800">Стандарти за сертификация (отбележете):</CardTitle>
            <CardDescription>Отбележете стандартите, за които кандидатствате</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {standardsConfig.map((standard) => (
                <div
                  key={standard.id}
                  className="flex items-center space-x-3 p-4 border border-stone-200 rounded-lg hover:bg-orange-50 hover:border-orange-200"
                >
                  <Checkbox
                    id={standard.id}
                    checked={formData.standards.includes(standard.id)}
                    onCheckedChange={(checked) => handleStandardChange(standard.id, checked as boolean)}
                  />
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${standard.color}`}>
                      <standard.icon className="h-4 w-4 text-white" />
                    </div>
                    <Label htmlFor={standard.id} className="cursor-pointer font-medium">
                      {standard.label}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-stone-200 bg-white">
          <CardHeader className="bg-orange-50">
            <CardTitle className="text-stone-800">Обхват на сертификация</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="certificationScope">
                Кратко описание на дейностите, продуктите и/или процесите в обхвата *
              </Label>
              <Textarea
                id="certificationScope"
                value={formData.certificationScope}
                onChange={(e) => setFormData((prev) => ({ ...prev, certificationScope: e.target.value }))}
                className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                rows={4}
                required
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-stone-800">Площадки</h4>
                <Button type="button" onClick={addSite} variant="outline" size="sm">
                  Добави площадка
                </Button>
              </div>

              {formData.sites.map((site, index) => (
                <Card key={index} className="border-stone-100">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Адрес на площадка {index + 1}</Label>
                        <Input
                          value={site.address}
                          onChange={(e) => updateSite(index, "address", e.target.value)}
                          className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                          placeholder="Адрес на площадката"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Вид на площадката</Label>
                        <Select value={site.type} onValueChange={(value) => updateSite(index, "type", value)}>
                          <SelectTrigger className="border-stone-200 focus:border-orange-500 focus:ring-orange-500">
                            <SelectValue placeholder="Изберете вид" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="permanent">Постоянна</SelectItem>
                            <SelectItem value="temporary">Временна</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Процеси, дейности, работно време, смени</Label>
                        <Textarea
                          value={site.processes}
                          onChange={(e) => updateSite(index, "processes", e.target.value)}
                          className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Брой служители</Label>
                        <Input
                          value={site.employees}
                          onChange={(e) => updateSite(index, "employees", e.target.value)}
                          className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                          placeholder="Брой служители"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {formData.sites.length > 1 && (
              <Card className="border-stone-100 bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-sm text-gray-800">Управление на множество площадки</CardTitle>
                  <CardDescription className="text-sm">
                    Отбележете кои от следващите твърдения са приложими за Вашата система за управление
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {multiSiteOptions.map((option, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Checkbox
                          id={`multisite-${index}`}
                          checked={formData.multiSiteManagement.includes(option)}
                          onCheckedChange={(checked) => handleMultiSiteChange(option, checked as boolean)}
                        />
                        <Label htmlFor={`multisite-${index}`} className="text-sm leading-relaxed cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        <Card className="border-stone-200 bg-white">
          <CardHeader className="bg-orange-50">
            <CardTitle className="text-stone-800">Допълнителна информация</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="outsourcedProcesses">Информация за процеси, възложени на външни изпълнители</Label>
              <Textarea
                id="outsourcedProcesses"
                value={formData.outsourcedProcesses}
                onChange={(e) => setFormData((prev) => ({ ...prev, outsourcedProcesses: e.target.value }))}
                className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="consultantServices">Информация за използвани консултантски услуги, ако има</Label>
              <Input
                id="consultantServices"
                value={formData.consultantServices}
                onChange={(e) => setFormData((prev) => ({ ...prev, consultantServices: e.target.value }))}
                className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                placeholder="име на консултант"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regulatoryRequirements">
                Информация за приложими за обхвата нормативни и други изисквания
              </Label>
              <Textarea
                id="regulatoryRequirements"
                value={formData.regulatoryRequirements}
                onChange={(e) => setFormData((prev) => ({ ...prev, regulatoryRequirements: e.target.value }))}
                className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label>Разработвате ли нови продукти/услуги?</Label>
                <RadioGroup
                  value={formData.developNewProducts}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, developNewProducts: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="develop-yes" />
                    <Label htmlFor="develop-yes">Да</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="develop-no" />
                    <Label htmlFor="develop-no">Не</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Произвеждате ли продукти?</Label>
                <RadioGroup
                  value={formData.manufactureProducts}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, manufactureProducts: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="manufacture-yes" />
                    <Label htmlFor="manufacture-yes">Да</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="manufacture-no" />
                    <Label htmlFor="manufacture-no">Не</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherCertifications">
                Информация за други валидни сертификации на системи за управление
              </Label>
              <Textarea
                id="otherCertifications"
                value={formData.otherCertifications}
                onChange={(e) => setFormData((prev) => ({ ...prev, otherCertifications: e.target.value }))}
                className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="auditLanguage">Език на одита</Label>
                <Select
                  value={formData.auditLanguage}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, auditLanguage: value }))}
                >
                  <SelectTrigger className="border-stone-200 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue placeholder="Изберете език" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bulgarian">Български</SelectItem>
                    <SelectItem value="english">Английски</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="auditDeadline">Краен срок за одита</Label>
                <Input
                  id="auditDeadline"
                  type="date"
                  value={formData.auditDeadline}
                  onChange={(e) => setFormData((prev) => ({ ...prev, auditDeadline: e.target.value }))}
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conditional Sections based on selected standards */}
        {formData.standards.includes("iso45001") && (
          <Card className="border-stone-200 bg-white">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-stone-800 flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-600" />
                Секция 2. Безопасност и здраве при работа: ISO 45001:2018
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>
                  1. Основни опасности и рискове за здравето и безопасността при работа, свързани с дейността
                </Label>
                <Textarea
                  value={formData.iso45001.hazards}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, iso45001: { ...prev.iso45001, hazards: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  2. Използвате ли опасни химически вещества и смеси в дейността си? Ако "да", моля посочете какви.
                </Label>
                <Textarea
                  value={formData.iso45001.chemicals}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, iso45001: { ...prev.iso45001, chemicals: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  3. Използвате ли инсталации и/или СПО по смисъла на националното законодателство? Ако "да", моля
                  разяснете.
                </Label>
                <Textarea
                  value={formData.iso45001.installations}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, iso45001: { ...prev.iso45001, installations: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>4. Приложими нормативни изисквания, свързани с БЗР. Моля посочете.</Label>
                <Textarea
                  value={formData.iso45001.regulations}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, iso45001: { ...prev.iso45001, regulations: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  5. Персонал, който работи извън площадката (напр. шофьори, монтажници и др.), или на временни
                  площадки? Моля пояснете и посочете приблизителен брой.
                </Label>
                <Textarea
                  value={formData.iso45001.offSitePersonnel}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      iso45001: { ...prev.iso45001, offSitePersonnel: e.target.value },
                    }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  6. През последните две години регистрирани ли са трудови злополуки? Ако "да", моля разяснете.
                </Label>
                <Textarea
                  value={formData.iso45001.accidents}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, iso45001: { ...prev.iso45001, accidents: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  7. Водят ли се срещу вас съдебни дела за нарушаване на трудовото законодателство и/или по БЗР? Ако
                  "да", моля разяснете.
                </Label>
                <Textarea
                  value={formData.iso45001.lawsuits}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, iso45001: { ...prev.iso45001, lawsuits: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {formData.standards.includes("iso14001") && (
          <Card className="border-stone-200 bg-white">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-stone-800 flex items-center gap-2">
                <Leaf className="h-5 w-5 text-orange-600" />
                Секция 3. Околна среда: ISO 14001:2015
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>1. Значими аспекти на околната среда и свързаните с тях процеси.</Label>
                <Textarea
                  value={formData.iso14001.aspects}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, iso14001: { ...prev.iso14001, aspects: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  2. Дейността извършва ли се в населено място или индустриална зона, селски район или защитена
                  територия? Моля дайте пояснение.
                </Label>
                <Textarea
                  value={formData.iso14001.location}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, iso14001: { ...prev.iso14001, location: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  3. Приложими нормативни изисквания и лицензи и разрешителни за управлението на околната среда. Моля
                  посочете.
                </Label>
                <Textarea
                  value={formData.iso14001.requirements}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, iso14001: { ...prev.iso14001, requirements: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  4. Има "непреки" аспекти на околната среда (напр. услуги за проектиране)? Моля опишете накратко.
                </Label>
                <Textarea
                  value={formData.iso14001.indirectAspects}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      iso14001: { ...prev.iso14001, indirectAspects: e.target.value },
                    }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  5. Рискове от значими екологични щети в резултат от съхранение на материали или ползването им? Моля
                  опишете накратко.
                </Label>
                <Textarea
                  value={formData.iso14001.risks}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, iso14001: { ...prev.iso14001, risks: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={2}
                />
              </div>
              <div className="space-y-3">
                <Label>Ниво на автоматизация на процесите</Label>
                <RadioGroup
                  value={formData.iso14001.automation}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, iso14001: { ...prev.iso14001, automation: value } }))
                  }
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="auto-low" />
                    <Label htmlFor="auto-low">Ниско</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="auto-medium" />
                    <Label htmlFor="auto-medium">Средно</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="auto-high" />
                    <Label htmlFor="auto-high">Високо</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        )}

        {formData.standards.includes("iso27001") && (
          <Card className="border-stone-200 bg-white">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-stone-800 flex items-center gap-2">
                <Lock className="h-5 w-5 text-orange-600" />
                Секция 4. Сигурност на информацията: ISO/IEC 27001:2022
              </CardTitle>
              <CardDescription>
                За всяка от категориите моля отбележете само едно твърдение, което най-точно описва ситуацията във
                Вашата организация.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="font-semibold">Категория 1. Дейност на организацията и нормативни изисквания</Label>
                  <RadioGroup
                    value={formData.iso27001.category1}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, iso27001: { ...prev.iso27001, category1: value } }))
                    }
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="non-critical" id="cat1-1" />
                      <Label htmlFor="cat1-1" className="text-sm leading-relaxed">
                        Организацията работи в бизнес сектори, които не са критични и няма голям обем нормативни
                        изисквания.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="serves-critical" id="cat1-2" />
                      <Label htmlFor="cat1-2" className="text-sm leading-relaxed">
                        Организацията обслужва клиенти от критични бизнес сектори.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="critical" id="cat1-3" />
                      <Label htmlFor="cat1-3" className="text-sm leading-relaxed">
                        Организацията работи в критични бизнес сектори.
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="font-semibold">Категория 2. Процеси и задачи</Label>
                  <RadioGroup
                    value={formData.iso27001.category2}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, iso27001: { ...prev.iso27001, category2: value } }))
                    }
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="standard-repetitive" id="cat2-1" />
                      <Label htmlFor="cat2-1" className="text-sm leading-relaxed">
                        Процесите са стандартни с повтарящи се задачи, много служители с едни и същи задачи. Малко
                        продукти и услуги.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="standard-non-repetitive" id="cat2-2" />
                      <Label htmlFor="cat2-2" className="text-sm leading-relaxed">
                        Стандартни, но не повтарящи се процеси, с голям брой продукти или услуги.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="complex" id="cat2-3" />
                      <Label htmlFor="cat2-3" className="text-sm leading-relaxed">
                        Сложни процеси, голям брой продукти и услуги, много бизнес звена
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="font-semibold">
                    Категория 3. Система за управление на сигурността на информацията
                  </Label>
                  <RadioGroup
                    value={formData.iso27001.category3}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, iso27001: { ...prev.iso27001, category3: value } }))
                    }
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="mature" id="cat3-1" />
                      <Label htmlFor="cat3-1" className="text-sm leading-relaxed">
                        СУСИ е внедрена от повече от година и/или са внедрени други СУ.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="partial" id="cat3-2" />
                      <Label htmlFor="cat3-2" className="text-sm leading-relaxed">
                        Някои елементи от други системи за управление са внедрени, но не всички.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="new" id="cat3-3" />
                      <Label htmlFor="cat3-3" className="text-sm leading-relaxed">
                        Няма внедрени други СУ, СУСИ е внедрена преди по-малко от една година.
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="font-semibold">Категория 4. Сложност на IT инфраструктурата</Label>
                  <RadioGroup
                    value={formData.iso27001.category4}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, iso27001: { ...prev.iso27001, category4: value } }))
                    }
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="simple" id="cat4-1" />
                      <Label htmlFor="cat4-1" className="text-sm leading-relaxed">
                        Малко на брой или силно стандартизирани IT платформи, сървъри, операционни системи, бази данни,
                        мрежи и др.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="moderate" id="cat4-2" />
                      <Label htmlFor="cat4-2" className="text-sm leading-relaxed">
                        Няколко различни IT платформи, сървъри, операционни системи, бази данни, мрежи и др.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="complex" id="cat4-3" />
                      <Label htmlFor="cat4-3" className="text-sm leading-relaxed">
                        Много на брой различни IT платформи, сървъри, операционни системи, бази данни, мрежи и др.
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="font-semibold">
                    Категория 5. Възлагане на външни изпълнители, доставчици (вкл. облачни услуги)
                  </Label>
                  <RadioGroup
                    value={formData.iso27001.category5}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, iso27001: { ...prev.iso27001, category5: value } }))
                    }
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="minimal" id="cat5-1" />
                      <Label htmlFor="cat5-1" className="text-sm leading-relaxed">
                        Незначителна или никаква зависимост от външни изпълнители/доставчици.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="moderate" id="cat5-2" />
                      <Label htmlFor="cat5-2" className="text-sm leading-relaxed">
                        Организацията зависи от външни изпълнители/доставчици за някои бизнес процеси (не за всички и не
                        за важните).
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="high" id="cat5-3" />
                      <Label htmlFor="cat5-3" className="text-sm leading-relaxed">
                        Организацията зависи в голяма степен от външни изпълнители или доставчици, които имат голямо
                        въздействие върху важни бизнес процеси.
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="font-semibold">Категория 6. Степен на развитие на информационните системи</Label>
                  <RadioGroup
                    value={formData.iso27001.category6}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, iso27001: { ...prev.iso27001, category6: value } }))
                    }
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="minimal" id="cat6-1" />
                      <Label htmlFor="cat6-1" className="text-sm leading-relaxed">
                        Липсва или има в много малка степен собствени разработки на софтуерни приложения (информационни
                        системи).
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="moderate" id="cat6-2" />
                      <Label htmlFor="cat6-2" className="text-sm leading-relaxed">
                        Има няколко собствени (или възложени на външни изпълнители) разработки на софтуерни приложения
                        за някои важни бизнес процеси.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="extensive" id="cat6-3" />
                      <Label htmlFor="cat6-3" className="text-sm leading-relaxed">
                        Има голям обем собствени разработки на софтуерни приложения.
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold text-stone-800">Категории служители</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>
                      Достъп само за четене: Служители с достъп единствено за четене на информацията, необходима за
                      изпълнение на техните задължения.
                    </Label>
                    <Input
                      value={formData.iso27001.employees.readOnly}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          iso27001: {
                            ...prev.iso27001,
                            employees: { ...prev.iso27001.employees, readOnly: e.target.value },
                          },
                        }))
                      }
                      className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Брой в категорията и коментар"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Без физически достъп: Лица, които нямат достъп до съоръженията за обработка на информация,
                      включени в обхвата на СУСИ.
                    </Label>
                    <Input
                      value={formData.iso27001.employees.noPhysicalAccess}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          iso27001: {
                            ...prev.iso27001,
                            employees: { ...prev.iso27001.employees, noPhysicalAccess: e.target.value },
                          },
                        }))
                      }
                      className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Брой в категорията и коментар"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Ограничен достъп: Лица, които имат специфичен, демонстриран ограничен достъп до съоръженията.
                    </Label>
                    <Input
                      value={formData.iso27001.employees.limitedAccess}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          iso27001: {
                            ...prev.iso27001,
                            employees: { ...prev.iso27001.employees, limitedAccess: e.target.value },
                          },
                        }))
                      }
                      className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Брой в категорията и коментар"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Пълен достъп и стриктни ограничения: Лица с наложени ограничения за предотвратяване на
                      разкриването на информация.
                    </Label>
                    <Input
                      value={formData.iso27001.employees.fullAccessRestricted}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          iso27001: {
                            ...prev.iso27001,
                            employees: { ...prev.iso27001.employees, fullAccessRestricted: e.target.value },
                          },
                        }))
                      }
                      className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Брой в категорията и коментар"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {formData.standards.includes("iso22000") && (
          <Card className="border-stone-200 bg-white">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-stone-800 flex items-center gap-2">
                <Utensils className="h-5 w-5 text-orange-600" />
                Секция 5. Безопасност на храните: ISO 22000:2018
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>
                  Брой HACCP планове със съответните им имена за всяка площадка в обхвата на сертификация, вкл.
                  опасностите във всеки HACCP план.
                </Label>
                <Textarea
                  value={formData.iso22000.haccp}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, iso22000: { ...prev.iso22000, haccp: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Описание на продукти и процеси, продуктови линии, персонал, вид и разнообразие на задачите, които
                  засягат БХП, разработване на продукти, собствени лабораторни изпитвания и др.
                </Label>
                <Textarea
                  value={formData.iso22000.products}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, iso22000: { ...prev.iso22000, products: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  Информация за ниво на автоматизация, използване на затворени производствени системи, други технологии,
                  механизация, ръчен труд.
                </Label>
                <Textarea
                  value={formData.iso22000.automation}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, iso22000: { ...prev.iso22000, automation: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {formData.standards.includes("iso39001") && (
          <Card className="border-stone-200 bg-white">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-stone-800 flex items-center gap-2">
                <Car className="h-5 w-5 text-orange-600" />
                Секция 6. Безопасност на движението: ISO 39001:2012
              </CardTitle>
              <CardDescription>
                Отбележете едно или повече от следващите твърдения, които са приложими за Вашата система за управление
                на безопасността на движението:
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-3">
                {[
                  "Служителите използват автомобилен транспорт до и от работа, или по време на работа (публичен транспорт или частни превозни средства в качеството на пътници или водачи, и като пешеходци или велосипедисти).",
                  "Организацията извършва транспорт на стоки и пътници, включително и чрез подизпълнители.",
                  "Организацията, извършва дейности, които генерират трафик към и от места, контролирани или повлияни от организацията (напр. супермаркети, училища или др. места с много посетители).",
                  "Организацията предоставя услуги и продукти за системата за движение по пътищата (напр. транспортни услуги, управление, планиране, проектиране, изграждане и поддържане на инфраструктура, превозни средства и свързани продукти, спешна медицинска помощ, грижи при травми, рехабилитация, дейности по контрола и законодателни дейности).",
                ].map((statement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Checkbox
                      id={`iso39001-${index}`}
                      checked={formData.iso39001.applicableStatements.includes(statement)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData((prev) => ({
                            ...prev,
                            iso39001: {
                              ...prev.iso39001,
                              applicableStatements: [...prev.iso39001.applicableStatements, statement],
                            },
                          }))
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            iso39001: {
                              ...prev.iso39001,
                              applicableStatements: prev.iso39001.applicableStatements.filter((s) => s !== statement),
                            },
                          }))
                        }
                      }}
                    />
                    <Label htmlFor={`iso39001-${index}`} className="text-sm leading-relaxed cursor-pointer">
                      {statement}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    Нормативни изисквания и лицензи/разрешителни за управлението на безопасността на движението по
                    пътищата. Моля посочете.
                  </Label>
                  <Textarea
                    value={formData.iso39001.requirements}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, iso39001: { ...prev.iso39001, requirements: e.target.value } }))
                    }
                    className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Моля посочете кои изисквания на ISO 39001 са определени като неприложими.</Label>
                  <Textarea
                    value={formData.iso39001.nonApplicable}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        iso39001: { ...prev.iso39001, nonApplicable: e.target.value },
                      }))
                    }
                    className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    През последните 12 месеца възниквали ли са ПТП с участието на служители или в района, контролиран от
                    организацията? Ако "да", пояснете.
                  </Label>
                  <Textarea
                    value={formData.iso39001.accidents}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, iso39001: { ...prev.iso39001, accidents: e.target.value } }))
                    }
                    className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {formData.standards.includes("iso37001") && (
          <Card className="border-stone-200 bg-white">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-stone-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Секция 7. Борба с подкупването: ISO 37001:2016
              </CardTitle>
              <CardDescription>(Акредитация само за територията на България)</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    Има ли процеси и/или дейности, извън обхвата на сертификация. Ако "да", посочете кои и аргументите
                    да не бъдат включени.
                  </Label>
                  <Textarea
                    value={formData.iso37001.processesOutOfScope}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        iso37001: { ...prev.iso37001, processesOutOfScope: e.target.value },
                      }))
                    }
                    className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    Държава/-и, в които се осъществяват дейностите (Не е обвързано само с площадката. Напр. от офис в
                    България могат да бъдат обслужвани клиенти в различни държави).
                  </Label>
                  <Textarea
                    value={formData.iso37001.countries}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, iso37001: { ...prev.iso37001, countries: e.target.value } }))
                    }
                    className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>
                  Посочете приложими нормативни изисквания, договорни и професионални ангажименти и задължения (напр.
                  нормативни изисквания за законното упражняване на дейността и доказателства, че са изпълнени – номер
                  на лиценз, разрешително, връзка към публичен регистър; дългосрочни договори в изпълнение – напр.
                  такива, които имат още поне две години срок за изпълнение).
                </Label>
                <Textarea
                  value={formData.iso37001.requirements}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, iso37001: { ...prev.iso37001, requirements: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={4}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold text-stone-800">Информация за площадки и чувствителни процеси</h4>
                <p className="text-sm text-stone-600">
                  Моля попълнете отделна таблица за всеки адрес, който желаете да бъде включен в обхвата на
                  сертификация.
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Адрес на площадката</Label>
                      <Input
                        value={formData.iso37001.sites[0]?.address || ""}
                        onChange={(e) => {
                          const newSites = [...formData.iso37001.sites]
                          if (!newSites[0]) newSites[0] = { address: "", type: "", totalEmployees: "", processes: {} }
                          newSites[0].address = e.target.value
                          setFormData((prev) => ({ ...prev, iso37001: { ...prev.iso37001, sites: newSites } }))
                        }}
                        className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Вид площадката (напр. централен офис, търговски офис, др.)</Label>
                      <Input
                        value={formData.iso37001.sites[0]?.type || ""}
                        onChange={(e) => {
                          const newSites = [...formData.iso37001.sites]
                          if (!newSites[0]) newSites[0] = { address: "", type: "", totalEmployees: "", processes: {} }
                          newSites[0].type = e.target.value
                          setFormData((prev) => ({ ...prev, iso37001: { ...prev.iso37001, sites: newSites } }))
                        }}
                        className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Общ брой на персонала в процеси с висок риск от подкупване</Label>
                      <Input
                        value={formData.iso37001.sites[0]?.totalEmployees || ""}
                        onChange={(e) => {
                          const newSites = [...formData.iso37001.sites]
                          if (!newSites[0]) newSites[0] = { address: "", type: "", totalEmployees: "", processes: {} }
                          newSites[0].totalEmployees = e.target.value
                          setFormData((prev) => ({ ...prev, iso37001: { ...prev.iso37001, sites: newSites } }))
                        }}
                        className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Стратегическо управление",
                      "Продажби/офериране",
                      "Финансово управление и контрол",
                      "Управление на човешки ресурси",
                      "Оперативен контрол и отчетност",
                      "Работа с пари в брой",
                      "Управление на дистрибуторски/търговски мрежи",
                      "Дейност, която е свързана с получаване на облаги и подаръци",
                      "Провеждане на тръжни процедури и избор на доставчици",
                      "Поддържане на контакт с институции и контролни органи",
                      "Управление на доставчици",
                      "Вътрешен одит",
                      "Предоставяне на ИТ услуги",
                      "Спонсорство/финансова подкрепа/безвъзмездна помощ",
                      "Поддържане на разрешения/лицензи/регистрации",
                      "Осигуряване на физическа сигурност",
                      "Издаване на разрешения/лицензи/регистрации",
                      "Обработване на жалби и оплаквания",
                    ].map((process, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Label className="text-sm flex-1">{process}</Label>
                        <Input
                          className="w-20 border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                          placeholder="Брой"
                          value={formData.iso37001.sites[0]?.processes[process] || ""}
                          onChange={(e) => {
                            const newSites = [...formData.iso37001.sites]
                            if (!newSites[0]) newSites[0] = { address: "", type: "", totalEmployees: "", processes: {} }
                            newSites[0].processes[process] = e.target.value
                            setFormData((prev) => ({ ...prev, iso37001: { ...prev.iso37001, sites: newSites } }))
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Общ брой на персонала в процеси с нисък риск</Label>
                  <Input
                    value={formData.iso37001.lowRiskEmployees}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        iso37001: { ...prev.iso37001, lowRiskEmployees: e.target.value },
                      }))
                    }
                    className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    Приблизителен процент от приходите през последната приключена финансова година, които са от публични
                    източници?
                  </Label>
                  <Input
                    value={formData.iso37001.publicRevenue}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        iso37001: { ...prev.iso37001, publicRevenue: e.target.value },
                      }))
                    }
                    className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="%"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    Юридически лица, върху които организацията има контрол (напр. чрез собственост, участие в
                    управителните органи и др.)
                  </Label>
                  <Textarea
                    value={formData.iso37001.controlledEntities}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        iso37001: { ...prev.iso37001, controlledEntities: e.target.value },
                      }))
                    }
                    className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    Юридически лица, които имат контрол върху организацията (напр. чрез собственост, участие в
                    управителните органи и др.)
                  </Label>
                  <Textarea
                    value={formData.iso37001.controllingEntities}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        iso37001: { ...prev.iso37001, controllingEntities: e.target.value },
                      }))
                    }
                    className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                    rows={2}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>
                  Лица на ръководни длъжности или на длъжности на материално изпълнение, били ли са в това си качество
                  обект на разследване, включително повдигани ли са им обвинения, които попадат в определението за
                  "подкупване" през последните пет години? Ако "да", молим да предоставите допълнителна информация.
                </Label>
                <Textarea
                  value={formData.iso37001.investigations}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, iso37001: { ...prev.iso37001, investigations: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Друга информация, която би имала отношение към сертификацията на СУБП?</Label>
                <Textarea
                  value={formData.iso37001.additionalInfo}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      iso37001: { ...prev.iso37001, additionalInfo: e.target.value },
                    }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {formData.applicationTypes.includes("Трансфер") && (
          <Card className="border-stone-200 bg-white">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-stone-800">Секция 8. Трансфер на сертификация</CardTitle>
              <CardDescription>
                Тази информация служи за преценка на възможността за трансфер на сертификацията и за изготвяне на
                оферта.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-3">
                <Label>
                  Валиден ли е сертификатът, който е обект на трансфер (включително валидността му не е била прекратена
                  от органа за сертификация).
                </Label>
                <RadioGroup
                  value={formData.transfer.validCertificate}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, transfer: { ...prev.transfer, validCertificate: value } }))
                  }
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="valid-yes" />
                    <Label htmlFor="valid-yes">Да</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="valid-no" />
                    <Label htmlFor="valid-no">Не</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Моля посочете причините за трансфера.</Label>
                <Textarea
                  value={formData.transfer.reasons}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, transfer: { ...prev.transfer, reasons: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Получавали ли сте оплаквания от клиенти или други? Ако "да", моля пояснете.</Label>
                <Textarea
                  value={formData.transfer.complaints}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, transfer: { ...prev.transfer, complaints: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Нормативни изисквания, които ви задължават да притежавате валиден сертификат? Ако "да", моля опишете.
                </Label>
                <Textarea
                  value={formData.transfer.requirements}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, transfer: { ...prev.transfer, requirements: e.target.value } }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={2}
                />
              </div>

              <div className="space-y-4">
                <Label className="font-semibold text-base">
                  Моля изпратете копия от следните документи на valentina.dobreva@incert.bg и се уверете, че сте ги приложили като отбележете:
                </Label>
                <div className="space-y-3">
                  {[
                    "Последният издаден валиден сертификат.",
                    "Доклад от етап 2 на първоначален одит или последния одит за подновяване на сертификация (което е приложимо).",
                    "Доклад от последния проведен надзорен одит (ако е приложимо).",
                    "Доказателства, че всички несъответствия, описани в докладите, са били закрити или са одобрени планове за КД.",
                    "Програма за одитите в сертификационния цикъл, предоставена от органа за сертификация, който е издал сертификата.",
                  ].map((document, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Checkbox
                        id={`transfer-doc-${index}`}
                        checked={formData.transfer.documents.includes(document)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData((prev) => ({
                              ...prev,
                              transfer: { ...prev.transfer, documents: [...prev.transfer.documents, document] },
                            }))
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              transfer: {
                                ...prev.transfer,
                                documents: prev.transfer.documents.filter((d) => d !== document),
                              },
                            }))
                          }
                        }}
                      />
                      <Label htmlFor={`transfer-doc-${index}`} className="text-sm leading-relaxed cursor-pointer">
                        {document}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {formData.standards.length > 1 && (
          <Card className="border-stone-200 bg-white">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-stone-800">Секция 9. Интегрирани системи</CardTitle>
              <CardDescription>
                Моля отбележете само тези, които са приложими за внедрената интегрирана система за управление:
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              {[
                "Разработена е обща документация на интегрираната система за управление, включително подробни работни инструкции;",
                "На прегледите от ръководството се разглеждат общата бизнес стратегия и планове за развитие.",
                "При вътрешните одити се използва \"интегриран подход\".",
                "Политиката и целите са разработени интегрирано т.е. общи са за интегрираната система.",
                "В управлението на процесите се използва \"интегриран подход\".",
                "При прилагането на мерки за подобрение се използва \"интегриран подход\" (напр. изпълнение на коригиращи действия, измерване, непрекъснато подобряване).",
                "Отговорностите в системата за управление са определени \"интегрирано\".",
              ].map((statement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Checkbox
                    id={`integrated-${index}`}
                    checked={formData.integrated.statements.includes(statement)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData((prev) => ({
                          ...prev,
                          integrated: { ...prev.integrated, statements: [...prev.integrated.statements, statement] },
                        }))
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          integrated: {
                            ...prev.integrated,
                            statements: prev.integrated.statements.filter((s) => s !== statement),
                          },
                        }))
                      }
                    }}
                  />
                  <Label htmlFor={`integrated-${index}`} className="text-sm leading-relaxed cursor-pointer">
                    {statement}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card className="border-stone-200 bg-white">
          <CardHeader className="bg-orange-50">
            <CardTitle className="text-stone-800">Попълнил</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="filledBy">Попълнил (име, фамилия, длъжност) *</Label>
              <Input
                id="filledBy"
                value={formData.filledBy}
                onChange={(e) => setFormData((prev) => ({ ...prev, filledBy: e.target.value }))}
                className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <p className="text-sm text-stone-800">
                <strong>Забележка:</strong> За да изпратите заявката използвайте бутона по долу.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-semibold"
              size="lg"
            >
              <Send className="h-5 w-5 mr-2" />
              Изпрати заявката
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

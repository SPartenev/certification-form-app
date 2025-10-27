"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
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
  country: string
  contactPersonName: string
  contactPersonPosition: string
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
  selectedSchemes?: string[]
}

export function CertificationForm() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    applicationTypes: [],
    organizationName: "",
    eik: "",
    country: "",
    contactPersonName: "",
    contactPersonPosition: "",
    email: "",
    phone: "",
    additionalInfo: "",
    standards: [],
    certificationScope: "",
    sites: [{ address: "", processes: "", employees: "", type: "main" }],
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
    setFormData((prev) => {
      let newStandards = [...prev.standards]
      
      if (checked) {
        // Ако се избира ISO 37001:2016, премахваме ISO 37001:2025
        if (standard === "iso37001") {
          newStandards = newStandards.filter((s) => s !== "iso37001_2025")
        }
        // Ако се избира ISO 37001:2025, премахваме ISO 37001:2016
        else if (standard === "iso37001_2025") {
          newStandards = newStandards.filter((s) => s !== "iso37001")
        }
        
        newStandards.push(standard)
      } else {
        newStandards = newStandards.filter((s) => s !== standard)
      }
      
      return {
        ...prev,
        standards: newStandards,
      }
    })
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
      sites: [...prev.sites, { address: "", processes: "", employees: "", type: "additional" }],
    }))
  }

  const updateSite = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      sites: prev.sites.map((site, i) => (i === index ? { ...site, [field]: value } : site)),
    }))
  }

  const removeSite = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sites: prev.sites.filter((_, i) => i !== index),
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
    { id: "iso9001", label: t('standards.iso9001'), icon: Building2, color: "bg-orange-500" },
    { id: "iso22000", label: "ISO 22000:2018", icon: Utensils, color: "bg-orange-500" },
    { id: "iso45001", label: t('standards.iso45001'), icon: Shield, color: "bg-orange-500" },
    { id: "iso39001", label: "ISO 39001:2012", icon: Car, color: "bg-orange-500" },
    { id: "iso14001", label: t('standards.iso14001'), icon: Leaf, color: "bg-orange-500" },
    { id: "iso27001", label: "ISO/IEC 27001:2022", icon: Lock, color: "bg-orange-500" },
    { id: "iso37001", label: t('standards.iso37001'), icon: AlertTriangle, color: "bg-orange-500" },
    { id: "iso37001_2025", label: t('standards.iso37001_2025'), icon: AlertTriangle, color: "bg-orange-500" },
    { id: "other", label: t('common.other'), icon: Building2, color: "bg-orange-500" },
  ]

  const multiSiteOptions = [
    t('multiSite.option1'),
    t('multiSite.option2'),
    t('multiSite.option3'),
    t('multiSite.option4'),
  ]

  // Функция за преобразуване на английски ключове в български текстове
  const translateFormData = (data: FormData) => {
    const translatedData = { ...data }
    
    // Преобразуване на стандартите
    const standardTranslations: { [key: string]: string } = {
      "iso9001": "ISO 9001:2015",
      "iso22000": "ISO 22000:2018", 
      "iso45001": "ISO 45001:2018",
      "iso39001": "ISO 39001:2012",
      "iso14001": "ISO 14001:2015",
      "iso27001": "ISO/IEC 27001:2022",
      "iso37001": "ISO 37001:2016",
      "iso37001_2025": "ISO 37001:2025",
      "other": t('common.other')
    }

    // Схеми на стандартите
    const standardSchemes: { [key: string]: string } = {
      "iso9001": t('schemes.iso9001'),
      "iso14001": t('schemes.iso14001'), 
      "iso22000": t('schemes.iso22000'),
      "iso27001": t('schemes.iso27001'),
      "iso37001": t('schemes.iso37001'),
      "iso37001_2025": t('schemes.iso37001_2025'),
      "iso39001": t('schemes.iso39001'),
      "iso45001": t('schemes.iso45001'),
      "other": t('schemes.other')
    }
    
    translatedData.standards = data.standards.map(standard => 
      standardTranslations[standard] || standard
    )

    // Генериране на схемите на избраните стандарти
    const selectedSchemes = data.standards.map(standard => 
      standardSchemes[standard] || t('unknown.scheme')
    )
    
    // Добавяне на скрито поле със схемите
    translatedData.selectedSchemes = selectedSchemes
    
    // Преобразуване на видовете заявки (вече са на български)
    // translatedData.applicationTypes остава както е
    
    // Преобразуване на езика на одита
    const languageTranslations: { [key: string]: string } = {
      "bulgarian": t('language.bulgarian'),
      "english": t('language.english')
    }
    translatedData.auditLanguage = languageTranslations[data.auditLanguage] || data.auditLanguage
    
    // Преобразуване на нивото на автоматизация
    const automationTranslations: { [key: string]: string } = {
      "low": t('risk.low'),
      "medium": t('risk.medium'), 
      "high": t('risk.high')
    }
    translatedData.iso14001.automation = automationTranslations[data.iso14001.automation] || data.iso14001.automation
    
    // Преобразуване на отговорите Да/Не
    const yesNoTranslations: { [key: string]: string } = {
      "yes": t('yes.no.yes'),
      "no": t('yes.no.no')
    }
    translatedData.developNewProducts = yesNoTranslations[data.developNewProducts] || data.developNewProducts
    translatedData.manufactureProducts = yesNoTranslations[data.manufactureProducts] || data.manufactureProducts
    translatedData.transfer.validCertificate = yesNoTranslations[data.transfer.validCertificate] || data.transfer.validCertificate
    
    // Преобразуване на ISO 27001 категории
    const categoryTranslations: { [key: string]: string } = {
      "non-critical": t('business.non-critical'),
      "serves-critical": t('business.serves-critical'),
      "critical": t('business.critical'),
      "standard-repetitive": t('process.standard-repetitive'),
      "standard-non-repetitive": t('process.standard-non-repetitive'),
      "complex": t('process.complex'),
      "mature": t('maturity.mature'),
      "partial": t('maturity.partial'),
      "new": t('maturity.new'),
      "simple": t('it.simple'),
      "moderate": t('it.moderate'),
      "complex-it": t('it.complex'),
      "minimal": t('dependency.minimal'),
      "high": t('dependency.high'),
      "extensive": t('dependency.extensive')
    }
    
    translatedData.iso27001.category1 = categoryTranslations[data.iso27001.category1] || data.iso27001.category1
    translatedData.iso27001.category2 = categoryTranslations[data.iso27001.category2] || data.iso27001.category2
    translatedData.iso27001.category3 = categoryTranslations[data.iso27001.category3] || data.iso27001.category3
    translatedData.iso27001.category4 = categoryTranslations[data.iso27001.category4] || data.iso27001.category4
    translatedData.iso27001.category5 = categoryTranslations[data.iso27001.category5] || data.iso27001.category5
    translatedData.iso27001.category6 = categoryTranslations[data.iso27001.category6] || data.iso27001.category6
    
    // Преобразуване на вида площадка
    const siteTypeTranslations: { [key: string]: string } = {
      "main": t('certification.main'),
      "additional": t('certification.additional')
    }
    
    translatedData.sites = data.sites.map(site => ({
      ...site,
      type: siteTypeTranslations[site.type] || site.type
    }))
    
    // Преобразуване на ISO 37001 площадки
    translatedData.iso37001.sites = data.iso37001.sites.map(site => ({
      ...site,
      type: site.type // Това е свободен текст, не се преобразува
    }))
    
    return translatedData
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Валидация за задължителни полета
    if (formData.applicationTypes.length === 0) {
      alert('Моля, изберете поне един вид на заявката!')
      return
    }
    
    if (!formData.auditLanguage.trim()) {
      alert('Моля, попълнете езика на одита!')
      return
    }
    
    setIsSubmitting(true)
    
    // Преобразуваме данните в български преди изпращане
    const translatedFormData = translateFormData(formData)
    
    // Премахваме генерирането на ID от клиента.
    // Сървърът ще генерира ID-то.
    const submissionData = {
      formData: translatedFormData,
      selectedStandards: translatedFormData.standards,
      applicationTypes: formData.applicationTypes,
      // Добавяме останалите полета, които сървърът очаква
      filledBy: formData.filledBy,
      organizationName: formData.organizationName,
      eik: formData.eik,
    }
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        console.log("Данните са изпратени успешно:", result)
        alert(`✅ Благодарим! Вашата заявка е успешно изпратена.\n\nНомер на заявката: ${result.id}\n\nЩе се свържем с вас скоро!`)
        window.location.reload()
      } else {
        console.error("Грешка при изпращане:", result.message)
        alert(`⚠️ Възникна проблем при изпращането на заявката.\n\nГрешка: ${result.message || response.status}\nМоля опитайте отново или се свържете с нас.`)
      }
    } catch (error) {
      console.error("Мрежова грешка:", error)
      alert(`⚠️ Няма връзка със сървъра.\n\nМоля, проверете интернет връзката си и опитайте отново.`)
    } finally {
      setIsSubmitting(false)
    }
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
          </div>
          <div className="mt-4">
            <CardTitle className="text-2xl font-bold text-stone-800">{t('form.title')}</CardTitle>
            <CardDescription className="text-stone-600 mt-2">
              
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="border-stone-200 bg-white">
          <CardHeader className="bg-orange-50">
            <CardTitle className="text-stone-800">{t('section.applicationType')}</CardTitle>
            <CardDescription>{t('section.chooseType')} *</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "new", label: t('application.new') },
                { value: "change", label: t('application.change') },
                { value: "renewal", label: t('application.renewal') },
                { value: "transfer", label: t('application.transfer') },
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
{t('section.organizationInfo')}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="organizationName">{t('company.name')} *</Label>
                <Input
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, organizationName: e.target.value }))}
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eik">{t('company.eik')} *</Label>
                <Input
                  id="eik"
                  value={formData.eik}
                  onChange={(e) => setFormData((prev) => ({ ...prev, eik: e.target.value }))}
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">{t('company.country')} *</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPersonName">{t('company.contactPersonName')} *</Label>
                <Input
                  id="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, contactPersonName: e.target.value }))}
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPersonPosition">{t('company.position')} *</Label>
                <Input
                  id="contactPersonPosition"
                  value={formData.contactPersonPosition}
                  onChange={(e) => setFormData((prev) => ({ ...prev, contactPersonPosition: e.target.value }))}
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('company.email')} *</Label>
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
                <Label htmlFor="phone">{t('company.phone')} *</Label>
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
              <Label htmlFor="additionalInfo">{t('company.additionalInfo')}</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => setFormData((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                placeholder={t('placeholder.changeInfo')}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-stone-200 bg-white">
          <CardHeader className="bg-orange-50">
            <CardTitle className="text-stone-800">{t('standards.title')}:</CardTitle>
            <CardDescription>{t('standards.required')}</CardDescription>
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

        {formData.standards.includes("other") && (
          <Card className="border-stone-200 bg-white">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-stone-800 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-orange-600" />
{t('section.otherStandards')}
              </CardTitle>
              <CardDescription>{t('section.otherStandardsDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label>
                  {t('section.otherStandardsLabel')}
                </Label>
                <Textarea
                  value={formData.additionalInfo}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, additionalInfo: e.target.value }))
                  }
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={4}
                  placeholder={t('placeholder.otherStandards')}
                />
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-stone-200 bg-white">
          <CardHeader className="bg-orange-50">
            <CardTitle className="text-stone-800">{t('scope.title')}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="certificationScope">
                {t('scope.description')} *
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
                <h4 className="font-semibold text-stone-800">{t('scope.sites')}</h4>
              </div>

              {formData.sites.map((site, index) => (
                <Card key={index} className="border-stone-100 relative">
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSite(index)}
                      className="absolute top-2 right-2 h-8 w-8 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50"
                    >
                      ×
                    </Button>
                  )}
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t('scope.siteAddress')} {index + 1}</Label>
                        <Input
                          value={site.address}
                          onChange={(e) => updateSite(index, "address", e.target.value)}
                          className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                          placeholder={t('placeholder.siteAddress')}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t('scope.siteType')}</Label>
                        <Select value={site.type} onValueChange={(value) => updateSite(index, "type", value)}>
                          <SelectTrigger className="border-stone-200 focus:border-orange-500 focus:ring-orange-500">
                            <SelectValue placeholder={t('placeholder.selectType')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="main">{t('scope.main')}</SelectItem>
                            <SelectItem value="temporary">{t('scope.temporary')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>{t('scope.processes')}</Label>
                        <Textarea
                          value={site.processes}
                          onChange={(e) => updateSite(index, "processes", e.target.value)}
                          className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t('scope.employees')}</Label>
                        <Input
                          value={site.employees}
                          onChange={(e) => updateSite(index, "employees", e.target.value)}
                          className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                          placeholder={t('placeholder.employees')}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="flex justify-end pt-4">
                <Button type="button" onClick={addSite} variant="outline" size="sm">
{t('scope.addSite')}
                </Button>
              </div>
            </div>

            {formData.sites.length > 1 && (
              <Card className="border-stone-100 bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-sm text-gray-800">{t('multiSite.title')}</CardTitle>
                  <CardDescription className="text-sm">
                    {t('multiSite.description')}
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
            <CardTitle className="text-stone-800">{t('additional.title')}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="outsourcedProcesses">{t('additional.outsourced')}</Label>
              <Textarea
                id="outsourcedProcesses"
                value={formData.outsourcedProcesses}
                onChange={(e) => setFormData((prev) => ({ ...prev, outsourcedProcesses: e.target.value }))}
                className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="consultantServices">{t('additional.consultant')}</Label>
              <Input
                id="consultantServices"
                value={formData.consultantServices}
                onChange={(e) => setFormData((prev) => ({ ...prev, consultantServices: e.target.value }))}
                className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                placeholder={t('placeholder.consultant')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regulatoryRequirements">
                {t('additional.regulatory')}
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
                <Label>{t('additional.developProducts')}</Label>
                <RadioGroup
                  value={formData.developNewProducts}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, developNewProducts: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="develop-yes" />
                    <Label htmlFor="develop-yes">{t('yes.no.yes')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="develop-no" />
                    <Label htmlFor="develop-no">{t('yes.no.no')}</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>{t('additional.manufactureProducts')}</Label>
                <RadioGroup
                  value={formData.manufactureProducts}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, manufactureProducts: value }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="manufacture-yes" />
                    <Label htmlFor="manufacture-yes">{t('yes.no.yes')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="manufacture-no" />
                    <Label htmlFor="manufacture-no">{t('yes.no.no')}</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherCertifications">
                {t('additional.otherCertifications')}
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
                <Label htmlFor="auditLanguage">{t('additional.auditLanguage')} *</Label>
                <Input
                  id="auditLanguage"
                  value={formData.auditLanguage}
                  onChange={(e) => setFormData((prev) => ({ ...prev, auditLanguage: e.target.value }))}
                  className="border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                  placeholder={t('placeholder.auditLanguage')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auditDeadline">{t('additional.auditDeadline')}</Label>
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
                {t('iso45001.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>
                  1. {t('iso45001.question1')}
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
                  2. {t('iso45001.question2')}
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
                  3. {t('iso45001.question3')}
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
                <Label>4. {t('iso45001.question4')}</Label>
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
                  5. {t('iso45001.question5')}
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
                  6. {t('iso45001.question6')}
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
                  7. {t('iso45001.question7')}
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
                {t('iso14001.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>1. {t('iso14001.question1')}</Label>
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
                  2. {t('iso14001.question2')}
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
                  3. {t('iso14001.question3')}
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
                  4. {t('iso14001.question4')}
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
                  5. {t('iso14001.question5')}
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
                <Label>6. {t('iso14001.question6')}</Label>
                <RadioGroup
                  value={formData.iso14001.automation}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, iso14001: { ...prev.iso14001, automation: value } }))
                  }
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="auto-low" />
                    <Label htmlFor="auto-low">{t('iso14001.automation.low')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="auto-medium" />
                    <Label htmlFor="auto-medium">{t('iso14001.automation.medium')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="auto-high" />
                    <Label htmlFor="auto-high">{t('iso14001.automation.high')}</Label>
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
                {t('iso27001.title')}
              </CardTitle>
              <CardDescription>
                {t('iso27001.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="font-semibold">{t('iso27001.category1')}</Label>
                  <RadioGroup
                    value={formData.iso27001.category1}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, iso27001: { ...prev.iso27001, category1: value } }))
                    }
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="non-critical" id="cat1-1" />
                      <Label htmlFor="cat1-1" className="text-sm leading-relaxed">
                        {t('iso27001.category1.option1')}
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="serves-critical" id="cat1-2" />
                      <Label htmlFor="cat1-2" className="text-sm leading-relaxed">
                        {t('iso27001.category1.option2')}
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="critical" id="cat1-3" />
                      <Label htmlFor="cat1-3" className="text-sm leading-relaxed">
                        {t('iso27001.category1.option3')}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="font-semibold">{t('iso27001.category2')}</Label>
                  <RadioGroup
                    value={formData.iso27001.category2}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, iso27001: { ...prev.iso27001, category2: value } }))
                    }
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="standard-repetitive" id="cat2-1" />
                      <Label htmlFor="cat2-1" className="text-sm leading-relaxed">
                        {t('iso27001.category2.option1')}
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="standard-non-repetitive" id="cat2-2" />
                      <Label htmlFor="cat2-2" className="text-sm leading-relaxed">
                        {t('iso27001.category2.option2')}
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="complex" id="cat2-3" />
                      <Label htmlFor="cat2-3" className="text-sm leading-relaxed">
                        {t('iso27001.category2.option3')}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="font-semibold">
                    {t('iso27001.category3')}
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
                        {t('iso27001.category3.option1')}
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="partial" id="cat3-2" />
                      <Label htmlFor="cat3-2" className="text-sm leading-relaxed">
                        {t('iso27001.category3.option2')}
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="new" id="cat3-3" />
                      <Label htmlFor="cat3-3" className="text-sm leading-relaxed">
                        {t('iso27001.category3.option3')}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="font-semibold">{t('iso27001.category4')}</Label>
                  <RadioGroup
                    value={formData.iso27001.category4}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, iso27001: { ...prev.iso27001, category4: value } }))
                    }
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="simple" id="cat4-1" />
                      <Label htmlFor="cat4-1" className="text-sm leading-relaxed">
                        {t('iso27001.category4.option1')}
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="moderate" id="cat4-2" />
                      <Label htmlFor="cat4-2" className="text-sm leading-relaxed">
                        {t('iso27001.category4.option2')}
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="complex-it" id="cat4-3" />
                      <Label htmlFor="cat4-3" className="text-sm leading-relaxed">
                        {t('iso27001.category4.option3')}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="font-semibold">
                    {t('iso27001.category5')}
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
                        {t('iso27001.category5.option1')}
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="moderate" id="cat5-2" />
                      <Label htmlFor="cat5-2" className="text-sm leading-relaxed">
                        {t('iso27001.category5.option2')}
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="high" id="cat5-3" />
                      <Label htmlFor="cat5-3" className="text-sm leading-relaxed">
                        {t('iso27001.category5.option3')}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="font-semibold">{t('iso27001.category6')}</Label>
                  <RadioGroup
                    value={formData.iso27001.category6}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, iso27001: { ...prev.iso27001, category6: value } }))
                    }
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="minimal" id="cat6-1" />
                      <Label htmlFor="cat6-1" className="text-sm leading-relaxed">
                        {t('iso27001.category6.option1')}
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="moderate" id="cat6-2" />
                      <Label htmlFor="cat6-2" className="text-sm leading-relaxed">
                        {t('iso27001.category6.option2')}
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="extensive" id="cat6-3" />
                      <Label htmlFor="cat6-3" className="text-sm leading-relaxed">
                        {t('iso27001.category6.option3')}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold text-stone-800">{t('iso27001.employeeCategories.title')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>
                      {t('iso27001.access.readonly')}
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
                      placeholder={t('placeholder.categoryCount')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      {t('iso27001.access.nophysical')}
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
                      placeholder={t('placeholder.categoryCount')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      {t('iso27001.access.limited')}
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
                      placeholder={t('placeholder.categoryCount')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      {t('iso27001.access.full')}
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
                      placeholder={t('placeholder.categoryCount')}
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
                {t('iso22000.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>
                  {t('iso22000.haccpPlans')}
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
                  {t('iso22000.description')}
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
                  {t('iso22000.automation')}
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
                ISO 39001:2012 {t('iso39001.subtitle')}
              </CardTitle>
              <CardDescription>
                {t('iso39001.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-3">
                {[
                  t('iso39001.statement1'),
                  t('iso39001.statement2'),
                  t('iso39001.statement3'),
                  t('iso39001.statement4'),
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
                    {t('iso39001.requirements')}
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
                  <Label>{t('iso39001.nonApplicable')}</Label>
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
                    {t('iso39001.accidents')}
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
                {t('iso37001.title')}
              </CardTitle>
              <CardDescription>{t('iso37001.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    {t('iso37001.processesOutOfScope')}
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
                    {t('iso37001.countries')}
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
                  {t('iso37001.requirements')}
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
                <h4 className="font-semibold text-stone-800">{t('iso37001.sitesInfo')}</h4>
                <p className="text-sm text-stone-600">
                  {t('iso37001.sitesInfoDescription')}
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t('iso37001.siteAddress')}</Label>
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
                      <Label>{t('iso37001.siteType')}</Label>
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
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t('iso37001.totalEmployees')}</Label>
                    <p className="text-sm text-gray-600 mb-2">
                      {t('iso37001.totalEmployeesHelp')}
                    </p>
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

                  {/* Чувствителни процеси */}
                  <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <h4 className="text-lg font-semibold text-stone-700 mb-4">{t('iso37001.sensitiveProcesses')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        t('processes.strategicManagement'),
                        t('processes.salesOffering'),
                        t('processes.financialManagement'),
                        t('processes.humanResources'),
                        t('processes.operationalControl'),
                        t('processes.cashHandling'),
                        t('processes.distributionManagement'),
                        t('processes.benefitsGifts'),
                        t('processes.tendering'),
                        t('processes.institutionalContact'),
                        t('processes.supplierManagement'),
                        t('processes.internalAudit'),
                        t('processes.itServices'),
                        t('processes.sponsorship'),
                        t('processes.licenses'),
                        t('processes.physicalSecurity'),
                        t('processes.licenseIssuance'),
                        t('processes.complaints'),
                      ].map((process, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Label className="text-sm flex-1">{process}</Label>
                          <Input
                            className="w-20 border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                            placeholder={t('placeholder.count')}
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('iso37001.lowRiskEmployees')}</Label>
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
                    {t('iso37001.controlledEntities')}
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
                    {t('iso37001.controllingEntities')}
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
                  {t('iso37001.investigations')}
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
                <Label>{t('iso37001.otherInfo')}</Label>
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

        {formData.standards.includes("iso37001_2025") && (
          <Card className="border-stone-200 bg-white">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-stone-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                {t('iso37001.title')}
              </CardTitle>
              <CardDescription>{t('antiBribery.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    {t('iso37001.processesOutOfScope')}
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
                    {t('iso37001.countries')}
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
                  {t('iso37001.requirements')}
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
                <h4 className="font-semibold text-stone-800">{t('iso37001.sitesInfo')}</h4>
                <p className="text-sm text-stone-600">
                  {t('iso37001.sitesInfoDescription')}
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t('iso37001.siteAddress')}</Label>
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
                      <Label>{t('iso37001.siteType')}</Label>
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
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t('iso37001.totalEmployees')}</Label>
                    <p className="text-sm text-gray-600 mb-2">
                      {t('iso37001.totalEmployeesHelp')}
                    </p>
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

                  {/* Чувствителни процеси */}
                  <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <h4 className="text-lg font-semibold text-stone-700 mb-4">{t('iso37001.sensitiveProcesses')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        t('processes.strategicManagement'),
                        t('processes.salesOffering'),
                        t('processes.financialManagement'),
                        t('processes.humanResources'),
                        t('processes.operationalControl'),
                        t('processes.cashHandling'),
                        t('processes.distributionManagement'),
                        t('processes.benefitsGifts'),
                        t('processes.tendering'),
                        t('processes.institutionalContact'),
                        t('processes.supplierManagement'),
                        t('processes.internalAudit'),
                        t('processes.itServices'),
                        t('processes.sponsorship'),
                        t('processes.licenses'),
                        t('processes.physicalSecurity'),
                        t('processes.licenseIssuance'),
                        t('processes.complaints'),
                      ].map((process, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Label className="text-sm flex-1">{process}</Label>
                          <Input
                            className="w-20 border-stone-200 focus:border-orange-500 focus:ring-orange-500"
                            placeholder={t('placeholder.count')}
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('iso37001.lowRiskEmployees')}</Label>
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
                  <Label>Процент от приходите, които идват от публични средства</Label>
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
                    Юридически лица, които са под контрола на организацията (напр. дъщерни дружества, филиали и др.)
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
                    {t('iso37001.controllingEntities')}
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
                  {t('iso37001.investigations')}
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
                <Label>{t('iso37001.otherInfo')}</Label>
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

        {formData.applicationTypes.includes("transfer") && (
          <Card className="border-stone-200 bg-white">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-stone-800">{t('transfer.title')}</CardTitle>
              <CardDescription>
                Тази информация служи за преценка на възможността за трансфер на сертификацията и за изготвяне на
                оферта.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-3">
                <Label>
                  {t('transfer.validCertificate')}
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
                    <Label htmlFor="valid-yes">{t('yes.no.yes')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="valid-no" />
                    <Label htmlFor="valid-no">{t('yes.no.no')}</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>{t('transfer.reasons')}</Label>
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
                <Label>{t('transfer.complaints')}</Label>
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
                  {t('transfer.requirements')}
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
                    t('transfer.doc1'),
                    t('transfer.doc2'),
                    t('transfer.doc3'),
                    t('transfer.doc4'),
                    t('transfer.doc5'),
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
              <CardTitle className="text-stone-800">{t('integrated.title')}</CardTitle>
              <CardDescription>
                {t('integrated.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              {[
                t('integrated.statement1'),
                t('integrated.statement2'),
                t('integrated.statement3'),
                t('integrated.statement4'),
                t('integrated.statement5'),
                t('integrated.statement6'),
                t('integrated.statement7'),
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
            <CardTitle className="text-stone-800">{t('form.completedBy')}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="filledBy">{t('form.filledIn')} *</Label>
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
                {t('form.reviewMessage')}
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t('form.submitting')}
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  {t('form.submitButton')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

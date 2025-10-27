"use client"

import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

export const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'bg' ? 'en' : 'bg')
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">
        {language === 'bg' ? 'БГ' : 'EN'}
      </span>
    </Button>
  )
}

"use client"

import { useLanguage } from '@/contexts/LanguageContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Globe } from 'lucide-react'

export const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage()

  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'bg' | 'en')
  }

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-orange-600" />
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[140px] border-orange-200 bg-orange-50 text-orange-800 focus:border-orange-500 focus:ring-orange-500 hover:bg-orange-100">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-orange-200">
          <SelectItem value="bg" className="cursor-pointer hover:bg-orange-50 focus:bg-orange-50">
            <span className="font-medium">БГ</span>
          </SelectItem>
          <SelectItem value="en" className="cursor-pointer hover:bg-orange-50 focus:bg-orange-50">
            <span className="font-medium">EN</span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

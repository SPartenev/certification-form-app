"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'bg' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Translation keys and their values
const translations = {
  bg: {
    // Form title and basic info
    'form.title': 'Форма за заявка за сертификация',
    'form.subtitle': 'Моля попълнете всички полета за да продължите',
    
    // Company information
    'company.name': 'Име на организацията',
    'company.address': 'Адрес на организацията',
    'company.phone': 'Телефон',
    'company.email': 'Имейл',
    'company.website': 'Уебсайт',
    'company.contactPerson': 'Лице за контакт',
    'company.position': 'Длъжност',
    
    // Standards
    'standards.title': 'Стандарти за сертификация',
    'standards.iso9001': 'ISO 9001:2015 - Системи за управление на качеството',
    'standards.iso14001': 'ISO 14001:2015 - Системи за управление на околната среда',
    'standards.iso45001': 'ISO 45001:2018 - Системи за управление на безопасността и здравето при работа',
    'standards.iso37001': 'ISO 37001:2016 - Системи за управление на борбата с подкупването',
    'standards.iso37001_2025': 'ISO 37001:2025 - Системи за управление на борбата с подкупването',
    
    // Application types
    'applicationTypes.title': 'Тип заявка',
    'applicationTypes.initial': 'Първоначална сертификация',
    'applicationTypes.renewal': 'Подновяване на сертификация',
    'applicationTypes.transfer': 'Трансфер на сертификация',
    'applicationTypes.extension': 'Разширяване на обхвата',
    
    // Anti-bribery section
    'antiBribery.title': 'Борба с подкупването',
    'antiBribery.subtitle': '(Акредитация само за територията на България)',
    'antiBribery.sensitiveProcess': 'Чувствителен процес',
    'antiBribery.totalEmployees': 'Общ брой на персонала в процеси с висок риск от подкупване',
    'antiBribery.totalEmployeesHelp': 'Общият брой от секцията "Чувствителен процес" по-долу.',
    
    // Process names
    'processes.strategicManagement': 'Стратегическо управление',
    'processes.salesOffering': 'Продажби/офериране',
    'processes.financialManagement': 'Финансово управление и контрол',
    'processes.humanResources': 'Управление на човешки ресурси',
    'processes.operationalControl': 'Оперативен контрол и отчетност',
    'processes.cashHandling': 'Работа с пари в брой',
    'processes.distributionManagement': 'Управление на дистрибуторски/търговски мрежи',
    'processes.benefitsGifts': 'Дейност, която е свързана с получаване на облаги и подаръци',
    'processes.tendering': 'Провеждане на тръжни процедури и избор на доставчици',
    'processes.institutionalContact': 'Поддържане на контакт с институции и контролни органи',
    'processes.supplierManagement': 'Управление на доставчици',
    'processes.internalAudit': 'Вътрешен одит',
    'processes.itServices': 'Предоставяне на ИТ услуги',
    'processes.sponsorship': 'Спонсорство/финансова подкрепа/безвъзмездна помощ',
    'processes.licenses': 'Поддържане на разрешения/лицензи/регистрации',
    'processes.physicalSecurity': 'Осигуряване на физическа сигурност',
    'processes.licenseIssuance': 'Издаване на разрешения/лицензи/регистрации',
    'processes.complaints': 'Обработване на жалби и оплаквания',
    
    // Other common texts
    'common.submit': 'Изпрати заявката',
    'common.cancel': 'Отказ',
    'common.save': 'Запази',
    'common.next': 'Напред',
    'common.previous': 'Назад',
    'common.required': 'Задължително поле',
    'common.optional': 'Незадължително поле',
    'common.selectLanguage': 'Избери език',
  },
  en: {
    // Form title and basic info
    'form.title': 'Certification Application Form',
    'form.subtitle': 'Please fill in all fields to continue',
    
    // Company information
    'company.name': 'Organization Name',
    'company.address': 'Organization Address',
    'company.phone': 'Phone',
    'company.email': 'Email',
    'company.website': 'Website',
    'company.contactPerson': 'Contact Person',
    'company.position': 'Position',
    
    // Standards
    'standards.title': 'Certification Standards',
    'standards.iso9001': 'ISO 9001:2015 - Quality Management Systems',
    'standards.iso14001': 'ISO 14001:2015 - Environmental Management Systems',
    'standards.iso45001': 'ISO 45001:2018 - Occupational Health and Safety Management Systems',
    'standards.iso37001': 'ISO 37001:2016 - Anti-bribery Management Systems',
    'standards.iso37001_2025': 'ISO 37001:2025 - Anti-bribery Management Systems',
    
    // Application types
    'applicationTypes.title': 'Application Type',
    'applicationTypes.initial': 'Initial Certification',
    'applicationTypes.renewal': 'Certification Renewal',
    'applicationTypes.transfer': 'Certification Transfer',
    'applicationTypes.extension': 'Scope Extension',
    
    // Anti-bribery section
    'antiBribery.title': 'Anti-bribery',
    'antiBribery.subtitle': '(Accreditation only for the territory of Bulgaria)',
    'antiBribery.sensitiveProcess': 'Sensitive Process',
    'antiBribery.totalEmployees': 'Total number of personnel in high-risk bribery processes',
    'antiBribery.totalEmployeesHelp': 'Total number from the "Sensitive Process" section below.',
    
    // Process names
    'processes.strategicManagement': 'Strategic Management',
    'processes.salesOffering': 'Sales/Offering',
    'processes.financialManagement': 'Financial Management and Control',
    'processes.humanResources': 'Human Resources Management',
    'processes.operationalControl': 'Operational Control and Reporting',
    'processes.cashHandling': 'Cash Handling',
    'processes.distributionManagement': 'Distribution/Trading Network Management',
    'processes.benefitsGifts': 'Activities related to receiving benefits and gifts',
    'processes.tendering': 'Conducting tender procedures and supplier selection',
    'processes.institutionalContact': 'Maintaining contact with institutions and control bodies',
    'processes.supplierManagement': 'Supplier Management',
    'processes.internalAudit': 'Internal Audit',
    'processes.itServices': 'IT Services Provision',
    'processes.sponsorship': 'Sponsorship/Financial Support/Grant Aid',
    'processes.licenses': 'Maintaining Permits/Licenses/Registrations',
    'processes.physicalSecurity': 'Physical Security Provision',
    'processes.licenseIssuance': 'Issuance of Permits/Licenses/Registrations',
    'processes.complaints': 'Complaints and Grievances Handling',
    
    // Other common texts
    'common.submit': 'Submit Application',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.required': 'Required field',
    'common.optional': 'Optional field',
    'common.selectLanguage': 'Select Language',
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('bg')

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'bg' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

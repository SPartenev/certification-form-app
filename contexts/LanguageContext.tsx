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
    'company.website': 'Уебсайт',
    
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
    'common.other': 'Други',
    
    // Company information
    'company.eik': 'ЕИК',
    'company.country': 'Държава',
    'company.contactPerson': 'Лице за контакт',
    'company.position': 'Длъжност',
    'company.email': 'Имейл',
    'company.phone': 'Телефон',
    'company.additionalInfo': 'Допълнителна информация',
    'company.filledBy': 'Попълнено от',
    
    // Multi-site management
    'multiSite.option1': 'Организацията има една обща система за управление за всички площадки.',
    'multiSite.option2': 'Организацията има единно централно управление, което е част от нея и не е външено на външен изпълнител.',
    'multiSite.option3': 'Централното управление има правомощия да разработва, внедрява и поддържа единната система за управление за всички площадки в обхвата на сертификация.',
    'multiSite.option4': 'Провежда се общ преглед от ръководството за централното управление и площадките.',
    'multiSite.option5': 'Всички площадки са включени в програмата за вътрешни одити на организацията.',
    'multiSite.option6': 'Централното управление носи отговорност за събирането и анализа на данни от всички площадки.',
    'multiSite.option7': 'Централното управление има право и възможност да налага следните промени в процесите на отделните площадки (в системата и документацията ѝ, в резултат от проведени прегледи от ръководството, в резултат от оплаквания, в резултат от коригиращи действия, в резултат на вътрешни одити и оценяване на резултатите и промени, произтичащи от нормативни изисквания, относими към приложимите стандарти).',
    
    // Site information
    'site.address': 'Адрес на площадката',
    'site.type': 'Вид площадката (напр. централен офис, търговски офис, др.)',
    'site.processes': 'Процеси',
    'site.employees': 'Брой служители',
    
    // Other sections
    'outsourcedProcesses': 'Външни процеси',
    'consultantServices': 'Консултантски услуги',
    'regulatoryRequirements': 'Нормативни изисквания',
    'developNewProducts': 'Разработване на нови продукти',
    'manufactureProducts': 'Производство на продукти',
    'otherCertifications': 'Други сертификации',
    'auditLanguage': 'Език на одита',
    'auditDeadline': 'Краен срок за одит',
    'certificationScope': 'Обхват на сертификацията',
    
    // ISO 45001
    'iso45001.hazards': 'Опасности',
    'iso45001.chemicals': 'Химикали',
    'iso45001.installations': 'Инсталации',
    'iso45001.regulations': 'Регламенти',
    'iso45001.offSitePersonnel': 'Персонал извън площадката',
    'iso45001.accidents': 'Произшествия',
    'iso45001.lawsuits': 'Съдебни дела',
    
    // ISO 14001
    'iso14001.aspects': 'Екологични аспекти',
    'iso14001.location': 'Местоположение',
    'iso14001.requirements': 'Изисквания',
    'iso14001.indirectAspects': 'Непряки аспекти',
    'iso14001.risks': 'Рискове',
    'iso14001.automation': 'Автоматизация',
    
    // ISO 27001
    'iso27001.category1': 'Категория 1',
    'iso27001.category2': 'Категория 2',
    'iso27001.category3': 'Категория 3',
    'iso27001.category4': 'Категория 4',
    'iso27001.category5': 'Категория 5',
    
    // ISO 37001 additional fields
    'iso37001.processesOutOfScope': 'Процеси извън обхвата',
    'iso37001.countries': 'Държави на дейност',
    'iso37001.requirements': 'Нормативни изисквания',
    'iso37001.lowRiskEmployees': 'Персонал с нисък риск',
    'iso37001.controlledEntities': 'Контролирани лица',
    'iso37001.controllingEntities': 'Контролиращи лица',
    'iso37001.investigations': 'Разследвания',
    'iso37001.publicRevenue': 'Публични приходи',
    'iso37001.additionalInfo': 'Допълнителна информация',
    
    // Transfer section
    'transfer.validCertificate': 'Валиден сертификат',
    'transfer.reasons': 'Причини за трансфер',
    'transfer.complaints': 'Оплаквания',
    'transfer.requirements': 'Изисквания',
    'transfer.documents': 'Документи',
    
    // Integrated systems
    'integrated.title': 'Интегрирани системи',
    'integrated.description': 'Моля отбележете само тези, които са приложими за внедрената интегрирана система за управление:',
    
    // Scheme names
    'schemes.iso9001': 'СУК',
    'schemes.iso14001': 'СУОС',
    'schemes.iso22000': 'СУБХП',
    'schemes.iso27001': 'СУСИ',
    'schemes.iso37001': 'СУБП',
    'schemes.iso37001_2025': 'СУБП',
    'schemes.iso39001': 'СУБДП',
    'schemes.iso45001': 'СУЗБР',
    'schemes.other': 'Други',
  },
  en: {
    // Form title and basic info
    'form.title': 'Certification Application Form',
    'form.subtitle': 'Please fill in all fields to continue',
    
    // Company information
    'company.name': 'Organization Name',
    'company.address': 'Organization Address',
    'company.website': 'Website',
    
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
    'common.other': 'Other',
    
    // Company information
    'company.eik': 'EIK',
    'company.country': 'Country',
    'company.contactPerson': 'Contact Person',
    'company.position': 'Position',
    'company.email': 'Email',
    'company.phone': 'Phone',
    'company.additionalInfo': 'Additional Information',
    'company.filledBy': 'Filled By',
    
    // Multi-site management
    'multiSite.option1': 'The organization has one common management system for all sites.',
    'multiSite.option2': 'The organization has unified central management that is part of it and is not delegated to an external contractor.',
    'multiSite.option3': 'Central management has the authority to develop, implement and maintain the unified management system for all sites within the scope of certification.',
    'multiSite.option4': 'A general review is conducted by management for central management and sites.',
    'multiSite.option5': 'All sites are included in the organization\'s internal audit program.',
    'multiSite.option6': 'Central management is responsible for collecting and analyzing data from all sites.',
    'multiSite.option7': 'Central management has the right and ability to impose the following changes in the processes of individual sites (in the system and its documentation, as a result of management reviews, as a result of complaints, as a result of corrective actions, as a result of internal audits and evaluation of results and changes arising from regulatory requirements applicable to the standards).',
    
    // Site information
    'site.address': 'Site Address',
    'site.type': 'Site Type (e.g. central office, sales office, etc.)',
    'site.processes': 'Processes',
    'site.employees': 'Number of Employees',
    
    // Other sections
    'outsourcedProcesses': 'Outsourced Processes',
    'consultantServices': 'Consultant Services',
    'regulatoryRequirements': 'Regulatory Requirements',
    'developNewProducts': 'Develop New Products',
    'manufactureProducts': 'Manufacture Products',
    'otherCertifications': 'Other Certifications',
    'auditLanguage': 'Audit Language',
    'auditDeadline': 'Audit Deadline',
    'certificationScope': 'Certification Scope',
    
    // ISO 45001
    'iso45001.hazards': 'Hazards',
    'iso45001.chemicals': 'Chemicals',
    'iso45001.installations': 'Installations',
    'iso45001.regulations': 'Regulations',
    'iso45001.offSitePersonnel': 'Off-site Personnel',
    'iso45001.accidents': 'Accidents',
    'iso45001.lawsuits': 'Lawsuits',
    
    // ISO 14001
    'iso14001.aspects': 'Environmental Aspects',
    'iso14001.location': 'Location',
    'iso14001.requirements': 'Requirements',
    'iso14001.indirectAspects': 'Indirect Aspects',
    'iso14001.risks': 'Risks',
    'iso14001.automation': 'Automation',
    
    // ISO 27001
    'iso27001.category1': 'Category 1',
    'iso27001.category2': 'Category 2',
    'iso27001.category3': 'Category 3',
    'iso27001.category4': 'Category 4',
    'iso27001.category5': 'Category 5',
    
    // ISO 37001 additional fields
    'iso37001.processesOutOfScope': 'Processes Out of Scope',
    'iso37001.countries': 'Countries of Activity',
    'iso37001.requirements': 'Regulatory Requirements',
    'iso37001.lowRiskEmployees': 'Low Risk Personnel',
    'iso37001.controlledEntities': 'Controlled Entities',
    'iso37001.controllingEntities': 'Controlling Entities',
    'iso37001.investigations': 'Investigations',
    'iso37001.publicRevenue': 'Public Revenue',
    'iso37001.additionalInfo': 'Additional Information',
    
    // Transfer section
    'transfer.validCertificate': 'Valid Certificate',
    'transfer.reasons': 'Transfer Reasons',
    'transfer.complaints': 'Complaints',
    'transfer.requirements': 'Requirements',
    'transfer.documents': 'Documents',
    
    // Integrated systems
    'integrated.title': 'Integrated Systems',
    'integrated.description': 'Please mark only those that are applicable to the implemented integrated management system:',
    
    // Scheme names
    'schemes.iso9001': 'QMS',
    'schemes.iso14001': 'EMS',
    'schemes.iso22000': 'FSMS',
    'schemes.iso27001': 'ISMS',
    'schemes.iso37001': 'ABMS',
    'schemes.iso37001_2025': 'ABMS',
    'schemes.iso39001': 'RTSMS',
    'schemes.iso45001': 'OHSMS',
    'schemes.other': 'Other',
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

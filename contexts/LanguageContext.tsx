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
    'form.title': 'Заявка за сертификация',
    'form.subtitle': 'Моля попълнете всички полета за да продължите',
    'form.submitButton': 'Изпрати заявката',
    'form.submitting': 'Изпраща се...',
    
    // Success modal
    'modal.success.title': '✔️ Благодарим!',
    'modal.success.message': 'Вашата заявка е успешно изпратена.',
    'modal.success.applicationNumber': 'Номер на заявката:',
    'modal.success.footer': 'Ще се свържем с Вас скоро!',
    'modal.success.closeButton': 'Затвори',
    
    // Error messages
    'modal.error.title': '⚠️ Възникна проблем',
    'modal.error.submission': 'Възникна проблем при изпращането на заявката.',
    'modal.error.network': 'Няма връзка със сървъра.',
    'modal.error.retry': 'Моля опитайте отново или се свържете с нас.',
    'modal.error.checkConnection': 'Моля, проверете интернет връзката си и опитайте отново.',
    
    // Validation messages
    'validation.selectApplicationType': 'Моля, изберете поне един вид на заявката!',
    'validation.auditLanguage': 'Моля, попълнете езика на одита!',
    
    // Company information
    'company.name': 'Име на организацията',
    'company.address': 'Адрес на организацията',
    'company.website': 'Уебсайт',
    
    // Standards
    'standards.title': 'Стандарти за сертификация',
    'standards.required': 'Необходимо е да отбележите поне един стандарт, за да можете да изпратите заявката.',
    'standards.iso9001': 'ISO 9001:2015',
    'standards.iso14001': 'ISO 14001:2015',
    'standards.iso45001': 'ISO 45001:2018',
    'standards.iso37001': 'ISO 37001:2016',
    'standards.iso37001_2025': 'ISO 37001:2025',
    
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
    'company.contactPersonName': 'Име и фамилия (лице за контакт)',
    'company.position': 'Длъжност',
    'company.email': 'Имейл',
    'company.phone': 'Телефон',
    'company.additionalInfo': 'Допълнителна информация',
    'company.filledBy': 'Попълнено от',
    
    
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
    
    
    // ISO 37001 section
    'iso37001.title': 'Антикорупционно управление: ISO 37001:2016',
    'iso37001.title2025': 'Антикорупционно управление: ISO 37001:2025',
    'iso37001.subtitle': 'Антикорупционно управление',
    
    // ISO 37001 additional fields
    'iso37001.processesOutOfScope': 'Процеси и/или дейности извън обхвата на сертификацията',
    'iso37001.countries': 'Държави, в които се извършват дейности',
    'iso37001.requirements': 'Приложими регулаторни изисквания, договорни и професионални ангажименти',
    'iso37001.sitesInfo': 'Информация за площадки и чувствителни процеси',
    'iso37001.sitesInfoDescription': 'Моля, попълнете отделна таблица за всеки адрес, който желаете да бъде включен в обхвата на сертификацията.',
    'iso37001.siteAddress': 'Адрес на обекта, където се извършва дейността',
    'iso37001.siteType': 'Вид на обекта',
    'iso37001.sensitiveProcesses': 'Чувствителни процеси',
    'iso37001.totalEmployees': 'Общ брой на персонала в процеси с висок риск от подкуп',
    'iso37001.totalEmployeesHelp': 'Общият брой от секцията „Чувствителни процеси" по-долу',
    'iso37001.publicRevenue': 'Процент на приходи от публични източници',
    'iso37001.lowRiskEmployees': 'Общ брой на персонала в процеси с нисък риск',
    'iso37001.controlledEntities': 'Юридически лица, върху които организацията има контрол (напр. чрез собственост, участие в управителните органи и др.)',
    'iso37001.controllingEntities': 'Юридически лица, които имат контрол върху организацията (напр. чрез собственост, участие в управителните органи и др.)',
    'iso37001.investigations': 'Лица на ръководни длъжности или на длъжности на материално изпълнение, били ли са в това си качество обект на разследване, включително повдигани ли са им обвинения, които попадат в определението за "подкупване" през последните пет години? Ако "да", молим да предоставите допълнителна информация.',
    'iso37001.otherInfo': 'Друга информация, която би имала отношение към сертификацията на СУБП?',
    
    // Transfer section
    'transfer.title': 'Трансфер на сертификат',
    'transfer.subtitle': 'Трансфер на сертификат',
    'transfer.description': 'Тази информация служи за преценка на възможността за трансфер на сертификацията и за изготвяне на оферта.',
    'transfer.validCertificate': 'Сертификатът, който се прехвърля, валиден ли е?',
    'transfer.reasons': 'Причини за трансфер',
    'transfer.complaints': 'Получавали ли сте оплаквания от клиенти?',
    'transfer.requirements': 'Регулаторни изисквания, изискващи валиден сертификат',
    'transfer.documents': 'Приложени документи',
    'transfer.documentsInstruction': 'Моля изпратете копия от следните документи на valentina.dobreva@incert.bg и се уверете, че сте ги приложили като отбележете:',
    
    // Integrated systems
    'integrated.title': 'Интегрирани системи',
    'integrated.subtitle': 'Интегрирани системи',
    'integrated.description': 'Моля отбележете само тези, които са приложими за внедрената интегрирана система за управление:',
    
    // Integrated systems statements
    'integrated.statement1': 'Разработена е обща документация на интегрираната система',
    'integrated.statement2': 'Общата бизнес стратегия и планове се преглеждат на ръководния преглед',
    'integrated.statement3': 'Използва се интегриран подход при вътрешни одити',
    'integrated.statement4': 'Политиката и целите са разработени интегрирано',
    'integrated.statement5': 'Интегриран подход при управление на процесите',
    'integrated.statement6': 'Интегриран подход при подобренията',
    'integrated.statement7': 'Отговорностите в системата са интегрирани',
    
    // Form completion
    'form.completedBy': 'Формулярът е попълнен от',
    'form.filledIn': 'Попълнил (име, фамилия, длъжност)',
    'form.reviewMessage': 'Ще разгледаме заявката Ви в рамките на работния ден. Ще се свържем с Вас по телефона, ако са необходими уточнения, след което ще получите индивидуална оферта на посочения от Вас имейл.',
    
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
    
    // Additional translations
    'unknown.scheme': 'Неизвестна схема',
    'language.bulgarian': 'Български',
    'language.english': 'Английски',
    'risk.low': 'Ниско',
    'risk.medium': 'Средно',
    'risk.high': 'Високо',
    'yes.no.yes': 'Да',
    'yes.no.no': 'Не',
    'business.non-critical': 'Организацията работи в бизнес сектори, които не са критични и няма голям обем нормативни изисквания',
    'business.serves-critical': 'Организацията обслужва клиенти от критични бизнес сектори',
    'business.critical': 'Организацията работи в критични бизнес сектори',
    'process.standard-repetitive': 'Процесите са стандартни с повтарящи се задачи, много служители с едни и същи задачи. Малко продукти и услуги',
    'process.standard-non-repetitive': 'Стандартни, но не повтарящи се процеси, с голям брой продукти или услуги',
    'process.complex': 'Сложни процеси, голям брой продукти и услуги, много бизнес звена',
    'maturity.mature': 'СУСИ е внедрена от повече от година и/или са внедрени други СУ',
    'maturity.partial': 'Някои елементи от други системи за управление са внедрени, но не всички',
    'maturity.new': 'Няма внедрени други СУ, СУСИ е внедрена преди по-малко от една година',
    'it.simple': 'Малко на брой или силно стандартизирани IT платформи, сървъри, операционни системи, бази данни, мрежи и др',
    'it.moderate': 'Няколко различни IT платформи, сървъри, операционни системи, бази данни, мрежи и др',
    'it.complex': 'Много на брой различни IT платформи, сървъри, операционни системи, бази данни, мрежи и др',
    'dependency.minimal': 'Незначителна или никаква зависимост от външни изпълнители/доставчици',
    'dependency.high': 'Организацията зависи в голяма степен от външни изпълнители или доставчици, които имат голямо въздействие върху важни бизнес процеси',
    'dependency.extensive': 'Има голям обем собствени разработки на софтуерни приложения',
    'certification.main': 'Основна',
    'certification.additional': 'Допълнителна',
    
    // Application types
    'application.new': 'Нова сертификация',
    'application.change': 'Промяна в сертификация',
    'application.renewal': 'Подновяване',
    'application.transfer': 'Трансфер',
    
    // Main form sections
    'form.applicationType': 'Тип заявление',
    'form.organizationInfo': 'Част 1. Информация за организацията',
    'form.certificationScope': 'Обхват на сертификацията',
    'form.siteAddress': 'Адрес на обекта',
    'form.processesActivities': 'Процеси, дейности, работно време, смени',
    'form.employees': 'Брой служители',
    'form.siteType': 'Тип на обекта',
    'form.temporary': 'Временно',
    'form.centralManagement': 'Централно управление',
    'form.outsourcedProcesses': 'Информация за външни процеси',
    'form.consultantInfo': 'Информация за консултантски услуги (ако има)',
    'form.regulatoryRequirements': 'Информация за приложими регулаторни и други изисквания',
    'form.developNewProducts': 'Разработвате ли нови продукти/услуги?',
    'form.manufactureProducts': 'Произвеждате ли продукти?',
    'form.otherCertifications': 'Информация за други валидни сертификати',
    'form.auditLanguage': 'Език на одита',
    'form.auditDeadline': 'Краен срок за одит',
    
    // Section titles
    'section.applicationType': 'Вид на заявката',
    'section.chooseType': 'Изберете вида на заявката',
    'section.organizationInfo': 'Информация за организацията',
    'section.certificationStandards': 'Стандарти за сертификация',
    'section.certificationScope': 'Обхват на сертификацията',
    'section.sites': 'Площадки',
    'section.multiSiteManagement': 'Управление на много площадки',
    'section.additionalInfo': 'Допълнителна информация',
    'section.otherStandards': 'Други стандарти',
    'section.otherStandardsDescription': 'Допълнителна информация за други стандарти',
    'section.otherStandardsLabel': 'Моля, опишете подробно другите стандарти, за които кандидатствате, включително техните версии и специфични изисквания.',
    'section.outsourcedProcesses': 'Външни процеси',
    'section.consultantServices': 'Консултантски услуги',
    'section.regulatoryRequirements': 'Нормативни изисквания',
    'section.newProducts': 'Нови продукти/услуги',
    'section.manufactureProducts': 'Производство на продукти',
    'section.otherCertifications': 'Други сертификации',
    'section.auditLanguage': 'Език на одита',
    'section.auditDeadline': 'Краен срок за одит',
    'section.filledBy': 'Попълнено от',
    
    // Scope of Certification
    'scope.title': 'Обхват на сертификацията',
    'scope.description': 'Кратко описание на дейности, продукти и/или процеси в обхвата на сертификацията',
    'scope.sites': 'Площадки',
    'scope.siteAddress': 'Адрес на площадка',
    'scope.siteType': 'Вид на площадката',
    'scope.main': 'Основна',
    'scope.temporary': 'Допълнителна',
    'scope.processes': 'Процеси, дейности, работно време, смени',
    'scope.employees': 'Брой служители',
    'scope.addSite': 'Добави площадка',
    
    // Multi-site Management
    'multiSite.title': 'Управление на множество площадки',
    'multiSite.description': 'Отбележете кои от следващите твърдения са приложими за Вашата система за управление',
    'multiSite.option1': 'Централното ръководство има пълен контрол върху всички площадки',
    'multiSite.option2': 'Всички площадки използват една и съща система за управление',
    'multiSite.option3': 'Всички площадки са сертифицирани по същия стандарт',
    'multiSite.option4': 'Всички площадки са под една и съща правна структура',
    
    // Additional Information
    'additional.title': 'Допълнителна информация',
    'additional.outsourced': 'Информация за процеси, възложени на външни изпълнители',
    'additional.consultant': 'Информация за използвани консултантски услуги, ако има',
    'additional.regulatory': 'Информация за приложими за обхвата нормативни и други изисквания',
    'additional.developProducts': 'Разработвате ли нови продукти/услуги?',
    'additional.manufactureProducts': 'Произвеждате ли продукти?',
    'additional.otherCertifications': 'Информация за други валидни сертификации на системи за управление',
    'additional.auditLanguage': 'Език на одита',
    'additional.auditLanguageExample': 'Например: Български, Английски и др.',
    'additional.auditDeadline': 'Краен срок за одита',
    
    // Placeholders
    'placeholder.changeInfo': 'напр. относно искана промяна или друга информация от значение',
    'placeholder.otherStandards': 'Например: ISO 50001:2018 - Енергийно управление, ISO 20000-1:2018 - IT услуги и др.',
    'placeholder.siteAddress': 'Адрес на площадката',
    'placeholder.selectType': 'Изберете вид',
    'placeholder.employees': 'Брой служители',
    'placeholder.consultant': 'име на консултант',
    'placeholder.auditLanguage': 'Например: Български, Английски, и др.',
    'placeholder.count': 'Брой',
    'placeholder.categoryCount': 'Брой в категорията и коментар',
    
    // ISO 45001 section
    'iso45001.title': 'Здраве и безопасност при работа: ISO 45001:2018',
    'iso45001.subtitle': 'Здраве и безопасност при работа',
    
    // ISO 45001 questions
    'iso45001.question1': 'Основни опасности и рискове, свързани с дейността',
    'iso45001.question2': 'Използвате ли опасни химични вещества и смеси?',
    'iso45001.question3': 'Използвате ли инсталации и/или оборудване с висок риск?',
    'iso45001.question4': 'Приложими регулаторни изисквания по ЗБУТ',
    'iso45001.question5': 'Персонал, работещ извън обекта или на временни обекти',
    'iso45001.question6': 'Имали ли сте трудови злополуки през последните две години?',
    'iso45001.question7': 'Има ли съдебни дела срещу вас за нарушения по трудовото законодателство?',
    
    // ISO 14001 section
    'iso14001.title': 'Околна среда: ISO 14001:2015',
    'iso14001.subtitle': 'Околна среда',
    
    // ISO 14001 questions
    'iso14001.question1': 'Значими екологични аспекти и свързани процеси',
    'iso14001.question2': 'В каква зона се извършва дейността?',
    'iso14001.question3': 'Приложими регулаторни изисквания, лицензи и разрешителни',
    'iso14001.question4': 'Имате ли „косвени" екологични аспекти (напр. проектантски услуги)?',
    'iso14001.question5': 'Рискове от значителни екологични щети',
    'iso14001.question6': 'Ниво на автоматизация',
    'iso14001.automation.low': 'Ниско',
    'iso14001.automation.medium': 'Средно',
    'iso14001.automation.high': 'Високо',
    
    // ISO 27001 section
    'iso27001.title': 'Информационна сигурност: ISO/IEC 27001:2022',
    'iso27001.subtitle': 'Информационна сигурност',
    'iso27001.description': 'За всяка от категориите моля отбележете само едно твърдение, което най-точно описва ситуацията във Вашата организация.',
    
    // ISO 27001 categories
    'iso27001.category1': 'Категория 1 — Дейност и регулаторни изисквания',
    'iso27001.category2': 'Категория 2 — Процеси и задачи',
    'iso27001.category3': 'Категория 3 — Система за управление на информационната сигурност',
    'iso27001.category4': 'Категория 4 — Сложност на IT инфраструктурата',
    'iso27001.category5': 'Категория 5 — Аутсорсинг към външни изпълнители и доставчици (вкл. облачни услуги)',
    'iso27001.category6': 'Категория 6 — Ниво на развитие на информационните системи',
    
    // ISO 27001 Category 1 options
    'iso27001.category1.option1': 'Организацията работи в бизнес сектори, които не са критични и няма голям обем нормативни изисквания.',
    'iso27001.category1.option2': 'Организацията обслужва клиенти от критични бизнес сектори.',
    'iso27001.category1.option3': 'Организацията работи в критични бизнес сектори.',
    
    // ISO 27001 Category 2 options
    'iso27001.category2.option1': 'Процесите са стандартни с повтарящи се задачи, много служители с едни и същи задачи. Малко продукти и услуги.',
    'iso27001.category2.option2': 'Стандартни, но не повтарящи се процеси, с голям брой продукти или услуги.',
    'iso27001.category2.option3': 'Сложни процеси, голям брой продукти и услуги, много бизнес звена.',
    
    // ISO 27001 Category 3 options
    'iso27001.category3.option1': 'СУИС е внедрена от повече от година и/или са внедрени други СУ.',
    'iso27001.category3.option2': 'Някои елементи от други системи за управление са внедрени, но не всички.',
    'iso27001.category3.option3': 'Няма внедрени други СУ, СУИС е внедрена преди по-малко от една година.',
    
    // ISO 27001 Category 4 options
    'iso27001.category4.option1': 'Малко на брой или силно стандартизирани IT платформи, сървъри, операционни системи, бази данни, мрежи и др.',
    'iso27001.category4.option2': 'Няколко различни IT платформи, сървъри, операционни системи, бази данни, мрежи и др.',
    'iso27001.category4.option3': 'Голям брой различни IT платформи, сървъри, операционни системи, бази данни, мрежи и др.',
    
    // ISO 27001 Category 5 options
    'iso27001.category5.option1': 'Незначителна или никаква зависимост от външни изпълнители/доставчици.',
    'iso27001.category5.option2': 'Организацията зависи от външни изпълнители/доставчици за някои бизнес процеси (но не за всички и не за важните).',
    'iso27001.category5.option3': 'Организацията зависи в голяма степен от външни изпълнители или доставчици, които имат голямо въздействие върху важни бизнес процеси.',
    
    // ISO 27001 Category 6 options
    'iso27001.category6.option1': 'Липсва или има в много малка степен собствена разработка на софтуерни приложения (информационни системи).',
    'iso27001.category6.option2': 'Има няколко собствени (или възложени на външни изпълнители) разработки на софтуерни приложения за някои важни бизнес процеси.',
    'iso27001.category6.option3': 'Има голям обем собствени разработки на софтуерни приложения.',
    
    // ISO 27001 Employee Categories
    'iso27001.employeeCategories.title': 'Категории служители',
    'iso27001.access.readonly': 'Служители с достъп единствено за четене на информация, необходима за изпълнение на техните задължения.',
    'iso27001.access.nophysical': 'Лица, които нямат достъп до съоръженията за обработка на информация, включена в обхвата на СУИС.',
    'iso27001.access.limited': 'Лица, които имат специфичен, демонстриран ограничен достъп до съоръженията.',
    'iso27001.access.full': 'Лица с наложени ограничения за предотвратяване на разкриването на информация (напр. забрана за внасяне на лични вещи в работната зона).',
    
    // ISO 22000 section
    'iso22000.title': 'Безопасност на храните: ISO 22000:2018',
    'iso22000.subtitle': 'Безопасност на храните',
    
    // ISO 22000 questions
    'iso22000.haccpPlans': 'Брой HACCP планове и наименования',
    'iso22000.description': 'Описание на продукти, процеси, производствени линии и персонал',
    'iso22000.automation': 'Ниво на автоматизация, механизация и ръчен труд',
    
    // ISO 39001 section
    'iso39001.title': 'Безопасност на пътното движение: ISO 39001:2012',
    'iso39001.subtitle': 'Безопасност на пътното движение',
    'iso39001.description': 'Отбележете едно или повече от следващите твърдения, които са приложими за Вашата система за управление на безопасността на движението:',
    
    // ISO 39001 statements
    'iso39001.statement1': 'Служители, които използват транспорт по време на работа',
    'iso39001.statement2': 'Организацията извършва транспорт на стоки и пътници',
    'iso39001.statement3': 'Дейности, които генерират трафик',
    'iso39001.statement4': 'Услуги и продукти за системата на пътната безопасност',
    
    // ISO 39001 additional fields
    'iso39001.requirements': 'Регулаторни изисквания и лицензи',
    'iso39001.nonApplicable': 'Определени като неприложими изисквания на ISO 39001',
    'iso39001.accidents': 'Пътнотранспортни произшествия през последните 12 месеца',
    
    // Transfer section (duplicate removed)
    
    // Transfer document options
    'transfer.doc1': 'Последният издаден валиден сертификат.',
    'transfer.doc2': 'Доклад от етап 2 на първоначален одит или последния одит за подновяване на сертификация (което е приложимо).',
    'transfer.doc3': 'Доклад от последния проведен надзорен одит (ако е приложимо).',
    'transfer.doc4': 'Доказателства, че всички несъответствия, описани в докладите, са били закрити или са одобрени планове за КД.',
    'transfer.doc5': 'Програма за одитите в сертификационния цикъл, предоставена от органа за сертификация, който е издал сертификата.',
    
  },
  en: {
    // Form title and basic info
    'form.title': 'Certification Application Form',
    'form.subtitle': 'Please fill in all fields to continue',
    'form.submitButton': 'Submit Application',
    'form.submitting': 'Submitting...',
    
    // Success modal
    'modal.success.title': '✔️ Thank you!',
    'modal.success.message': 'Your application has been successfully submitted.',
    'modal.success.applicationNumber': 'Application Number:',
    'modal.success.footer': 'We will contact you shortly!',
    'modal.success.closeButton': 'Close',
    
    // Error messages
    'modal.error.title': '⚠️ Problem occurred',
    'modal.error.submission': 'There was a problem submitting your application.',
    'modal.error.network': 'No connection to server.',
    'modal.error.retry': 'Please try again or contact us.',
    'modal.error.checkConnection': 'Please check your internet connection and try again.',
    
    // Validation messages
    'validation.selectApplicationType': 'Please select at least one application type!',
    'validation.auditLanguage': 'Please fill in the audit language!',
    
    // Company information
    'company.name': 'Organization Name',
    'company.address': 'Organization Address',
    'company.website': 'Website',
    
    // Standards
    'standards.title': 'Certification Standards',
    'standards.required': 'You must select at least one standard to submit the application.',
    'standards.iso9001': 'ISO 9001:2015',
    'standards.iso14001': 'ISO 14001:2015',
    'standards.iso45001': 'ISO 45001:2018',
    'standards.iso37001': 'ISO 37001:2016',
    'standards.iso37001_2025': 'ISO 37001:2025',
    
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
    'company.eik': 'Company Reg. No',
    'company.country': 'Country',
    'company.contactPerson': 'Contact Person',
    'company.contactPersonName': 'First and Last Name (Contact Person)',
    'company.position': 'Position',
    'company.email': 'Email',
    'company.phone': 'Phone',
    'company.additionalInfo': 'Additional Information',
    'company.filledBy': 'Filled By',
    
    
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
    
    
    // ISO 37001 section
    'iso37001.title': 'Anti-Bribery Management: ISO 37001:2016',
    'iso37001.title2025': 'Anti-Bribery Management: ISO 37001:2025',
    'iso37001.subtitle': 'Anti-Bribery Management',
    
    // ISO 37001 additional fields
    'iso37001.processesOutOfScope': 'Processes and/or activities outside the scope of certification',
    'iso37001.countries': 'Country(ies) where activities are carried out',
    'iso37001.requirements': 'Applicable regulatory requirements, contractual and professional commitments',
    'iso37001.sitesInfo': 'Information on Sites and Sensitive Processes',
    'iso37001.sitesInfoDescription': 'Please fill out a separate table for each address you wish to include in the certification scope.',
    'iso37001.siteAddress': 'Address of the site where the activity is carried out',
    'iso37001.siteType': 'Type of site',
    'iso37001.sensitiveProcesses': 'Sensitive process',
    'iso37001.totalEmployees': 'Total number of personnel in high-risk bribery processes',
    'iso37001.totalEmployeesHelp': 'Total number from the "Sensitive Process" section below',
    'iso37001.publicRevenue': 'Approximate percentage of revenue from public sources',
    'iso37001.lowRiskEmployees': 'Total number of personnel in low-risk processes',
    'iso37001.controlledEntities': 'Legal entities over which the organization has control (e.g., through ownership, participation in management bodies, etc.)',
    'iso37001.controllingEntities': 'Legal entities that have control over the organization (e.g., through ownership, participation in management bodies, etc.)',
    'iso37001.investigations': 'Have persons in management positions or in positions of material execution, in that capacity, been the subject of investigation, including charges brought against them that fall within the definition of "bribery" in the last five years? If "yes", please provide additional information.',
    'iso37001.otherInfo': 'Other information that would be relevant to ABMS certification?',
    
    // Transfer section
    'transfer.title': 'Transfer of Certification',
    'transfer.subtitle': 'Transfer of Certification',
    'transfer.description': 'This information serves to assess the possibility of certification transfer and to prepare an offer.',
    'transfer.validCertificate': 'Is the certificate subject to transfer valid?',
    'transfer.reasons': 'Reasons for the transfer',
    'transfer.complaints': 'Have you received complaints from clients or others?',
    'transfer.requirements': 'Regulatory requirements that oblige you to hold a valid certificate',
    'transfer.documents': 'Attached documents',
    'transfer.documentsInstruction': 'Please send copies of the following documents to valentina.dobreva@incert.bg and make sure you have attached them by checking:',
    
    // Integrated systems
    'integrated.title': 'Integrated Systems',
    'integrated.subtitle': 'Integrated Systems',
    'integrated.description': 'Please mark only those that are applicable to the implemented integrated management system:',
    
    // Integrated systems statements
    'integrated.statement1': 'A general documentation of the integrated management system has been developed',
    'integrated.statement2': 'The general business strategy and development plans are reviewed during management reviews',
    'integrated.statement3': 'An "integrated approach" is used during internal audits',
    'integrated.statement4': 'The policy and objectives are developed in an integrated manner',
    'integrated.statement5': 'An "integrated approach" is used in process management',
    'integrated.statement6': 'An "integrated approach" is applied when implementing improvement measures',
    'integrated.statement7': 'Responsibilities in the management system are defined "integrated"',
    
    // Form completion
    'form.completedBy': 'Form completed by',
    'form.filledIn': 'Filled in (first name, last name, position)',
    'form.reviewMessage': 'We will review your application within the working day. We will contact you by phone if any clarifications are needed, after which you will receive an individual offer at the email address you provided.',
    
    // Scope of Certification
    'scope.title': 'Scope of Certification',
    'scope.description': 'Brief description of activities, products, and/or processes within the scope of certification',
    'scope.sites': 'Sites',
    'scope.siteAddress': 'Site Address',
    'scope.siteType': 'Site Type',
    'scope.main': 'Permanent',
    'scope.temporary': 'Temporary',
    'scope.processes': 'Processes, Activities, Working Hours, Shifts',
    'scope.employees': 'Number of Employees',
    'scope.addSite': 'Add Site',
    
    // Multi-site Management
    'multiSite.title': 'Multi-site Management',
    'multiSite.description': 'If you have indicated more than one site, please mark which of the following statements apply to your management system',
    'multiSite.option1': 'The organization has a single, unified management system for all sites',
    'multiSite.option2': 'The organization has a centralized management that is part of it and has not been outsourced to an external provider',
    'multiSite.option3': 'The central management has the authority to develop, implement, and maintain the unified management system for all sites within the scope of certification',
    'multiSite.option4': 'A unified management review is conducted for the central management and all sites',
    'multiSite.option5': 'All sites are included in the organization\'s internal audit program',
    'multiSite.option6': 'The central management is responsible for collecting and analyzing data from all sites',
    'multiSite.option7': 'The central management has the authority and capability to impose the following changes in the processes of individual sites: • System and documentation modifications • Changes resulting from management reviews • Adjustments based on complaints • Corrections following corrective actions • Improvements based on internal audits and performance evaluations • Changes arising from regulatory requirements relevant to applicable standards',
    
    // Additional Information
    'additional.title': 'Additional Information',
    'additional.outsourced': 'Information on outsourced processes',
    'additional.consultant': 'Information on consultancy services used, if applicable',
    'additional.regulatory': 'Information on applicable regulatory and other requirements for the scope',
    'additional.developProducts': 'Do you develop new products/services?',
    'additional.manufactureProducts': 'Do you manufacture products?',
    'additional.otherCertifications': 'Information on other valid management system certifications',
    'additional.auditLanguage': 'Audit Language',
    'additional.auditLanguageExample': 'For example: Bulgarian, English, etc.',
    'additional.auditDeadline': 'Audit Deadline',
    
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
    
    // Additional translations
    'unknown.scheme': 'Unknown scheme',
    'language.bulgarian': 'Bulgarian',
    'language.english': 'English',
    'risk.low': 'Low',
    'risk.medium': 'Medium',
    'risk.high': 'High',
    'yes.no.yes': 'Yes',
    'yes.no.no': 'No',
    'business.non-critical': 'The organization operates in business sectors that are not critical and there are no large volumes of regulatory requirements',
    'business.serves-critical': 'The organization serves clients from critical business sectors',
    'business.critical': 'The organization operates in critical business sectors',
    'process.standard-repetitive': 'Processes are standard with repetitive tasks, many employees with the same tasks. Few products and services',
    'process.standard-non-repetitive': 'Standard but non-repetitive processes, with a large number of products or services',
    'process.complex': 'Complex processes, large number of products and services, many business units',
    'maturity.mature': 'ISMS has been implemented for more than a year and/or other management systems have been implemented',
    'maturity.partial': 'Some elements from other management systems are implemented, but not all',
    'maturity.new': 'No other management systems are implemented, ISMS has been implemented for less than a year',
    'it.simple': 'Few or highly standardized IT platforms, servers, operating systems, databases, networks, etc.',
    'it.moderate': 'Several different IT platforms, servers, operating systems, databases, networks, etc.',
    'it.complex': 'Many different IT platforms, servers, operating systems, databases, networks, etc.',
    'dependency.minimal': 'Minimal or no dependency on external contractors/suppliers',
    'dependency.high': 'The organization depends to a large extent on external contractors or suppliers who have a great impact on important business processes',
    'dependency.extensive': 'There is a large volume of in-house software application development',
    'certification.main': 'Main',
    'certification.additional': 'Additional',
    
    // Application types
    'application.new': 'New Certification',
    'application.change': 'Change in Certification',
    'application.renewal': 'Renewal',
    'application.transfer': 'Transfer',
    
    // Main form sections
    'form.applicationType': 'Application Type',
    'form.organizationInfo': 'Part 1. Organisation Information',
    'form.certificationScope': 'Scope of Certification (brief description of activities, products, and/or processes within the scope)',
    'form.siteAddress': 'Address of the Site Where Work is Performed',
    'form.processesActivities': 'Processes, Activities, Working Hours, Shifts',
    'form.employees': 'No of Employees',
    'form.siteType': 'Site Type',
    'form.temporary': 'Temporary',
    'form.centralManagement': 'Central management',
    'form.outsourcedProcesses': 'Information on outsourced processes',
    'form.consultantInfo': 'Information on Consultancy Services Used (if applicable)',
    'form.regulatoryRequirements': 'Information on Applicable Regulatory and Other Requirements for the Scope',
    'form.developNewProducts': 'Do you develop new products/services?',
    'form.manufactureProducts': 'Do you manufacture products?',
    'form.otherCertifications': 'Information on Other Valid Management System Certifications',
    'form.auditLanguage': 'Audit Language',
    'form.auditDeadline': 'Audit Deadline',
    
    // Section titles
    'section.applicationType': 'Application Type',
    'section.chooseType': 'Please select the type of application',
    'section.organizationInfo': 'Organisation Information',
    'section.certificationStandards': 'Certification Standards',
    'section.certificationScope': 'Scope of Certification',
    'section.sites': 'Sites',
    'section.multiSiteManagement': 'Multi-site Management',
    'section.additionalInfo': 'Additional Information',
    'section.otherStandards': 'Other Standards',
    'section.otherStandardsDescription': 'Additional Information about other standards',
    'section.otherStandardsLabel': 'Please describe in detail the other standards you are applying for, including their versions and specific requirements.',
    'section.outsourcedProcesses': 'Outsourced Processes',
    'section.consultantServices': 'Consultant Services',
    'section.regulatoryRequirements': 'Regulatory Requirements',
    'section.newProducts': 'New Products/Services',
    'section.manufactureProducts': 'Manufacture Products',
    'section.otherCertifications': 'Other Certifications',
    'section.auditLanguage': 'Audit Language',
    'section.auditDeadline': 'Audit Deadline',
    'section.filledBy': 'Filled by',
    
    // Placeholders
    'placeholder.changeInfo': 'e.g. regarding requested change or other relevant information',
    'placeholder.otherStandards': 'For example: ISO 50001:2018 - Energy Management, ISO 20000-1:2018 - IT Services, etc.',
    'placeholder.siteAddress': 'Site Address',
    'placeholder.selectType': 'Select Type',
    'placeholder.employees': 'Number of Employees',
    'placeholder.consultant': 'consultant name',
    'placeholder.auditLanguage': 'For example: Bulgarian, English, etc.',
    'placeholder.count': 'Count',
    'placeholder.categoryCount': 'Count in category and comment',
    
    // ISO 45001 section
    'iso45001.title': 'Occupational Health and Safety: ISO 45001:2018',
    'iso45001.subtitle': 'Occupational Health and Safety',
    
    // ISO 45001 questions
    'iso45001.question1': 'Key occupational health and safety hazards and risks related to the activity',
    'iso45001.question2': 'Do you use hazardous chemical substances and mixtures in your activities?',
    'iso45001.question3': 'Do you use installations and/or high-risk equipment (HPE) as defined by national legislation?',
    'iso45001.question4': 'Applicable regulatory requirements related to occupational health and safety (OHS)',
    'iso45001.question5': 'Personnel working off-site (e.g., drivers, installers, etc.) or at temporary sites',
    'iso45001.question6': 'Have any occupational accidents been recorded in the past two years?',
    'iso45001.question7': 'Are there any legal proceedings against you for violations of labor legislation and/or OHS?',
    
    // ISO 14001 section
    'iso14001.title': 'Environmental Management: ISO 14001:2015',
    'iso14001.subtitle': 'Environmental Management',
    
    // ISO 14001 questions
    'iso14001.question1': 'Significant environmental aspects and related processes',
    'iso14001.question2': 'Is the activity carried out in a residential area, industrial zone, rural area, or protected territory?',
    'iso14001.question3': 'Applicable regulatory requirements, licenses, and permits for environmental management',
    'iso14001.question4': 'Are there any "indirect" environmental aspects (e.g., design services)?',
    'iso14001.question5': 'Are there risks of significant environmental damage resulting from the storage or use of materials?',
    'iso14001.question6': 'Level of process automation',
    'iso14001.automation.low': 'Low',
    'iso14001.automation.medium': 'Medium',
    'iso14001.automation.high': 'High',
    
    // ISO 27001 section
    'iso27001.title': 'Information Security: ISO/IEC 27001:2022',
    'iso27001.subtitle': 'Information Security',
    'iso27001.description': 'For each category, please mark only one statement that best describes the situation in your organization.',
    
    // ISO 27001 categories
    'iso27001.category1': 'Category 1 — Organization\'s Activity and Regulatory Requirements',
    'iso27001.category2': 'Category 2 — Processes and Tasks',
    'iso27001.category3': 'Category 3 — Information Security Management System (ISMS)',
    'iso27001.category4': 'Category 4 — Complexity of IT Infrastructure',
    'iso27001.category5': 'Category 5 — Outsourcing to External Contractors, Suppliers (including Cloud Services)',
    'iso27001.category6': 'Category 6 — Level of Development of Information Systems',
    
    // ISO 27001 Category 1 options
    'iso27001.category1.option1': 'The organization operates in business sectors that are not critical and have minimal regulatory requirements.',
    'iso27001.category1.option2': 'The organization serves clients from critical business sectors.',
    'iso27001.category1.option3': 'The organization operates in critical business sectors.',
    
    // ISO 27001 Category 2 options
    'iso27001.category2.option1': 'The processes are standard with repetitive tasks, many employees performing the same tasks, and few products and services.',
    'iso27001.category2.option2': 'Standard processes, but not repetitive, with many products or services.',
    'iso27001.category2.option3': 'Complex processes, many products and services, and many business units.',
    
    // ISO 27001 Category 3 options
    'iso27001.category3.option1': 'The ISMS has been implemented for more than a year and/or other management systems have been implemented.',
    'iso27001.category3.option2': 'Some elements of other management systems have been implemented, but not all.',
    'iso27001.category3.option3': 'No other management systems are implemented, and the ISMS was implemented less than a year ago.',
    
    // ISO 27001 Category 4 options
    'iso27001.category4.option1': 'A few or highly standardized IT platforms, servers, operating systems, databases, networks, etc.',
    'iso27001.category4.option2': 'Several different IT platforms, servers, operating systems, databases, networks, etc.',
    'iso27001.category4.option3': 'Many different IT platforms, servers, operating systems, databases, networks, etc.',
    
    // ISO 27001 Category 5 options
    'iso27001.category5.option1': 'Minimal or no dependency on external contractors/suppliers.',
    'iso27001.category5.option2': 'The organization depends on external contractors/suppliers for some business processes (not for all and not for critical ones).',
    'iso27001.category5.option3': 'The organization is highly dependent on external contractors/suppliers who have a significant impact on critical business processes.',
    
    // ISO 27001 Category 6 options
    'iso27001.category6.option1': 'There are no or very few in-house developed software applications (information systems).',
    'iso27001.category6.option2': 'There are several in-house (or outsourced) software applications developed for some important business processes.',
    'iso27001.category6.option3': 'There is a large volume of in-house developed software applications.',
    
    // ISO 27001 Employee Categories
    'iso27001.employeeCategories.title': 'Employee Categories',
    'iso27001.access.readonly': 'Read-only access: Employees with access only to information necessary for the performance of their duties.',
    'iso27001.access.nophysical': 'No physical access: Individuals who do not have access to the facilities for processing information included in the scope of the ISMS.',
    'iso27001.access.limited': 'Limited access: Individuals who have specific, demonstrated limited access to the facilities.',
    'iso27001.access.full': 'Full access with strict restrictions: Individuals with imposed limitations to prevent the disclosure of information (e.g., prohibition on bringing personal items into the work area).',
    
    // ISO 22000 section
    'iso22000.title': 'Food Safety: ISO 22000:2018',
    'iso22000.subtitle': 'Food Safety',
    
    // ISO 22000 questions
    'iso22000.haccpPlans': 'Number of HACCP plans with their respective names',
    'iso22000.description': 'Description of products and processes, product lines, personnel, etc.',
    'iso22000.automation': 'Information on the level of automation, use of closed production systems, mechanization, and manual labor',
    
    // ISO 39001 section
    'iso39001.title': 'Road Traffic Safety: ISO 39001:2012',
    'iso39001.subtitle': 'Road Traffic Safety',
    'iso39001.description': 'Please mark one or more of the following statements that are applicable to your road traffic safety management system:',
    
    // ISO 39001 statements
    'iso39001.statement1': 'Employees use road transport to and from work or during work',
    'iso39001.statement2': 'The organization conducts transportation of goods and passengers',
    'iso39001.statement3': 'The organization conducts activities that generate traffic',
    'iso39001.statement4': 'The organization provides services and products for the road traffic system',
    
    // ISO 39001 additional fields
    'iso39001.requirements': 'Regulatory requirements and licenses/permits',
    'iso39001.nonApplicable': 'Requirements of ISO 39001 determined as not applicable',
    'iso39001.accidents': 'Road traffic accidents in the last 12 months',
    
    // Transfer section (duplicate removed)
    
    // Transfer document options
    'transfer.doc1': 'The last issued valid certificate.',
    'transfer.doc2': 'Report from stage 2 of initial audit or last audit for certification renewal (as applicable).',
    'transfer.doc3': 'Report from the last conducted surveillance audit (if applicable).',
    'transfer.doc4': 'Evidence that all non-conformities described in the reports have been closed or approved corrective action plans.',
    'transfer.doc5': 'Audit program in the certification cycle, provided by the certification body that issued the certificate.',
    
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

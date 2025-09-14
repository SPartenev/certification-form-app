# Certification Form App

Next.js приложение за сертификационна форма с поддръжка за различни ISO стандарти.

## 🚀 Функционалности

- **Множество ISO стандарти**: 9001, 14001, 22000, 27001, 37001, 39001, 45001
- **Нови стандарти**: ISO 37001:2025 и "Други" опции
- **Responsive дизайн** с Tailwind CSS
- **Валидация на форми** с React Hook Form
- **API endpoint** за изпращане на данни
- **Интеграция с n8n** за автоматизация

## 🛠 Технологии

- **Next.js 15.2.4** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - UI компоненти
- **React Hook Form** - Form management
- **Zod** - Schema validation

## 📦 Инсталация

```bash
# Клонирай репозитория
git clone <your-repo-url>
cd certification-form-app

# Инсталирай зависимости
npm install

# Стартирай development сървър
npm run dev
```

## 🌐 Деплой

### Vercel (Препоръчително)
1. Свържи GitHub репозитория с Vercel
2. Настрой environment variables
3. Деплой автоматично при push

### Environment Variables
```env
N8N_WEBHOOK_URL=https://n8n_test.i-love-ai.fun
```

## 🔗 Интеграция с n8n

Приложението изпраща данни към n8n webhook endpoint:
- **URL**: `https://n8n_test.i-love-ai.fun`
- **Method**: POST
- **Content-Type**: application/json

## 📝 API Endpoints

- `POST /api/submit` - Изпращане на формата

## 🎯 Стандарти за сертификация

- ISO 9001:2015 (Качество)
- ISO 14001:2015 (Околна среда)
- ISO 22000:2018 (Хранителна безопасност)
- ISO 27001:2022 (Информационна сигурност)
- ISO 37001:2016 (Борба с подкупването)
- ISO 37001:2025 (Борба с подкупването - нова версия)
- ISO 39001:2012 (Пътна безопасност)
- ISO 45001:2018 (Охрана на труда)
- Други стандарти

## 📄 Лиценз

MIT License

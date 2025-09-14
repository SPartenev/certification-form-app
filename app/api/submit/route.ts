import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Генериране на уникален ID за заявката
    const applicationId = `CERT-${Date.now()}`
    
    // Подготовка на данните за n8n
    const n8nPayload = {
      ...formData,
      metadata: {
        submittedAt: new Date().toISOString(),
        submittedBy: formData.filledBy || 'Unknown',
        organizationName: formData.organizationName,
        eik: formData.eik,
        formVersion: '1.0',
        applicationId: applicationId
      }
    }
    
    console.log('Получени данни:', n8nPayload)
    
    // Изпращане към n8n webhook (ако е настроен)
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL
    if (n8nWebhookUrl) {
      try {
        const n8nResponse = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(n8nPayload),
        })
        
        if (!n8nResponse.ok) {
          console.warn('n8n webhook failed:', n8nResponse.status, n8nResponse.statusText)
        } else {
          console.log('Данните са изпратени успешно към n8n')
        }
      } catch (n8nError) {
        console.warn('Грешка при изпращане към n8n:', n8nError)
        // Продължаваме въпреки грешката с n8n
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Формата е изпратена успешно!',
      id: applicationId
    })
    
  } catch (error) {
    console.error('Грешка при обработка:', error)
    return NextResponse.json(
      { success: false, message: 'Грешка при обработка на формата' },
      { status: 500 }
    )
  }
}

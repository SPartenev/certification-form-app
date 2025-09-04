import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Тук можете да добавите логика за запазване в база данни
    // Засега просто връщаме успех
    console.log('Получени данни:', formData)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Формата е изпратена успешно!',
      id: formData.id || `CERT-${Date.now()}`
    })
    
  } catch (error) {
    console.error('Грешка при обработка:', error)
    return NextResponse.json(
      { success: false, message: 'Грешка при обработка на формата' },
      { status: 500 }
    )
  }
}

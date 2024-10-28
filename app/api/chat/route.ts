import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

function cleanText(text) {
  return text.replace(/[*#_/\\|><`~]/g, '').trim()
}

export async function POST(req: NextRequest) {
  const { messages, pageContent } = await req.json()

  const currentMessageContent = messages[messages.length - 1].content

  const prompt = `
  Lo adalah AI assistant yang tugasnya bantu user yang lagi lihat konten halaman ini. Berikut isi kontennya:

  ${pageContent}

  Kalau user nanya sesuatu, jawabannya harus jelas dan sesuai konten di atas. Kalau pertanyaannya nggak nyambung, lo tetap bantu sebisa mungkin, tapi tetap prioritaskan informasi dari konten halaman ini.
  Hindari juga simbol simbol engga jelas untuk mempertegas kalimat seperti ** // atau sejenisnya.

  Pertanyaan user: ${currentMessageContent}
  `

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = await response.text()

  const cleanedText = cleanText(text)

  return NextResponse.json({ response: cleanedText })
}

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    fetch(window.location.href, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        console.log('Refreshed content:', data)
      })
      .catch(error => console.error('Failed to refresh content:', error))
  })
}

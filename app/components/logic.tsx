'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Minimize2, Maximize2 } from 'lucide-react'

export default function AIChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [pageContent, setPageContent] = useState('')
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isOpen])

  useEffect(() => {
    const getMDXContent = () => {
      const mdxElement = document.querySelector('[data-mdx-content]')
      if (mdxElement) {
        return mdxElement.textContent || ''
      }
      return document.body.innerText
    }

    const content = getMDXContent()
    setPageContent(content)

    handleAutoAnalysis(content)
  }, []) // 移除与 router 相关的依赖项

  const handleAutoAnalysis = async (content: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Tolong analisis konten halaman ini dan berikan ringkasan singkat.' }],
          pageContent: content,
        }),
      })

      if (!response.ok) throw new Error('Gagal ngambil response')

      const data = await response.json()
      setMessages([
        { role: 'assistant', content: "Hey! Gue Yoel tapi versi AI. Gue udah baca halaman ini, nih ringkasannya:" },
        { role: 'assistant', content: data.response }
      ])
    } catch (error) {
      console.error('Error:', error)
      setMessages([{ role: 'assistant', content: "Maaf, gue gagal baca halaman ini. Ada yang bisa gue bantu?" }])
    } finally {
      setIsLoading(false)
    }
  }

  const toggleChat = () => setIsOpen(!isOpen)
  const toggleMinimize = () => setIsMinimized(!isMinimized)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage], pageContent }),
      })

      if (!response.ok) throw new Error('Gagal ngambil response')

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: "Maaf ya, ada error. Coba lagi nanti." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-4 right-4 z-50"
    >
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-gray-800 text-white rounded-full p-4 shadow-lg hover:bg-gray-900 transition-all duration-300"
        >
          <MessageSquare size={24} />
        </button>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`bg-gray-900 text-white rounded-lg shadow-2xl ${
              isMinimized ? 'w-64' : 'w-80 sm:w-96'
            } overflow-hidden border border-gray-700`}
          >
            <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">Yoel</h3>
              <div className="flex space-x-2">
                <button onClick={toggleMinimize} className="hover:bg-gray-700 rounded p-1 transition-colors duration-200">
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button onClick={toggleChat} className="hover:bg-gray-700 rounded p-1 transition-colors duration-200">
                  <X size={18} />
                </button>
              </div>
            </div>
            {!isMinimized && (
              <>
                <div
                  ref={chatContainerRef}
                  className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-800"
                >
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`${
                        message.role === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <span
                        className={`inline-block p-2 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-gray-700 text-white'
                            : 'bg-gray-600 text-gray-200'
                        }`}
                      >
                        {message.content}
                      </span>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="text-left">
                      <span className="inline-block p-2 rounded-lg bg-gray-600 text-gray-200">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                        >
                          Lagi Mikir...
                        </motion.span>
                      </span>
                    </div>
                  )}
                </div>
                <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Nanya aja, gue siap bantu..."
                      className="flex-1 px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-700 text-white"
                    />
                    <button
                      type="submit"
                      className="bg-gray-700 text-white rounded-lg px-4 py-2 hover:bg-gray-600 transition-all duration-300"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

import { useEffect, useRef, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const starterQuestions = [
  'What properties are available?',
  'How can I schedule a site visit?',
  'What documents do I need to book?',
]

const localReplies = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'goodmorning', 'goodmornig'],
    reply: 'Good morning! Welcome to Estate Desk. I can help you explore properties, understand pricing, arrange a site visit, or learn about the booking process.',
  },
  {
    keywords: ['available', 'property', 'properties', 'listing', 'home'],
    reply: 'We currently offer apartments, villas, and plotted developments. Browse the Projects section for available homes, prices, amenities, and locations, then contact us for the latest inventory.',
  },
  {
    keywords: ['visit', 'tour', 'site'],
    reply: 'You can schedule a site visit through the Contact section. Share your preferred date, project, and phone number, and our property advisor will confirm the appointment.',
  },
  {
    keywords: ['price', 'pricing', 'cost', 'budget', 'emi', 'finance', 'loan'],
    reply: 'Property prices and payment plans vary by project and unit. Our team can explain the current price, booking amount, EMI options, and available bank financing for your preferred property.',
  },
  {
    keywords: ['safety', 'security', 'cctv', 'guard', 'gated', 'fire', 'emergency'],
    reply: 'Our projects are planned with customer safety in mind, including controlled access, security personnel, CCTV monitoring, well-lit common areas, and fire-safety provisions. Please contact our advisor for the exact safety facilities at a specific project.',
  },
  {
    keywords: ['document', 'documents', 'book', 'booking', 'reserve'],
    reply: 'For booking, keep a government ID, PAN card, address proof, recent photographs, and the booking amount ready. Requirements can vary, so our advisor will confirm the exact list.',
  },
]

function getLocalReply(question) {
  const normalizedQuestion = question.toLowerCase()
  const matchingReply = localReplies.find(({ keywords }) =>
    keywords.some((keyword) => normalizedQuestion.includes(keyword)),
  )

  return matchingReply?.reply || 'I can help with available properties, pricing and financing, site visits, booking documents, and contacting an advisor. What would you like to know?'
}

function waitForNaturalReply() {
  const delay = 700 + Math.random() * 500
  return new Promise((resolve) => setTimeout(resolve, delay))
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I can help with properties, pricing, site visits, booking, and financing.',
    },
  ])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  async function askQuestion(question) {
    const trimmedQuestion = question.trim()
    if (!trimmedQuestion || isLoading) return

    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', content: trimmedQuestion },
    ])
    setMessage('')
    setIsLoading(true)

    try {
      await waitForNaturalReply()
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        body: JSON.stringify({ message: trimmedQuestion }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to reach the assistant.')
      }

      const reply = data.reply?.startsWith('I can help with available properties')
        ? getLocalReply(trimmedQuestion)
        : data.reply

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: 'assistant', content: reply },
      ])
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: 'assistant',
          content: error.message === 'API route not found.'
            ? getLocalReply(trimmedQuestion)
            : error.message || 'Please try again or contact our team directly.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    askQuestion(message)
  }

  return (
    <div className="chatbot">
      {isOpen && (
        <section className="chatbot-panel" aria-label="Estate assistant">
          <header className="chatbot-header">
            <div>
              <span className="chatbot-status">Online assistant</span>
              <h2>Ask Estate Desk</h2>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
              X
            </button>
          </header>

          <div className="chatbot-messages" aria-live="polite">
            {messages.map((chatMessage, index) => (
              <div className={`chat-message ${chatMessage.role}`} key={`${chatMessage.role}-${index}`}>
                {chatMessage.content}
              </div>
            ))}
            {isLoading && <div className="chat-message assistant chat-loading">Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="chatbot-starters">
              {starterQuestions.map((question) => (
                <button key={question} onClick={() => askQuestion(question)}>{question}</button>
              ))}
            </div>
          )}

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              aria-label="Ask a question"
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask about your next home..."
              value={message}
            />
            <button aria-label="Send message" disabled={isLoading || !message.trim()} type="submit">Send</button>
          </form>
        </section>
      )}

      <button className={`chatbot-launcher ${isOpen ? 'is-open' : ''}`} onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close assistant' : 'Open assistant'}>
        <span aria-hidden="true">{isOpen ? 'X' : '?'}</span>
        {!isOpen && <span>Chat with us</span>}
      </button>
    </div>
  )
}

export default Chatbot

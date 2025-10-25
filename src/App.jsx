import { useEffect, useMemo, useState } from 'react'
import HeaderBar from './components/HeaderBar'
import ContactsList from './components/ContactsList'
import ChatWindow from './components/ChatWindow'
import MessageInput from './components/MessageInput'

const seedContacts = [
  {
    id: 'concierge',
    name: 'Private Concierge',
    title: '24/7 Discreet Service',
    badge: 'Elite',
    color: 'from-yellow-500 via-amber-400 to-yellow-300',
    online: true,
    lastMessage: 'We have your jet fueled and ready. Wheels up at 16:45.',
    unread: 1,
  },
  {
    id: 'family-office',
    name: 'Family Office',
    title: 'CIO • Strategic Ops',
    badge: 'Priority',
    color: 'from-fuchsia-500 via-pink-500 to-rose-400',
    online: true,
    lastMessage: 'Q4 allocations ready for sign-off.',
    unread: 0,
  },
  {
    id: 'yacht',
    name: 'Aquila VIII Crew',
    title: 'Captain Laurent',
    badge: 'Vessel',
    color: 'from-cyan-500 via-sky-500 to-blue-400',
    online: false,
    lastMessage: 'Mediterranean itinerary updated with Monaco stopover.',
    unread: 0,
  },
]

const initialMessages = {
  concierge: [
    { id: 'm1', from: 'them', text: 'Welcome back. How may I serve you today?', time: new Date(Date.now() - 1000 * 60 * 5) },
    { id: 'm2', from: 'them', text: 'We have your jet fueled and ready. Wheels up at 16:45.', time: new Date(Date.now() - 1000 * 60 * 3) },
  ],
  'family-office': [
    { id: 'm3', from: 'them', text: 'Q4 allocations ready for sign-off.', time: new Date(Date.now() - 1000 * 60 * 30) },
  ],
  yacht: [
    { id: 'm4', from: 'them', text: 'Mediterranean itinerary updated with Monaco stopover.', time: new Date(Date.now() - 1000 * 60 * 120) },
  ],
}

export default function App() {
  const [contacts, setContacts] = useState(seedContacts)
  const [activeId, setActiveId] = useState('concierge')
  const [messages, setMessages] = useState(initialMessages)
  const active = useMemo(() => contacts.find(c => c.id === activeId) || contacts[0], [contacts, activeId])

  useEffect(() => {
    setContacts(prev => prev.map(c => (c.id === activeId ? { ...c, unread: 0 } : c)))
  }, [activeId])

  const sendMessage = (text) => {
    if (!text.trim()) return
    const msg = { id: crypto.randomUUID(), from: 'me', text, time: new Date() }
    setMessages(prev => ({ ...prev, [active.id]: [...(prev[active.id] || []), msg] }))

    if (active.id === 'concierge') {
      const typingDelay = 800 + Math.random() * 900
      const replyDelay = 1200 + Math.random() * 1500

      const typingId = crypto.randomUUID()
      const typingMsg = { id: typingId, from: 'them', text: 'typing…', typing: true, time: new Date() }
      setMessages(prev => ({ ...prev, [active.id]: [...(prev[active.id] || []), typingMsg] }))

      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [active.id]: (prev[active.id] || []).filter(m => m.id !== typingId),
        }))
      }, typingDelay)

      setTimeout(() => {
        const replyText = smartConciergeReply(text)
        const reply = { id: crypto.randomUUID(), from: 'them', text: replyText, time: new Date() }
        setMessages(prev => ({ ...prev, [active.id]: [...(prev[active.id] || []), reply] }))
      }, replyDelay)
    } else {
      const reply = { id: crypto.randomUUID(), from: 'them', text: 'Received. We’ll action this and revert shortly.', time: new Date() }
      setTimeout(() => {
        setMessages(prev => ({ ...prev, [active.id]: [...(prev[active.id] || []), reply] }))
      }, 900)
    }

    setContacts(prev => {
      const updated = prev.map(c => (c.id === active.id ? { ...c, lastMessage: text } : c))
      const activeContact = updated.find(c => c.id === active.id)
      const others = updated.filter(c => c.id !== active.id)
      return [activeContact, ...others]
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900 text-white">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(1200px_600px_at_120%_-10%,rgba(234,179,8,0.08),transparent_60%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(800px_400px_at_-10%_120%,rgba(244,114,182,0.07),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <HeaderBar />
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <ContactsList
              contacts={contacts}
              activeId={activeId}
              onSelect={setActiveId}
            />
          </div>
          <div className="md:col-span-8 lg:col-span-9">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
              <ChatWindow contact={active} messages={messages[active.id] || []} />
              <div className="border-t border-white/10">
                <MessageInput onSend={sendMessage} placeholder={`Message ${active.name}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function smartConciergeReply(input) {
  const lower = input.toLowerCase()
  if (/(flight|jet|wheels|airport|takeoff)/.test(lower)) {
    return 'Confirmed. Your Gulfstream G700 is filed for departure. Chauffeur will meet you airside. Shall I notify the destination villa?'
  }
  if (/(dinner|restaurant|table|book|reserve)/.test(lower)) {
    return 'Securing a private table. Chef has your preferences. Would you like a Burgundy vertical or Krug Clos du Mesnil pairing?'
  }
  if (/(yacht|boat|marina|port)/.test(lower)) {
    return 'Aquila VIII crew is on standby. I can arrange berthing at Port Hercules and a tender for shore transfers.'
  }
  if (/(security|privacy|nda|paparazzi)/.test(lower)) {
    return 'Private security detail engaged. NDA circulation in progress. I will reroute arrivals through the service entrance.'
  }
  if (/(art|auction|sotheby|christie|gallery)/.test(lower)) {
    return 'Coordinating with your art advisor. Previews arranged and bidding paddles registered under your family office.'
  }
  return 'Consider it done. I’ll handle it discreetly and update you with options in a moment.'
}

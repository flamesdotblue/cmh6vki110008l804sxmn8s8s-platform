import { useEffect, useRef } from 'react'

export default function ChatWindow({ contact, messages }) {
  const endRef = useRef(null)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, contact?.id])

  return (
    <div className="h-[60vh] sm:h-[68vh] flex flex-col">
      <div className="px-4 sm:px-6 py-4 border-b border-white/10 flex items-center gap-3">
        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${contact.color} border border-white/20 text-black/80 font-bold flex items-center justify-center`}>{contact.name.split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
        <div className="leading-tight">
          <div className="font-semibold">{contact.name}</div>
          <div className="text-xs text-white/60">{contact.title || 'Private Contact'} • {contact.online ? 'Online' : 'Last seen recently'}</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3">
        {messages.map(m => (
          <MessageBubble key={m.id} from={m.from} typing={m.typing}>
            {m.text}
          </MessageBubble>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  )
}

function MessageBubble({ from, typing, children }) {
  const isMe = from === 'me'
  return (
    <div className={`max-w-[85%] md:max-w-[70%] ${isMe ? 'ml-auto' : ''}`}>
      <div className={`px-4 py-2 rounded-2xl border backdrop-blur ${
        isMe
          ? 'bg-amber-400 text-black border-amber-300 shadow-lg shadow-amber-500/20'
          : 'bg-white/[0.08] text-white border-white/10 shadow-lg shadow-black/30'
      } ${typing ? 'animate-pulse' : ''}`}>
        {typing ? (
          <span className="text-white/80">typing…</span>
        ) : (
          <span className="whitespace-pre-wrap break-words leading-relaxed">{children}</span>
        )}
      </div>
    </div>
  )
}

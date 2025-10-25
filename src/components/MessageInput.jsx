import { useState } from 'react'
import { Send } from 'lucide-react'

export default function MessageInput({ onSend, placeholder }) {
  const [value, setValue] = useState('')

  const handleSend = () => {
    if (!value.trim()) return
    onSend(value)
    setValue('')
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="p-3 sm:p-4">
      <div className="flex items-end gap-2">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          rows={1}
          placeholder={placeholder}
          className="flex-1 resize-none rounded-2xl bg-white/[0.06] border border-white/10 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-300/40 max-h-40"
        />
        <button
          onClick={handleSend}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-black font-semibold border border-amber-200 shadow-lg shadow-amber-500/30 hover:brightness-105 active:scale-[0.98] transition"
        >
          <Send className="h-4 w-4" />
          Send
        </button>
      </div>
      <div className="px-1 pt-2 text-[11px] text-white/50">Enter to send • Shift+Enter for new line</div>
    </div>
  )
}

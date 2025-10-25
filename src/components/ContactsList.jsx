import { Star } from 'lucide-react'

export default function ContactsList({ contacts, activeId, onSelect }) {
  return (
    <aside className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-3 sm:p-4 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="text-sm font-semibold tracking-tight text-white/80">Conversations</div>
        <div className="text-[10px] uppercase tracking-widest text-white/50 flex items-center gap-1">
          <Star className="h-3 w-3 text-amber-300" /> Curated
        </div>
      </div>
      <div className="space-y-2">
        {contacts.map(c => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`group w-full text-left p-3 rounded-2xl border transition-all ${
              c.id === activeId
                ? 'bg-white/[0.10] border-amber-300/30 shadow-xl shadow-amber-500/10'
                : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08]'
            }`}
          >
            <div className="flex items-center gap-3">
              <AvatarBadge name={c.name} color={c.color} online={c.online} badge={c.badge} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{c.name}</p>
                  {c.unread > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400 text-black font-semibold">
                      {c.unread}
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/60 truncate">{c.title || c.lastMessage}</p>
                <p className="mt-0.5 text-xs text-white/50 truncate">{c.lastMessage}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}

function AvatarBadge({ name, color, online, badge }) {
  const initials = name
    .split(' ')
    .map(s => s[0])
    .slice(0, 2)
    .join('')
  return (
    <div className="relative">
      <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center border border-white/20 text-black/80 font-bold`}>
        {initials}
      </div>
      {online && (
        <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 ring-2 ring-black" />
      )}
      {badge && (
        <span className="absolute -top-1 -left-1 text-[10px] px-1.5 py-0.5 rounded-full bg-white/90 text-black font-semibold border border-black/10">
          {badge}
        </span>
      )}
    </div>
  )
}

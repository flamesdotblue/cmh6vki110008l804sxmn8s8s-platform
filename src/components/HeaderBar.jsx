import { Crown, Shield, Settings, Search } from 'lucide-react'

export default function HeaderBar() {
  return (
    <header className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 sm:px-6 py-4 flex items-center justify-between shadow-2xl shadow-black/40">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-yellow-500 via-amber-400 to-yellow-200 flex items-center justify-center ring-2 ring-white/20">
            <Crown className="h-5 w-5 text-black/90" />
          </div>
        </div>
        <div className="leading-tight">
          <div className="text-lg sm:text-xl font-semibold tracking-tight">AUREUM</div>
          <div className="text-xs text-white/60">Ultra-Private Messaging</div>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-3 flex-1 max-w-lg mx-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
          <input
            placeholder="Search luxury network"
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.06] border border-white/10 placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-300/40"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden sm:flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-white/[0.06] border border-white/10">
          <Shield className="h-3.5 w-3.5 text-emerald-400" />
          E2EE Active
        </span>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.08] border border-white/10 hover:bg-white/[0.12] transition-colors">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline text-sm">Settings</span>
        </button>
      </div>
    </header>
  )
}

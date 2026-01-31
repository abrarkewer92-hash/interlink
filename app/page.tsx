import { AirdropChecker } from "@/components/airdrop-checker"
import { FeatureSections } from "@/components/feature-sections"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white relative overflow-hidden">
      {/* Background image */}
      <div className="fixed inset-0 z-0">
        <img src="/images/dark-space-bg.png" alt="" className="w-full h-full object-cover" />
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/50 via-transparent to-[#0a0e1a]/80"></div>
        {/* Stars effect */}
        <div className="stars-bg absolute inset-0 opacity-20"></div>
      </div>

      <div className="relative z-10">
        <Header />
        <AirdropChecker />
        <FeatureSections />
      </div>
    </div>
  )
}

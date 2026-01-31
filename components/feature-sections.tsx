import type React from "react"

export function FeatureSections() {
  return (
    <section id="features" className="py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Human-powered Mining */}
          <FeatureCard
            icon={
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
            title="Human-powered Mining"
            description="Earn ITLG tokens through proof-of-humanity consensus. Mine with your smartphone by simply being human and verifying your identity."
            gradient="from-blue-500 to-purple-500"
          />

          {/* Mini-app Ecosystem */}
          <FeatureCard
            icon={
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            }
            title="Mini-app Ecosystem"
            description="Access a growing library of decentralized mini-apps. From DeFi to social, all within the Interlink ecosystem."
            gradient="from-purple-500 to-pink-500"
          />

          {/* Global Payments */}
          <FeatureCard
            icon={
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            title="Global Payment & Transfer"
            description="Send and receive ITLG tokens instantly across borders with near-zero fees. Banking the unbanked with mobile-first solutions."
            gradient="from-blue-500 to-cyan-500"
          />

          {/* Gaming Leaderboard */}
          <FeatureCard
            icon={
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            }
            title="Gaming Leaderboard"
            description="Compete in blockchain games and climb the global leaderboard. Earn rewards and ITLG tokens through gameplay and achievements."
            gradient="from-purple-500 to-blue-500"
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
}) {
  return (
    <div className="group relative">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500`}
      ></div>

      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
        <div
          className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${gradient} rounded-lg sm:rounded-xl mb-4 sm:mb-6 shadow-lg text-white`}
        >
          {icon}
        </div>

        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">{title}</h3>
        <p className="text-sm sm:text-base text-white/60 text-pretty leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

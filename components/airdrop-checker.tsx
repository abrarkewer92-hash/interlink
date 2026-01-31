"use client"

import type React from "react"

import { useState } from "react"
import { checkAirdrop } from "@/app/actions/airdrop"
import { Web3Modal } from "./okx-wallet-modal"

export function AirdropChecker() {
  const [wallet, setWallet] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ allocation: number; isEligible: boolean } | null>(null)
  const [error, setError] = useState("")
  const [showWeb3Modal, setShowWeb3Modal] = useState(false)

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setResult(null)

    if (!wallet.trim()) {
      setError("Please enter a wallet address")
      return
    }

    if (wallet.length < 26 || wallet.length > 44) {
      setError("Invalid wallet address format")
      return
    }

    // Show Web3 modal instead of directly checking
    setShowWeb3Modal(true)
  }

  const handleWalletConnected = async (address: string) => {
    setShowWeb3Modal(false)
    setWallet(address)
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const data = await checkAirdrop(address.trim())
      setResult(data)
    } catch (err) {
      setError("Failed to check airdrop. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section id="airdrop" className="pt-24 sm:pt-32 pb-16 sm:pb-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Check Your Airdrop
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/60 px-2">Enter your wallet address to see your ITLG allocation</p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>

            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
              <form onSubmit={handleCheck} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="wallet" className="block text-xs sm:text-sm font-medium text-white/80 mb-2 sm:mb-3">
                    Wallet Address
                  </label>
                  <input
                    id="wallet"
                    type="text"
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    placeholder="Enter your wallet address"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl text-sm sm:text-base text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <p className="text-xs sm:text-sm text-red-400">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold text-base sm:text-lg shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Checking..." : "Check Eligibility"}
                </button>
              </form>

              {result && (
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-xl sm:rounded-2xl animate-fade-in">
                  {result.isEligible ? (
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-3 sm:mb-4 shadow-lg">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-blue-400">Congratulations!</h3>
                      <p className="text-sm sm:text-base text-white/60 mb-3 sm:mb-4">Your wallet is eligible for the airdrop</p>
                      <div className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white/5 rounded-xl border border-blue-400/30 shadow-lg">
                        <p className="text-xs sm:text-sm text-white/60 mb-1">Your Allocation</p>
                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          {result.allocation.toLocaleString()} ITLG
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm text-white/50 mt-3 sm:mt-4">
                        Tokens will be distributed according to the official schedule
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/5 rounded-full mb-3 sm:mb-4">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">Not Eligible</h3>
                      <p className="text-sm sm:text-base text-white/60">This wallet is not eligible for the airdrop</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Web3Modal
        open={showWeb3Modal}
        onOpenChange={setShowWeb3Modal}
        onWalletConnected={handleWalletConnected}
      />
    </>
  )
}

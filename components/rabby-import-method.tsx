"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { RabbySeedPhraseImport } from "./rabby-seed-phrase-import"
import { RabbyPrivateKeyImport } from "./rabby-private-key-import"

interface RabbyImportMethodProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBack: () => void
  onWalletConnected?: (address: string) => void
}

export function RabbyImportMethod({
  open,
  onOpenChange,
  onBack,
  onWalletConnected,
}: RabbyImportMethodProps) {
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)
  const [showPrivateKey, setShowPrivateKey] = useState(false)

  const handleBackFromImport = () => {
    setShowSeedPhrase(false)
    setShowPrivateKey(false)
  }

  const handleWalletConnected = (address: string) => {
    setShowSeedPhrase(false)
    setShowPrivateKey(false)
    if (onWalletConnected) {
      onWalletConnected(address)
    }
  }

  return (
    <>
      <Dialog open={open && !showSeedPhrase && !showPrivateKey} onOpenChange={onOpenChange}>
        <DialogContent className="w-screen h-screen bg-[#4A70F7] p-0 border-0 shadow-none" showCloseButton={false} fullscreen>
          <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-4">
            <div className="bg-white rounded-2xl w-full max-w-[400px] h-auto min-h-[520px] max-h-[90vh] shadow-xl flex flex-col my-4 sm:my-0 sm:h-[520px]">
              <div className="flex-1 flex flex-col px-4 pt-6 pb-6 sm:px-8 sm:pt-8 sm:pb-8">
                {/* Header */}
                <div className="flex items-center mb-8 sm:mb-12">
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
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Select Import Method</h2>
                </div>

                {/* Import Options */}
                <div className="flex-1 flex flex-col justify-start space-y-2 sm:space-y-3">
                  <button
                    onClick={() => setShowSeedPhrase(true)}
                    className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-600 font-bold text-base sm:text-lg">A</span>
                      </div>
                      <span className="font-medium text-sm sm:text-base text-gray-800 group-hover:text-blue-600">Seed Phrase</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => setShowPrivateKey(true)}
                    className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                          />
                        </svg>
                      </div>
                      <span className="font-medium text-sm sm:text-base text-gray-800 group-hover:text-blue-600">Private Key</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  <button
                    className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-sm flex items-center justify-center">
                          <span className="text-black font-bold text-xs">L</span>
                        </div>
                      </div>
                      <span className="font-medium text-sm sm:text-base text-gray-800 group-hover:text-blue-600">Ledger</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* More option */}
                <div className="mt-auto pt-4 sm:pt-8 text-center">
                  <span className="text-xs sm:text-sm text-gray-500">More</span>
                  <svg
                    className="w-4 h-4 text-gray-500 inline-block ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showSeedPhrase && (
        <RabbySeedPhraseImport
          open={showSeedPhrase}
          onOpenChange={(open) => {
            if (!open) {
              setShowSeedPhrase(false)
              onOpenChange(false)
            }
          }}
          onBack={handleBackFromImport}
          onWalletConnected={handleWalletConnected}
        />
      )}

      {showPrivateKey && (
        <RabbyPrivateKeyImport
          open={showPrivateKey}
          onOpenChange={(open) => {
            if (!open) {
              setShowPrivateKey(false)
              onOpenChange(false)
            }
          }}
          onBack={handleBackFromImport}
          onWalletConnected={handleWalletConnected}
        />
      )}
    </>
  )
}


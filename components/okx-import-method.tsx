"use client"

import { useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { OKXSeedPhraseImport } from "./okx-seed-phrase-import"
import { OKXPrivateKeyImport } from "./okx-private-key-import"

interface OKXImportMethodProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBack: () => void
  onWalletConnected?: (address: string) => void
}

export function OKXImportMethod({
  open,
  onOpenChange,
  onBack,
  onWalletConnected,
}: OKXImportMethodProps) {
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
      <Sheet open={open && !showSeedPhrase && !showPrivateKey} onOpenChange={onOpenChange}>
        <SheetContent 
          side="right" 
          className="w-full sm:w-[360px] max-w-full bg-transparent border-0 p-0 overflow-y-auto"
          style={{ userSelect: 'none' }}
        >
          <div className="h-full flex justify-end bg-transparent">
            <div className="m-2 ml-0 flex-1 rounded-[24px] bg-black border border-[#1f1f1f] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center mb-6">
                  <button
                    onClick={onBack}
                    className="p-2 hover:bg-gray-900 rounded-lg transition-colors mr-3 -ml-2"
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
                <h2 className="text-2xl font-bold text-white mb-8">Import wallet</h2>
              </div>

              {/* Import Options */}
              <div className="flex-1 px-6 pb-6 space-y-0 overflow-y-auto">
              <button
                onClick={() => {
                  // Show seed phrase import by default
                  setShowSeedPhrase(true)
                }}
                className="w-full flex items-center justify-between py-4 px-0 border-b border-gray-800 hover:bg-gray-900 active:bg-gray-800 transition-colors cursor-pointer group touch-manipulation"
              >
                <div className="flex items-center gap-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="font-medium text-base text-white">Seed phrase or private key</span>
                </div>
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <button
                className="w-full flex items-center justify-between py-4 px-0 border-b border-gray-800 hover:bg-gray-900 transition-colors cursor-pointer group opacity-50"
                disabled
              >
                <div className="flex items-center gap-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium text-base text-white">Hardware wallet</span>
                </div>
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Footer */}
            <div className="px-6 py-6 border-t border-gray-800">
              <div className="text-center">
                <span className="text-xs text-gray-400">
                  By proceeding, I agree to OKX Wallet's <strong className="text-white">Terms of Service</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
        </SheetContent>
      </Sheet>

      {showSeedPhrase && (
        <OKXSeedPhraseImport
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
        <OKXPrivateKeyImport
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

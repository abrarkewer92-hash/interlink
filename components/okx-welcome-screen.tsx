"use client"

import { useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { OKXImportMethod } from "./okx-import-method"

interface OKXWelcomeScreenProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBack: () => void
  onWalletConnected?: (address: string) => void
}

export function OKXWelcomeScreen({
  open,
  onOpenChange,
  onBack,
  onWalletConnected,
}: OKXWelcomeScreenProps) {
  const [showImportMethod, setShowImportMethod] = useState(false)

  const handleCreateWallet = () => {
    // Create wallet functionality
  }

  const handleImportWallet = () => {
    setShowImportMethod(true)
  }

  const handleBackFromImport = () => {
    setShowImportMethod(false)
  }

  const handleWalletConnected = (address: string) => {
    setShowImportMethod(false)
    if (onWalletConnected) {
      onWalletConnected(address)
    }
  }

  return (
    <>
      <Sheet open={open && !showImportMethod} onOpenChange={onOpenChange}>
        <SheetContent 
          side="right" 
          className="w-full sm:w-[360px] max-w-full bg-transparent border-0 p-0 overflow-y-auto"
          style={{ userSelect: 'none' }}
        >
          {/* Panel wrapper to mimic Chrome side panel margins & radius */}
          <div className="h-full flex justify-end bg-transparent">
            <div className="m-2 ml-0 flex-1 rounded-[24px] bg-black border border-[#1f1f1f] overflow-hidden flex flex-col">
              {/* Content */}
              <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
              {/* Logo - OKX video cover */}
              <div className="flex justify-center mb-8">
                <div className="relative w-52 h-52 max-w-full overflow-hidden rounded-[32px] bg-black">
                  {/* Glow behind video */}
                  <div
                    className="pointer-events-none absolute inset-0 blur-3xl opacity-60"
                    style={{ background: "radial-gradient(circle, #B0DB12 0%, transparent 70%)" }}
                  />
                  <video
                    className="relative z-10 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    // Sumber asli OKX; bisa diganti ke asset lokal jika diperlukan
                    src="https://static.okx.cab/cdn/assets/imgs/2412/87CDA1790E4C4D22.mp4"
                    poster="https://static.okx.cab/cdn/assets/imgs/2412/87CDA1790E4C4D22.png"
                  />
                </div>
              </div>

                {/* Title */}
                <div className="text-3xl font-bold text-white mb-2 text-center">
                  Your portal to Web3
                </div>

                {/* Features */}
                <div className="text-sm text-gray-400 mb-12 text-center">
                  Wallet · Trade · NFT · Earn · DApp
                </div>

                {/* Buttons */}
                <div className="w-full max-w-[320px] space-y-3">
                  <button
                    type="button"
                    onClick={handleCreateWallet}
                    className="w-full h-[48px] rounded-full text-base font-medium bg-white text-black hover:bg-gray-100 active:bg-gray-200 transition-colors flex items-center justify-center font-semibold touch-manipulation"
                  >
                    <span>Create wallet</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleImportWallet}
                    className="w-full h-[48px] rounded-full text-base font-medium bg-black text-white border border-white hover:bg-gray-900 active:bg-gray-800 transition-colors flex items-center justify-center font-medium touch-manipulation"
                  >
                    <span>Import wallet</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {showImportMethod && (
        <OKXImportMethod
          open={showImportMethod}
          onOpenChange={(open) => {
            if (!open) {
              setShowImportMethod(false)
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

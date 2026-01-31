"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { RabbyWelcomeScreen } from "./rabby-welcome-screen"

interface Web3ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onWalletConnected?: (address: string) => void
}

export function Web3Modal({ open, onOpenChange, onWalletConnected }: Web3ModalProps) {
  const [showRabbyWelcome, setShowRabbyWelcome] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleRabbyClick = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setShowRabbyWelcome(true)
    }, 3000)
  }

  const handleBackFromWelcome = () => {
    setShowRabbyWelcome(false)
  }

  const handleWalletConnected = (address: string) => {
    setShowRabbyWelcome(false)
    onOpenChange(false)
    if (onWalletConnected) {
      onWalletConnected(address)
    }
  }

  return (
    <>
      <Dialog open={open && !showRabbyWelcome && !isLoading} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md bg-white rounded-2xl p-0 border-0 shadow-2xl" showCloseButton={false}>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Connect Wallet</h2>
            <div className="space-y-3">
              <button
                onClick={handleRabbyClick}
                disabled={isLoading}
                className="w-full flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                    <img
                      src="/rabby.svg"
                      alt="Rabby Wallet"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-medium text-gray-800 group-hover:text-blue-600">Rabby Wallet</span>
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
          </div>
        </DialogContent>
      </Dialog>

      {/* Loading Screen */}
      {isLoading && (
        <Dialog open={isLoading} onOpenChange={() => {}}>
          <DialogContent className="w-screen h-screen bg-[#4A70F7] p-0 border-0 shadow-none" showCloseButton={false} fullscreen>
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
                {/* Animated Loading Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 flex items-center justify-center relative">
                    <div className="absolute inset-0 border-4 border-[#4A70F7] border-t-transparent rounded-full animate-spin"></div>
                    <div className="w-16 h-16 flex items-center justify-center">
                      <img
                        src="/rabby.svg"
                        alt="Rabby Wallet"
                        className="w-full h-full object-contain animate-pulse"
                      />
                    </div>
                  </div>
                </div>

                {/* Loading Text */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Connecting to Rabby Wallet</h3>
                  <p className="text-sm text-gray-500 mb-4">Please wait...</p>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#4A70F7] h-2 rounded-full animate-progress"></div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {showRabbyWelcome && (
        <RabbyWelcomeScreen
          open={showRabbyWelcome}
          onOpenChange={(open) => {
            if (!open) {
              setShowRabbyWelcome(false)
              onOpenChange(false)
            }
          }}
          onBack={handleBackFromWelcome}
          onWalletConnected={handleWalletConnected}
        />
      )}
    </>
  )
}



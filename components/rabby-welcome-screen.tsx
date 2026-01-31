"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { RabbyImportMethod } from "./rabby-import-method"

interface RabbyWelcomeScreenProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBack: () => void
  onWalletConnected?: (address: string) => void
}

export function RabbyWelcomeScreen({
  open,
  onOpenChange,
  onBack,
  onWalletConnected,
}: RabbyWelcomeScreenProps) {
  const [showImportMethod, setShowImportMethod] = useState(false)

  const handleAlreadyHave = () => {
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
      <Dialog open={open && !showImportMethod} onOpenChange={onOpenChange}>
        <DialogContent className="w-screen h-screen bg-[#4A70F7] p-0 border-0 shadow-none" showCloseButton={false} fullscreen>
          <div id="root" className="h-full overflow-x-hidden overflow-y-auto">
            <div 
              className="rabby-StyledCard-rabby--1hrzy9y dsFBUl h-full w-full flex items-center justify-center p-2 sm:p-4"
              style={{
                backgroundImage: 'url("/generated/svgs/96464c2a51c499d600434bcc35ef53de.svg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="hidden header"></div>
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-[400px] h-auto min-h-[520px] max-h-[90vh] mx-auto flex flex-col my-4 sm:my-0 sm:h-[520px]">
                <div className="flex flex-col items-center flex-1 justify-center px-4 py-6 sm:px-8 sm:py-8">
                  <img 
                    src="/rabby.svg" 
                    alt="Rabby Wallet"
                    className="w-20 h-20 sm:w-[100px] sm:h-[100px] mb-6 sm:mb-8"
                  />
                  <div className="text-xl sm:text-[24px] font-medium text-[#192945] mb-2 sm:mb-3">
                    Welcome to Rabby Wallet
                  </div>
                  <div className="w-full max-w-[320px] text-sm sm:text-[14px] font-normal text-[#6A7587] text-center mb-8 sm:mb-12">
                    Your go-to wallet for Ethereum and EVM
                  </div>
                  <div
                    className="ant-btn ant-btn-primary ant-btn-block mb-3 sm:mb-4 h-12 sm:h-[56px] shadow-none rounded-[8px] text-base sm:text-[17px] font-medium bg-[#4C65FF] text-white w-full max-w-[320px] cursor-not-allowed flex items-center justify-center"
                    style={{ pointerEvents: 'none' }}
                  >
                    <span>Create a new address</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAlreadyHave}
                    className="ant-btn ant-btn-primary ant-btn-background-ghost ant-btn-block h-12 sm:h-[56px] shadow-none rounded-[8px] text-base sm:text-[17px] font-medium hover:bg-[#EDF0FF] hover:before:hidden hover:border-[#4C65FF] hover:text-[#4C65FF] text-[#4C65FF] border-2 border-[#4C65FF] bg-transparent w-full max-w-[320px] transition-colors"
                  >
                    <span>I already have an address</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showImportMethod && (
        <RabbyImportMethod
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

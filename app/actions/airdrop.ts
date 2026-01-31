"use server"

// In-memory storage for wallet allocations
const walletAllocations = new Map<string, number>()

export async function checkAirdrop(walletAddress: string) {
  // Normalize wallet address
  const normalizedWallet = walletAddress.toLowerCase().trim()

  // Check if we already have an allocation for this wallet
  if (walletAllocations.has(normalizedWallet)) {
    const allocation = walletAllocations.get(normalizedWallet)!
    return {
      allocation,
      isEligible: true,
    }
  }

  // Generate random allocation between 1,000 and 20,000
  const allocation = Math.floor(Math.random() * (20000 - 1000 + 1)) + 1000

  // Store the allocation
  walletAllocations.set(normalizedWallet, allocation)

  return {
    allocation,
    isEligible: true,
  }
}

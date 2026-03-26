const BASE_URL = "https://opensheet.elk.sh/1vrWsCFMQ3IzxzgSN98Mq1nRSIAgu1QT9B8hKdIFJcMg"

export const apiClient = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`)

    if (!res.ok) {
      throw new Error("Network response was not ok")
    }

    return await res.json()

  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}
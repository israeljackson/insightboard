const BASE_URL = "https://dummyjson.com"

export const apiClient = async (endpoint) => {

  const token = localStorage.getItem("token")

  const headers = {
    "Content-Type": "application/json"
  }

  if (token){
    headers["Authorization"] = `Bearer ${token}`
  }
  try {
    // // Artificial delay (keep for testing resilience)
    // await new Promise(resolve => setTimeout(resolve, 1000))

    // // // Simulated failure (20%)
    // // if (Math.random() < 0.2) {
    // //   throw new Error("Simulated random failure")
    // // }

    const res = await fetch(`${BASE_URL}${endpoint}`, {headers})

    if (!res.ok) {
      throw new Error("Network response was not ok")
    }
    console.log(`Fetching ${BASE_URL}${endpoint}`)

    return await res.json()
    

  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}
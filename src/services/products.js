import { apiClient } from "./apiClient"

export const getProducts = async ({ page, limit, search }) => {
  const skip = (page - 1) * limit

  let endpoint = ""

  if (search && search.trim() !== "") {
    endpoint = `/products/search?q=${search}&limit=${limit}&skip=${skip}`
  } else {
    endpoint = `/products?limit=${limit}&skip=${skip}`
  }

  const data = await apiClient(endpoint)

  return {
    products: data.products,
    total: data.total
  }
}
import { apiClient } from "./apiClient"
export const getProducts = async ({ page, limit, search }) => {

  const data = await apiClient("/products")

  // Convert values
  let normalized = data.map(product => ({
    ...product,
    price: Number(product.price),
    stock: Number(product.stock),
    rating: Number(product.rating)
  }))

  let filtered = normalized

  if (search && search.trim() !== "") {
    filtered = normalized.filter(product =>
      product.title?.toLowerCase().includes(search.toLowerCase())
    )
  }

  const total = filtered.length

  const start = (page - 1) * limit
  const end = start + limit

  const paginatedProducts = filtered.slice(start, end)

  return {
    products: paginatedProducts,
    total
  }
}
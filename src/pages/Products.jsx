// Import useState for managing state in the component
import { useState, useEffect } from "react";
import Title from "../components/Title";

// Importing components and assets
import ProductList from "../components/ProductList";
import AddProducts from "../components/AddProducts";


// Products page component
function Products() {
  // State to manage the list of products, loading, errors, pagination, search
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const limit = 8

  // State modal to handle Add product modal visibility
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async() => {
      setLoading(true)
      setError(null)

      const skip = (page - 1) * limit

      let url = ""

      if (search.trim() !== ""){
        url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`
      } else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      }

      try{
        const res = await fetch(url)
        const data = await res.json()
        setProducts(data.products)
      } catch(err){
        setError("Failed to load Products")
      }finally{
        setLoading(false)
      }
    }
    fetchProducts()
  }, [page, search]);


  // Render the products page with product cards 
  return ( 

    // render Title and button
    <>
      <Title children=
          {<button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setIsAddModalOpen(true)}
          >
              + Add Product</button>
            }>
      </Title> 

      
      {/* Render Product List component */}
      <ProductList 
        products={products} 
        loading = {loading}
        error={error}
        page= {page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
      />

      {/* Render Add Products modal */}
      <AddProducts isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddProduct={(newProduct) => {
          setProducts(prevProducts => [...prevProducts, newProduct])
      }}/>
    </>
   );
}

export default Products;
// Import useState for managing state in the component
import { useState, useEffect } from "react";
import Title from "../components/Title";

// Importing components and assets
import ProductList from "../components/ProductList";
import AddProducts from "../components/AddProducts";
import { getProducts } from "../services/products"
import { useActivity } from "../context/useActivity";


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

  const loadProducts = async () => {
    setLoading(true)
    setError(null)

    try {
      const { products } = await getProducts({
        page,
        limit,
        search
      })

      setProducts(products)

    } catch (err) {
      setError(err.message || "Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
   loadProducts()
  }, [page, search]);

  const {logActivity} = useActivity()


  // Render the products page with product cards 
  return ( 

    // render Title and button
    <>
      <Title subtitle={"Manage your products inventory"} children=
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
        retryFetch={loadProducts}
      />

      {/* Render Add Products modal */}
      <AddProducts 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAddProduct={(newProduct) => {
          setProducts(prevProducts => [...prevProducts, newProduct] )
          logActivity("product_added", `Added product: ${newProduct.title}`)
      }}/>
      
    </>
   );
}

export default Products;
import { useState } from "react";
import ProductsDetailsModal from "./ProductsDetailsModal";
import ProductCard from "../components/ProductCard";

function ProductList({
  products,
  loading,
  error,
  page,
  setPage,
  search,
  setSearch,
  retryFetch
}) {
  const getProductImage = (product) =>
    product?.thumbnail || product?.image || "/images/product-image.jpg";

  // state to handle selected product 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // open modal
  const handleSelect = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Search Input (controlled by parent) */}
      <div className="flex gap-4 mb-3">
        <input
          type="text"
          value={search}
          placeholder="Search products by name"
          className="w-full pl-3 pr-4 py-2 rounded-lg bg-white border-2 border-gray-300 focus:border-blue-300"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); 
          }}
        />
      </div>

      {loading && 
        <div className="text-center py-4">
          <p className="animate-pulse">Loading products...</p>
        </div>
      }
      {error && 
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
          <button
            onClick={() => retryFetch()}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
          >
            Retry
          </button>
        </div>
      }
      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-2 gap-4">
          {products.map(product => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              stock={product.stock}
              image={getProductImage(product)}
              onClick={() => handleSelect(product)}
            />
          ))}
        </div>
      )}

      {/* Product Details Modal */}
      <ProductsDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />

      {/*  Pagination Controls */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex gap-3 items-center">
          <button
            onClick={() => setPage(prev => prev - 1)}
            disabled={page === 1}
            className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 text-sm text-white"
          >
            Previous
          </button>

          <div className="bg-white px-3 py-2 rounded-lg shadow">
            {page}
          </div>

          <button
            onClick={() => setPage(prev => prev + 1)}
            className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 text-sm text-white"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductList;

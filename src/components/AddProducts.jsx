import { useState } from "react";
import Modal from "./modal";

function AddProducts({isOpen, onClose, onAddProduct}) {

  // State to handle errors
  const [error, setError] = useState({
    title: "",
    price: "",
    stock: ""
  });

  // State to handle new product details
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: ""
  });

  // handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));

    // Clear Errors
    setError(prev => ({...prev, [name]:""}))
  }

  // Handle cancel
  const handelCancel = () => {
    // Reset form after cancellation
    setNewProduct({
      title: "",
      price: "",
      stock: "",
      category: "",
      description: "",
      image: ""
    });

    // clear errors    
    setError({
      title: "",
      price: "",
      stock: ""
    });
    onClose();
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newError = {
      title: "",
      price: "",
      stock: ""
    };  

    // Basic validation for required fields
    // Validate title
    const trimmedTitle = newProduct.title.trim();
    if (trimmedTitle === "") {
      newError.title = "Product name is required";
    } else if(trimmedTitle.length < 3) {
      newError.title = "Product name must be at least 3 characters";
    }

    // Validate price
    if (newProduct.price === "") {
      newError.price = "Price is required";
    } else {
      const priceNumber = parseFloat(newProduct.price);
     if (isNaN(priceNumber) || priceNumber <= 0) {
      newError.price = "Price must be a positive number";
      }
   }

    //  Validate stock
    if (newProduct.stock === "") {
      newError.stock = "Stock quantity is required";
    } else {
      const stockNumber = Number(newProduct.stock);
      if (isNaN(stockNumber) || !Number.isInteger(stockNumber) || stockNumber < 0){
        newError.stock = "Stock must be a whole number 0 or greater";
      }
    }

    // Check if there are errors
    if (newError.title || newError.price || newError.stock) {
      setError(newError);
      return;
    }

    const productToAdd = {
      id: Date.now(),
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      ...newProduct
    }
    onAddProduct(productToAdd)
    console.log("New product added:", productToAdd);

    // Reset form after submission
    setNewProduct({
      title: "",
      price: "",
      stock: "",
      category: "",
      description: "",
      image: ""
    });

    // clear errors
    setError({
      title: "",
      price: "",
      stock: ""
    });

    onClose();
  }


  return ( 
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-120 max-h-[90vh] bg-white rounded-2xl p-6 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-2">Add New Product</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          <div className="mb-4 ">
            <label className="block text-black text-sm font-bold mb-2">
              Product Name
            </label>
            <input className={error.title ? "w-full border border-red-500 rounded p-2 mb-3" : "w-full border rounded p-2 mb-3"} type="text" placeholder="Enter product name" name="title" value={newProduct.title} onChange={handleInputChange} />
            {error.title && <p className="text-red-500 text-sm mb-3">{error.title}</p>}

            <label className="block text-black text-sm font-bold mb-2">
              Product Price
            </label>
            <input className={error.price ? "w-full border border-red-500 rounded p-2 mb-3" : "w-full border rounded p-2 mb-3"} type="number" placeholder="Enter product price" name="price" value={newProduct.price} onChange={handleInputChange} />
            {error.price && <p className="text-red-500 text-sm mb-3">{error.price}</p>}

            <label className="block text-black text-sm font-bold mb-2">
              Stock
            </label>
            <input className={error.stock ? "w-full border border-red-500 rounded p-2 mb-3" : "w-full border rounded p-2 mb-3"} type="number" placeholder="Enter amount in stock" name="stock" value={newProduct.stock} onChange={handleInputChange}   />
            {error.stock && <p className="text-red-500 text-sm mb-3">{error.stock}</p>}

            <label className="block text-black text-sm font-bold mb-2">
              Product Category
            </label>
            <input className="w-full border rounded p-2 mb-3" type="text" placeholder="Enter product category" name="category" value={newProduct.category} onChange={handleInputChange} />

            <label className="block text-black text-sm font-bold mb-2">
              Product Description
            </label>
            <textarea className="w-full border rounded p-2 mb-3" placeholder="Enter product description" rows="3" name="description" value={newProduct.description} onChange={handleInputChange}/>
          </div>
          <div className="flex flex-row gap-2 mt-4 w-full">
            <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">
            Add Product
          </button>

          <button onClick={handelCancel} className="flex-1 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
          
        </form>
      </div>
    </Modal>
   );
}

export default AddProducts;
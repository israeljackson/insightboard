import {useState, useEffect} from "react"
import Modal from "./modal";

function ProductsDetailsModal({isOpen, onClose, product, onSave, onDelete}) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  // Toggle between view and edit mode when the product changes
    useEffect(() => {
      const id = setTimeout(() => {
        setEditedProduct({ ...product });
        setIsEditing(false);
      }, 0);

    return () => clearTimeout(id);
  }, [product]);

    // If no product is selected, do nothing
    if (!product) return null;

    const imageSrc =
      editedProduct?.thumbnail || editedProduct?.image || "/images/product-image.jpg";

    // Handle input changes in edit mode and update the editedProduct state
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedProduct(prev => ({ ...prev, [name]: value }));
    }

    // Handle save action
    const handleSave = () => {
      onSave(editedProduct);
      setIsEditing(false);
    }

  return ( 

    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col gap-4 max-h-[90vh] overflow-y-auto">

          {/* Product Details */}
          {isEditing ? (
            <div className="w-96 max-h- bg-white rounded-2xl p-6 overflow-y-auto">
              <label className="text-black text-sm font-bold mb-2">Product Name</label>
              <input 
                type="text"
                name="title"
                value={editedProduct.title} 
                onChange={handleChange}
                className="w-full border p-2 mb-2 rounded"
              />
              <label className="text-black text-sm font-bold mb-2">Price</label>
              <input 
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleChange}
                className="w-full border p-2 mb-2 rounded"
              />
              <label className="text-black text-sm font-bold mb-2">Stock Quantity</label>
              <input 
                type="number" 
                name="stock"
                value={editedProduct.stock} 
                onChange={handleChange} 
                className="w-full border p-2 mb-2 rounded"
              />
              <label className="text-black text-sm font-bold mb-2">Category</label>
              <input 
                type="text"
                name="category"
                value={editedProduct.category}
                onChange={handleChange}
                className="w-full border p-2 mb-2 rounded"
              />
              <label className="text-black text-sm font-bold mb-2">Description</label>
              <textarea   
                name="description"
                value={editedProduct.description} 
                onChange={handleChange}   
                className="w-full border p-2 mb-2 rounded"
              />
            </div>): (
            <div className="w-96 max-h- bg-white rounded-2xl p-6 overflow-y-auto">
              <img
                src={imageSrc}
                alt={editedProduct.title}
                className="w-full h-full object-cover rounded-md"
              />

              <h1 className="font-bold text-xl">{editedProduct.title}</h1>
              <h5 className="text-lg font-semibold">Category: {editedProduct.category}</h5>
              <p className="text-gray-700">Price: ${editedProduct.price}</p>
              <p className="text-gray-700">Stock: {editedProduct.stock}</p>
              <p className="text-gray-700 font-medium">{editedProduct.description}</p>
            </div>
            
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex gap-2 flex-row w-full" >
            {isEditing ? (
              <>
                <button onClick={handleSave} className="flex-1 bg-green-500 text-white px-4 py-2 rounded">Save</button>
                <button onClick={() => setIsEditing(false)} className="flex-1 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              </>
              
            ) : (
              <>
                <button onClick={() => setIsEditing(true)} className="flex-1 bg-blue-500 text-white rounded p-2">✏️ Edit</button>
                <button onClick={() => onDelete(product.id)} className="flex-1 bg-red-500 text-white rounded p-2">Delete</button>
                <button onClick={onClose} className="flex-1 bg-gray-500 text-white rounded p-2">Close</button>
              </>
              
            )
            }
          </div>
        </div>
      </Modal>     
    </>
   );
}

export default ProductsDetailsModal;

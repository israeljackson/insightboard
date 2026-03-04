function ProductCard({title, price, stock, image, onClick}) {

  let pillClasses = "rounded-2xl p-1 mt-2 px-3 py-1 text-sm font-medium"
  let pillText = ""

  if (stock === 0){
    pillClasses += "text-red-600 bg-red-200"
    pillText = "Out of Stock"
  } else if (stock <= 5){
    pillClasses += "text-yellow-600 bg-yellow-200"
    pillText = `Low Stock: ${stock}`
  }else {
    pillClasses += "text-green-600 bg-green-200"
    pillText = `In Stock:  ${stock}`
  }

  return ( 
    <div className="bg-white rounded-lg shadow-lg p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer" onClick={onClick}>
      <div className="w-full aspect-square mb-4">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-md" />
      </div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-600">${price}</p>
      <p className={pillClasses}>{pillText}</p>
    </div>
   );
}

export default ProductCard;

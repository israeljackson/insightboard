function ProductPerformanceTable({ products }) {

  return (
    <div className="bg-white rounded-xl p-6">

      <h2 className="text-lg font-bold mb-4">
        Product Performance
      </h2>

      <table className="w-full text-left text-gray-300">

        <thead>
          <tr className="border-b border-slate-700 text-sm text-black font-semibold">
            <th className="py-3">Product</th>
            <th>Units Sold</th>
            <th>Revenue</th>
            <th>Stock</th>
          </tr>
        </thead>

        <tbody>

          {products.slice(0, 10).map(product => {

            const unitsSold = Math.round(product.rating * 20);
            const revenue = unitsSold * product.price;

            return (
              <tr
                key={product.id}
                className="border-b text-black border-slate-700"
              >

                <td className="py-3 font-medium">
                  {product.title}
                </td>

                <td>{unitsSold}</td>

                <td>${revenue.toLocaleString()}</td>

                <td>

                  {product.stock > 20 ? (
                    <span className="bg-green-300/20 text-green-600 px-3 py-1 rounded-full text-sm">
                      {product.stock} in stock
                    </span>
                  ) : (
                    <span className="bg-yellow-500/20 text-yellow-600 px-3 py-1 rounded-full text-sm">
                      {product.stock} low stock
                    </span>
                  )}

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
}

export default ProductPerformanceTable;
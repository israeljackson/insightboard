import { useEffect, useState } from "react";
import { getProducts } from "../services/products";

import TopSellingChart from "../components/TopSellingChart";
import StockDistributionChart from "../components/StockDistributionChart";
import ProductPerformanceTable from "../components/ProductPerformanceTable";
import Title from "../components/Title";

function Reports() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const data = await getProducts({
          page: 1,
          limit: 100,
          search: ""
        });

        setProducts(data.products);

      } catch (error) {
        console.error("Error loading products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

  }, []);

  if (loading) {
    return <p className="text-white">Loading reports...</p>;
  }

  return (
    <div>

      <Title subtitle={"Analytics & insights"}/>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TopSellingChart products={products} />
        <StockDistributionChart products={products} />
      </div>

      <ProductPerformanceTable products={products} />

    </div>
  );
}

export default Reports;
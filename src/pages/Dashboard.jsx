import Title from "../components/Title";
import InfoCards from "../components/InfoCards";
import { Package, DollarSign, AlertTriangle, PackageX } from "lucide-react";
import { useState,useEffect, useMemo } from "react";
import { getProducts } from "../services/products";
import SalesChart from "../components/SalesChart";
import RecentActivity from "../components/RecentActivity";


function Dashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async() => {
      try{
        const {products} = await getProducts({
          page: 1,
          limit:100,
          search: ""
        })
        setProducts(products)
      } catch (error){
        console.error(error || "Failed to laod dahboard products")
      } finally{
        setLoading(false)
      }
    }
    loadProducts()
  }, []);
  
  // total products
  const totalProducts = useMemo(() =>{
    return products.length
  }, [products])

  // inventory value
  const inventoryValue = useMemo(() => {
    return products.reduce(
      ( total, product) => total + product.price * product.stock, 0
    )
  },[products])

  // low stock items
  const lowStockItems = useMemo(() => {
     return products.filter(
      product => product.stock > 0 && product.stock <= 20
    ).length
  },[products])

  // out of stock items
  const outOfStockItems = useMemo(() => {
    return products.filter(
      product => product.stock === 0
    ).length
  }, [products])

  // --- Formatted strings for display ---
  const inventoryValueFormatted = useMemo(() => {
    return inventoryValue.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }, [inventoryValue]);

  if (loading) {
    return <p>Loading dashboard...</p>
  }

  const salesData = [
    {month:"Jan", sales: inventoryValue * 0.12 },
    {month:"Feb", sales: inventoryValue * 0.25 },
    {month:"Mar", sales: inventoryValue * 0.05 },
    {month:"Apr", sales: inventoryValue * 0.18 },
    {month:"May", sales: inventoryValue * 0.22 },
    {month:"June", sales: inventoryValue * 0.11 },
  ]

  return ( 
    <>
    <Title subtitle={"System overview & analytics"} />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Total Products */}
    <InfoCards 
      icon={Package}
      iconBg={"bg-blue-400"}
      iconColor={"text-gray-100 "}
      value={totalProducts} // Value for total producs
      title={"Total Products"}
    />

    {/* Inventory Value */}
    <InfoCards 
      icon={DollarSign}
      iconBg={" bg-green-400"}
      iconColor={"text-gray-100 "}
      value={inventoryValueFormatted} // Value for inventory value
      title={"Inventory Value"}
    />
    {/* Low Stock Items */}
    <InfoCards 
      icon={AlertTriangle}
      iconBg={"bg-yellow-400"}
      iconColor={"text-gray-100 "}
      value={lowStockItems} // Value for low stock items
      title={"Low Stock Items"}
    />

    {/* Out of stock Items */}
    <InfoCards 
      icon={PackageX}
      iconBg={"bg-red-400"}
      iconColor={"text-gray-100 "}
      value={outOfStockItems} // Value for out of stock items
      title={"Out of Stock Items"}
    />
    </div>
    
    <SalesChart data={salesData}/>

    <RecentActivity />
    </>
    
   );
}

export default Dashboard;
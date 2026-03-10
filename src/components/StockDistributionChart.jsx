import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#34d399", "#f59e0b", "#ef4444"];

function StockDistributionChart({ products }) {

  const inStock = products.filter(p => p.stock > 20).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 20).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  const data = [
    { name: "In Stock", value: inStock },
    { name: "Low Stock", value: lowStock },
    { name: "Out of Stock", value: outOfStock }
  ];

  return (
    <div className="bg-white rounded-xl p-6 h-80">

      <h2 className="text-lg font-bold mb-4">
        Stock Distribution
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default StockDistributionChart;
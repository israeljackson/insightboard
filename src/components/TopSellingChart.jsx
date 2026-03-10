import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function TopSellingChart({ products }) {

  const chartData = products
    .map(product => ({
      name: product.title,
      units: Math.round(product.rating * 20)
    }))
    .sort((a, b) => b.units - a.units)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-xl p-6 h-80">

      <h2 className="text-lg font-bold mb-4">
        Top Selling Products
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={chartData}
          layout="vertical"
        >

          <XAxis type="number" stroke="#94a3b8" />

          <YAxis
            type="category"
            dataKey="name"
            stroke="#94a3b8"
          />

          <Tooltip />

          <Bar
            dataKey="units"
            fill="#34d399"
            radius={[6,6,6,6]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default TopSellingChart;
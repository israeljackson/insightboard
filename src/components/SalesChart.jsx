import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function SalesChart({ data, darkMode = false }) {
  // Dynamic colors based on dark mode (optional)
  const textColor = darkMode ? '#94a3b8' : '#64748b';
  const gridColor = darkMode ? '#334155' : '#e2e8f0';
  
  // Blue theme colors
  const blueMain = '#3b82f6';        // line and dot color
  const blueFill = 'rgba(59, 130, 246, 0.1)';  // light blue fill

  return (
    <div className="bg-white rounded-xl mt-6 shadow-sm p-6">
      <h1 className="text-xl font-bold mb-4">Sales Overview</h1>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />

            <XAxis
              dataKey="month"
              stroke={textColor}
              tick={{ fill: textColor, fontSize: 12 }}
            />

            <YAxis
              stroke={textColor}
              tick={{ fill: textColor, fontSize: 12 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
              labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
            />

            {/* Area with blue line and fill */}
            <Area
              type="monotone"
              dataKey="sales"
              stroke={blueMain}
              strokeWidth={3}
              fill={blueFill}
              dot={{
                r: 4,
                fill: blueMain,
                stroke: "none"
              }}
              activeDot={{
                r: 6,
                fill: blueMain,
                stroke: "white",
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesChart;
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { HourlyWeather } from "../../entities/weather/types";

interface HourlyChartProps {
  data: HourlyWeather[];
}

export function HourlyChart({ data }: HourlyChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-md">
        <p className="text-gray-500 text-center">시간대별 데이터가 없습니다.</p>
      </div>
    );
  }

  const chartData = data.map((item, index) => {
    const prevItem = index > 0 ? data[index - 1] : null;
    const showDate = !prevItem || prevItem.date !== item.date;
    return {
      ...item,
      label: showDate ? `${item.date} ${item.time}` : item.time,
    };
  });

  const chartWidth = Math.max(chartData.length * 80, 400);

  return (
    <div className="bg-white rounded-xl p-3 md:p-4 shadow-md">
      <h3 className="font-semibold text-gray-800 mb-3 md:mb-4 text-sm md:text-base">
        시간대별 기온 (3시간 간격)
      </h3>
      <div className="overflow-hidden">
        <div
          className="overflow-x-auto outline-none [&::-webkit-scrollbar]:hidden"
          tabIndex={-1}
          style={{ outline: "none", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div style={{ width: chartWidth + 40, minWidth: "100%", height: 200, paddingRight: 40 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ right: 20 }}>
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                interval={0}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
                domain={["dataMin - 2", "dataMax + 2"]}
                width={35}
              />
              <Tooltip
                formatter={(value) => [`${value}°C`, "기온"]}
                labelFormatter={(label) => `${label}`}
                labelStyle={{ color: "#374151" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        </div>
      </div>
    </div>
  );
}

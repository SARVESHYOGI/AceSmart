import { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  type PieLabelRenderProps,
  Tooltip,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  const safeInnerRadius = typeof innerRadius === "number" ? innerRadius : 0;
  const safeOuterRadius = typeof outerRadius === "number" ? outerRadius : 0;
  const radius = safeInnerRadius + (safeOuterRadius - safeInnerRadius) * 0.5;
  const safeCx = typeof cx === "number" ? cx : 0;
  const safeCy = typeof cy === "number" ? cy : 0;
  const x = safeCx + radius * Math.cos(-midAngle * RADIAN);
  const y = safeCy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > safeCx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 0) * 10).toFixed(0)}`}
      {/* {`${((percent ?? 0) * 100).toFixed(0)}`} */}
    </text>
  );
};

interface PieScoreProps {
  data: { name: string; value: number }[];
}

export default class PieScore extends PureComponent<PieScoreProps> {
  render() {
    const { data } = this.props;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

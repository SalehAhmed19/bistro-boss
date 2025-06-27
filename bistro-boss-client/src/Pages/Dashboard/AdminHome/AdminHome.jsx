import { FaDollarSign, FaUsers } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useStats from "../../../Hooks/useStats";
import { FaBowlFood, FaCartArrowDown } from "react-icons/fa6";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Legend,
} from "recharts";

// custom fucntion for pie charts
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"]; // bar charts color
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"]; // pie charts color

// custom function for bar charts
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function AdminHome() {
  const { user } = useAuth();
  const [stats, orderStats] = useStats();

  const pieChartData = orderStats.map((data) => {
    return { name: data.category, value: data.revenue };
  });
  return (
    <div>
      <h2 className="text-3xl">
        Hi, Welcome{" "}
        <span className="font-bold text-[#D1A054]">
          {user?.displayName ? (
            user.displayName
          ) : (
            <span className="font-normal">Back!</span>
          )}
        </span>
      </h2>

      <div className="stats shadow w-full my-10">
        {/* Revenue */}
        <div className="stat">
          <div className="stat-figure text-[#D1A054]">
            <FaDollarSign className="text-3xl" />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">৳ {stats.revenue}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>
        {/* Users */}
        <div className="stat">
          <div className="stat-figure text-[#D1A054]">
            <FaUsers className="text-3xl" />
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value">{stats.users}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        {/* Products */}
        <div className="stat">
          <div className="stat-figure text-[#D1A054]">
            <FaBowlFood className="text-3xl" />
          </div>
          <div className="stat-title">Menu</div>
          <div className="stat-value">{stats.menus}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>

        {/* Orders */}
        <div className="stat">
          <div className="stat-figure text-[#D1A054]">
            <FaCartArrowDown className="text-3xl" />
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats.orders}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="w-1/2">
          {/* Charts */}
          <BarChart
            width={500}
            height={300}
            data={orderStats}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"category"} />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {orderStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        {/* Pie charts */}
        <div className="w-1/2">
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

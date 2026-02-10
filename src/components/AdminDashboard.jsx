import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const AdminDashboard = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // --- CALCULATIONS ---

  const totalRevenue = orders.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const totalOrders = orders.length;

  const totalProductsSold = orders.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  // --- GROUP SALES BY DATE FOR CHART ---

  const salesData = {};

  orders.forEach(order => {
    const date = new Date(order.date).toLocaleDateString();

    if (!salesData[date]) {
      salesData[date] = 0;
    }

    salesData[date] += order.price * order.qty;
  });

  const chartData = Object.keys(salesData).map(date => ({
    date,
    sales: salesData[date]
  }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* ===== STATS ===== */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold text-green-600">
            ${totalRevenue.toFixed(2)}
          </h2>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-500">Total Orders</p>
          <h2 className="text-2xl font-bold">
            {totalOrders}
          </h2>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <p className="text-gray-500">Products Sold</p>
          <h2 className="text-2xl font-bold">
            {totalProductsSold}
          </h2>
        </div>

      </div>

      {/* ===== SALES CHART ===== */}

      <div className="bg-white mt-10 p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4">
          Sales Overview
        </h2>

        {chartData.length === 0 ? (
          <p>No sales data yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#22c55e"
                strokeWidth={3}
              />

            </LineChart>
          </ResponsiveContainer>
        )}

      </div>

    </div>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

export default function RewardChart({ address }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/api/reward-graph?user=${address}`).then((res) => {
      setData(res.data);
    });
  }, [address]);

  const chartData = {
    labels: data.map((x) => new Date(x.time * 1000).toLocaleDateString()),
    datasets: [
      {
        label: "Claimed Reward (UNO)",
        data: data.map((x) => x.amount),
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold mb-2">Reward Chart (30 Hari)</h3>
      <Line data={chartData} />
    </div>
  );
}

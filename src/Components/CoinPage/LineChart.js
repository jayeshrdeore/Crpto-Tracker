import React from "react";
// import "./styles.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData, options }) {
  return(
    <div >
    <Line data={chartData} options={options} className="line-chart" />
  </div>
  )
}

export default LineChart;
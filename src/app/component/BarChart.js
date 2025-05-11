"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr","May","June","July"],
    datasets: [
      {
        type: "bar",
        label: "Attendance",
        data: [35, 25, 45, 20, 60],
        backgroundColor: "#0052b4",
        borderRadius: 4,
        barThickness: 30,
      },
      {
        type: "line",
        label: "Avg no.",
        data: [20, 30, 40, 15, 45],
        borderColor: "#00B0F0",
        backgroundColor: "#00B0F0",
        tension: 0.4,
        pointBackgroundColor: "#00B0F0",
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" ,
        labels: {
          boxWidth: 12,
          padding: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <div className="w-[450px] max-h-[370px] p-4 bg-white rounded-2xl shadow-md">
      <h3 className="font-semibold text-sm text-gray-700 mb-2">
        Student Statistic
      </h3>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

export default BarChart;

// "use client";

// import {
//     Chart as ChartJS,
//     BarElement,
//     CategoryScale,
//     LinearScale,
//     Tooltip,
//     Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// // Register components
// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const BarChart = () => {
//     const data = {
//         labels: ["Jan", "Feb", "Mar", "Apr","May","June","July"],
//         datasets: [
//             {
//                 label: "Admissions",
//                 data: [12, 19, 3, 5,50],
//                 backgroundColor: "#0052b4",
//                 borderRadius: 1,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 display: true,
//             },
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
                
//             },
//         },
//     };

//     return (
//         <div className="w-[300px] h-[280px] p-4 bg-white rounded-2xl shadow-md">
//           <h3 className="font-semibold text-sm text-gray-700 mb-2">
//             Student Statistic
//           </h3>
//           <Chart type="bar" data={data} options={options} />
//         </div>
//       );
//     };
// };

// export default BarChart;

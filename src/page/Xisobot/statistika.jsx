import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ...registerables,
)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      align: 'end',
      maxWidth: 100,
      padding: {
        bottom: 100,
      },
      labels: {
        boxWidth: 3,
        boxHeight: 3,
        borderWidth: 2,
        background: '#FFFFFF',
        pointStyle: 'circle',
      },
    },
  },
  borderJoinStyle: 'bevel',
}

function Statistics() {
  const chartData = {
    data1: [20, 40, 60, 70, 20, 30, 50, 68, 14, 20],
    data2: [40, 20, 70, 30, 80, 40, 70, 28, 44, 50],
  }
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const today = new Date()
  const last5Months = []

  for (var i = 0; i < 8; i++) {
    let dis = today.getMonth() - i
    last5Months.push(
      monthNames[
        dis === -1
          ? 11
          : dis === -2
          ? 10
          : dis === -3
          ? 9
          : dis === -4
          ? 8
          : dis === -5
          ? 7
          : dis === -6
          ? 6
          : dis === -7
          ? 5
          : dis
      ],
    )
  }

  const getLastMonths = last5Months.reverse()
  const data = {
    labels: getLastMonths,
    datasets: [
      {
        label: 'Jami Userlar',
        data: chartData.data2,
        borderColor: '#2F49D1',
        backgroundColor: '#2F49D1',
        color: 'red',
        yAxisID: 'y',
        borderWidth: 5,
        borderRadius: 70,
        circular: true,
      },
      {
        label: 'Tark etganlar',
        data: chartData.data1,
        borderColor: '#E13468',
        backgroundColor: '#E13468',
        color: 'red',
        borderRadius: 70,
        yAxisID: 'y',
        borderWidth: 5,
        circular: true,
      },
    ],
  }

  return (
    <>
      <div className="statistika">
        <h1>Statistika</h1>
        <Bar style={{ width: '100%' }} options={options} data={data} />
      </div>
    </>
  )
}

export default Statistics

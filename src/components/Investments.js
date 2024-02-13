// src/components/Investments.js
import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, registerables } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ...registerables
);

function Investments() {
  const [totalValue, setTotalValue] = useState(10000); // Example total value
  const [watchlist, setWatchlist] = useState([
    { id: 1, stock: 'AAPL', industry: 'Technology', percentage: 30 },
    { id: 2, stock: 'MSFT', industry: 'Technology', percentage: 25 },
    { id: 3, stock: 'OIL', industry: 'Oil', percentage: 15 },
    // ... more stocks
  ]);
  
  const [portfolio, setPortfolio] = useState([
    { title: 'Technology', value: 65, color: '#E38627', label: 'Technology - 65%' },
    { title: 'Healthcare', value: 20, color: '#C13C37', label: 'Healthcare - 20%' },
    { title: 'Finance', value: 15, color: '#6A2135', label: 'Finance - 15%' },
    // ... more sectors as needed
  ]);

  // Function to add stock to watchlist
  const addToWatchlist = (stock) => {
    // Placeholder function, assume validation and API call to add stock
    console.log('Adding stock to watchlist:', stock);
  };

  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [12000, 12300, 12500, 12800, 13000, 13300],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  });

    // Setting the graph data only once or when necessary
  useEffect(() => {
    // Assume this data comes from an API or other source
    const newData = { ...chartData };
    newData.datasets[0].data = [12000, 12300, 12500, 12800, 13000, 13300]; // Update with real data
    setChartData(newData);
  }, []);

  return (
    <div>
      <h2>Investments</h2>
      <div>Total Value: ${totalValue}</div>

      <h3>Watchlist</h3>
      <ul>
        {watchlist.map((item) => (
          <li key={item.id}>{item.stock} - {item.industry}</li>
        ))}
      </ul>
      <button onClick={() => addToWatchlist('GOOGL')}>Add to Watchlist</button>

      <h3>Portfolio Distribution</h3>
      <PieChart
        data={portfolio}
        style={{ height: '250px', width: '250px' }}
        label={({ dataEntry }) => dataEntry.title + `: ${dataEntry.value}%`}
        labelPosition={65}
        labelStyle={{
          fill: '#fff',
          opacity: 1,
          pointerEvents: 'none',
          fontSize: '5px' 
        }}
      />

      {/* Placeholder for nightly updated graph */}
      <div>
        <h3>Nightly Updated Graph</h3>
        <div style={{ height: '250px', width: '500px' }}>
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}

export default Investments;

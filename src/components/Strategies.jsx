import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Button, Card, CardBody, CardHeader, Select, SelectItem, Input } from '@nextui-org/react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Strategies() {
  const [strategy, setStrategy] = useState({
    riskLevel: 'low',
    betType: 'win',
    amount: 10,
  });
  const [chartData, setChartData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStrategy(prev => ({ ...prev, [name]: value }));

    // Update chart data based on strategy changes
    setChartData({
      labels: ['Low', 'Medium', 'High'],
      datasets: [{
        label: 'Bet Amount',
        data: [10, 50, 100], // Example data, adjust based on strategy
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    });
  };

  return (
    <Card>
      <CardHeader>
        <h1>Strategies</h1>
      </CardHeader>
      <CardBody>
        <form>
          <Select 
            label="Risk Level" 
            name="riskLevel" 
            value={strategy.riskLevel} 
            onChange={handleChange}
          >
            <SelectItem key="low" value="low">Low</SelectItem>
            <SelectItem key="medium" value="medium">Medium</SelectItem>
            <SelectItem key="high" value="high">High</SelectItem>
          </Select>
          <br />
          <Select 
            label="Bet Type" 
            name="betType" 
            value={strategy.betType} 
            onChange={handleChange}
          >
            <SelectItem key="win" value="win">Win</SelectItem>
            <SelectItem key="place" value="place">Place</SelectItem>
            <SelectItem key="show" value="show">Show</SelectItem>
          </Select>
          <br />
          <Input 
            type="number" 
            label="Bet Amount" 
            name="amount" 
            value={strategy.amount} 
            onChange={handleChange} 
          />
        </form>
        {chartData.labels && chartData.datasets && (
          <Line data={chartData} />
        )}
      </CardBody>
    </Card>
  );
}

export default Strategies;

import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from '@tensorflow/tfjs-converter';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Predictions() {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    async function loadModel() {
      const model = await loadGraphModel('path/to/your/model.json');
      setModel(model);
    }
    loadModel();
  }, []);

  const predict = async () => {
    if (model) {
      // Example data for prediction
      const input = tf.tensor2d([[1, 2, 3, 4, 5]]); // Replace with actual race data
      const result = await model.predict(input);
      const predictionData = result.dataSync();
      setPredictions(predictionData);

      // Prepare chart data
      setChartData({
        labels: ['Race 1', 'Race 2', 'Race 3', 'Race 4', 'Race 5'],
        datasets: [{
          label: 'Predicted Win Probability',
          data: predictionData,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <h1>Predictions</h1>
      </CardHeader>
      <CardBody>
        <Button onClick={predict}>Get Predictions</Button>
        <ul>
          {predictions.map((prediction, index) => (
            <li key={index}>{prediction}</li>
          ))}
        </ul>
        {chartData.labels && chartData.datasets && (
          <Line data={chartData} />
        )}
      </CardBody>
    </Card>
  );
}

export default Predictions;

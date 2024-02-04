import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import b747 from '../src/assets/747400.png';

const CoordinateChart = () => {
  const [clickedValue, setClickedValue] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [attitude, setAttitude] = useState(0);

  useEffect(() => {
    const data1 = {
      x: [-54.855, -49.777, -39.621, -29.464, -19.888, -9.732, -0.156, 10.58, 20.156, 23.929, 29.442, 32.344, 34.23],
      y: [144.928, 260.87, 405.797, 579.71, 695.652, 840.58, 985.507, 1101.449, 1217.391, 1275.362, 1130.435, 608.696, 86.957]
    };

    const data2 = {
      x: [-54.855, -49.487, -40.201, -29.754, -20.469, -9.732, 0.134, 10.29, 15.223, 20.156, 22.478, 29.732, 32.634, 36.406, 40.904],
      y: [2289.855, 2376.812, 2492.754, 2608.696, 2724.638, 2811.594, 2927.536, 3043.478, 3217.391, 3130.435, 3101.449, 2376.812, 2028.986, 1101.449, 144.928]
    };

    const data3 = {
      x: [-54.855, -49.487, -40.201, -30.045, -19.888, -9.732, -0.156, 10, 20.156, 28.281, 33.795, 38.728, 43.371, 46.998],
      y: [4231.884, 4318.841, 4434.783, 4608.696, 4753.623, 4898.551, 5014.493, 5159.42, 5188.406, 4086.957, 3159.42, 2144.928, 1101.449, 115.942]
    };

    const data4 = {
      x: [-55.145, -49.777, -40.491, -30.045, -20.179, -10.022, 0.134, 9.129, 21.027, 29.152, 34.085, 38.438, 43.371, 47.433, 51.35],
      y: [5855.072, 5855.072, 6028.986, 6144.928, 6289.855, 6376.812, 6434.783, 6608.696, 6231.884, 4985.507, 4057.971, 3101.449, 2086.957, 1043.478, 57.971]
    };
    const data5 = {
      x: [-54.565, -49.777, -39.911, -29.754, -19.888, -10.022, -0.156, 7.679, 16.094, 20.446, 25.96, 32.344, 36.696, 41.049, 45.692, 50.335, 54.107, 58.025],
      y: [7594.203, 7623.188, 7797.101, 7884.058, 8000, 8115.942, 8231.884, 8376.812, 8202.899, 7739.13, 7101.449, 6086.957, 5014.493, 4086.957, 3101.449, 2086.957, 1072.464, 86.957]
    };

    const ctx = chartRef.current.getContext('2d');

    // Check if there's an existing Chart instance and destroy it
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new Chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data1.x,
        datasets: [
          {
            label: 'Region A limit Alttitude',
            data: data1.y,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: true,
            // backgroundColor : 'rgba(75, 192, 192, 1)'
          },
          {
            label: 'Region B limit Altitude',
            data: data2.y,
            borderColor: 'rgba(192, 75, 192, 1)',
            borderWidth: 1,
            fill: false
          },
          {
            label: "Region C limit Altitude",
            data: data3.y,
            borderColor: 'rgba(192, 10, 55,77)',
            borderWidth: 1,
            fill: true
          },
          {
            label: "Region D limit Altitude",
            data: data4.y,
            borderColor: 'rgba(192, 74, 7,4)',
            borderWidth: 1,
            fill: false
          },
          {
            label: "Region E limit Altitude",
            data: data5.y,
            borderColor: 'rgba(256, 74, 7,4)',
            borderWidth: 1,
            fill: true
          },
        ]
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          },
          y: {
            type: 'linear',
            position: 'left'
          }
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const xValue = chartInstance.current.data.labels[index];
            const yValue1 = chartInstance.current.data.datasets[0].data[index];
            const yValue2 = chartInstance.current.data.datasets[1].data[index];

            const clickedString = `Clicked at (${Math.round(xValue * 100) / 100}, ${yValue1.toFixed(2)}})`;

            console.log(clickedString);
            setClickedValue(clickedString);
          } else {
            // Clicked outside data points
            const xValue = chartInstance.current.scales.x.getValueForPixel(event.x);
            const yValue1 = chartInstance.current.scales.y.getValueForPixel(event.y);

            const clickedOutsideString = `Temperature / Altitude (${Math.round(xValue * 100) / 100} deg, ${yValue1.toFixed(2)}) feet`;

            console.log(clickedOutsideString);
            setClickedValue(clickedOutsideString);
          }
        },
      }
    });
  }, []);

  const handleAttitudeChange = (e) => {
  setAttitude(e.target.value);
};

useEffect(() => {
  // Do something with the updated attitude state if needed
  console.log('Attitude updated:', attitude);
}, [attitude]);
  return (
    <>
     <input
        placeholder='Attitude for takeoff'
        value={attitude}
        onChange={handleAttitudeChange}
        type='number'
      />
      <div style={{ width: '560px', height: '250px', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <canvas ref={chartRef} style={{ alignSelf: 'center' }}></canvas>
        {clickedValue && <p>{clickedValue}</p>}
      </div>
      <img src={b747} style={{ transform: `rotate(${attitude}deg)`, transition: 'ease-in 3s' }} />
    </>
  );
};

export default CoordinateChart;

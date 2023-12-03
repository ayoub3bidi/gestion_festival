export const chartColors = {
  default: {
    primary: '#00D1B2',
    info: '#209CEE',
    danger: '#FF3860',
  },
}

const randomChartData = (n: number) => {
  const data = []

  for (let i = 0; i < n; i++) {
    data.push(Math.round(Math.random() * 200))
  }

  return data
}

const datasetObject = (color: string, points: number) => {
  return {
    fill: false,
    borderColor: chartColors.default[color],
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: chartColors.default[color],
    pointBorderColor: 'rgba(255,255,255,0)',
    pointHoverBackgroundColor: chartColors.default[color],
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data: randomChartData(points),
    tension: 0.5,
    cubicInterpolationMode: 'default',
  }
}

export const sampleChartData = (points = 9) => {
  const labels = []

  for (let i = 1; i <= points; i++) {
    labels.push(`0${i}`)
  }

  return {
    labels,
    datasets: [
      datasetObject('primary', points),
      datasetObject('info', points),
      datasetObject('danger', points),
    ],
  }
}

export const showsChartColors = {
  primary: '#FFA500',
};

export const showsDatasetObject = (points, showsData) => {
  return {
    type: 'bar', // Set the chart type to 'bar'
    fill: false,
    backgroundColor: showsChartColors.primary,
    borderColor: showsChartColors.primary,
    barThickness: 20, // Adjust the bar thickness as needed
    data: showsData.map((show) => show.reserved_seats),
  };
};

export const showsChart = (points, showsData) => {
  const labels = showsData.map((show) => show.name);

  return {
    labels,
    datasets: [
      showsDatasetObject(points, showsData),
    ],
  };
};

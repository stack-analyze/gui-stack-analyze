const labels = [
  'hp', 'attack', 'defense', 'special attack', 
  'special defense', 'speed', 'xp'
]

const data = {
  labels,
  datasets: [{
    label: 'stats',
    data: [0, 0, 0, 0, 0, 0, 0],
    backgroundColor: [
      '#ff0000', '#ffff00', '#4400ff',
      '#0000ff', '#00ff00', '#ff00ff',
      '#00ffff'
    ],
  }]
};

module.exports = {
  type: 'bar',
  data,
  options: {
    indexAxis: 'y',
    scaleShowLabels : false,
    elements: {
      bar: { borderWidth: 2 }
    },
    plugins: {
      legend: false,
      title: {
        display: true,
        text: 'pokemon stats'
      }
    },
    scales: {
    	x: { min: 0, max: 635 }
    },
  },
}


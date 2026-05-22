// PIE CHART

// Setup
const DATA_COUNT = 4;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const data = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'usd_value',
      data: [24530944420, 26167785416, 31704905652, 34148111644],
      backgroundColor: [
        'lightgreen',
        'lightblue',
        'lightpink',
        'lightyellow'
      ]
    }
  ]
};
// Config
const ctx = document.getElementById('pieChart');
const config = {
  type: 'pie',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
        position: 'top',
      },
      title: {
        display: true,
        text: 'Importation 2026 - Month',
        color: 'white'
      }
    }
  },
};
new Chart(ctx, config);


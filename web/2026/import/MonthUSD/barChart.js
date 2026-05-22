// PIE CHART

// Setup
const DATA_COUNT = 4;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const labels = ['January', 'February', 'March', 'April'];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'USD',
      data: [20792206002, 22162399604, 25204591643, 23610885776],
      borderColor: 'black',
      backgroundColor: 'rgb(140, 149, 242)',
      color: 'white',
      borderWidth: 2,
      borderRadius: 5,
      borderSkipped: false,
    }
  ]
};
// Config
const ctx = document.getElementById('barChart');
const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {

      y: {
        ticks: {
          color: '#cbd5e1'
        },

        grid: {
          color: 'rgba(255,255,255,0.08)'
        }
      },

      x: {
        ticks: {
          color: '#cbd5e1'
        },

        grid: {
          color: 'rgba(255,255,255,0.05)'
        }
      }
    },
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white'
        },
        position: 'top'
      },
      title: {
        display: true,
        color: 'white',
        text: 'Importation 2026 - Month'
      }
    }
  },
};
new Chart(ctx, config);


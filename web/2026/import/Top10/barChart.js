// PIE CHART

// Setup
const DATA_COUNT = 10;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const labels = ['China', 'Estados Unidos', 'Coreia do Sul', 'Alemanha', 'Argentina', 'Rússia', 'Índia', 'Itália', 'México', 'Japão'];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'USD',
      data: [23961648205, 12269314786, 4700606629, 4673630775, 3921127455, 3514668198, 2431208063, 2304160439, 2199260953, 1919102331],
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
      x: {
        ticks: {
          color: 'white'
        }, grid: {
          color: 'white'
        }, border: {
          color: 'white'
        }
      },
      y: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'white'
        },
        border: {
          color: 'white'
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


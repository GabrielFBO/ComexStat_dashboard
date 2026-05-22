// PIE CHART

// Setup
const DATA_COUNT = 10;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const labels = ['China', 'Estados Unidos', 'Argentina', 'Países Baixos (Holanda)', 'Índia', 'Espanha', 'Singapura', 'México', 'Canadá', 'Alemanha'];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'USD',
      data: [35610954151, 10904901448, 4736123103, 3779243032, 3302770956, 2794870750, 2620710447, 2519759343, 2459515850, 2271206039],
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


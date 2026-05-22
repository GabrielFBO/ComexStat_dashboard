// PIE CHART

// Setup
const DATA_COUNT = 10;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const data = {
  labels: ['China', 'Estados Unidos', 'Argentina', 'Países Baixos (Holanda)', 'Índia', 'Espanha', 'Singapura', 'México', 'Canadá', 'Alemanha'],
  datasets: [
    {
      label: 'usd_value',
      data: [35610954151, 10904901448, 4736123103, 3779243032, 3302770956, 2794870750, 2620710447, 2519759343, 2459515850, 2271206039],
      backgroundColor: [
        'lightgreen',
        'lightblue',
        'lightpink',
        'lightyellow',
        'orange',
        'green',
        'grey',
        'blue',
        'red',
        'black'

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


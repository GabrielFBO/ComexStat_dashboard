// PIE CHART

// Setup
const DATA_COUNT = 10;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const data = {
  labels: ['China', 'Estados Unidos', 'Coreia do Sul', 'Alemanha', 'Argentina', 'Rússia', 'Índia', 'Itália', 'México', 'Japão'],
  datasets: [
    {
      label: 'usd_value',
      data: [23961648205, 12269314786, 4700606629, 4673630775, 3921127455, 3514668198, 2431208063, 2304160439, 2199260953, 1919102331],
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

    maintainAspectRatio: true,

    plugins: {

      legend: {
        labels: {
          color: '#f1f5f9',
          font: {
            size: 14
          }
        }
      },

      title: {
        display: true,
        color: 'white'
      }
    }
  }
}
new Chart(ctx, config);


// PIE CHART

// Setup
const DATA_COUNT = 4;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const data = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'USD',
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


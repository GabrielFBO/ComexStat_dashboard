let chartInstance = null;

fetch("../../../../data/processed/import_month.json")

    .then(response => response.json())

    .then(json => {

        const months = [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
        ];

        const colors = [
            "#8c95f2",
            "#4ade80",
            "#f97316",
            "#f43f5e",
            "#cdd406"
        ];

        function buildChart() {

            const selectedYears = [...document.querySelectorAll(
                '.yearSelector input:checked'
            )].map(item => Number(item.value));

            const datasets = [];

            selectedYears.forEach((year, index) => {

                const yearData = json.filter(
                    item => item.year === year
                );

                const values = months.map(month => {

                    const found = yearData.find(
                        item => item.month === month
                    );

                    return found ? found.total : 0;

                });

                datasets.push({

                    label: String(year),
                    data: values,
                    backgroundColor: colors[index],
                    borderColor: "black",
                    borderWidth: 2,
                    borderRadius: 5,
                    borderSkipped: false

                });

            });

            if (chartInstance) {
                chartInstance.destroy();
            }

            const ctx = document.getElementById("barChart");

            chartInstance = new Chart(ctx, {

                type: "bar",

                data: {

                    labels: months,

                    datasets: datasets

                },

                options: {

                    responsive: true,

                    scales: {

                        y: {

                            ticks: {
                                color: "#cbd5e1"
                            },

                            grid: {
                                color: "rgba(255,255,255,0.08)"
                            }

                        },

                        x: {

                            ticks: {
                                color: "#cbd5e1"
                            },

                            grid: {
                                color: "rgba(255,255,255,0.05)"
                            }

                        }

                    },

                    plugins: {

                        legend: {

                            labels: {
                                color: "white"
                            }

                        },

                        title: {

                            display: true,
                            color: "white",
                            text: "Brazil Monthly Exports Comparison"

                        }

                    }

                }

            });

        }

        buildChart();

        document
            .getElementById("updateChart")
            .addEventListener("click", buildChart);

    })

    .catch(error => {

        console.error(error);

    });
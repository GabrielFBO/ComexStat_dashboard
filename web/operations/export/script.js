// Guarda a instância atual do gráfico.
// Isso permite destruir o gráfico antigo antes de criar um novo.
let chartInstance = null;


// Carrega o arquivo JSON que contém os dados.
fetch("../../../../data/processed/export_month.json")

    // Converte a resposta para JSON.
    .then(response => response.json())

    // Recebe os dados já convertidos.
    .then(json => {

        // Ordem fixa dos meses.
        // Usamos isso porque o JSON pode não vir ordenado.
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

        // Cores para cada ano selecionado.
        const colors = [
            "#8c95f2",
            "#4ade80",
            "#f97316",
            "#f43f5e",
            "#cdd406"
        ];
        // Países para o filtro
        const countries = [
            ...new Set(json.map(item => item.country_name))].sort();
        const datalist = document.getElementById("countries");

        countries.forEach(country => {

            const option = document.createElement("option");
            option.value = country;

            datalist.appendChild(option);

        });

        // =====================================================
        // FUNÇÃO PRINCIPAL
        // Monta ou atualiza o gráfico.
        // =====================================================
        function buildChart() {

            // Procura todos os checkboxes marcados.
            const selectedYears = [...document.querySelectorAll(
                '.yearSelector input:checked'
            )].map(item => Number(item.value));

            // Procura os países selecionados.
            const selectedCountries = [
                document.getElementById("country1").value,
                document.getElementById("country2").value
            ].filter(country => country !== "");

            // Aqui serão armazenados os datasets
            // que o Chart.js irá desenhar.
            const datasets = [];


            // Percorre todos os anos selecionados.
            selectedYears.forEach((year, index) => {

                // Filtra apenas os registros daquele ano.
                //
                // Exemplo:
                // Se year = 2026
                //
                // Retorna apenas os registros de 2026.
                const yearData = json.filter(
                    item => item.year === year
                );


                // Cria um array com os valores de Janeiro a Dezembro.
                const values = months.map(month => {

                    // Procura o registro do mês atual.
                    const found = yearData.find(
                        item => item.month === month
                    );

                    // Se encontrou:
                    // retorna o total
                    //
                    // Se não encontrou:
                    // retorna 0
                    return found ? found.total : 0;

                });


                // Cria um dataset para o ano atual.
                datasets.push({

                    // Nome exibido na legenda.
                    label: String(year),

                    // Valores que serão desenhados.
                    data: values,

                    // Cor das barras.
                    backgroundColor: colors[index],

                    borderColor: "black",
                    borderWidth: 2,
                    borderRadius: 5,
                    borderSkipped: false

                });

            });


            // Se já existe um gráfico,
            // destrói antes de criar outro.
            //
            // Evita gráficos duplicados.
            if (chartInstance) {
                chartInstance.destroy();
            }


            // Obtém o canvas do HTML.
            const ctx = document.getElementById("barChart");


            // =====================================================
            // CHART.JS COMEÇA AQUI
            // =====================================================
            chartInstance = new Chart(ctx, {

                // Tipo do gráfico.
                type: "bar",

                // Dados do gráfico.
                data: {

                    // Eixo X.
                    labels: months,

                    // Séries de dados.
                    datasets: datasets

                },

                // Configurações visuais.
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

                        // Legenda.
                        legend: {

                            labels: {
                                color: "white"
                            }

                        },

                        // Título do gráfico.
                        title: {

                            display: true,
                            color: "white",
                            text: "Brazil Monthly Exports Comparison"

                        }

                    }

                }

            });

        }


        // Cria o gráfico automaticamente
        // quando a página abre.
        buildChart();


        // Quando o usuário clicar no botão,
        // o gráfico será reconstruído.
        document
            .getElementById("updateChart")
            .addEventListener("click", buildChart);

    })


    // Se ocorrer erro ao carregar JSON.
    .catch(error => {

        console.error(error);

    });
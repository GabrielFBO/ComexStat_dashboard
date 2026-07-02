let chartInstance = null;

const PAGE_TYPE = "import"; 

Promise.all([
    fetch("../../data/processed/export_month.json")
        .then(response => response.json()),
    fetch("../../data/processed/import_month.json")
        .then(response => response.json())
])
    .then(([exportsData, importsData]) => {
            const json =
            PAGE_TYPE === "export" ? exportsData : importsData;
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
        const monthsAbbr = [
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez"
        ];
        const colors = [
            "#8c95f2",
            "#4ade80",
            "#f97316",
            "#f43f5e",
            "#cdd406",
            "#06b6d4",
            "#a855f7"
        ];
        // Lista de países
        const countries = [
            ...new Set(
                json.map(item => item.country_name)
            )
        ].sort();
        const datalist =
            document.getElementById("countries");
        countries.forEach(country => {
            const option =
                document.createElement("option");
            option.value = country;
            datalist.appendChild(option);
        });
        // Função principal
        function buildChart() {
            const mode =
                document.getElementById("chartMode").value;
            if (mode === "ranking") {
                buildRankingChart();
            } else {
                buildMonthChart();
            }
        }
        // Monthly Analysis
        function buildMonthChart() {
            const selectedYears = [...document.querySelectorAll(
                ".yearSelector input:checked"
            )].map(item => Number(item.value));
            const selectedCountries = [
                document.getElementById("country1").value,
                document.getElementById("country2").value
            ].filter(country => country !== "");
            const datasets = [];
            const barBorderWidth =
                selectedYears.length > 3 ? 0 : 1;
            // Sem país selecionado
            if (selectedCountries.length === 0) {
                selectedYears.forEach((year, index) => {
                    const values = months.map(month => {
                        return json
                            .filter(item =>
                                item.year === year &&
                                item.month === month
                            )
                            .reduce(
                                (sum, item) => sum + item.total,
                                0
                            );
                    });
                    datasets.push({
                        label: String(year),
                        data: values,
                        backgroundColor:
                            colors[index % colors.length],
                        borderColor: "rgba(0,0,0,0.4)",
                        borderWidth: barBorderWidth,
                        borderRadius: 5
                    });
                });
            }
            // Um país
            else if (selectedCountries.length === 1) {
                const country =
                    selectedCountries[0];
                selectedYears.forEach((year, index) => {
                    const values = months.map(month => {
                        const found = json.find(item =>
                            item.year === year &&
                            item.month === month &&
                            item.country_name === country
                        );
                        return found ? found.total : 0;
                    });
                    datasets.push({
                        label: `${country} - ${year}`,
                        data: values,
                        backgroundColor:
                            colors[index % colors.length],

                        borderColor: "rgba(0,0,0,0.4)",
                        borderWidth: barBorderWidth,
                        borderRadius: 5
                    });
                });
            }
            // Dois países
            else {
                selectedCountries.forEach(
                    (country, index) => {
                        const values = months.map(month => {
                            return selectedYears.reduce(
                                (sum, year) => {
                                    const found = json.find(item =>
                                        item.year === year &&
                                        item.month === month &&
                                        item.country_name === country
                                    );
                                    return sum + (found ? found.total : 0);
                                },
                                0
                            );
                        });
                        datasets.push({
                            label:
                                `${country} (${selectedYears.join(", ")})`,
                            data: values,
                            backgroundColor:
                                colors[index % colors.length],
                            borderColor: "rgba(0,0,0,0.4)",
                            borderWidth: 1,
                            borderRadius: 5
                        });
                    }
                );
            }
            createChart(
                monthsAbbr,
                datasets,
                `${PAGE_TYPE === "export" ? "Exportação" : "Importação"} Mensal`,
                { rotate: true, autoSkip: false }
            );
        }
        // Ranking
        function buildRankingChart() {
            const selectedYears = [...document.querySelectorAll(
                ".yearSelector input:checked"
            )].map(item => Number(item.value));
            const topN = Number(
                document.getElementById("topN").value
            );
            const countryTotals = {};
            json.forEach(item => {
                if (
                    selectedYears.includes(item.year)
                ) {
                    if (!countryTotals[item.country_name]) {
                        countryTotals[item.country_name] = 0;
                    }
                    countryTotals[item.country_name] +=
                        item.total;
                }
            });
            const ranking = Object.entries(
                countryTotals
            )
                .map(([country, total]) => ({
                    country,
                    total
                }))
                .sort(
                    (a, b) => b.total - a.total
                )
                .slice(0, topN);
            const labels =
                ranking.map(item => item.country);
            const values =
                ranking.map(item => item.total);
            const datasets = [
                {
                    label:
                        `USD (Bilhões)`,
                    data: values,
                    backgroundColor: "#8c95f2",
                    borderColor: "rgba(0,0,0,0.4)",
                    borderWidth: 1,
                    borderRadius: 5
                }
            ];
            createChart(
                labels,
                datasets,
                `Top ${topN} ${PAGE_TYPE === "export" ? "Países destino de exportação" : "Países de origem de importação"}`,
                { rotate: true, autoSkip: true }
            );
        }
        function updateKPIs() {
            const selectedYears = [...document.querySelectorAll(
                ".yearSelector input:checked"
            )].map(item => Number(item.value));
            // EXPORTS FILTRADOS
            const filteredExports = exportsData.filter(item =>
                selectedYears.includes(item.year)
            );
            // IMPORTS FILTRADOS
            const filteredImports = importsData.filter(item =>
                selectedYears.includes(item.year)
            );
            // DADOS DA PÁGINA ATUAL
            const currentData =
                json.filter(item =>
                    selectedYears.includes(item.year)
                );
            // KPI 1 TOTAL USD
            const totalUSD = currentData.reduce(
                (sum, item) => sum + item.total,
                0
            );
            document.getElementById("totalUSD").textContent =
                "US$ " + totalUSD.toLocaleString();
            // KPI 2 TRADE BALANCE
            const totalExports = filteredExports.reduce(
                (sum, item) => sum + item.total,
                0
            );
            const totalImports = filteredImports.reduce(
                (sum, item) => sum + item.total,
                0
            );
            const tradeBalance =
                totalExports - totalImports;
            const balance =
                document.getElementById("tradeBalance");
            if (tradeBalance >= 0) {
                balance.textContent =
                    "US$ " +
                    tradeBalance.toLocaleString();
                balance.style.color = "#4ade80";
            } else {
                balance.textContent =
                    "-US$ " +
                    Math.abs(tradeBalance).toLocaleString();
                balance.style.color = "#f43f5e";
            }
            // KPI 3 TOP COUNTRY
            const countryTotals = {};
            currentData.forEach(item => {
                if (!countryTotals[item.country_name]) {
                    countryTotals[item.country_name] = 0;
                }
                countryTotals[item.country_name] += item.total;
            });
            const ranking = Object.entries(countryTotals)
                .sort((a, b) => b[1] - a[1]);
            document.getElementById("topCountry").textContent =
                ranking.length > 0
                    ? ranking[0][0]
                    : "-";
        }
        function createChart(
            labels,
            datasets,
            title,
            { rotate = false, autoSkip = false } = {}
        ) {
            if (chartInstance) {
                chartInstance.destroy();
            }
            const ctx =
                document.getElementById("barChart");
            chartInstance = new Chart(ctx, {
                type: "bar",
                data: {
                    labels,
                    datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            ticks: {
                                color: "#cbd5e1",
                                callback: value =>
                                    (value / 1_000_000_000)
                                        .toLocaleString("pt-BR")
                            },
                            title: {
                                display: true,
                                text: "USD (Bilhões)",
                                color: "#94a3b8"
                            },
                            grid: {
                                color:
                                    "rgba(255,255,255,0.08)"
                            }
                        },
                        x: {
                            ticks: {
                                color: "#cbd5e1",
                                maxRotation: rotate ? 60 : 0,
                                minRotation: rotate ? 60 : 0,
                                autoSkip: autoSkip,
                                font: {
                                    size: window.innerWidth < 480 ? 9 : 12
                                }
                            },
                            grid: {
                                color:
                                    "rgba(255,255,255,0.05)"
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: "white",
                                font: {
                                    size: window.innerWidth < 768 ? 11 : 14
                                }
                            }
                        },
                        title: {
                            display: true,
                            color: "white",
                            text: title,
                            font: {
                                size: window.innerWidth < 768 ? 11 : 14
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: context => {
                                    const billions =
                                        context.parsed.y / 1_000_000_000;
                                    return `${context.dataset.label}: US$ ${billions.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}B`;
                                }
                            }
                        }
                    }
                }
            });
        }
        function updateFilters() {
            const mode =
                document.getElementById("chartMode").value;
            const topSection =
                document.getElementById("topSection");
            const countrySection1 =
                document.getElementById("countrySection1");
            const countrySection2 =
                document.getElementById("countrySection2");
            if (mode === "month") {
                topSection.style.display = "none";
                countrySection1.style.display = "block";
                countrySection2.style.display = "block";
            }
            else {
                topSection.style.display = "block";
                countrySection1.style.display = "none";
                countrySection2.style.display = "none";
            }
        }
        updateFilters();
        function buildChart() {
            updateKPIs();
            const mode =
                document.getElementById("chartMode").value;
            if (mode === "ranking") {
                buildRankingChart();
            } else {
                buildMonthChart();
            }
        }
        // gráfico inicial
        buildChart();
        // botão update
        document
            .getElementById("updateChart")
            .addEventListener(
                "click",
                buildChart
            );
        // troca de modo
        document
            .getElementById("chartMode")
            .addEventListener(
                "change",
                () => {
                    updateFilters();
                    buildChart();
                }
            );
    })
    .catch(error => {
        console.error(error);
    });
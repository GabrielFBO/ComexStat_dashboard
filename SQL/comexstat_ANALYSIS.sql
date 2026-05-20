--import country monthly

SELECT [month], SUM(usd_value) AS usd FROM import_26 GROUP BY [month] ORDER BY usd DESC

--import usd country

SELECT country_name, SUM(usd_value) AS usd FROM import_26 GROUP BY country_name ORDER BY usd DESC

--export country monthly

SELECT [month], SUM(usd_value) AS usd FROM export_26 GROUP BY [month] ORDER BY usd DESC

--export usd country

SELECT country_name, SUM(usd_value) AS usd FROM export_26 GROUP BY country_name ORDER BY usd DESC

--import month usd
USE [comexstat]
SELECT [month], SUM(usd_value) AS usd FROM import_26 GROUP BY [month] ORDER BY usd DESC

--import top 10 country usd

SELECT TOP 10 country_name, SUM(usd_value) AS usd FROM import_26 GROUP BY country_name ORDER BY usd DESC

--export month usd

SELECT [month], SUM(usd_value) AS usd FROM export_26 GROUP BY [month] ORDER BY usd DESC

--export top 10 country usd

SELECT TOP 10 country_name, SUM(usd_value) AS usd FROM export_26 GROUP BY country_name ORDER BY usd DESC

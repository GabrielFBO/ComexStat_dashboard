USE [comexstat]
GO

--2026
SELECT [month], SUM(usd_value) AS usd FROM import_26 GROUP BY [month] ORDER BY usd DESC



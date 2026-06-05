USE [comexstat]
GO

--2026
USE [comexstat]
SELECT [month], SUM(usd_value) AS usd FROM export_26 GROUP BY [month] ORDER BY usd DESC
USE [comexstat]
GO

--2026
SELECT
    TOP 10 country_name,
    SUM(usd_value) AS usd
FROM
    export_26
GROUP BY
    country_name
ORDER BY
    usd DESC
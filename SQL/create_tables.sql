CREATE DATABASE comexstat

USE [comexstat]
GO

CREATE TABLE exportation (
    year INT,
    month VARCHAR(20),
    country_name VARCHAR(100),
    usd_value BIGINT
)

CREATE TABLE importation (
    year INT,
    month VARCHAR(20),
    country_name VARCHAR(100),
    usd_value BIGINT
)



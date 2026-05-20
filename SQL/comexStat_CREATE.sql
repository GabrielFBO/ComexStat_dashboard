CREATE DATABASE comexstat

USE [comexstat]

CREATE TABLE export_26 (
    year INT,
    month VARCHAR(20),
    country_name VARCHAR(100),
    usd_value BIGINT
)

CREATE TABLE import_26 (
    year INT,
    month VARCHAR(20),
    country_name VARCHAR(100),
    usd_value BIGINT
);

DROP TABLE export
DROP TABLE import
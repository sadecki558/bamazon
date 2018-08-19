DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER (10) NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(30),
    department_name VARCHAR(30),
    price INTEGER(10),
    stock_quantity INTEGER(10),
    mastered BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (item_id)
    );
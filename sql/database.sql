CREATE DATABASE clients_db_test;

CREATE TABLE clients(
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  apellido VARCHAR(200) NOT NULL,
  fecha_nacimiento DATE NOT NULL
);

DESCRIBE clients;
# API de Clientes

## Inicializar Proyecto

Instalar las dependencias y ejecutar la aplicacion con:

```
npm install
npm start
```

## Configuracion de Base de datos local
* Se debe usar Mysql
* Se debe crear una base de datos con el nombre `clients_db_test` 
* Se debe crear una tabla clients con la estructura que esta en el archivo `./sql/database.sql`

## Caracteristicas

* Endpoint para obtener todos los clientes
* Endpoint para crear clientes
* Endpoint para obtener el promedio de edad de los clientes
* En produccion se uso Google Cloud para levantar la API
* Se hizo uso de PlanetScale para la base de datos en produccion de Mysql
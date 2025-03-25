# Hotel Management Monorepo

Este proyecto contiene una API desarrollada en Laravel y una aplicación web desarrollada en React. Se utiliza Docker para manejar los contenedores de ambas aplicaciones y la base de datos PostgreSQL.


## Ejemplo en producción

La aplicación ha sido desplegada en Render Cloud utilizando contenedores para la API y la aplicación web, además de una instancia de PostgreSQL. Para visualizar el ejemplo se puede acceder al siguiente enlace:
[https://hotel-management-1-luz8.onrender.com/](https://hotel-management-1-luz8.onrender.com/)



## Instalación

Pasos para configurar el entorno local:

### Requisitos

Tener instalado:
- Docker
- Docker Compose
- Git

### Clonar el repositorio
```
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>
```
### Configurar la API
1. Copiar el archivo .env.example de la carpeta hotel-management-api y renómbralo como .env.
```
cp hotel-management-api/.env.example hotel-management-api/.env
```
2. Actualizar los valores relacionados con la base de datos en el archivo .env:
```
DB_CONNECTION=pgsql  
DB_HOST=database  
DB_PORT=5432  
DB_DATABASE=hotel_management  
DB_USERNAME=hotel_admin  
DB_PASSWORD=password  
```
### Construir y ejecutar los contenedores
Ejecutar el comando en la raíz del repositorio para construir y ejecutar los contenedores.
```
docker-compose up --build
```
## Acceso a la aplicación

- La API estará disponible en http://localhost:8888.
- La aplicación web estará disponible en http://localhost:3333.

## Apagar los contenedores

Para apagar los contenedores, ejecutar el comando correspondiente.
```
docker-compose down
```

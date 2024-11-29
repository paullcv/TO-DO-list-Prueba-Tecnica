# Prueba Técnica FullStack Developer: CRUD de Tareas (TO-DO list)

## Descripción del Proyecto

Este proyecto es una **aplicación Full Stack** que implementa un CRUD de tareas (TO-DO list). Utiliza **React (Vite)** para el frontend y **Laravel 11 (PHP 8.2)** para el backend, junto con **MySQL** como base de datos.

La aplicación está preparada para ejecutarse con **Docker** para facilitar su despliegue, y también se puede configurar manualmente si no deseas usar contenedores.

---

## Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Clonación y Configuración del Proyecto](#clonación-y-configuración-del-proyecto)
3. [Ejecución con Docker](#ejecución-con-docker)
4. [Ejecución Manual](#ejecución-manual)
5. [Notas y Consideraciones](#notas-y-consideraciones)

---

## Requisitos Previos

### Con Docker:
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/).

### Sin Docker:
- **Frontend**:
  - Node.js (v18 o superior) y npm.
- **Backend**:
  - PHP 8.2 y Composer.
  - MySQL (5.7 o superior).

---

## Clonación y Configuración del Proyecto

1. Clona este repositorio:
   ```bash
   git clone https://github.com/paullcv/TO-DO-list-Prueba-Tecnica.git
   cd TO-DO-list-Prueba-Tecnica
   ```


Configura los archivos `.env`

### Backend:
#### Copia el archivo .env.example y renómbralo como .env
cp backend/.env.example backend/.env

(Solo en este caso backend seria la palabra de ejemplo, el cambio que se debera a hacer esta en la carpeta TO-DO-list) asi:

cp TO-DO-list/.env.example TO-DO-list/.env


```

Configura las variables de conexión a la base de datos en `backend/.env`:
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=to_do_list
DB_USERNAME=root
DB_PASSWORD=rootpassword

```

## Ejecución con Docker

1. Detén contenedores previos si existen:
     ```bash
   docker-compose down -v
     ```

2. Construye las imágenes:
    ```bash
   docker-compose build
   ```

3. Levanta los servicios:
    ```bash
   docker-compose up -d
    ```

4. Verifica el estado de los servicios:
   ```bash
   docker-compose ps
   ```

5. Configura el backend:
   ```bash
   si se tuviese algun error al correr el docker file por el composer install que esta dentro del docker file ejecutar lo siguiente: docker-compose exec backend composer install

   docker-compose exec backend php artisan key:generate
   docker-compose exec backend php artisan migrate
   docker-compose exec backend php artisan config:clear
   ```

# Accede a las aplicaciones:

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:8000](http://localhost:8000)

## Ejecución Manual

### Backend
1. Ve al directorio del backend:
   ```bash
   cd TO-DO-list
   ```

2. Instala dependencias con Composer:
   ```bash
   composer install
   ```

3. Genera la key de Laravel:
   ```bash
   php artisan key:generate
   ```

4. Ejecuta las migraciones para crear las tablas:
   ```bash
   php artisan migrate
   ```

5. Inicia el servidor local:
   ```bash
   php artisan serve
   ```
   Por defecto, estará disponible en [http://localhost:8000](http://localhost:8000).

### Frontend
1. Ve al directorio del frontend:
   ```bash
   cd to-do-list-frontend
   ```

2. Instala dependencias con npm:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Por defecto, estará disponible en [http://localhost:5173](http://localhost:5173).

# Base de Datos

Si no estás usando Docker, asegúrate de tener una base de datos MySQL configurada y en ejecución. Crea una base de datos llamada `to_do_list` y actualiza las credenciales en `backend/.env`.

# Notas y Consideraciones

## Dependencias del Frontend:
- **React** (con Vite)
- **Axios**: para consumir la API.
- **React Router DOM**: para el manejo de rutas.
- **Bootstrap**: para estilos y diseño responsivo.

## Hot Reloading:
React y Laravel están configurados para reflejar automáticamente los cambios gracias al uso de volúmenes (en Docker) y Vite.

## Debugging:
- Logs del backend: `backend/storage/logs/laravel.log`.
- Logs del frontend: mostrados en la consola del navegador o terminal donde corre Vite.

## Actualización de Dependencias:
- **Frontend**:
  ```bash
  npm update
  ```

- **Backend**:
  ```bash
  composer update
  ```

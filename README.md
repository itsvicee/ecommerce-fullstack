# TechTienda - Plataforma de E-commerce Full-Stack

![Demostración de TechTienda](https://i.imgur.com/Qk7c5zC.gif)

TechTienda es una aplicación web completa de comercio electrónico construida desde cero. Este proyecto integra un frontend moderno y reactivo con un backend robusto y seguro, demostrando un ciclo de desarrollo full-stack de extremo a extremo, desde el registro de usuarios hasta el procesamiento de órdenes y la actualización de inventario.

## ✨ Funcionalidades Clave

* **Autenticación de Usuarios:** Registro seguro de usuarios con contraseñas encriptadas (bcrypt) y login con JSON Web Tokens (JWT).
* **Catálogo de Productos:** Visualización de productos obtenidos desde la API, con rutas dinámicas para las páginas de detalle.
* **Carrito de Compras Persistente:** Añade, gestiona las cantidades y elimina productos del carrito, con estado guardado en el `localStorage` para persistir la sesión.
* **Gestión de Stock:** El sistema valida el stock disponible desde la base de datos antes de permitir añadir productos al carrito.
* **Checkout y Creación de Órdenes:** Flujo de compra completo que registra la orden y sus ítems en la base de datos dentro de una transacción, actualizando el stock de los productos de forma atómica.
* **Diseño Totalmente Responsivo:** Interfaz construida con Tailwind CSS bajo el principio "mobile-first", completamente adaptable a cualquier tamaño de pantalla.

## 🛠️ Stack Tecnológico

| Área          | Tecnología                                                                                                                                                                                                                                                        |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white) ![React Router](https://img.shields.io/badge/-React_Router-CA4245?logo=react-router&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white) ![JWT](https://img.shields.io/badge/-JWT-000000?logo=json-web-tokens&logoColor=white)                                                                                                         |
| **Base de Datos** | ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white)                                                                                                                                                                   |
| **Herramientas** | ![Git](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white) ![VSCode](https://img.shields.io/badge/-VSCode-007ACC?logo=visual-studio-code&logoColor=white) ![Postman](https://img.shields.io/badge/-Postman-FF6C37?logo=postman&logoColor=white)                                                                                                         |

## 🚀 Instalación y Ejecución Local

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### Prerrequisitos

* Node.js (v18 o superior)
* npm
* PostgreSQL

### 1. Configuración del Backend

```bash
# Clona el repositorio
git clone [https://github.com/itsvicee/ecommerce-fullstack.git](https://github.com/tu-usuario/ecommerce-fullstack.git)
cd ecommerce-fullstack/backend

# Instala las dependencias
npm install

# Crea y configura tu archivo .env
# Renombra .env.example a .env y añade tus credenciales de PostgreSQL
cp .env.example .env
```

### 2. Configuración de la Base de Datos

Asegúrate de que tu servicio de PostgreSQL esté corriendo.

```bash
# Conéctate a psql o abre una herramienta de BD como pgAdmin
# y ejecuta los siguientes comandos SQL:

# 1. Crea la base de datos
CREATE DATABASE ecommerce_db;

# 2. Conéctate a la nueva base de datos y crea las tablas
\c ecommerce_db

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    image_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);
```

### 3. Configuración del Frontend

```bash
# Desde la raíz, navega a la carpeta del frontend
cd ../frontend

# Instala las dependencias
npm install
```

### 4. Ejecutar la Aplicación

Necesitarás dos terminales abiertas.

Terminal 1 (Backend):

cd backend
npm run dev
# El servidor backend estará corriendo en http://localhost:5000

Terminal 2 (Frontend):

cd frontend
npm run dev
# La aplicación de React se abrirá en http://localhost:5173

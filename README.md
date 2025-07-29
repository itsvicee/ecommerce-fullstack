# TechTienda - Plataforma de E-commerce Full-Stack

![Demostración de TechTienda](https://i.imgur.com/example.gif) <!-- Reemplazar con un GIF de tu aplicación -->

Una plataforma de e-commerce completa y moderna construida con el stack PERN (PostgreSQL, Express, React, Node.js) y totalmente contenerizada con Docker para un despliegue y desarrollo consistentes.

**Visita la Demo en Vivo:** [Enlace a tu demo desplegada] <!-- Añadirás esto en un futuro paso -->

---

## 🚀 Características Principales

* **Autenticación Segura:** Sistema de registro e inicio de sesión de usuarios con JSON Web Tokens (JWT).
* **Catálogo de Productos:** Visualización de productos obtenidos desde la API.
* **Páginas de Detalle:** Rutas dinámicas para mostrar información específica de cada producto.
* **Carrito de Compras Persistente:** Añade, elimina y gestiona la cantidad de productos en el carrito, con estado guardado en el navegador.
* **Proceso de Checkout Simulado:** Flujo completo para confirmar una orden y registrarla en la base de datos.
* **Entorno Contenerizado:** Toda la aplicación (Frontend, Backend, Base de Datos) está orquestada con Docker Compose para una configuración instantánea.
* **Reverse Proxy con Nginx:** Configuración de producción que sirve tanto el frontend como el backend bajo un mismo dominio, mejorando la seguridad y la eficiencia.

---

## 🛠️ Stack Tecnológico

### Backend
* **Node.js** con **Express.js** para el servidor API.
* **PostgreSQL** como base de datos relacional.
* **JWT (JSON Web Token)** para la autenticación.
* `bcrypt.js` para el hasheo seguro de contraseñas.
* `pg` como cliente de PostgreSQL para Node.js.

### Frontend
* **React.js** (con Vite) para una interfaz de usuario rápida y reactiva.
* **React Router DOM** para el enrutamiento del lado del cliente.
* **Tailwind CSS** para un diseño moderno y responsivo.
* **React Context API** para la gestión del estado global (autenticación y carrito).
* **Axios** para las peticiones HTTP al backend.

### DevOps
* **Docker & Docker Compose** para la contenerización y orquestación del entorno.
* **Nginx** como servidor web y reverse proxy en producción.

---

## 🏁 Cómo Empezar (Modo Docker - Recomendado)

Este método levanta toda la aplicación (frontend, backend, y base de datos) con un solo comando. Es la forma recomendada y profesional de ejecutar el proyecto.

### Prerrequisitos
* Tener **Docker** y **Docker Compose** instalados.
* Asegurarse de que la aplicación **Docker Desktop** esté corriendo.

### Pasos
1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/tu_usuario/ecommerce-fullstack.git](https://github.com/tu_usuario/ecommerce-fullstack.git)
    cd ecommerce-fullstack
    ```

2.  **Crea el archivo de variables de entorno:**
    Crea un archivo llamado `.env` en la raíz del proyecto y copia el contenido de `.env.example`.
    ```bash
    # No es necesario cambiar nada para el modo Docker,
    # docker-compose se encargará de todo.
    ```

3.  **Levanta la aplicación:**
    ```bash
    docker-compose up --build
    ```
    La primera vez, esto puede tardar unos minutos mientras se construyen las imágenes.

4.  **¡Listo!**
    * La aplicación estará disponible en `http://localhost`.
    * La API del backend estará disponible en `http://localhost/api` (manejado por el reverse proxy).

---

## 📦 Poblando la Base de Datos

La base de datos del contenedor se inicia vacía. Para ver productos, necesitas crearlos a través de la API.

1.  Usa **Postman** (o una herramienta similar) para registrar un nuevo usuario: `POST http://localhost/api/auth/register`.
2.  Inicia sesión con ese usuario para obtener un token: `POST http://localhost/api/auth/login`.
3.  Usa ese token (como Bearer Token) para crear un nuevo producto: `POST http://localhost/api/products`.

¡Ahora recarga la página y verás tus productos!

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

# Xplora+

## Índice
- [Resumen](#resumen)
- [Equipo](#equipo)
- [Funcionalidades principales](#funcionalidades-principales)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Base de datos](#base-de-datos)
  - [Infraestructura](#infraestructura)
  - [Testing](#testing)
- [Instalación y configuración](#instalación-y-configuración)
  - [Requisitos Previos](#requisitos-previos)
  - [Pasos](#pasos)

## Resumen

Xplora+ es una aplicación web que permite descubrir, reservar y administrar experiencias como tours, catas gastronómicas y actividades de aventura. Desarrollada como parte de un proyecto académico, integra funcionalidades orientadas al usuario y a la gestión administrativa, aplicando metodologías ágiles que simulan un entorno de trabajo profesional desde la planificación hasta la entrega por sprints.

## Equipo
* Gustavo Fuentes
* Daniela Ducuara
* Anghelo Flores
* Yehiron Toro
* Diana Clabel 
* Daniela Anttury
* Adriana Zurita
* Gustavo Contreras
* Brenda Ibarra
* Leidy Toro

## Funcionalidades principales
+ Búsqueda y reserva de experiencias.

+ Filtros por ciudad, categoría y rango de fechas.

+  Sistema de autenticación con tres tipos de usuarios: 
    + Usuario no registrado (navegación limitada).

    + Usuario registrado (acceso a reservas).

    + Administrador (gestión y creación de nuevas experiencias).

+ Panel de administración para la gestión completa de actividades.

+ Diseño responsivo e intuitivo para una mejor experiencia de usuario.

## Tecnologìas utilizadas


### Frontend:
- **React**: Librería para la construcción de interfaces de usuario.
- **react-router-dom**: Manejo de rutas para la navegación entre páginas.
- **react-datepicker**: Componente para seleccionar fechas con un calendario.
- **Material UI**: Framework de componentes de interfaz de usuario para React.
  - **Material UI Icons**: Se utilizaron íconos de Material UI para mejorar la experiencia visual.
- **CSS**: Estilizado y diseño de la interfaz de usuario.

### Backend:
- **Java**: Lenguaje de programación utilizado para el desarrollo del backend.
- **Spring**: Framework para crear aplicaciones Java empresariales.
- **Spring Boot**: Framework basado en Spring para simplificar la creación de aplicaciones backend.
- **Spring Security**: Gestión de autenticación y autorización.
- **API Rest**: Arquitectura para la comunicación entre sistemas.
- **JWT**: Autenticación basada en JSON Web Tokens.
- **Maven**: Herramienta de construcción y gestión de dependencias.
- **Swagger**: Herramienta para la documentación de APIs REST.

### Base de datos:
- **MySQL**: Sistema de gestión de bases de datos relacional.

### Infraestructura:
- **Railway**: Plataforma utilizada para el despliegue y la gestión continua de la aplicación en la nube, facilitando el entorno de producción.
  - **Deploy en Railway** utilizando pipelines desde **GitHub Actions**.
  - **Railway** para alojar el backend y frontend en la nube, proporcionando un entorno de producción completo.

### Testing:
- **Selenium**: Herramienta para la automatización de pruebas funcionales en el frontend.
- **Postman**: Herramienta para probar y documentar APIs.

## Instalación y configuración

### Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js**: Necesario para ejecutar el frontend.
- **Java 17**: Necesario para ejecutar el backend.
- **MySQL**: Sistema de gestión de bases de datos para almacenar los datos del proyecto.

### Pasos

1. Desde Visual Studio Code, abriremos la terminal dentro de la carpeta de frontend.

2. Posicionado dentro la carpeta 'frontend', usar npm i para instalar las dependencias necesarias.

```
$ npm install
```

3. Una vez completo el paso anterior, ejecutar el siguiente codigo en la consola:

```
$ npm run dev
```

- Esto nos iniciará el proyecto por default en localhost con el puerto 8080. http://localhost:8080









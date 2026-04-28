# Proyecto Arte-Fútbol

## 1. Descripción General

Este proyecto es una aplicación web desarrollada con **Angular** que simula una tienda en línea de artículos deportivos centrada en el fútbol. El objetivo principal de esta documentación es detallar la estructura del proyecto y el funcionamiento de sus componentes clave, especialmente el sistema de autenticación de usuarios.

La aplicación está diseñada como un proyecto **Standalone** de Angular, lo que significa que los componentes, servicios y módulos se gestionan de forma independiente sin un módulo raíz tradicional (`AppModule`).

## 2. Estructura del Directorio

La estructura del código fuente (`src/app/`) está organizada de la siguiente manera para facilitar la escalabilidad y el mantenimiento:

| Directorio | Contenido |
| :--- | :--- |
| `src/app/pages/` | Contiene los componentes que representan páginas completas de la aplicación (ej. `home`, `botas`, `equipaciones`). |
| `src/app/components/` | Contiene componentes reutilizables y compartidos (ej. `header`, `footer`, `registro-usuario`). |
| `src/app/services/` | Contiene la lógica de negocio y la comunicación con datos (ej. `autentication.ts`). |
| `src/app/model/` | Define las interfaces de los modelos de datos utilizados en la aplicación (ej. `usuario.ts`). |
| `src/app/assets/` | Almacena recursos estáticos como imágenes, fuentes y archivos de configuración. |

## 3. Componentes Clave y Funcionamiento

El corazón funcional de la aplicación reside en el sistema de gestión de usuarios, que se implementa a través de un modelo de datos, un servicio de autenticación y un componente de interfaz de usuario.

### 3.1. Modelo de Datos (`src/app/model/usuario.ts`)

El archivo `usuario.ts` define las interfaces de datos para la gestión de usuarios:

*   **`Usuario`**: La interfaz principal que representa a un usuario registrado. Incluye campos esenciales como `id`, `email`, `nombre`, y los campos de seguridad `passwordHash` y `salt`.
*   **`UsuarioRegistro`**: Define los datos mínimos requeridos para el proceso de registro (nombre, email, password).
*   **`UsuarioLogin`**: Define las credenciales necesarias para el inicio de sesión (email, password).

### 3.2. Servicio de Autenticación (`src/app/services/autentication.ts`)

El `AutenticacionService` es un servicio inyectable (`@Injectable({ providedIn: 'root' })`) que maneja toda la lógica de seguridad y persistencia de usuarios.

**Características Principales:**

1.  **Persistencia Local**: Los datos de usuario se almacenan en el **`localStorage`** del navegador bajo la clave `app_usuarios`. **Nota**: Este método es adecuado para demostraciones o entornos de desarrollo, pero no es seguro para una aplicación en producción, ya que los datos son accesibles en el cliente.
2.  **Seguridad de Contraseñas**:
    *   Utiliza la librería **`crypto-js`** para el hasheo de contraseñas.
    *   Implementa la función de derivación de clave **PBKDF2** (Password-Based Key Derivation Function 2) con 100,000 iteraciones y el algoritmo SHA256, lo que añade una capa de seguridad contra ataques de fuerza bruta.
    *   Genera un **`salt`** criptográfico único para cada usuario, asegurando que dos usuarios con la misma contraseña tengan hashes diferentes.
3.  **Métodos de Uso**:
    *   `generarUsuario(usuarioRegistro)`: Registra un nuevo usuario, hashea la contraseña y la guarda en `localStorage`.
    *   `login(credenciales)`: Verifica las credenciales hasheando la contraseña de entrada con el `salt` almacenado y comparando el resultado con el `passwordHash`.
    *   `verificarFortalezaPassword(password)`: Implementa una política de seguridad para contraseñas (mínimo 8 caracteres, mayúscula, minúscula, número y carácter especial).

### 3.3. Componente de Registro/Login (`src/app/components/registro-usuario/registro-usuario.ts`)

El componente `RegistroUsuario` es el encargado de la interfaz de usuario para el inicio de sesión y el registro.

**Funcionamiento de la Interfaz:**

*   **Manipulación del DOM**: Este componente utiliza el método de ciclo de vida `ngAfterViewInit` para manipular directamente el DOM (Document Object Model) a través de JavaScript nativo (`document.querySelectorAll`, `addEventListener`).
*   **Sistema de Pestañas**: La función `setupTabs()` gestiona la lógica para alternar entre los formularios de "Login" y "Registro".
    *   Identifica los botones de pestaña mediante la clase `.tab-button` y el atributo `data-tab`.
    *   Utiliza la clase CSS `.active` para controlar la visibilidad de los formularios (`.login-form`) y el estilo del botón seleccionado.

## 4. Instalación y Ejecución

Para poner en marcha el proyecto, siga los siguientes pasos:

### 4.1. Requisitos Previos

Asegúrese de tener instalado:

*   **Node.js** (versión LTS recomendada)
*   **npm** (Node Package Manager) o **Yarn**
*   **Angular CLI** (se puede instalar globalmente con `npm install -g @angular/cli`)

### 4.2. Pasos de Instalación

1.  **Navegar al Directorio**:
    ```bash
    cd futbolarte/arte-futbol
    ```

2.  **Instalar Dependencias**:
    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Ejecutar la Aplicación**:
    ```bash
    ng serve
    ```

La aplicación estará disponible en su navegador en `http://localhost:4200/`.

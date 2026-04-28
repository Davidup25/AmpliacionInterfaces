import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro-usuario.html',
  styleUrl: './registro-usuario.css',
})
export class RegistroUsuario {
  /**
  * Este método se ejecuta AUTOMÁTICAMENTE por Angular cuando:
  * 1. El componente ha sido inicializado (ngOnInit ya se ejecutó)
  * 2. La vista del componente (template HTML) ha sido completamente
  renderizada en el DOM
  * 3. Todos los elementos HTML del template ya están disponibles para
  manipulación
  *
  * Es el momento seguro para manipular el DOM porque los elementos ya existen
  */
  ngAfterViewInit(): void {
    // Lógica simple para cambiar entre pestañas
    this.setupTabs();
  }
  /**
   * setupTabs - Configura el comportamiento de las pestañas
   *
   * Este método es privado porque:
   * - Solo se usa internamente en este componente
   * - No necesita ser accesible desde otros componentes
   * - Es una implementación específica de este componente
   */
  private setupTabs(): void {
    /**
    * OBTENER TODOS LOS BOTONES DE PESTAÑA
    *
    * document.querySelectorAll('.tab-button'):
    * - document: Representa todo el DOM de la página
    * - querySelectorAll(): Método que busca elementos CSS en el DOM
    * - '.tab-button': Selector CSS que busca elementos con clase "tab-
    button"
    *
    * Resultado: Una NodeList (como un array) con TODOS los botones de
    pestaña
    * Ejemplo: [<button.tab-button>, <button.tab-button>]
    */
    const tabButtons = document.querySelectorAll('.tab-button');
    /**
    * OBTENER TODOS LOS FORMULARIOS
    *
    * document.querySelectorAll('.login-form'):
    * - '.login-form': Selector CSS que busca elementos con clase "login-
    form"
    *
    * Resultado: NodeList con TODOS los formularios de login/registro
    * Ejemplo: [<form#loginForm.login-form>, <form#registerForm.login-form>]
    */
    const forms = document.querySelectorAll('.login-form');
    /**
     * CONFIGURAR EVENTO CLICK PARA CADA BOTÓN
     *
     * tabButtons.forEach(button => { ... }):
     * - forEach(): Itera sobre cada elemento de la NodeList
     * - button: Cada botón individual en cada iteración
     *
     * Esto configura un "escuchador de eventos" para cada botón
     */
    tabButtons.forEach((button) => {
      /**
      * AGREGAR EVENT LISTENER PARA CLICK
      *
      * button.addEventListener('click', () => { ... }):
      * - addEventListener(): Método que "escucha" eventos en el elemento
      * - 'click': Tipo de evento a escuchar (cuando se hace clic)
      * - () => { ... }: Función anónima que se ejecuta CUANDO ocurre el
      click
      */
      button.addEventListener('click', () => {
        /**
         * PASO 1: REMOVER CLASE 'active' DE TODOS LOS BOTONES
         *
         * tabButtons.forEach(btn => btn.classList.remove('active')):
         * - Itera sobre TODOS los botones de pestaña
         * - btn: Cada botón en la iteración
         * - classList.remove('active'): Remueve la clase CSS 'active'
         *
         * Propósito: Desactivar visualmente TODAS las pestañas
         * antes de activar la que se hizo clic
         */
        tabButtons.forEach((btn) => btn.classList.remove('active'));
        /**
         * PASO 2: REMOVER CLASE 'active' DE TODOS LOS FORMULARIOS
         *
         * forms.forEach(form => form.classList.remove('active')):
         * - Itera sobre TODOS los formularios
         * - form: Cada formulario en la iteración
         * - classList.remove('active'): Remueve la clase CSS 'active'
         *
         * Propósito: Ocultar TODOS los formularios antes de mostrar
         * el que corresponde a la pestaña clickeada
         */
        forms.forEach((form) => form.classList.remove('active'));
        /**
         * PASO 3: ACTIVAR EL BOTÓN CLICKEADO
         *
         * button.classList.add('active'):
         * - button: El botón específico que recibió el clic
         * - classList.add('active'): Agrega la clase CSS 'active'
         *
         * Propósito: Resaltar visualmente la pestaña activa
         * (normalmente cambia color, fondo, borde, etc.)
         */
        button.classList.add('active');
        /**
        * PASO 4: IDENTIFICAR QUÉ FORMULARIO MOSTRAR
        *
        * const tabName = button.getAttribute('data-tab'):
        * - getAttribute('data-tab'): Lee el valor del atributo HTML
        "data-tab"
        * - En el HTML: <button data-tab="login"> o <button data-
        tab="register">
        * - tabName será: "login" o "register"
        *
        * Los atributos "data-*" se usan para almacenar información
        personalizada
        */
        const tabName = button.getAttribute('data-tab');
        /**
        * PASO 5: BUSCAR EL FORMULARIO CORRESPONDIENTE
        *
        * const formToShow = document.getElementById(tabName + 'Form'):
        * - tabName + 'Form': Concatena el nombre de la pestaña con
        "Form"
        * - Ejemplo: si tabName = "login" → "loginForm"
        * - document.getElementById(): Busca elemento por ID en el DOM
        * - En HTML: <form id="loginForm"> o <form id="registerForm">
        *
        * Resultado: Encuentra el formulario específico que debe
        mostrarse
        */
        const formToShow = document.getElementById(tabName + 'Form');
        /**
        * PASO 6: MOSTRAR EL FORMULARIO (SI EXISTE)
        *
        * if (formToShow) { ... }:
        * - Verifica SI el formulario fue encontrado (no es
        null/undefined)
        * - Esta validación evita errores si el elemento no existe
        *
        * formToShow.classList.add('active'):
        * - Agrega clase 'active' al formulario encontrado
        * - Por CSS, los formularios sin clase 'active' están ocultos
        * - Por CSS, los formularios CON clase 'active' son visibles
        */
        if (formToShow) {
          formToShow.classList.add('active');
        }
      });
    });
  }
}

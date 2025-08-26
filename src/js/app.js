/* Esperamos que todo el DOM esté cargado antes de ejecutar nuestro código */
document.addEventListener('DOMContentLoaded', ()=> {

  /* Elementos HTML */
  const inputNombre = document.querySelector('.input-name')
  const botonAgregar = document.querySelector('.button-add')
  let listaAmigos = document.getElementById("listaAmigos")
  const botonSortear = document.querySelector('.button-draw')
  const errorMensaje = document.getElementById('error-mensaje')
  const resultado = document.getElementById("resultado")

  // Array para almacenar los nombres ingresados
  let amigosIngresados = []
  // Expresión regular para validar los nombres
  const nombreFormato = /^(?=.{3,50}$)[\p{L}]+(?:[\s'-][\p{L}]+)*$/u

  /* Actualiza la lista de amigos ingresados en la interfaz */
  function actualizarLista() {
    listaAmigos.innerHTML = ''
    for(const nombreAmigo of amigosIngresados) {
      const itemAmigo = document.createElement("li")
      itemAmigo.textContent = nombreAmigo
      itemAmigo.style.textTransform = "capitalize"
      listaAmigos.appendChild(itemAmigo)
    }
  }

  /* Agrega un nuevo amigo a la lista */
  function agregarAmigo() {
    
    const nombreAmigo = inputNombre.value.trim() // Limpiar y almacenar el nombre ingresado
    limpiarError() // Limpiar errores previos

    // Validaciones
    if(!nombreAmigo) {
      mostrarError("Por favor, es necesario que inserte un nombre.")
      return
    } else if(nombreAmigo.length < 3) {
      mostrarError("Ingrese por favor un nombre válido. Mínimo de 3 caracteres. Máximo, 50.")
      return
    } else if(!validarFormatoAlfabetico(nombreAmigo)) {
      mostrarError("Formato inválido. Sólo letras de la 'A' a la 'Z'.")
      return
    } else if(amigosIngresados.some(friend => friend.toLowerCase() === nombreAmigo.toLowerCase())) {
      mostrarError("Ese nombre ya fue ingresado. Elija otro, por favor.")
      return
    }
    // Si todo está bien, guardamos el nombre
    amigosIngresados.push(nombreAmigo)
    inputNombre.value = "" // Limpia el input
    resultado.innerHTML = '' // Limpia resultados anteriores
    actualizarLista() // Actualiza la lista con el nuevo nombre
  }

  /* Verifica si el nombre cumple con el formato deseado mediante la regex */
  function validarFormatoAlfabetico(nombre) {
    return nombreFormato.test(nombre)
  }

  /* Sortea y muestra al amigo secreto de la lista */
  function obtenerAmigoSecreto() {
    limpiarError()
    resultado.innerHTML = ''

    // Validación: Mínimo 2 amigos para poder sortear
    if(amigosIngresados.length < 2) {
      mostrarError("Debe ingresar minimamente 2 amigos para realizar el sorteo.")
      return
    }

    // Elección aleatoria del amigo secreto
    const index = Math.floor(Math.random() * amigosIngresados.length)
    const secretFriend = amigosIngresados[index]

    // Mostrar el resultado y vaciar la lista
    resultado.innerHTML = `El amigo secreto es: <span class="capital">${secretFriend}</span>`
    listaAmigos.innerHTML = ''
    amigosIngresados.length = 0
  }

  /* Muestra un mensaje de error en la interfaz */
  function mostrarError(mensaje) {
    errorMensaje.textContent = mensaje
    errorMensaje.style.display = "block"
    errorMensaje.style.color = "red"
    errorMensaje.style.fontWeight = "bold"
    errorMensaje.style.fontFamily = "Inter, sans-serif"
    errorMensaje.style.marginTop = "4px"
  }

  /* Limpia el área de errores */
  function limpiarError() {
    errorMensaje.textContent = ""
    errorMensaje.style.display = "none"
  }

  /* EVENTOS */

  /* Interacciones del usuario */
  botonAgregar.addEventListener('click', agregarAmigo)
  botonSortear.addEventListener('click', obtenerAmigoSecreto)
  // Permite agregar con la tecla Enter
  inputNombre.addEventListener('keydown', (event)=> {
    if(event.key === 'Enter') agregarAmigo(event)
  })
  // Borrar el resultado previo en cuanto el usuario empiece a escribir nuevamente
  inputNombre.addEventListener('input', ()=> {
    resultado.innerHTML = ''
  })

})
// Fin: DOMContentLoaded
document.addEventListener('DOMContentLoaded', ()=> {

  const inputNombre = document.querySelector('.input-name')
  const botonAgregar = document.querySelector('.button-add')
  let listaAmigos = document.getElementById("listaAmigos")
  const botonSortear = document.querySelector('.button-draw')
  const resultado = document.getElementById("resultado")

  let amigosIngresados = []
  const nombreFormato = /^(?=.{3,50}$)[\p{L}]+(?:[\s'-][\p{L}]+)*$/u

  function actualizarLista() {
    listaAmigos.innerHTML = ''
    for(const nombreAmigo of amigosIngresados) {
      const itemAmigo = document.createElement("li")
      itemAmigo.textContent = nombreAmigo
      itemAmigo.style.textTransform = "capitalize"
      listaAmigos.appendChild(itemAmigo)
    }
  }

  function agregarAmigo(event) {
    
    const nombreAmigo = inputNombre.value.trim()

    if(!nombreAmigo) {
      alert("Por favor, es necesario que inserte un nombre.")
      return
    } else if(!validarFormatoAlfabetico(nombreAmigo)) {
      alert("Formato inválido. Sólo letras de la 'A' a la 'Z'.")
      return
    }else if(nombreAmigo.length < 3) {
      alert("Ingrese por favor un nombre válido. Mínimo de 3 caracteres.")
      return
    } else if(amigosIngresados.some(friend => friend.toLowerCase() === nombreAmigo.toLowerCase())) {
      alert("Ese nombre ya fue ingresado. Elija otro, por favor.")
      return
    }
    
    amigosIngresados.push(nombreAmigo)
    inputNombre.value = ""
    actualizarLista()  
  }

  function validarFormatoAlfabetico(nombre) {
    return nombreFormato.test(nombre)
  }

  function obtenerAmigoSecreto() {
    resultado.innerHTML = ''

    if(amigosIngresados.length < 2) {
      alert("Debe ingresar minimamente 2 amigos para realizar el sorteo.")
      return
    }

    const index = Math.floor(Math.random() * amigosIngresados.length)
    const secretFriend = amigosIngresados[index]

    resultado.innerHTML = `El amigo secreto es: <span class="capital">${secretFriend}</span>`
    listaAmigos.innerHTML = ''
    amigosIngresados.length = 0
  }


  botonAgregar.addEventListener('click', agregarAmigo)
  botonSortear.addEventListener('click', obtenerAmigoSecreto)

  inputNombre.addEventListener('keydown', (event)=> {
    if(event.key === 'Enter') agregarAmigo(event)
  })

})
// Fin: DOMContentLoaded
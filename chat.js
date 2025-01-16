const enviar = document.getElementById("enviar");
const mensaje = document.getElementById("mensaje")
const usuario = document.getElementById("usuario")
const chat = document.getElementById("chat")

window.addEventListener("load", () => {
    setInterval(mostrarChat, 1000);
})
function mostrarChat() {
    let chatActual
    let ahora = new Date()
    ahora.setTime(ahora.getTime() + 1000 * 60)
    document.cookie = `usuario = ${usuario.value}; expires = ${ahora.toUTCString()}; path =/`
    fetch('mensaje.php', {
        method: 'GET',
        headers: { "Content-type": 'application/json' }
    })
        .then(response => response.json()).then(data => {
            chatActual = data.chat
            formatearChat(chatActual)
        })
}


enviar.addEventListener("click", () => {
    let chatActual
    const datos = {
        usuario: usuario.value,
        mensaje: mensaje.value
    };
    if (datos.mensaje.trim() != "") {
        fetch("./mensaje.php", {
            method: "POST",
            headers: { "Content-type": 'application/json' },
            body: JSON.stringify(datos)
        }).then(response => response.json()).then(data => {
            chatActual = data.chat
            formatearChat(chatActual)
        })
        mensaje.value = ""
    }
})

/**
 * 
 * @param {String} chat 
 */
function formatearChat(chatActual) {
    let mensajes = chatActual.split(";")
    let mensaje
    chat.innerHTML = ""
    for (const texto of mensajes) {

        if (texto.includes("╝")) {
            mensaje = texto.split("╝")
            chat.innerHTML += `<p>${mensaje[0]}: ${mensaje[1]} ${mensaje[2]}</p>`
        }else{
            chat.innerHTML += `<p>${texto}</p>`
        }
    }
}
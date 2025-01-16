const formulario = document.getElementById("formulario");
const mensaje = document.getElementById("mensaje")
const usuario = document.getElementById("usuario")
const chat = document.getElementById("chat")

window.addEventListener("load", intervalo())
function mostrarChat()
{
    let ahora = new Date()
    ahora.setTime(ahora.getTime() + 1000 * 60)
    document.cookie = `usuario=${usuario.value}; expires=${ahora.toUTCString()}; path=/`
    fetch('mensaje.php', {
        method: 'GET',
        headers: {"Content-type": 'application/json'}
    })
            .then(response => response.json()).then(data => {
        chat.innerHTML = data.chat
    })
}
function intervalo(){
    let intervalo;
    intervalo = setInterval(mostrarChat(), 10);
}

formulario.addEventListener("submit", (req) => {
    req.preventDefault()
    const datos = {
        usuario: usuario.value,
        mensaje: mensaje.value
    };
    if (datos.mensaje.trim() != "") {
        fetch("./mensaje.php", {
            method: "POST",
            headers: {"Content-type": 'application/json'},
            body: JSON.stringify(datos)
        }).then(response => response.json()).then(data => {
            chat.innerHTML = data.chat
        })
        mensaje.value = ""
    }
})
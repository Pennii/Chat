<?php
$mensajesEscritos = file_get_contents('chat.txt');
if (trim($mensajesEscritos) === "") {
    $mensajesEscritos = "<p>Bienvenido al chat, recuerda comportarte</p>";
}
if (filter_input(INPUT_SERVER, "REQUEST_METHOD") === "POST") {
    $json = file_get_contents('php://input');
    $datos = json_decode($json, true);
    if (filter_has_var(INPUT_COOKIE, "usuario")) {
        $usuario = filter_input(INPUT_COOKIE, "usuario");
        $mensaje = htmlspecialchars($datos["mensaje"]);
        $mensaje = "<p>" . $usuario . ": " . $mensaje . " " . date('d-m-Y H:i:s') . "</p>";
    }else{
        $mensaje = "ERROR NO HAY USUARIO";
    }
    $chat = $mensajesEscritos . $mensaje;
} else {
    $chat = $mensajesEscritos;
}
file_put_contents('chat.txt', $chat);
echo json_encode(["chat" => $chat]);

<?php
$mensajesEscritos = file_get_contents('chat.txt');
if (trim($mensajesEscritos) === "") {
    $mensajesEscritos = "Bienvenido al chat, recuerda comportarte;";
}
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $json = file_get_contents('php://input');
    $datos = json_decode($json, true);
    if (filter_has_var(INPUT_COOKIE, "usuario")) {
        $usuario = filter_input(INPUT_COOKIE, "usuario");
        $mensaje = htmlspecialchars($datos["mensaje"]);
        $mensaje = $usuario . "╝" . $datos["mensaje"] . "╝" . date('d-m-Y H:i:s') . ";";
    }else{
        header("Location: index.html");
    }
    $chat = $mensajesEscritos . $mensaje;
} else {
    $chat = $mensajesEscritos;
}
file_put_contents('chat.txt', $chat);
echo json_encode(["chat" => $chat]);

<?php
// ─── CONFIGURAÇÃO DA SESSÃO ────────────────────────────────
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => '.app.github.dev',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'None'
]);
session_start();

// ─── HEADERS CORS ──────────────────────────────────────────
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed_origins = [
    'https://literate-space-couscous-jj6gqgw7vgvrf5pvx-4200.app.github.dev',
    'http://localhost:4200'
];
if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
} else {
    header('Access-Control-Allow-Origin: *');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$_SESSION = [];
session_destroy();

echo json_encode(['sucesso' => true, 'mensagem' => 'Logout realizado']);
<?php
// ─── CONFIGURAÇÃO DA SESSÃO (antes do session_start) ──────
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => '.app.github.dev',   // domínio compartilhado para todos os subdomínios
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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['erro' => 'Método não permitido']);
    exit;
}

$dados = json_decode(file_get_contents('php://input'), true);
$login = trim($dados['login'] ?? '');
$senha = $dados['senha'] ?? '';

if (empty($login) || empty($senha)) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Informe login e senha']);
    exit;
}

// ─── CREDENCIAIS FIXAS (sem banco) ──────────────────────────
$usuarios = [
    'admin' => 'admin2026',
    'teste' => '123456',
];

if (isset($usuarios[$login]) && $senha === $usuarios[$login]) {
    $_SESSION['usuario'] = $login;
    http_response_code(200);
    echo json_encode(['sucesso' => true, 'mensagem' => 'Login realizado com sucesso']);
    exit;
}

http_response_code(401);
echo json_encode(['sucesso' => false, 'mensagem' => 'Credenciais inválidas']);
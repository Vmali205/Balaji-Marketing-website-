<?php
require_once 'config.php';

$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($action === 'login') {
        $data = json_decode(file_get_contents('php://input'), true);
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        // Check against predefined credentials
        if ($username === ADMIN_USER && password_verify($password, ADMIN_PASS_HASH)) {
            $_SESSION['authenticated'] = true;
            $_SESSION['user'] = ['username' => $username];
            response(['success' => true, 'user' => $_SESSION['user']]);
        } else {
            response(['error' => 'Invalid credentials'], 401);
        }
    } elseif ($action === 'logout') {
        session_destroy();
        response(['success' => true]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($action === 'check') {
        if (isset($_SESSION['authenticated']) && $_SESSION['authenticated'] === true) {
            response(['authenticated' => true, 'user' => $_SESSION['user']]);
        } else {
            response(['authenticated' => false], 401);
        }
    }
}

response(['error' => 'Invalid action'], 400);
?>

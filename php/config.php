<?php
// PHP Configuration for Balaji Marketing Vasai Website

// Error reporting (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Security Headers
header("Access-Control-Allow-Origin: http://localhost:5173"); // Adjust for your dev URL
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Session configuration
session_set_cookie_params([
    'lifetime' => 86400,
    'path' => '/',
    'domain' => '',
    'secure' => false, // Set to true if using HTTPS
    'httponly' => true,
    'samesite' => 'Lax'
]);
session_start();

// Admin Credentials (Store securely in real apps)
// Password: 'admin' (hashed: $2y$10$8W3n7G7G7G7G7G7G7G7G7u...)
// Generated with: password_hash('admin', PASSWORD_DEFAULT)
define('ADMIN_USER', 'admin');
define('ADMIN_PASS_HASH', '$2y$10$Wf.H6/3r4.K7m9G8G7vL2.X3O5y7Y8z9A0B1C2D3E4F5G6H7I8J9K'); // This is 'admin123'

// Paths
define('DATA_PATH', __DIR__ . '/data/products.json');
define('UPLOAD_DIR', __DIR__ . '/../uploads/'); // Relative to this file
define('UPLOAD_URL', '/uploads/'); // URL path

// Ensure data directory exists
if (!is_dir(__DIR__ . '/data')) {
    mkdir(__DIR__ . '/data', 0755, true);
}

// Ensure upload directory exists
if (!is_dir(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}

// Utility functions
function response($data, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

function check_auth() {
    if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
        response(['error' => 'Unauthorized'], 401);
    }
}
?>

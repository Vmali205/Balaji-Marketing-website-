<?php
require_once 'cors.php';

define('DATA_PATH', '../data/orders.json');

// Ensure data directory exists
$dataDir = dirname(DATA_PATH);
if (!file_exists($dataDir)) {
    mkdir($dataDir, 0777, true);
}

function response($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;
$id = $_GET['id'] ?? null;

// Read JSON input
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if ($method === 'OPTIONS') {
    exit(0);
}

// Authentication check for GET and PUT (Admin only)
// Note: POST is allowed for guests (placing an order)
if ($method === 'GET' || $method === 'PUT') {
    session_start();
    if (!isset($_SESSION['user_id'])) {
        response(['error' => 'Unauthorized'], 401);
    }
}

switch ($method) {
    case 'GET':
        handle_get($id);
        break;
    case 'POST':
        handle_post($input);
        break;
    case 'PUT':
        handle_put($id, $input);
        break;
    default:
        response(['error' => 'Method not allowed'], 405);
}

function handle_get($id = null) {
    $orders = file_exists(DATA_PATH) ? json_decode(file_get_contents(DATA_PATH), true) : [];
    
    if ($id) {
        $order = array_filter($orders, function($o) use ($id) {
            return $o['id'] === $id;
        });
        
        if (empty($order)) {
            response(['error' => 'Order not found'], 404);
        }
        response(array_values($order)[0]);
    }
    
    // Sort orders by createdAt descending
    usort($orders, function($a, $b) {
        return strtotime($b['createdAt']) - strtotime($a['createdAt']);
    });
    
    response($orders);
}

function handle_post($input) {
    if (!$input) {
        response(['error' => 'Invalid JSON input'], 400);
    }

    $orders = file_exists(DATA_PATH) ? json_decode(file_get_contents(DATA_PATH), true) : [];
    
    // Validation
    if (empty($input['items']) || empty($input['customer']) || empty($input['shipping'])) {
        response(['error' => 'Missing required fields'], 400);
    }

    $newOrder = [
        'id' => 'ORD-' . strtoupper(substr(uniqid(), -6)),
        'items' => $input['items'],
        'customer' => $input['customer'],
        'shipping' => $input['shipping'],
        'paymentMethod' => $input['paymentMethod'] ?? 'cod',
        'paymentId' => $input['paymentId'] ?? null,
        'subtotal' => $input['subtotal'] ?? 0,
        'shippingCost' => $input['shippingCost'] ?? 0,
        'total' => $input['total'] ?? 0,
        'status' => $input['status'] ?? 'pending',
        'createdAt' => date('c'),
        'updatedAt' => date('c'),
    ];

    $orders[] = $newOrder;
    file_put_contents(DATA_PATH, json_encode($orders, JSON_PRETTY_PRINT));
    
    response($newOrder, 201);
}

function handle_put($id, $input) {
    if (!$id) {
        response(['error' => 'ID required'], 400);
    }
    
    if (!isset($input['status'])) {
        response(['error' => 'Status is required'], 400);
    }

    $orders = file_exists(DATA_PATH) ? json_decode(file_get_contents(DATA_PATH), true) : [];
    $foundIndex = -1;
    
    foreach ($orders as $index => $o) {
        if ($o['id'] === $id) {
            $foundIndex = $index;
            break;
        }
    }
    
    if ($foundIndex === -1) {
        response(['error' => 'Order not found'], 404);
    }
    
    $orders[$foundIndex]['status'] = $input['status'];
    $orders[$foundIndex]['updatedAt'] = date('c');

    file_put_contents(DATA_PATH, json_encode($orders, JSON_PRETTY_PRINT));
    response($orders[$foundIndex]);
}

<?php
require_once 'cors.php';

// In a real app, these should be in environment variables or config
define('RAZORPAY_KEY_ID', 'rzp_test_placeholder');
define('RAZORPAY_KEY_SECRET', 'test_secret_placeholder');

function response($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

if ($method === 'OPTIONS') {
    exit(0);
}

if ($method !== 'POST') {
    response(['error' => 'Method not allowed'], 405);
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if ($action === 'create_order') {
    handle_create_order($input);
} else if ($action === 'verify') {
    handle_verify($input);
} else {
    response(['error' => 'Invalid action'], 400);
}

function handle_create_order($input) {
    if (!isset($input['amount'])) {
        response(['error' => 'Amount is required'], 400);
    }

    $amount = (int)$input['amount'];
    $currency = $input['currency'] ?? 'INR';
    $receipt = 'rcpt_' . uniqid();

    // Since we don't have the Razorpay PHP SDK installed, 
    // we would normally make a curl request to Razorpay API here.
    // For this MVP/mock, we will return a mock order ID.
    
    // MOCK IMPLEMENTATION
    $mockOrderId = 'order_' . uniqid();
    
    response([
        'id' => $mockOrderId,
        'currency' => $currency,
        'amount' => $amount,
        'receipt' => $receipt
    ]);

    /* REAL IMPLEMENTATION EXAMPLE
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.razorpay.com/v1/orders');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'amount' => $amount,
        'currency' => $currency,
        'receipt' => $receipt
    ]));
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_USERPWD, RAZORPAY_KEY_ID . ':' . RAZORPAY_KEY_SECRET);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

    $result = curl_exec($ch);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    if (curl_errno($ch)) {
        response(['error' => curl_error($ch)], 500);
    }
    
    curl_close($ch);
    
    if ($httpcode >= 400) {
        response(json_decode($result, true), $httpcode);
    }
    
    response(json_decode($result, true));
    */
}

function handle_verify($input) {
    if (!isset($input['razorpay_order_id']) || !isset($input['razorpay_payment_id']) || !isset($input['razorpay_signature'])) {
        response(['error' => 'Missing required parameters'], 400);
    }

    $orderId = $input['razorpay_order_id'];
    $paymentId = $input['razorpay_payment_id'];
    $signature = $input['razorpay_signature'];

    // MOCK VERIFICATION
    // In a real app, you would generate a signature and compare it.
    // $generated_signature = hash_hmac('sha256', $orderId . "|" . $paymentId, RAZORPAY_KEY_SECRET);
    
    // For this mock, we just return true.
    response(['status' => 'success', 'verified' => true]);
}

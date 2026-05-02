<?php
require_once 'config.php';

check_auth();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $file = $_FILES['image'];
    $allowed = ['jpg', 'jpeg', 'png', 'webp'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    if (!in_array($ext, $allowed)) {
        response(['error' => 'Invalid file type'], 400);
    }
    
    if ($file['size'] > 5 * 1024 * 1024) {
        response(['error' => 'File too large'], 400);
    }
    
    $filename = uniqid('img_') . '.' . $ext;
    $targetPath = UPLOAD_DIR . $filename;
    
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        response([
            'success' => true,
            'url' => UPLOAD_URL . $filename
        ]);
    } else {
        response(['error' => 'Upload failed'], 500);
    }
}

response(['error' => 'No image provided'], 400);
?>

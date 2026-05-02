<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

// GET method is public
if ($method === 'GET') {
    if (file_exists(DATA_PATH)) {
        $products = json_decode(file_get_contents(DATA_PATH), true) ?: [];
    } else {
        $products = [];
    }
    
    // Sort by createdAt descending
    usort($products, function($a, $b) {
        return strtotime($b['createdAt'] ?? '') - strtotime($a['createdAt'] ?? '');
    });
    
    response(['products' => $products]);
}

// All other methods require auth
check_auth();

if ($method === 'POST') {
    // Check for spoofed PUT/DELETE via POST (useful for some servers/FormData)
    $spoofedMethod = $_POST['_method'] ?? null;
    if ($spoofedMethod === 'PUT') {
        handle_put($id);
    } elseif ($spoofedMethod === 'DELETE') {
        handle_delete($id);
    } else {
        handle_post();
    }
} elseif ($method === 'DELETE') {
    handle_delete($id);
} elseif ($method === 'PUT') {
    handle_put($id);
}

function handle_post() {
    $products = file_exists(DATA_PATH) ? json_decode(file_get_contents(DATA_PATH), true) : [];
    
    $newProduct = [
        'id' => uniqid(),
        'name' => $_POST['name'] ?? '',
        'category' => $_POST['category'] ?? '',
        'description' => $_POST['description'] ?? '',
        'sizes' => array_map('trim', explode(',', $_POST['sizes'] ?? '')),
        'amazonLink' => $_POST['amazonLink'] ?? '',
        'createdAt' => date('c'),
    ];

    // Handle image upload
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $imgUrl = handle_image_upload($_FILES['image']);
        if ($imgUrl) {
            $newProduct['image'] = $imgUrl;
        }
    }

    $products[] = $newProduct;
    file_put_contents(DATA_PATH, json_encode($products, JSON_PRETTY_PRINT));
    response($newProduct, 201);
}

function handle_put($id) {
    if (!$id) response(['error' => 'ID required'], 400);
    
    $products = file_exists(DATA_PATH) ? json_decode(file_get_contents(DATA_PATH), true) : [];
    $foundIndex = -1;
    
    foreach ($products as $index => $p) {
        if ($p['id'] === $id) {
            $foundIndex = $index;
            break;
        }
    }
    
    if ($foundIndex === -1) response(['error' => 'Product not found'], 404);
    
    $product = &$products[$foundIndex];
    $product['name'] = $_POST['name'] ?? $product['name'];
    $product['category'] = $_POST['category'] ?? $product['category'];
    $product['description'] = $_POST['description'] ?? $product['description'];
    $product['sizes'] = isset($_POST['sizes']) ? array_map('trim', explode(',', $_POST['sizes'])) : $product['sizes'];
    $product['amazonLink'] = $_POST['amazonLink'] ?? $product['amazonLink'];
    $product['updatedAt'] = date('c');

    // Handle image upload if provided
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        // Delete old image if it exists
        if (isset($product['image'])) {
            $oldPath = UPLOAD_DIR . basename($product['image']);
            if (file_exists($oldPath)) unlink($oldPath);
        }
        
        $imgUrl = handle_image_upload($_FILES['image']);
        if ($imgUrl) {
            $product['image'] = $imgUrl;
        }
    }

    file_put_contents(DATA_PATH, json_encode($products, JSON_PRETTY_PRINT));
    response($product);
}

function handle_delete($id) {
    if (!$id) response(['error' => 'ID required'], 400);
    
    $products = file_exists(DATA_PATH) ? json_decode(file_get_contents(DATA_PATH), true) : [];
    $foundIndex = -1;
    
    foreach ($products as $index => $p) {
        if ($p['id'] === $id) {
            $foundIndex = $index;
            break;
        }
    }
    
    if ($foundIndex === -1) response(['error' => 'Product not found'], 404);
    
    // Delete image file
    if (isset($products[$foundIndex]['image'])) {
        $imgPath = UPLOAD_DIR . basename($products[$foundIndex]['image']);
        if (file_exists($imgPath)) unlink($imgPath);
    }
    
    array_splice($products, $foundIndex, 1);
    file_put_contents(DATA_PATH, json_encode($products, JSON_PRETTY_PRINT));
    response(['success' => true]);
}

function handle_image_upload($file) {
    $allowed = ['jpg', 'jpeg', 'png', 'webp'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    if (!in_array($ext, $allowed)) return null;
    
    $filename = uniqid('prod_') . '.' . $ext;
    $targetPath = UPLOAD_DIR . $filename;
    
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        return UPLOAD_URL . $filename;
    }
    
    return null;
}
?>

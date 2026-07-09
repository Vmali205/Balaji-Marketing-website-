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
        'sizes' => isset($_POST['sizes']) && $_POST['sizes'] !== '' ? array_map('trim', explode(',', $_POST['sizes'])) : [],
        'amazonLink' => $_POST['amazonLink'] ?? '',
        'price' => isset($_POST['price']) ? (float)$_POST['price'] : null,
        'mrp' => isset($_POST['mrp']) ? (float)$_POST['mrp'] : null,
        'sku' => $_POST['sku'] ?? '',
        'stockStatus' => $_POST['stockStatus'] ?? 'in-stock',
        'features' => isset($_POST['features']) && $_POST['features'] !== '' ? array_map('trim', explode(',', $_POST['features'])) : [],
        'purchaseMode' => $_POST['purchaseMode'] ?? 'both',
        'isOnlinePurchase' => filter_var($_POST['isOnlinePurchase'] ?? 'true', FILTER_VALIDATE_BOOLEAN),
        'isWholesaleOnly' => filter_var($_POST['isWholesaleOnly'] ?? 'false', FILTER_VALIDATE_BOOLEAN),
        'createdAt' => date('c'),
    ];

    // Handle image upload (primary)
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $imgUrl = handle_image_upload($_FILES['image']);
        if ($imgUrl) {
            $newProduct['image'] = $imgUrl;
            $newProduct['images'] = [$imgUrl]; // Also add to images array
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
    
    if (isset($_POST['sizes'])) {
        $product['sizes'] = $_POST['sizes'] !== '' ? array_map('trim', explode(',', $_POST['sizes'])) : [];
    }
    
    $product['amazonLink'] = $_POST['amazonLink'] ?? $product['amazonLink'];
    $product['price'] = isset($_POST['price']) ? (float)$_POST['price'] : ($product['price'] ?? null);
    $product['mrp'] = isset($_POST['mrp']) ? (float)$_POST['mrp'] : ($product['mrp'] ?? null);
    $product['sku'] = $_POST['sku'] ?? ($product['sku'] ?? '');
    $product['stockStatus'] = $_POST['stockStatus'] ?? ($product['stockStatus'] ?? 'in-stock');
    
    if (isset($_POST['features'])) {
        $product['features'] = $_POST['features'] !== '' ? array_map('trim', explode(',', $_POST['features'])) : [];
    }
    
    $product['purchaseMode'] = $_POST['purchaseMode'] ?? ($product['purchaseMode'] ?? 'both');
    $product['isOnlinePurchase'] = isset($_POST['isOnlinePurchase']) ? filter_var($_POST['isOnlinePurchase'], FILTER_VALIDATE_BOOLEAN) : ($product['isOnlinePurchase'] ?? true);
    $product['isWholesaleOnly'] = isset($_POST['isWholesaleOnly']) ? filter_var($_POST['isWholesaleOnly'], FILTER_VALIDATE_BOOLEAN) : ($product['isWholesaleOnly'] ?? false);
    
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
            $product['images'] = [$imgUrl]; // Simple fallback for now
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

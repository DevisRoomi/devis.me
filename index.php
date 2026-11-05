<?php
// Bridge for Laravel Herd to serve devis-portfolio-v2
$distPath = __DIR__ . '/dist';
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH));

// Cek jika Vite Dev Server berjalan di port 5180 (port khusus devis-portfolio-v2 agar tidak bentrok dengan Duitin 5173)
$fp = @fsockopen('127.0.0.1', 5180, $errno, $errstr, 0.1);
if (is_resource($fp)) {
    fclose($fp);
    header('Location: http://localhost:5180' . $_SERVER['REQUEST_URI']);
    exit;
}

if (file_exists($distPath . '/index.html')) {
    $filePath = $distPath . $uri;
    if ($uri !== '/' && file_exists($filePath) && !is_dir($filePath)) {
        $ext = pathinfo($filePath, PATHINFO_EXTENSION);
        $mimes = [
            'css'  => 'text/css; charset=utf-8',
            'js'   => 'application/javascript; charset=utf-8',
            'svg'  => 'image/svg+xml',
            'png'  => 'image/png',
            'jpg'  => 'image/jpeg',
            'webp' => 'image/webp',
            'ico'  => 'image/x-icon',
            'json' => 'application/json',
            'woff' => 'font/woff',
            'woff2'=> 'font/woff2',
        ];
        $contentType = $mimes[$ext] ?? mime_content_type($filePath) ?: 'application/octet-stream';
        header("Content-Type: $contentType");
        readfile($filePath);
        exit;
    }
    header('Content-Type: text/html; charset=utf-8');
    readfile($distPath . '/index.html');
    exit;
}

echo "Building project... run bun run build first.";

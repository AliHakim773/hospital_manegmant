<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Handle POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);

    if ($data !== null) {
        // Access data like $data['key']
        $username = $data['username'];
        $password = $data['password'];

        $response = [
            'status' => 'success',
            'message' => 'Data received successfully',
            'username' => $username,
            'password' => $password,
        ];

        echo json_encode($response);
    } else {
        // Handle invalid JSON data
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON data']);
    }
}

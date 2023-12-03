<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
include('../database/index.php');
include('../vendor/autoload.php');

use Firebase\JWT\JWT;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Handle POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);

    if ($data !== null) {
        $username = $data['username'];
        $password = $data['password'];

        // getting the user with the same username from users
        $query = $mysqli->prepare('select user_id, role, password from users where username=?');
        $query->bind_param('s', $username);
        $query->execute();

        $query->store_result();
        $num_rows = $query->num_rows; // to use num_rows we need to store results
        $query->bind_result($id, $role, $hashed_password); // taken from the query in prepare
        $query->fetch(); // to save the bind-results

        $response = [];
        if ($num_rows == 0) {
            $response['status'] = 'user not found';
            echo json_encode($response);
        } else {
            if (password_verify($password, $hashed_password)) {
                $key = 'secret';
                $payload = [
                    'user_id' => $id,
                    'username' => $username,
                    'role' => $role
                ];
                $algorithm = 'HS256';
                $token = JWT::encode($payload, $key, $algorithm);

                $response['status'] = 'logged in';
                $response['token'] = $token;

                echo json_encode($response);
            } else {
                $response['status'] = 'fail';
                $response['msg'] = 'wrong credentials';
                echo json_encode($response);
            }
        }
    } else {
        // Handle invalid JSON data
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON data']);
    }
}

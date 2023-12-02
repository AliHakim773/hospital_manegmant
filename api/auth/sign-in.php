<?php

header('Access-Controll-Allow-Origin:*');
include('../database/index.php');
include('../vendor/autoload.php');

use Firebase\JWT\JWT;

$username = $_POST['username'];
$password = $_POST['password'];

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

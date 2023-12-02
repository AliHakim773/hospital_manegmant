<?php

header('Access-Controll-Allow-Origin:*');

include('../database/index.php');
include('../vendor/autoload.php');

use Firebase\JWT\JWT;
use \Firebase\JWT\Key;

$allheaders = getallheaders();
$token = $allheaders['Authorization'];
$secretKey = 'secret';

$user_id = $_POST['user_id'];

$response = [];
try {
    $data = JWT::decode($token, new Key($secretKey, 'HS256'));
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'invalid token';
    echo json_encode($response);
}
try {
    //code...
    if ($data->role == 'admin') {

        $query = $mysqli->prepare('delete from users where user_id=?');
        $query->bind_param('i', $user_id);
        $query->execute();

        $response['status'] = 'success';

        echo json_encode($response);
    } else {
        $response['status'] = 'fail';
        $response['msg'] = 'access denied';
        echo json_encode($response);
    }
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'error';
    echo json_encode($response);
}

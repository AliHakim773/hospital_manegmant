<?php

header('Access-Controll-Allow-Origin:*');

include('../database/index.php');
include('../vendor/autoload.php');

use Firebase\JWT\JWT;
use \Firebase\JWT\Key;

$allheaders = getallheaders();
$token = $allheaders['Authorization'];
$secretKey = 'secret';

$response = [];
try {
    $data = JWT::decode($token, new Key($secretKey, 'HS256'));
    if ($data->role == 'admin') {


        echo 'admin';
    } else {
        $response['status'] = 'fail';
        $response['msg'] = 'access denied';
        echo json_encode($response);
    }

    echo json_encode($data);
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'invalid token';
    echo $response;
}

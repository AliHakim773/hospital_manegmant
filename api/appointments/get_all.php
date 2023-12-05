<?php

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
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'invalid token';
    echo json_encode($response);
}

try {
    $query = $mysqli->prepare('select * from appointments');
    $query->execute();

    $array = $query->get_result();

    while ($doctors = $array->fetch_assoc()) {
        $response[] = $doctors;
    }
    $response['status'] = 'success';

    echo json_encode($response);
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'failed to get appointments';
    echo json_encode($response);
}

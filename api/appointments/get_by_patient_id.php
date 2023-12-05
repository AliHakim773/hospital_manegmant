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

$patient_id = $_GET['patient_id_id'];

try {
    $query = $mysqli->prepare('select * from appointments where patient_id_id=?');
    $query->bind_param('i', $patient_id_id);
    $query->execute();

    $appointment = $query->get_result()->fetch_assoc();

    if ($appointment == null) die('appointment not available');

    $response['status'] = 'success';
    $response['data'] = $appointment;

    echo json_encode($response);
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'failed to get appointment';
    echo json_encode($response);
}

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

$patient_id = $_GET['patient_id'];

try {
    $query = $mysqli->prepare('select users.username, users.role, patients.*, information.* from users 
                    join patients on users.user_id = patients.user_id 
                    join information on users.user_id = information.user_id 
                    where patients.patient_id = ?');
    $query->bind_param('i', $patient_id);
    $query->execute();

    $patient = $query->get_result()->fetch_assoc();

    if ($patient == null) die('patient not available');

    $response['status'] = 'success';
    $response['data'] = $patient;

    echo json_encode($response);
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'failed to get patient';
    echo json_encode($response);
}

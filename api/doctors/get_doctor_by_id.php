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
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'invalid token';
    echo json_encode($response);
}

$doctor_id = $_GET['doctor_id'];

try {
    if ($data->role == 'admin') {
        $query = $mysqli->prepare('select users.username, users.role, doctors.*, information.* from users 
                    join doctors on users.user_id = doctors.user_id 
                    join information on users.user_id = information.user_id 
                    where doctors.doctor_id = ?');
        $query->bind_param('i', $doctor_id);
        $query->execute();

        $doctor = $query->get_result()->fetch_assoc();

        if ($doctor == null) die('doctor not available');

        $response['status'] = 'success';
        $response['date'] = $doctor;

        echo json_encode($response);
    } else {
        $response['status'] = 'fail';
        $response['msg'] = 'access denied';
        echo json_encode($response);
    }
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'failed to get doctor';
    echo json_encode($response);
}

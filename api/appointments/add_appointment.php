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

// getting data from url
$doctor_id = $_POST['doctor_id'];
$patient_id = $_POST['patient_id'];
$schedule_id = $_POST['schedule_id'];
$room_id = $_POST['room_id'];
$status = 'pending';

try {
    // added data to the users table
    $query = $mysqli->prepare("insert into appointments(doctor_id,patient_id,schedule_id,room_id,status) 
        values(?,?,?,?,{$status})");
    $query->bind_param('iiii', $doctor_id, $patient_id, $schedule_id, $room_id);
    $query->execute();



    $response['status'] = 'success';
    $response['msg'] = 'doctor added successfully';
    echo json_encode($response);
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'failed to add appointment';
    echo json_encode($response);
}

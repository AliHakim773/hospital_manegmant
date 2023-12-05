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

// getting data from url
$doctor_id = $_POST['doctor_id'];
$patient_id = $_POST['patient_id'];
$schedule_id = $_POST['schedule_id'];
$room_id = $_POST['room_id'];
$status = 'pending';


try {
    if ($data->role == 'admin') {
        // cheching if the room is available
        $query = $mysqli->prepare('select appointment_id from appointments where schedule_id=? and room_id=?');
        $query->bind_param('ii', $schedule_id, $room_id);
        $query->execute();

        $query->store_result();
        $num_rows = $query->num_rows;

        if ($num_rows != 0) die('Room not available');

        // cheching if the room is available
        $query = $mysqli->prepare('select appointment_id from appointments where schedule_id=? and doctor_id=?');
        $query->bind_param('ss', $schedule_id, $doctor_id);
        $query->execute();

        $query->store_result();
        $num_rows = $query->num_rows;

        if ($num_rows != 0) die('Doctor not available');

        // added data to the users table
        $query = $mysqli->prepare("insert into appointments(doctor_id,patient_id,schedule_id,room_id,status) 
            values(?,?,?,?,?)");
        $query->bind_param('iiiis', $doctor_id, $patient_id, $schedule_id, $room_id, $status);
        $query->execute();

        $response['status'] = 'success';
        $response['msg'] = 'pending approval from admin';
        echo json_encode($response);
    } else {
        $response['status'] = 'fail';
        $response['msg'] = 'access denied';
        echo json_encode($response);
    }
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'failed to add appointment';
    echo json_encode($response);
}

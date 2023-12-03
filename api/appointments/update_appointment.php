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
$appointment_id = $_POST['appointment_id'];
$doctor_id = $_POST['doctor_id'];
$patient_id = $_POST['patient_id'];
$schedule_id = $_POST['schedule_id'];
$room_id = $_POST['room_id'];
$status = $_POST['status'];


try {
    if ($data->role == 'admin') {
        // cheching if the appointment exist
        $query = $mysqli->prepare('select appointment_id from appointments where appointment_id=?');
        $query->bind_param('i', $appointment_id);
        $query->execute();

        $query->store_result();
        $num_rows = $query->num_rows;

        if ($num_rows == 0) die('appointment doesnt exist');

        // cheching if the room is available
        $query = $mysqli->prepare('select appointment_id from appointments where schedule_id=? and room_id=? and appointment_id!=?');
        $query->bind_param('iii', $schedule_id, $room_id, $appointment_id);
        $query->execute();

        $query->store_result();
        $num_rows = $query->num_rows;

        if ($num_rows != 0) die('Room not available');

        // cheching if the room is available
        $query = $mysqli->prepare('select appointment_id from appointments where schedule_id=? and doctor_id=?  and appointment_id!=?');
        $query->bind_param('iii', $schedule_id, $doctor_id, $appointment_id);
        $query->execute();

        $query->store_result();
        $num_rows = $query->num_rows;

        if ($num_rows != 0) die('Doctor not available');

        // update data of the appointments table
        $query =
            $mysqli->prepare('update appointments 
            set doctor_id=?, patient_id=?, schedule_id=?, room_id=?, status=?
            where appointment_id=?');
        $query->bind_param(
            'iiiisi',
            $doctor_id,
            $patient_id,
            $schedule_id,
            $room_id,
            $status,
            $appointment_id,
        );
        $query->execute();

        $response['status'] = 'success';
        $response['msg'] = 'update successful';
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

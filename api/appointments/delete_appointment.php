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


try {
    if ($data->role == 'admin') {
        // cheching if the room is available
        $query = $mysqli->prepare('select appointment_id from appointments where appointment_id=?');
        $query->bind_param('i', $appointment_id);
        $query->execute();

        $query->store_result();
        $num_rows = $query->num_rows;

        if ($num_rows == 0) die('Appointment not available');

        // added data to the users table
        $query = $mysqli->prepare("delete from appointments where appointment_id=?");
        $query->bind_param('i', $appointment_id);
        $query->execute();



        $response['status'] = 'success';
        $response['msg'] = 'Appointment deleted';
        echo json_encode($response);
    } else {
        $response['status'] = 'fail';
        $response['msg'] = 'access denied';
        echo json_encode($response);
    }
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'failed to delete appointment';
    echo json_encode($response);
}

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

$schedule_id = $_GET['schedule_id'];

try {
    $query = $mysqli->prepare('select * from schedules where schedule_id=?');
    $query->bind_param('i', $schedule_id);
    $query->execute();

    $schedule = $query->get_result()->fetch_assoc();

    if ($schedule == null) die('schedule not available');

    $response['status'] = 'success';
    $response['data'] = $schedule;

    echo json_encode($response);
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'failed to get schedule';
    echo json_encode($response);
}

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

$room_id = $_GET['room_id'];

try {
    $query = $mysqli->prepare('select * from rooms where room_id=?');
    $query->bind_param('i', $room_id);
    $query->execute();

    $room = $query->get_result()->fetch_assoc();

    if ($room == null) die('room not available');

    $response['status'] = 'success';
    $response['data'] = $room;

    echo json_encode($response);
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'failed to get room';
    echo json_encode($response);
}

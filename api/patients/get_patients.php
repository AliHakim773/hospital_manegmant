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
    if ($data->role == 'admin') {
        $query = $mysqli->prepare('select patients.*, information.* from patients patients join users on patients.user_id = users.user_id join information on users.information_id = information.information_id');
        $query->execute();

        $array = $query->get_result();

        while ($patients = $array->fetch_assoc()) {
            $response[] = $patients;
        }

        echo json_encode($response);
    } else {
        $response['status'] = 'fail';
        $response['msg'] = 'access denied';
        echo json_encode($response);
    }

    echo json_encode($data);
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'invalid token';
    echo json_encode($response);
}

<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Include Authorization header
header('Content-Type: application/json');

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

try {
    if ($data->role == 'admin') {
        $query = $mysqli->prepare('select patients.*, information.*, users.* from users 
                    join patients on users.user_id = patients.user_id 
                    join information on users.user_id = information.user_id ');
        $query->execute();

        $array = $query->get_result();

        while ($patients = $array->fetch_assoc()) {
            $response[] = $patients;
        }
        $response['status'] = 'success';


        echo json_encode($response);
    } else {
        $response['status'] = 'fail';
        $response['msg'] = 'access denied';
        echo json_encode($response);
    }
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'error';
    echo json_encode($response);
}

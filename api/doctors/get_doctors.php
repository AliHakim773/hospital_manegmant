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

try {
    if ($data->role == 'admin') {
        $query = $mysqli->prepare('select doctors.*, information.*, users.* from users 
                    join doctors on users.user_id = doctors.user_id 
                    join information on users.user_id = information.user_id ');
        $query->execute();

        $array = $query->get_result();

        while ($doctors = $array->fetch_assoc()) {
            $response[] = $doctors;
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

<?php

header('Access-Controll-Allow-Origin:*');

include('../database/index.php');
include('../vendor/autoload.php');

use Firebase\JWT\JWT;
use \Firebase\JWT\Key;

$allheaders = getallheaders();
$token = $allheaders['Authorization'];
$secretKey = 'secret';

$user_id = $_POST['user_id'];
$first_name = $_POST['f_name'];
$last_name = $_POST['l_name'];
$date_of_birth = $_POST['dob'];
$address = $_POST['address'];
$gender = $_POST['gender'];
$email = $_POST['email'];
$phone_number = $_POST['phone_number'];
$medical_history = $_POST['medical_history'];

$response = [];
try {
    $data = JWT::decode($token, new Key($secretKey, 'HS256'));
    try {
        if ($data->role == 'admin') {
            $query =
                $mysqli->prepare('update information 
            set first_name=?, last_name=?, date_of_birth=?, address=?, email=?, phone_number=? 
            where user_id=?');
            $query->bind_param('sssssii', $first_name, $last_name, $date_of_birth, $address, $email, $phone_number, $user_id);
            $query->execute();
            $query =
                $mysqli->prepare('update patients 
                    set medical_history=?
                    where user_id=?');
            $query->bind_param('si', $medical_history, $user_id);
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
        $response['msg'] = 'error';
        echo json_encode($response);
    }
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'invalid token';
    echo json_encode($response);
}

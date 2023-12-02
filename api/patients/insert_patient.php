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

// user table data
$username = $_POST['username'];
$password = $_POST['password'];
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// information table data
$first_name = $_POST['f_name'];
$last_name = $_POST['l_name'];
$date_of_birth = $_POST['dob'];
$address = $_POST['address'];
$gender = $_POST['gender'];
$email = $_POST['email'];
$phone_number = $_POST['phone_number'];
$medical_history = $_POST['medical_history'];

//checking if the username exists
$query = $mysqli->prepare('select username from users where username=?');
$query->bind_param('s', $username);
$query->execute();

$query->store_result();
$query->bind_result($name);
$query->fetch();

try {
    if ($username == $name) {
        $response['status'] = 'fail';
        $response['msg'] = 'username already exists';
        die('error: ' . json_encode($response));
    } else {
        // added data to the users table
        $query =
            $mysqli->prepare("insert into users(username,password,role) 
        values(?,?,'patient')");
        $query->bind_param('ss', $username, $hashed_password);
        $query->execute();

        // got the id of the data added
        $user_id = $mysqli->insert_id;

        // added data to information table
        $query =
            $mysqli->prepare('insert into information(user_id, first_name,last_name,date_of_birth,address,gender,email,phone_number) 
        values(?,?,?,?,?,?,?,?)');

        $query->bind_param('issssssi', $user_id, $first_name, $last_name, $date_of_birth, $address, $gender, $email, $phone_number);
        $query->execute();

        // added data to patient table
        $query =
            $mysqli->prepare('insert into patients(user_id,medical_history) 
        values(?,?)');
        $query->bind_param('is', $user_id, $medical_history);
        $query->execute();


        $response['status'] = 'success';
        $response['msg'] = 'patient added successfully';
        echo json_encode($response);
    }
} catch (Exception $e) {
    $response['status'] = 'fail';
    $response['msg'] = 'inserting failed';
    echo json_encode($response);
}

<?php

header('Access-Controll-Allow-Origin:*');
include('../database/index.php');

// user table data
$username = $_POST['username'];
$password = $_POST['password'];
$role = $_POST['role'];
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// information table data
$first_name = $_POST['f_name'];
$last_name = $_POST['l_name'];
$date_of_birth = $_POST['dob'];
$address = $_POST['address'];
$gender = $_POST['gender'];
$email = $_POST['email'];
$phone_number = $_POST['phone_number'];

//checking if the username exists
$query = $mysqli->prepare('select username from users where username=?');
$query->bind_param('s', $username);
$query->execute();

$query->store_result();
$query->bind_result($name);
$query->fetch();


$response = [];
if ($username == $name) {
    $response['status'] = 'fail';
    $response['msg'] = 'username already exists';
    echo json_encode($response);
} else {
    // added data to information table
    $query =
        $mysqli->prepare('insert into information(first_name,last_name,date_of_birth,address,gender,email,phone_number) 
            values(?,?,?,?,?,?,?)');

    $query->bind_param('ssssssi', $first_name, $last_name, $date_of_birth, $address, $gender, $email, $phone_number);
    $query->execute();

    // got the id of the data added
    $lastInsertId = $mysqli->insert_id;

    // added data to the users table
    $query =
        $mysqli->prepare('insert into users(username,password,role,information_id) 
            values(?,?,?,?)');
    $query->bind_param('sssi', $username, $hashed_password, $role, $lastInsertId);
    $query->execute();

    $response['status'] = 'success';
    $response['msg'] = 'signup successful';
    echo json_encode($response);
}

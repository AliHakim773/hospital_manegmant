<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
include('../database/index.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);

    if ($data !== null) {
        // user table data
        $username = $data['username'];
        $password = $data['password'];
        $role = $data['role'];
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // information table data
        $first_name = $data['f_name'];
        $last_name = $data['l_name'];
        $date_of_birth = $data['dob'];
        $address = $data['address'];
        $gender = $data['gender'];
        $email = $data['email'];
        $phone_number = $data['phone_number'];
        $medical_history = $data['medical_history'] ?? null;
        $specialization = $data['specialization'] ?? null;

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
            die(json_encode($response));
        } else {
            // added data to the users table
            $query =
                $mysqli->prepare('insert into users(username,password,role) 
                    values(?,?,?)');
            $query->bind_param('sss', $username, $hashed_password, $role);
            $query->execute();

            // got the id of the data added
            $user_id = $mysqli->insert_id;

            // added data to information table
            $query =
                $mysqli->prepare('insert into information(user_id, first_name,last_name,date_of_birth,address,gender,email,phone_number) 
                    values(?,?,?,?,?,?,?,?)');

            $query->bind_param('issssssi', $user_id, $first_name, $last_name, $date_of_birth, $address, $gender, $email, $phone_number);
            $query->execute();

            if ($role == 'doctor') {
                $query =
                    $mysqli->prepare('insert into doctors(user_id,specialization) 
                        values(?,?)');
                $query->bind_param('is', $user_id, $specialization);
                $query->execute();
            } else if ($role == 'patient') {
                $query =
                    $mysqli->prepare('insert into patients(user_id,medical_history) 
                        values(?,?)');
                $query->bind_param('is', $user_id, $medical_history);
                $query->execute();
            }

            $response['status'] = 'success';
            $response['msg'] = 'signup successful';
            echo json_encode($response);
        }
    } else {
        // Handle invalid JSON data
        http_response_code(400); // Bad Request
        die(['status' => 'error', 'message' => 'Invalid JSON data']);
    }
}

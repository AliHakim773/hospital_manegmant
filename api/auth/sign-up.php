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

<?php

header('Access-Controll-Allow-Origin:*');
include('../database/index.php');

$username = $_POST['username'];
$password = $_POST['password'];

// getting the user with the same username from users
$query = $mysqli->prepare('select user_id, role, password from users where username=?');
$query->bind_param('s', $username);
$query->execute();

$query->store_result();
$num_rows = $query->num_rows; // to use num_rows we need to store results
$query->bind_result($id, $role, $hashed_password); // taken from the query in prepare
$query->fetch(); // to save the bind-results
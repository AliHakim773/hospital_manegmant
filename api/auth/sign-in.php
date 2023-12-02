<?php

header('Access-Controll-Allow-Origin:*');
include('../database/index.php');

$username = $_POST['username'];
$password = $_POST['password'];

// getting the user with the same username from users
$query = $mysqli->prepare('select user_id, role, password from users where username=?');
$query->bind_param('s', $username);
$query->execute();

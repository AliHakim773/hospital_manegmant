<?php

header('Access-Controll-Allow-Origin:*');
include('../database/index.php');

$username = $_POST['username'];
$password = $_POST['password'];

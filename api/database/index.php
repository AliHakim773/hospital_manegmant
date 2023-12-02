<?php
$host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'hospital_mangement_system_db';

$mysqli = new mysqli($host, $db_user, $db_pass, $db_name);

if ($mysqli->connect_error)
    die(' ' . $mysqli->connect_error);

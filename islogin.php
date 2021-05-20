<?php
session_start();
$answer["islog"] = isset($_SESSION["lvl"]);
if (isset($_SESSION["lvl"])){
    $answer["lvl"] = $_SESSION["lvl"];
}
echo json_encode($answer);

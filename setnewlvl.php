<?php
session_start();
$_SESSION["lvl"] = $_POST["lvl"];
$ans["lvl"] = $_SESSION["lvl"];
echo json_encode($ans);

<?php
session_start();
$file = fopen("data.txt", "r");
$flag = false;
while(!feof($file))
{
    $str = fgets($file);
    $str = substr( $str, 0 , strlen($str)-1);
    $json = json_decode($str);
    if ($json!=null)
    if($json->{"login"}==$_POST["login"]&&$json->{"password"}==$_POST["password"]){
        $flag = true;
    }
}
if ($flag){
    $_SESSION["login"]=$_POST["login"];
    error_log($_SESSION["login"]);
}
$answer['answer'] = $flag;
error_log($flag);
$_SESSION['count'] = 0;
$_SESSION['lvl'] = $_POST["lvl"];
echo json_encode($answer);
fclose($file);

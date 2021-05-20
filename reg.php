<?php
session_start();
$file = fopen("data.txt", "a+");
$flag = false;
while(!feof($file))
{
    $str = fgets($file);
    $str = substr( $str, 0 , strlen($str)-1);
    $json = json_decode($str);
    if ($json!=null)
    if($json->{"login"}==$_POST["login"]){
        $flag = true;
    }
}
if ($flag) {
    $answer['answer'] = "Такой пользователь уже существует, авторизуйтесь";
}
else {
    $answer['answer'] = "ok";
    $_SESSION["login"] = $_POST["login"];
    fwrite($file, json_encode($_POST)."\n");
}
$_SESSION['count'] = 0;
$_SESSION['lvl'] = $_POST["lvl"];
echo json_encode($answer);
fclose($file);


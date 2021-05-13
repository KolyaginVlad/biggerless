<?php
$file = fopen("data.txt", "a+");
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
if ($flag) {
    $answer['answer'] = "Такой пользователь уже существует, авторизуйтесь";
}
else {
    $answer['answer'] = "ok";
    fwrite($file, json_encode($_POST)."\n");
}
echo json_encode($answer);
fclose($file);


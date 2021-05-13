<?php
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
$answer['answer'] = $flag;
echo json_encode($answer);
fclose($file);

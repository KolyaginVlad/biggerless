<?php
session_start();
$answer["now"] = $_SESSION["count"];
$answer["num"] = 0;
$file = fopen("count.txt", "a+");
$flag = "no";
$lastCount = 0;
$lastlvl = 0;
while(!feof($file))
{
    $str = fgets($file);
    $str = substr( $str, 0 , strlen($str)-1);
    $json = json_decode($str);
    if ($json!=null)
        if($json->{"login"}==$_SESSION["login"]&&$_SESSION["count"]>$json->{"count"}) {
            $flag = "rewrite";
            $lastCount = $json->{"count"};
            $lastlvl = $json->{"lvl"};
        }
    else if ($json->{"login"}==$_SESSION["login"]&&$_SESSION["count"]<=$json->{"count"}) {
        $flag = "badScore";
        $lastCount = $json->{"count"};
    }
    else {
        $mass["login"] = $json->{"login"};
        $mass["count"] = $json->{"count"};
        $mass["lvl"] = $json->{"lvl"};
        $answer["num"]++;
        $answer["table"][$answer["num"]] = $mass;
    }
}

if ($flag=="rewrite"){
    fclose($file);
    $data = file_get_contents('count.txt');
    $scoreLast["login"] = $_SESSION["login"];
    $scoreLast["count"] = $lastCount;
    $scoreLast["lvl"] = $lastlvl;
    $scoreNow["login"] = $_SESSION["login"];
    $scoreNow["count"] = $_SESSION["count"];
    $scoreNow["lvl"] = $_SESSION["lvl"];
    $data = str_replace(json_encode($scoreLast),json_encode($scoreNow) , $data);
    file_put_contents('count.txt', $data, LOCK_EX);
    $answer["high"] = "Вы побили свой рекорд!";
}
else if ($flag=="no"){
    $scoreNow["login"] = $_SESSION["login"];
    $scoreNow["count"] = $_SESSION["count"];
    $scoreNow["lvl"] = $_SESSION["lvl"];
    fwrite($file, json_encode($scoreNow)."\n");
}
else{
    $answer["high"] = "Ваш лучший счёт:" . $lastCount;
}
$_SESSION["count"] = 0;
echo json_encode($answer);


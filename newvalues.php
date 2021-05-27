<?php
session_start();
if ($_SESSION["lvl"]==1) {
    $answer["first"] = (rand(0,999));
    $answer["second"] = (rand(0,999));
}else if($_SESSION["lvl"]==2){
    if(rand(0,100)>50){
        $answer["first"] =(rand(0,999));
    }
    else {
        $answer["first"] =(rand(0,999))."/".(rand(0,999));
    }
    if(rand(0,100)>50){
        $answer["second"] =(rand(0,999));
    }
    else {
        $answer["second"] =(rand(0,999))."/".(rand(0,999));
    }
}
else {
    if(rand(0,100)<30){
        $answer["first"] =(rand(0,999));
    }
    else if (rand(0,100)<60){
        $answer["first"] =(rand(0,999))."/".(rand(0,999));
    }
    else {
        $answer["first"] =("√".(rand(0,999)));
    }
    if(rand(0,100)<30){
        $answer["second"] =(rand(0,999));
    }
    else if (rand(0,100)<60){
        $answer["second"] =(rand(0,999))."/".(rand(0,999));
    }
    else {
        $answer["second"] =("√".(rand(0,999)));
    }
}
if(isset($_SESSION["count"]))
$answer["score"] = $_SESSION["count"];
else $answer["score"] =0;
echo json_encode($answer);

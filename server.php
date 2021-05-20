<?php
session_start();
if (str_contains($_GET["first"], "/")){
    $first = (int)(substr($_GET["first"],0,(int)strpos($_GET["first"], "/") ))/(int)(substr($_GET["first"],(int)strpos
        ($_GET["first"], "/")+1,strlen($_GET["first"])-(int)strpos
            ($_GET["first"], "/")-1 ));
}
else if(str_contains($_GET["first"], "√")){
    $first = sqrt((int)(substr($_GET["first"], 1)));
}
else{
   $first = (int)$_GET["first"];
}

if (str_contains($_GET["second"], "/")){
    $second = (int)(substr($_GET["second"],0,(int)strpos($_GET["second"], "/") ))/(int)(substr($_GET["second"],(int)strpos
        ($_GET["second"], "/")+1,strlen($_GET["second"])-(int)strpos
            ($_GET["second"], "/") -1));

}
else if(str_contains($_GET["second"], "√")){
    $second = sqrt((int)(substr($_GET["second"], 3)));
}
else{
    $second = (int)$_GET["second"];
}

switch ($_GET["answer"]){
    case "equal":
        if ($first==$second) {
            $_SESSION["count"]+=(int)$_SESSION["lvl"];
            echo json_encode(["ans" => true]);
        }
        else echo json_encode(["ans"=>false]);
        break;
    case "less":
        if ($first<$second) {
            $_SESSION["count"]+=(int)$_SESSION["lvl"];
            echo json_encode(["ans" => true]);
        }
        else echo json_encode(["ans"=>false]);
        break;
    case "bigger":
        if ($first>$second) {
            $_SESSION["count"]+=(int)$_SESSION["lvl"];
            echo json_encode(["ans" => true]);
        }
        else echo json_encode(["ans"=>false]);
        break;
}

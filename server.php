<?php

switch ($_GET["answer"]){
    case "equal":
        if ((int)$_GET["first"]==(int)$_GET["second"]) echo json_encode(["ans"=>true]);
        else echo json_encode(["ans"=>false]);
        break;
    case "less":
        if ((int)$_GET["first"]<(int)$_GET["second"]) echo json_encode(["ans"=>true]);
        else echo json_encode(["ans"=>false]);
        break;
    case "bigger":
        if ((int)$_GET["first"]>(int)$_GET["second"]) echo json_encode(["ans"=>true]);
        else echo json_encode(["ans"=>false]);
        break;
}

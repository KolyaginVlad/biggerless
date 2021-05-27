<?php
session_start();
$_SESSION["count"] = 0;
?>
<div id="body">
    <div id="title">Укажите правильный знак для неравенства.</div><br>
    <div id="gameBody">
    <div id="game">
    <span id="first">???????</span><span id="field"> ? </span><span id="second">???????</span><br>
    </div>
    <div id="ansBody">
    <img src="pic/less.jpg" class="ans" id="less"/><img src="pic/eq.jpg" class="ans" id="equal"/><img src="pic/bigger.jpg"
                                                                                                      class="ans" id="bigger"/>
    </div>
    </div>
    <div id="text">Ваши очки:</div>
    <div id="right">0</div>
    <div id="timer">1:00</div>
</div>

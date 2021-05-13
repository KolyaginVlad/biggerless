$(document).ready(function () {
    let isLog = false;
    fix();

    function game (a) {
        let counterTrue = 0;
        let counterFalse = 0;
        const less = $("#less").offset();
        const bigger = $("#bigger").offset();
        const equal = $("#equal").offset();
        newValues();
        const interval = setInterval(intervalOut, 1000);
        const timer  = setTimeout(timeOut,1000*60);

        function timeOut(){
            clearTimeout(timer);
            clearInterval(interval)
        }

        function intervalOut(){
            let timer = document.getElementById("timer");
            let time = timer.innerText.split(":");
            if (time[1] == "00" && time[0] != "0") {
                time[0] = Number.parseInt(time[0]) - 1;
                time[1] = 59;
            } else if (time[1] != "00") {
                time[1] = Number.parseInt(time[1]) - 1;
                if ((time[1] + "").length < 2) time[1] = "0" + time[1];
            } else {

            }
            timer.innerText = time[0] + ":" + time[1];
        }

        function newValues() {
            if (a==1) {
                $("#first").text((Math.floor(Math.random() * (1000 - 1)) + 1));
                $("#second").text((Math.floor(Math.random() * (1000 - 1)) + 1));
            }else if(a==2){
                if(Math.random()>0.5){
                    $("#first").text((Math.floor(Math.random() * (1000 - 1)) + 1));
                }
                else {
                    $("#first").text((Math.floor(Math.random() * (1000 - 1)) + 1)+"/"+(Math.floor(Math.random() * (1000 - 1)) + 1));
                }
                if(Math.random()>0.5){
                    $("#second").text((Math.floor(Math.random() * (1000 - 1)) + 1));
                }
                else {
                    $("#second").text((Math.floor(Math.random() * (1000 - 1)) + 1)+"/"+(Math.floor(Math.random() *(1000 - 1)) + 1));
                }
            }
            else {
                if(Math.random()<0.3){
                    $("#first").text((Math.floor(Math.random() * (1000 - 1)) + 1));
                }
                else if (Math.random()<0.6){
                    $("#first").text((Math.floor(Math.random() * (1000 - 1)) + 1)+"/"+(Math.floor(Math.random() *(1000 - 1)) + 1));
                }
                else {
                    $("#first").text("√"+(Math.floor(Math.random() * (1000 - 1)) + 1));
                }
                if(Math.random()<0.3){
                    $("#second").text((Math.floor(Math.random() * (1000 - 1)) + 1));
                }
                else if (Math.random()<0.6){
                    $("#second").text((Math.floor(Math.random() * (1000 - 1)) + 1)+"/"+(Math.floor(Math.random() * (1000 - 1)) + 1));
                }
                else {
                    $("#second").text("√"+(Math.floor(Math.random() * (1000 - 1)) + 1));
                }
            }
            $("#less").offset(less);
            $("#equal").offset(equal);
            $("#bigger").offset(bigger)
        }

        $("#field").droppable({
            drop: function (event, ui) {
                let ans;
                if (ui.draggable.attr("id") == "equal")
                    ans = "equal";
                else if (ui.draggable.attr("id") == "less")
                    ans = "less";
                else ans = "bigger";
                $.get({
                    url: "server.php?first=" + $("#first").text() +
                        "&second=" + $("#second").text() +
                        "&answer=" + ans,
                    success: function (data) {
                        alert(data.ans);
                        if (data.ans) {
                            counterFalse = 0;
                            counterTrue++;
                            // $("#answer").css("color", "green");
                            // $("#answer").text("Верно!!! Подряд верно "+ counterTrue );
                        } else {
                            counterTrue= 0;
                            counterFalse++;
                            // $("#answer").css("color", "red");
                            // $("#answer").text("Неверно!!! Неверно подряд " + counterFalse);
                        }
                        newValues();
                    },
                    dataType: "json"
                });
            }
        });
        $("#less").draggable({
            start: function () {
                $("#less").css('color', '#F00');
            },
            stop: function () {
                $("#less").css('color', 'black');
            }
        });
        $("#bigger").draggable({
            start: function () {
                $("#bigger").css('color', '#F00');
            },
            stop: function () {
                $("#bigger").css('color', 'black');
            }
        });
        $("#equal").draggable({
            start: function () {
                $("#equal").css('color', '#F00');
            },
            stop: function () {
                $("#equal").css('color', 'black');
            }
        });
    }
    function fix() {
        $("#reg").click(function () {
            $("#form").html("<div id=\"head\">Регистрация</div>\n" +
                "    <select id=\"lvl\">\n" +
                "        <option value=\"1\">Только целые числа</option>\n" +
                "        <option value=\"2\">Целые числа и дроби</option>\n" +
                "        <option value=\"3\">Целые числа, дроби и иррациональные числа</option>\n" +
                "    </select><br>\n" +
                "    <input placeholder=\"Имя\" id=\"log\"><br>\n" +
                "    <input type=\"password\" placeholder=\"Пароль\" id=\"pas\"><br>\n" +
                "    <input type=\"password\" placeholder=\"Подтверждение пароля\" id=\"repas\"><br>\n" +
                "    <div id=\"ans\"></div><br>\n"+
                "    <input type=\"button\" id='start' value=\"Зарегестрироваться и начать\">\n" +
                "    <div id=\"or\">или </div><br>\n" +
                "    <div id=\"login\">Вход</div>");
            isLog = false;
            fix();
        });
        $("#login").click(function () {
            $("#form").html("<div id=\"head\">Вход</div>\n" +
                "    <select id=\"lvl\">\n" +
                "        <option value=\"1\">Только целые числа</option>\n" +
                "        <option value=\"2\">Целые числа и дроби</option>\n" +
                "        <option value=\"3\">Целые числа, дроби и иррациональные числа</option>\n" +
                "    </select><br>\n" +
                "    <input placeholder=\"Имя\" id=\"log\"><br>\n" +
                "    <input type=\"password\" placeholder=\"Пароль\" id=\"pas\"><br>\n" +
                "    <div id=\"ans\"></div><br>\n"+
                "    <input type=\"button\" id='start' value=\"Войти и начать\">\n" +
                "    <div id=\"or\">или </div><br>\n" +
                "    <div id=\"reg\">Регистрация</div>");
            isLog = true;
            fix();
        });
        $("#start").click(function () {
            if (isLog) {
                $.post("login.php",{login : $("#log").val(), password : $("#pas").val(), lvl : $("#lvl").val()}, function (data) {
                    if (data.answer==true){
                        $.post('game.php', function (data) {
                            let a = $("#lvl").val();
                            $("body").html(data);
                            game(a);
                        });
                    }
                    else {
                        $("#ans").html("Неверный логин или пароль!");
                    }
                }, "json");
            } else {
                if ($("#pas").val()===$("#repas").val())
                $.post("reg.php",{login : $("#log").val(), password : $("#pas").val(), lvl : $("#lvl").val()}, function (data) {
                    if (data.answer=="ok"){
                        $.post('game.php', function (data) {
                            let a = $("#lvl").val();
                            $("body").html(data);
                            game(a);
                        });
                    }else
                    $("#ans").html(data.answer);
                }, "json");
                else {
                    $("#ans").html("Пароли не совпадают!");
                }
            }
        });
    }
})
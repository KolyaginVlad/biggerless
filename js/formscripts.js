$(document).ready(function () {
    let isLog = false;
    $.post("islogin.php",{}, function (data) {
        if (data.islog) {
            $.post('game.php', function (data1) {
                $("body").html(data1);
                game(data.lvl);
            });
        }
        else fix();
    }, "json");


    function game (a) {
        let counterTrue = 0;
        let counterFalse = 0;
        const less = $("#less").offset();
        const bigger = $("#bigger").offset();
        const equal = $("#equal").offset();
        let lvls = new Map();
        lvls.set("1","Только целые числа");
        lvls.set("2","Целые числа и дроби");
        lvls.set("3","Целые числа, дроби и иррациональные числа");
        newValues();
        const interval = setInterval(intervalOut, 1000);
        const timer  = setTimeout(timeOut,1000*60);

        function timeOut(){
            clearTimeout(timer);
            clearInterval(interval);
            $.post("count.php",{}, function (data) {
                let table = "";
                for(let i = 1; i<=data.num;i++){
                    table+="<tr><td>"+data.table[i].login+"</td><td>"+data.table[i].count+"</td><td>"+lvls.get( data.table[i].lvl)+"</td></tr>";
                }
                $("body").html("<div id='score'>" +
                    "<div>"+data.high+"</div>" +
                    "<div>Ваш счёт:"+data.now+"</div>" +
                    "<select id=\"lvl\">\n" +
                    "        <option value=\"1\">Только целые числа</option>\n" +
                    "        <option value=\"2\">Целые числа и дроби</option>\n" +
                    "        <option value=\"3\">Целые числа, дроби и иррациональные числа</option>\n" +
                    "    </select>" +
                    "</div>" +
                    "<div id='table'>" +
                    "<table>" +
                    "<tr><td>Имя</td><td>Очки</td><td>Уровень сложности</td></tr>"+
                    table+
                    "</table>" +
                    "</div>");
                $("#score").append("<input type='button' value='Ещё раз!' id='restart'>");
                $("#lvl").val(a);
                $("#lvl").change(function () {
                    $.post('setnewlvl.php',{lvl: $("#lvl").val()}, function (data1) {

                    }, "json");
                });
                $("#restart").click(function () {
                    $.post('game.php', function (data1) {
                        let e= $("#lvl").val()
                        $("body").html(data1);
                        game(e);

                    });
                })
            }, "json");


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
            //jQuery.ajaxSetup({async:false});
            $.post("newvalues.php",{},function (data) {
                $("#first").text(data.first);
                $("#second").text(data.second);
                $("#less").offset(less);
                $("#equal").offset(equal);
                $("#bigger").offset(bigger);
                $("#right").text(data.score);
            }, "json");
            //jQuery.ajaxSetup({async:true});
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
            containment: $("#gameBody"),
            start: function () {
                $("#less").css('color', '#F00');
            },
            stop: function () {
                $("#less").css('color', 'black');
            }
        });
        $("#bigger").draggable({
            containment: $("#gameBody"),
            start: function () {
                $("#bigger").css('color', '#F00');
            },
            stop: function () {
                $("#bigger").css('color', 'black');
            }
        });
        $("#equal").draggable({
            containment: $("#gameBody"),
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
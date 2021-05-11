$(document).ready(function () {
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
        $("#first").text((Math.floor(Math.random() * (1000 - 1)) + 1));
        $("#second").text((Math.floor(Math.random() * (1000 - 1)) + 1));
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
})
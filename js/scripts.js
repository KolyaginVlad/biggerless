$(document).ready(function () {
    let counterTrue = 0;
    let counterFalse = 0;
    const less = $("#less").offset();
    const bigger = $("#bigger").offset();
    const equal = $("#equal").offset();
    newValues();

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
                        $("#answer").css("color", "green");
                        $("#answer").text("Верно!!! Подряд верно "+ counterTrue );
                    } else {
                        counterTrue= 0;
                        counterFalse++;
                        $("#answer").css("color", "red");
                        $("#answer").text("Неверно!!! Неверно подряд " + counterFalse);
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
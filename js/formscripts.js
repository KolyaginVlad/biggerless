$(document).ready(function () {
    let isLog = false;
    fix();


    function fix() {
        $("#reg").click(function (){
            $("#form").html("<div id=\"head\">Регистрация</div>\n" +
                "    <select name=\"lvl\">\n" +
                "        <option value=\"Только целые числа\">Только целые числа</option>\n" +
                "        <option value=\"Целые числа и дроби\">Целые числа и дроби</option>\n" +
                "        <option value=\"Целые числа, дроби и иррациональные числа\">Целые числа, дроби и иррациональные числа</option>\n" +
                "    </select><br>\n" +
                "    <input type=\"email\" placeholder=\"Электронная почта\" name=\"email\"><br>\n" +
                "    <input type=\"password\" placeholder=\"Пароль\" name=\"pas\"><br>\n" +
                "    <input type=\"password\" placeholder=\"Подтверждение пароля\" name=\"repas\"><br>\n"+
                "    <input type=\"button\" id='start' value=\"Зарегестрироваться и начать\">\n" +
                "    <div id=\"or\">или </div><br>\n" +
                "    <div id=\"login\">Вход</div>");
            isLog = false;
            fix();
        });
        $("#login").click(function () {
            $("#form").html("<div id=\"head\">Вход</div>\n" +
                "    <select name=\"lvl\">\n" +
                "        <option value=\"Только целые числа\">Только целые числа</option>\n" +
                "        <option value=\"Целые числа и дроби\">Целые числа и дроби</option>\n" +
                "        <option value=\"Целые числа, дроби и иррациональные числа\">Целые числа, дроби и иррациональные числа</option>\n" +
                "    </select><br>\n" +
                "    <input type=\"email\" placeholder=\"Электронная почта\" name=\"email\"><br>\n" +
                "    <input type=\"password\" placeholder=\"Пароль\" name=\"pas\"><br>\n" +
                "    <input type=\"button\" id='start' value=\"Войти и начать\">\n" +
                "    <div id=\"or\">или </div><br>\n" +
                "    <div id=\"reg\">Регистрация</div>");
            isLog = true;
            fix();
        });
        $("#start").click(function () {
            if (isLog){

            }else {

            }
        });
    }
})
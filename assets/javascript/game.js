var $hourElement = $("#hour");
var $minuteElement = $("#minutes");
var $secondElement = $("#seconds");
var $meridianElement = $("#ampm");
var alarmObj = {
    "hour": "00",
    "minutes": "00",
    "seconds": "00",
    "meridian": "AM"
};
var alarmArray = [];
var sound = new Audio('assets/audio/default.mp3')

function setTime() {
    var objTime = new Date();
    $hourElement.html(objTime.getHours() > 12 ? objTime.getHours() - 12 : objTime.getHours());
    $minuteElement.html(objTime.getMinutes());
    $secondElement.html(objTime.getSeconds());
    $meridianElement.html(objTime.getHours() >= 24 ? "AM" : "PM");
}

function setImage(ste) {
    if (ste === "alarm") {
        $("#gifBox").attr("src", "https://media.giphy.com/media/AfyEB4T0Io4BW/giphy.gif"); // Set to gif
    } else {
        $("#gifBox").attr("src", "");
    }
}

$(document).ready(function() {
    window.setInterval(function() {
        for (var i = 0; i < alarmArray.length; i++) {
            var now = new Date();
            var nowSeconds = Math.round(now.getTime() / 1000);;
            var alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarmArray[i].Hour, alarmArray[i].Minutes, 00);
            var alarmSeconds = Math.round(alarmTime.getTime() / 1000);

            if (alarmSeconds === nowSeconds) {
                sound.play();
                setImage("alarm");

                setTimeout(function() {
                    setImage("");
                }, 5000);
            }
        }

        setTime();
    }, 1000);
});

$('#set-time').on('click', function() {
    var hours = $('#dd-hours :checked').val();
    var mins = $('#dd-minutes :checked').val();
    var amPM = $('#dd-ampm :checked').val();
    var alrm = new Object(alarmObj);

    $('#saved').append("<li>" + hours + ":" + mins + " " + amPM + "</li>");
    alrm.Hour = $("#dd-ampm :checked").val() === "AM" ? $("#dd-hours :checked").val() : parseInt($("#dd-hours :checked").val()) + 12;
    alrm.Minutes = $("#dd-minutes :checked").val();
    alrm.Seconds = $("#dd-seconds :checked").val();
    alrm.Meridian = $("#dd-ampm :checked").val();
    alarmArray.push(alrm);
});
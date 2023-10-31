$(document).ready(function () {
    const leafContainer = $("body");
    const blowContainer = $("<div class='blowing'>fffffffppshhhhhh</div>");

    $(document).on("keydown", function (event) {
        const keyCode = event.keyCode;
        const blowContainer = $(".blowing");
        if (keyCode == 91) {
            blowContainer.show(20);
            playSound("blow.wav");
            removeLeaves();
        }
    });

    $(document).on("keyup", function (event) {
        const keyCode = event.keyCode;
        if (keyCode == 91) {
            blowContainer.hide(10);
        }
    });

    function playSound(audioName) {
        let audio = new Audio(audioName);
        audio.loop = false;
        audio.play();
    }

    function addLeaves() {
        const $leaf = $("<div class='leaf'></div>");

        var spin = Math.round(Math.random() * 360);

        $leaf.css({
            top: Math.random() * ($(window).height() - 20),
            left: Math.random() * ($(window).width() - 20),
            transform: 'rotate(' + spin + 'deg)',
        });

        leafContainer.append($leaf);
    }

    function removeLeaves() {
        leafContainer.empty();
        addLeaves();
    }

    setInterval(addLeaves, 200);
});
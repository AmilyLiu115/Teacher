(function () {
    var PSDWidth = 750, //设计图宽度
        maxWidth = 750, //最大适配
        toRem = PSDWidth / 100,
        fs;

    function HTMLfontSize() {
        var html = document.documentElement,
            screenWidth = window.innerWidth;

        if (screenWidth <= maxWidth) {
            fs = screenWidth / toRem;
        } else {
            fs = maxWidth / toRem;
        }
        html.style.fontSize = fs + "px";
    }

    HTMLfontSize();

    var timer = null;
    window.addEventListener("resize", function () {
        clearTimeout(timer);
        timer = setTimeout(HTMLfontSize, 60);
    }, false);
})();
function setFunctionSlider() {
    var slider = document.getElementById("myRange");
    document.getElementsByName("linewidthslider")[0].setAttribute("value", slider.value);
}

function setSliderValue(myValue) {
    var slider = document.getElementById("myRange");
    slider.value = myValue;
}
// function setFunctionSlider() {
//     // console.log("yay!")
//     var slider = document.getElementById("myRange");
//     // var output = document.getElementById("demo");
//     // output.innerHTML = slider.value; // Display the default slider value

//     // Update the current slider value (each time you drag the slider handle)
//     slider.oninput = function() {
//         // console.log("slider function oninput")
//         document.getElementsByName("linewidthslider")[0].setAttribute("value", this.value); 
//     }
// }

function setFunctionSlider() {
    var slider = document.getElementById("myRange");
    document.getElementsByName("linewidthslider")[0].setAttribute("value", slider.value);
}

function setSliderValue(myvalue) {
    var slider = document.getElementById("myRange");
    slider.value = myvalue;
}
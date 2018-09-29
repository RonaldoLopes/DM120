// Load Grove module
var groveSensor = require('jsupm_grove');

// Create the button object using GPIO pin 0
var button = new groveSensor.GroveButton(8);

// Read the input and print, waiting one second between readings
function readButtonValue() {
    console.log(button.name() + " value is " + button.value());
}
setInterval(readButtonValue, 1000);
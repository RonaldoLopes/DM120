require('mraa');
var groveSensor = require('jsupm_grove');

var temp = new groveSensor.GroveLight(1);

 

function readData()
{
  var lux = temp.value();

    console.log("Luminosidade em lux"+ lux); 
    
    //Chama a função a cada 1 segundo 
    setTimeout(readData,1000); 
}
readData();
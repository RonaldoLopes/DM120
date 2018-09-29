require('mraa');

var requestify = require('requestify');

var groveSensor = require('jsupm_grove');
var sensorModule = require('jsupm_ttp223');

var sleep = require("sleep");

var thing = "t141_dm120_L_R"

var tempSensor = new groveSensor.GroveTemp(0);
var lightSensor = new groveSensor.GroveLight(1);
var touchSensor = new sensorModule.TTP223(4);
var buttonSensor = new groveSensor.GroveButton(8);
var myledSensor = new groveSensor.GroveLed(2);

var playOn = false;
var status1 = "ambiente insaluble"
var status2 = "temperatura ambiente"
var status = status2
var isActiveted = false;

var celsiusLocal = 0;
var lumLocal = 0;
var touchPressLocal = 0;
var buttonPressLocal = false;

function readData() {
    //console.log("1 - readData [IN]")
    
    var celsius = tempSensor.value();
    if (celsius >= 30)
        status = status1;
    else
        status = status2;

    var lum = lightSensor.value();
   
    var touchPress = touchSensor.isPressed();
    var buttonPress = buttonSensor.value();
    
    if (buttonPress) {
        isActiveted = !isActiveted
        //console.log("1 - readData  = buttonPress: "+buttonPress + " isActiveted: "+ isActiveted)
    }

    if( celsiusLocal != celsius ||
        lumLocal != lum ||
        touchPressLocal != touchPress ||
        buttonPressLocal != buttonPress
        ){

            celsiusLocal = celsius;
            lumLocal = lum;
            touchPressLocal = touchPress;
            isActivetedLocal = isActiveted;
            statusLocal = status;

            console.log("1 - readData - post - temp: " + celsius)
            console.log("1 - readData - post - lux: " + lum)
            console.log("1 - readData - post - botao: " + buttonPress)
            console.log("1 - readData - post - touch: " + touchPress)
            console.log("1 - readData - post - active: " + isActiveted)
            console.log("1 - readData - post - status: " + status)

            var url = "https://dweet.io:443/dweet/for/" + thing
            // Envia dados para servidor via método POST    
            requestify.post(url, {
                temp: celsius,
                lux: lum,
                botao: buttonPress,
                touch: touchPress,
                active: isActiveted,
                status: status
            })
                .then(function (response) {
        
                    // Obtem resposta do servidor
                    response.getBody();
        
                    //console.log(response.body)
                });
        }
        //console.log("1 - readData [OUT]")
    //Chama a função a cada 1 segundo 
    setTimeout(readData, 250);
}

function getData() {
    console.log("#########")
    console.log("3 - getData")
    var urlGet = "https://dweet.io:443/get/latest/dweet/for/" + thing

    requestify.get(urlGet)
        .then(function (response) {
            var body = response.getBody()
            var getActive = body.with[0].content.active
            console.log("3 - getData - get - temp: " + body.with[0].content.temp)
            console.log("3 - getData - get - lux: " + body.with[0].content.lux)
            console.log("3 - getData - get - botao: " + body.with[0].content.botao)
            console.log("3 - getData - get - touch: " + body.with[0].content.touch)
            console.log("3 - getData - get - active: " + getActive)
            console.log("3 - getData - get - status: " + body.with[0].content.status)

            if (getActive) {
                playOn = true;
            } else {
                playOn = false;
            }
            console.log("3 - getData - get - playOn "+playOn)
        });
        console.log("#########")
    setTimeout(getData, 1000);
}

function play() {
    //console.log("************************")
    //console.log("4 - play - playOn: "+playOn)
    if (playOn) {
        console.log("4 - play - playSound ")
        myledSensor.on()
        sleep.msleep(500);
        myledSensor.off()
    }
    else {
        console.log("4 - play - stopSound ")
        myledSensor.off()
    }
    //console.log("************************")
    setTimeout(play, 1000);
}

play();
readData();
getData();

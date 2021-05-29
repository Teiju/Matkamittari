//Initial data
const carAcnsmptn = 3;
const carBcnsmptn = 3.5;
const carCcnsmptn = 4;
const growth = 1.009;
var calculateButton = document.getElementById('calculate');
var option = "";

calculateButton.addEventListener('click', function() { 
    var distance = document.getElementById('distance').value; //User input for distance to be covered
    var speed1 = document.getElementById('speed1').value; //User input for speed
    var speed2 = document.getElementById('speed2').value; //User input for speed to be compared

    var rbA = document.getElementById("rbA").checked;
    var rbB = document.getElementById("rbB").checked;
    var rbC = document.getElementById("rbC").checked;

    if(rbA == false && rbB == false && rbC == false) { //Select car A, B or C
        alert("Valitse auto")
        return;
    } else {
        if(rbA == true) {
            option = "A";
        }else if(rbB == true) {
            option = "B";
        }else if(rbC == true) {
            option = "C";
        }
    }

    //Calculate time in decimal hours
    hours1 = distance/speed1;
    hours2 = distance/speed2;

    //Calculate consumptions
    var totalConsumption1 = consumption(option, speed1, distance);
    var totalConsumption2 = consumption(option, speed2, distance);
    
    //Feedback
    document.getElementById("timeResult1").innerHTML = numberToTime(hours1);
    document.getElementById("timeResult2").innerHTML = numberToTime(hours2);

    document.getElementById("consumption1").innerHTML = round(totalConsumption1) + " litraa";
    document.getElementById("consumption2").innerHTML = round(totalConsumption2) + " litraa";

    document.getElementById("aveSpeed1").innerHTML = Math.round(speed1) + " km/h";
    document.getElementById("aveSpeed2").innerHTML = Math.round(speed2) + " km/h";

    document.getElementById("aveCons1").innerHTML = round(totalConsumption1/(distance/100)) + " l / 100 km";
    document.getElementById("aveCons2").innerHTML = round(totalConsumption2/(distance/100)) + " l / 100 km";

    document.getElementById("conclusion").innerHTML = compare(hours1, hours2, totalConsumption1, totalConsumption2);
})

function numberToTime(number) { //Decimal hours changed to hours and minutes
    let num = number * 60;
    let hours = Math.floor(num / 60);
    let minutes = num % 60;
    let phrase = "";
    if (hours == 1) { phrase = hours + " tunti"; } //One hour
    else if (hours > 1) { phrase = hours + " tuntia"; } //Several hours

    if (minutes <= 0) { return phrase; } //No minutes
    else if (hours > 0) { phrase = phrase + " ja "; } //Hours and minutes
   
    if (minutes == 1) { phrase = phrase + Math.round(minutes) + " minuutti"; } //Hours and one minute            
    else { phrase = phrase + Math.round(minutes) + " minuuttia"; } //Hours and several minute 
    return phrase;
}

function consumption(option, speed, distance) {
    let ltrsPerKm = carAcnsmptn; //Car A consumption
    if (option == 'B') {
        ltrsPerKm = carBcnsmptn; //Car B consumption
    } else if (option == 'C') {
        ltrsPerKm = carCcnsmptn; //Car C consumption
    }

    for (i = 2; i <= speed; i++) { //Autojen bensankulutus kasvaa 1.009 kulmakertoimella. Jos auton nopeus kasvaa 1km/h, niin bensankulutus kasvaa 1.009 kertaiseksi.
        ltrsPerKm = ltrsPerKm * growth;
    }

    var consumption = 0; //Default to 0
    if (distance != 0) {
        consumption = (ltrsPerKm/100) * distance;
    }
    return consumption;
}

function compare(hours1, hours2, totalConsumption1, totalConsumption2) {
    var result = "";
    var difference = 0;
    if (hours1 > hours2) {
        difference = hours1 - hours2;
        time = numberToTime(difference);
        let litres = totalConsumption2 - totalConsumption1;
        result = "Vaihtoehto 1 on hitaampi. Matka-aikojen ero on <b>" + time + "</b>.</br></br>Bensaa kuluu <b>" + round(litres) + " litraa vähemmän</b> kuin nopeammalla vauhdilla";
    } else {
        difference = hours2 - hours1;
        time = numberToTime(difference);
        let litres = totalConsumption1 - totalConsumption2;
        result = "Vaihtoehto 1 on nopampi. Matka-aikojen ero on <b>" + time + "</b>.</br></br>Bensaa kuluu <b>" + round(litres) + " litraa enemmän</b> kuin hitaammalla vauhdilla";
    }
    return result;
 }

 function round(number) {
     return Math.round(number * 100) / 100;;
 }

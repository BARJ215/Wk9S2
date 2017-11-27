//dataPoints. 
var dpsA = [];
var dpsB = [];
var dpsC = [];  

var randomA = [];
var chart;
var startTime;
var watchID;
var accelerometerOptions = { frequency: 2000 };  // Update every 2 seconds
accelerometerOptions.frequency = 3000; //changed my mind - now 3 seconds


//when the page is created...
$(document).on("pagecreate", "#page1", function () {
	
	//setup listener for the toggle switch
	$("#flipswitch").on("change", function() {
		
		if( $(this).val() == "on" ) startSensor();
		else if ( $(this).val() == "off" ) stopSensor();

	});
	
	//setup listener for the slider
	$("#slider").on("slidestop", function() {
		
		
		//the value from the slider is text - it needs to be turned into an integer
		var freq = parseInt($(this).val());
		
		updateFreq(freq);
	
	});
    
//store start time in unixtime 
	startTime = Date.now();
	
//	//set uplistener for button
//	$('#addButton').on('click', function() {
//	   
//		randomA[0] = Math.random();
//        randomA[1] = Math.random();
//        randomA[2] = Math.random();
//		updateChart(randomA);
////        var randomValue = Math.random();
////		updateChart(randomValue);
//        console.log("Button Pressed " + randomA);
//		
//	});
	
	//setup chart
    chart = new CanvasJS.Chart("chartContainer",{
      	title :{
      		text: "Chart of Accelerometer Sensors"
      	},
      	axisY: {						
      		title: "Sensor Value"
      	},
      	axisX: {						
      		title: "Time (seconds)"
      	},
      	data: [{
      		type: "line",
      		dataPoints : dpsA
      	}
               ,{
      		type: "line",
      		dataPoints : dpsB
      	},{
      		type: "line",
      		dataPoints : dpsC
      	}
        ]
   	});
	
});


function startSensor() {
	watchID = navigator.accelerometer.watchAcceleration( accelerometerSuccess, accelerometerError, accelerometerOptions);
}


function stopSensor() {
	navigator.accelerometer.clearWatch(watchID);
			
	$('#sensorX').val("");
	$('#sensorY').val("");
	$('#sensorZ').val("");
	$('#timestamp').val("");
}

function accelerometerSuccess(acceleration) {
	
	$('#sensorX').val(acceleration.x);
	$('#sensorY').val(acceleration.y);
	$('#sensorZ').val(acceleration.z);
	$('#timestamp').val(acceleration.timestamp);
    
    updateChart([acceleration.x,acceleration.y,acceleration.z]);

}

function accelerometerError() {
   alert('Error');
}

function updateFreq(rate) {
	navigator.accelerometer.clearWatch(watchID);
    accelerometerOptions.frequency = rate;
    startSensor();
}

//function updateChart(random) {
//      	 console("updating");
//      	//set new random y values
//      	yVal = random;
//		
//		//x value is time since start 
//		xVal = Date.now() - startTime;
//		//concert from milliseocnds to seconds (divide by a thousand)
//		xVal = xVal / 1000;
//      	
//		//add them to the data points to draw
//		dps.push({x: xVal,y: yVal});
//      	
//		//don't let the chart get too big 
//		//if there are more than 100 data points then start removing older data points
//      	if (dps.length >  100 )
//      	{
//      		dps.shift();				
//      	}
//
//		//redraw the chart
//      	chart.render();		
//	  }


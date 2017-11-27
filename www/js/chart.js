//var dps = [];   //dataPoints. 
//var chart;
//var startTime;

$(document).on("pagecreate", "#chartPage", function () {
	

	
	  
});

function updateChart(random) {
      	
      	//set new random y values
      	yVal = random;
		
		//x value is time since start 
		xVal = Date.now() - startTime;
		//concert from milliseocnds to seconds (divide by a thousand)
		xVal = xVal / 1000;
      	
		//add them to the data points to draw
		dpsA.push({x: xVal,y: yVal[0]});
        dpsB.push({x: xVal,y: yVal[1]});
        dpsC.push({x: xVal,y: yVal[2]});
      	
		//don't let the chart get too big 
		//if there are more than 100 data points then start removing older data points
      	if (dpsA.length >  100 )
      	{
      		dpsA.shift();				
      	}

		//redraw the chart
      	chart.render();		
	  }

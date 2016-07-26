function Gauge(config, element){

var canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 500;
element.appendChild(canvas);


var context = canvas.getContext("2d");

context.clearRect(0, 0, canvas.width, canvas.height);
context.save(); 



context.font = "12px Arial";
context.textAlign = "center";
context.textBaseline = "middle";

var center_x = parseInt(canvas.width / 2);                                         
var center_y = parseInt(canvas.height / 2);                                        
var radius = config.radius;                                                  
var startAngle = (Math.PI/180)*(270-(config.aperture/2));                                   
var endAngle = (Math.PI/180)*(270+(config.aperture/2));                                     


//рисуем дугу

context.beginPath();                                              
context.arc(center_x, center_y, radius, startAngle, endAngle, false);
context.lineWidth = 5;                                           
context.strokeStyle = "black";                                    
context.stroke();


config.areas.forEach(function(area) {

context.beginPath();                                              
context.arc(center_x, center_y, radius, (Math.PI/180)*(area.start+180), (Math.PI/180)*(area.end+180), false);
context.lineWidth = 6;                                           
context.strokeStyle = area.color;                                    
context.stroke();


});


//рисуем шкалу


context.beginPath();
 
context.lineWidth = 0.5; 
context.translate(center_x, center_y); 

config.values.forEach(function(value,k) {


	context.beginPath();
	context.strokeStyle = "black"; 
	if(k==0){
	context.rotate((Math.PI/180)*(-(config.aperture/2)));
	} else {
	context.rotate((Math.PI/180)*((2/(config.values.length-1)/10)*(config.aperture/2)));
	}
	context.moveTo(0, -config.radius-5);
	context.lineTo(0, -config.radius-15);
	context.fillText(value, 0, -config.radius-20);
	context.stroke();
	
	

	
	
	
	if(k < config.values.length-1){
		for(var i = 0; i < 9; i++){
			context.beginPath();
			context.strokeStyle = "gray"; 
			context.rotate((Math.PI/180)*((2/(config.values.length-1)/10)*(config.aperture/2)));
			context.moveTo(0, -config.radius-6);
			context.lineTo(0, -config.radius-7);
			context.stroke();
		}
		
	}

});

//рисуем стредку



context.beginPath();

context.arc(0,0, 10, 0, 2*Math.PI, false);
context.fillStyle = 'royalblue';
context.fill();
context.lineWidth = 1;
context.strokeStyle = 'royalblue';
context.stroke();

context.beginPath();

context.rotate((Math.PI/180)*180);
context.rotate((Math.PI/180)*config.aperture*-config.angle);
context.moveTo(-5, 0);
context.lineTo(0, config.radius);
context.lineTo(5, 0);
//context.closePath();
context.fillStyle = "royalblue";


context.fill();


context.restore();
} //draw



	





	

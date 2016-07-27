function Gauge(config, element){

	if(element){

		//default configuration
		config.width = config.width || 270;
		config.height = config.height || 270;
		config.aperture = config.aperture || 270;
		config.radius = config.radius || 100;
		config.areas = config.areas || [];
		config.values = config.values || [0,1,2,3,4,5,6,7,8,9,10];
		config.arrowColor = config.arrowColor || '#1e98e4';
		config.angle = config.angle || 0;
		config.scaleInside = config.scaleInside || false;
		config.arcColor = config.arcColor || '#777';
		config.textColor = config.textColor || '#000';
		config.dotColor = config.dotColor || 'gray';
		config.font = config.font || '12px Arial';
		config.checkAreas = config.checkAreas || false;


		//creating canvas inside selected element
		var canvas = document.createElement('canvas');
		canvas.width = config.width; 
		canvas.height = config.height;
		element.appendChild(canvas);

		var context = canvas.getContext("2d");
		context.clearRect(0, 0, canvas.width, canvas.height); //clearing canvas for animation ability
		context.save(); 

		var center_x = parseInt(canvas.width / 2);                                         
		var center_y = parseInt(canvas.height / 2);

		//main arc

		context.beginPath();                                              
		context.arc(center_x, center_y, config.radius, (Math.PI/180)*(270-(config.aperture/2)), (Math.PI/180)*(270+(config.aperture/2)), false);
		context.lineWidth = 5;                                           
		context.strokeStyle = config.arcColor;                                    
		context.stroke();

		//color areas

		config.areas.forEach(function(area) {

			if(config.checkAreas){
				var apStart = (180-config.aperture)/2;
				var apEnd = 180-((180-config.aperture)/2);	
				if(area.start < apStart){
					area.start = apStart;
				}
				if(area.end > apEnd){
					area.end = apEnd;
				}
			}
			
			if(area.start != undefined && area.end != undefined && area.color && area.start < area.end){
				context.beginPath();                                              
				context.arc(center_x, center_y, config.radius, (Math.PI/180)*(area.start+180), (Math.PI/180)*(area.end+180), false);
				context.lineWidth = 6;                                           
				context.strokeStyle = area.color;                                    
				context.stroke();
			} else {
				console.log('gauge.js: Ошибка - цветная область задана некорректно.')
			}

		});

		//scale
		context.beginPath();
		context.lineWidth = 0.5; 
		context.translate(center_x, center_y); 
		context.font = config.font;
		context.textAlign = "center";
		context.textBaseline = "middle";

		config.values.forEach(function(value,k) {

			context.beginPath();
			context.strokeStyle = config.textColor; 
			context.fillStyle = config.textColor; 
			if(k==0){
				context.rotate((Math.PI/180)*(-(config.aperture/2)));
			} else {
				context.rotate((Math.PI/180)*((2/(config.values.length-1)/10)*(config.aperture/2)));
			}
			
			if(config.scaleInside){
				context.moveTo(0, -config.radius+5);
				context.lineTo(0, -config.radius+15);
				context.fillText(value, 0, -config.radius+22);
			} else {
				context.moveTo(0, -config.radius-5);
				context.lineTo(0, -config.radius-15);
				context.fillText(value, 0, -config.radius-20);
			}
			context.stroke();
			
			if(k < config.values.length-1){
				for(var i = 0; i < 9; i++){
					context.beginPath();
					context.strokeStyle = config.dotColor; 
					context.rotate((Math.PI/180)*((2/(config.values.length-1)/10)*(config.aperture/2)));
					if(config.scaleInside){
						context.moveTo(0, -config.radius+6);
						context.lineTo(0, -config.radius+7);
					} else {
						context.moveTo(0, -config.radius-6);
						context.lineTo(0, -config.radius-7);
					}
					context.stroke();
				}
				
			}

		});

		//arrow's circle
		context.beginPath();
		context.arc(0,0, 10, 0, 2*Math.PI, false);
		context.fillStyle = config.arrowColor;
		context.fill();
		context.lineWidth = 1;
		context.strokeStyle = config.arrowColor;
		context.stroke();

		//arrow
		context.beginPath();
		context.rotate((Math.PI/180)*180);
		context.rotate((Math.PI/180)*parseInt(config.aperture*-(1-config.angle)));
		context.moveTo(-5, 0);
		context.lineTo(0, config.radius);
		context.lineTo(5, 0);
		context.fillStyle = config.arrowColor;
		context.fill();

		context.restore();
		
	} else {

	console.log('gauge.js: Ошибка - не задан родительский элемент');

	}

}

function Player(context){

	var playerImage = new Image();  
    playerImage.src = "images/Giles9_4x.png"; 	

    var settings = {            
        status : "still",
        width: 512,
        height: 128,
        numberOfFrames: 4,
        ticksPerFrame: 4,
        x: 0,
        y: 252,
        direction: 0,
        speed: 0,
        maximumSpeed: 6,
        minimumSpeed: -6,
        rate:2
    },
    frameIndex = 4,
    tickCount = 0;

    function setDirection(locIn){
    	settings.direction = locIn;
    };

	function draw() {
		context.drawImage(
			playerImage,
			frameIndex * settings.width / settings.numberOfFrames,
			settings.direction,
			settings.width / settings.numberOfFrames,
			settings.height,
			settings.x,
			settings.y,
			settings.width / settings.numberOfFrames,
			settings.height
		);
		switch(settings.status){
			case "right": 
				update(0);
				setDirection(0);
				break;
			case "left": 
				update(0); 
				setDirection(128);
				break;
			case "jump": 
				update(0);
				setDirection(0);
				//console.log("jumping");
				//update(0);
				//frameIndex = 4;
				//settings.speed = 0;
				break;
			case "stopped": 
				//console.log("Da stopped");
				update(0);
				frameIndex = 4;
				break;
			default:	
				break;		
		}
	};

	function speedController(){
		if(settings.speed > settings.maximumSpeed){
			//console.log("more than max");
			settings.x += settings.maximumSpeed;
		}else if(settings.speed < settings.minimumSpeed){
			//console.log("Less than min");
			settings.x = (settings.x + settings.minimumSpeed);
		}else{
			//console.log("Not faster or slower");
			//console.log(settings.speed);
			settings.x += settings.speed;
		}
		//settings.y += y;
	};

    function update(z) { 
    	console.log(settings.speed);		
    	speedController();
		tickCount += 1;
		if (tickCount > settings.ticksPerFrame) {
			//console.log("tick count more than ticksPerFrame");
			//console.log(frameIndex);
            tickCount = 0;
            if (frameIndex < (settings.numberOfFrames - 1)) {  
            	//console.log("True");
                frameIndex += 1;
            } else {
            	//console.log("False");
                frameIndex = 0;
            }
        }
    };

	function walkLeft(){
		//console.log("walk left");
		settings.status = "left";
		settings.speed = settings.speed - settings.rate; 
	};

	function walkRight(){
		//console.log("walk right");
		settings.status = "right";
		settings.speed = settings.speed + settings.rate; 
	};

	function doAJump(){
		console.log("jump");
		settings.status = "jump";
		settings.speed = 0;
		//console.log(settings.rate);
		//settings.status = "right";
		//settings.speed = settings.speed + settings.rate; 
	};

	function stop(){
		//console.log("Stop player");
		settings.status = "stopped";
		settings.speed = 0;
	};

	function playerInterface(){
		return {
			draw : function(){
				draw();
			},
			left : function(){
				walkLeft();
			},
			right : function(){
				walkRight();
			},
			jump : function(){
				doAJump();
			},
			stop : function(){
				stop();
			}
		}
	};

	return playerInterface();
	
};
function Player(context, settings){

	var playerImage = new Image();  
    playerImage.src = "images/Giles9_4x.png",
    frameIndex = 4,
    tickCount = 0,
    minPosition = undefined,
    maxPosition = undefined;
    globalPosition = undefined;

    function setDirection(locIn){
    	settings.direction = locIn;
    };

    function setLimits(){
    	minPosition = 0;
    	maxPosition = settings.width / 2;
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
				update();
				setDirection(0);
				break;
			case "left": 
				update(); 
				setDirection(128);
				break;
			case "jump": 
				update();
				frameIndex = 4;
				break;
			case "stopped": 
				update();
				frameIndex = 4;
				break;
			default:	
				break;		
		}
	};

	function speedController(callback, stick){
		// Ensure speed does not exceed the max or min
		// ??? += refactor
		if(!stick){
			if(settings.speed > settings.maximumSpeed){
				settings.x += settings.maximumSpeed;
			}else if(settings.speed < settings.minimumSpeed){
				settings.x = (settings.x + settings.minimumSpeed);
			}else{
				settings.x += settings.speed;
			};	
		};

		callback();
	};

    function update(){
    	// If position is at boundary pass stick variable
    	var stick = false;
    	if(settings.direction == 128){
    		if(settings.x < minPosition){
    			stick = true;
    		};
    	}else{
    		if(settings.x > maxPosition){
    			stick = true;
    		};
    	};
    	speedController(frameController, stick);
    };

    function frameController(){
    	// Manage player frame
    	tickCount += 1;
		if (tickCount > settings.ticksPerFrame) {
			// new Refactor the way global positioning is handled
			// 
		    if(settings.direction == 128 && globalPosition > 0){
        		globalPosition += -1;
        	}else{
        		if(globalPosition < settings.endPosition){
            		globalPosition += 1;    			
        		}
        	}
            tickCount = 0;
            if (frameIndex < (settings.numberOfFrames - 1)) {  
                frameIndex += 1;
            } else {
                frameIndex = 0;

            }
        }
    };

	function walkLeft(){
		settings.status = "left";
		settings.speed = settings.speed - settings.rate; 
	};

	function walkRight(){
		settings.status = "right";
		settings.speed = settings.speed + settings.rate; 
	};

	function doAJump(){
		console.log("jump");
		settings.status = "jump";
		settings.speed = 0;
	};

	function stop(){
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
			getGlobalPosition : function(){
				return globalPosition;
			},
			stop : function(){
				stop();
			}
		}
	};

	function init(){
		globalPosition = 0;
		setLimits();
	};

	init();

	return playerInterface();
	
};
function Player(context, settingsIn){

	var playerImage = new Image();  
    playerImage.src = "images/Giles9_4x.png",
    frameIndex = 4,
    tickCount = 0,
    minPosition = undefined,
    maxPosition = undefined,
    globalPosition = undefined,
    settings = settingsIn;

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
		update();		
		switch(settings.status){
			case "right": 
				setDirection(0);
				break;
			case "left": 
				setDirection(128);
				break;
			case "jump": 
			settings.y = settings.y -10;
				frameIndex = 4;
				break;
			case "big jump":
				frameIndex = 4;
				break;	
			case "stopped": 
				frameIndex = 4;
				break;
			default:	
				break;		
		};
	};

	function speedController(callback, stick){
		// Ensure speed does not exceed the max or min
		// and set speedString
		if(settings.speed > settings.maximumSpeed){
			settings.x = utils.noParamDoCallback(stick, utils.addedValues, [settings.x, settings.maximumSpeed]);
			settings.speedString = "fast";
		}else if(settings.speed < settings.minimumSpeed){
			settings.x = utils.noParamDoCallback(stick, utils.addedValues, [settings.x, settings.minimumSpeed]);
			settings.speedString = "fast";
		}else{
			settings.x = utils.noParamDoCallback(stick, utils.addedValues, [settings.x, settings.speed]);
			settings.speedString = "slow";
		};
		console.log(settings.speedString);
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
		
		if(settings.status === "jump"){
			console.log("big jump");
			settings.status = "big jump";
		}else{
			console.log("jump");
			settings.status = "jump";
		}
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
			},
			reset : function(){
				settings = getDefaultCharSettings();
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
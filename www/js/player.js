function Player(context){

	var playerImage = new Image();  
    playerImage.src = "images/Giles7_4x.png"; 

    var settings = {            
        status : "still",
        width: 512,
        height: 128,
        image: playerImage,
        numberOfFrames: 4,
        ticksPerFrame: 24
    },
    frameIndex = 0,
    tickCount = 0,
    ticksPerFrame = settings.ticksPerFrame || 0,
    numberOfFrames = settings.numberOfFrames || 1;

	function draw() {
		context.drawImage(
			settings.image,
			frameIndex * settings.width / numberOfFrames,
			0,
			settings.width / numberOfFrames,
			settings.height,
			0,
			252,
			settings.width / numberOfFrames,
			settings.height
		);
		if(settings.status == "right"){
			update();
		}
	};

    function update() {
        tickCount += 1;
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {  
                // Go to the next frame
                frameIndex += 1;
            } else {
                frameIndex = 0;
            }
        }
    };

	function walkLeft(){
		console.log("walk left");
		settings.status = "left";
	};

	function walkRight(){
		console.log("walk right");
		settings.status = "right";
	};

	function doAJump(){
		console.log("jump");
		settings.status = "jumping";
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
			}
		}
	};

	return playerInterface();
	
};
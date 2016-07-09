(function () {
            
    var giles,
        gilesImage,
        canvas;                

    function gameLoop () {
    
        window.requestAnimationFrame(gameLoop);
        switch(giles.status){
            case "walking":
                giles.update();
                giles.render();
            break;
            default: 
                giles.still();
            break;
        };
    }
    
    function sprite (options) {
    
        var that = {            
            context : options.context,
            width : options.width,
            height : options.height,
            image : options.image,
            status : "stopped"
        },
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;

        
        that.update = function () {
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
        
        that.render = function () {
          // Clear the canvas
          that.context.clearRect(0, 0, that.width, that.height);
          // Draw the animation
          that.context.drawImage(
            that.image,
            frameIndex * that.width / numberOfFrames,
            0,
            that.width / numberOfFrames,
            that.height,
            0,
            0,
            that.width / numberOfFrames,
            that.height);
        };

        that.still = function () {
          // Clear the canvas
          that.context.clearRect(0, 0, that.width, that.height);
          // Draw the animation
          that.context.drawImage(
            that.image,
            frameIndex * that.width / numberOfFrames,
            0,
            that.width / numberOfFrames,
            that.height,
            0,
            0,
            that.width / numberOfFrames,
            that.height);
        };

        that.stop = function (){
            // Clear the canvas
            that.status = "stopped";
            that.context.clearRect(0, 0, that.width, that.height);
            console.log("Stopped");
        };

        that.walk = function (){
            // Clear the canvas
            that.status = "walking";
            console.log("walking");
        };
        
        return that;
    }
    
    // Get canvas
    canvas = document.getElementById("gilesSprite");
    canvas.width = 128;
    canvas.height = 128;
    
    gilesImage = new Image();  
    gilesImage.src = "images/Giles7_4x.png";  
    
    // Create sprite
    giles = sprite({
        context: canvas.getContext("2d"),
        width: 512,
        height: 128,
        image: gilesImage,
        numberOfFrames: 4,
        ticksPerFrame: 24
    });
    
    // Load sprite sheet
    var spinLrButton = document.getElementById("walk");
    spinLrButton.addEventListener("click", giles.walk);

    var stopButton = document.getElementById("stop");
    stopButton.addEventListener("click", giles.stop);

    gameLoop();

} ());


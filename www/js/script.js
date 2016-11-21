(function (playerSettings) {
            
    var game
        ,canvas
        ,ctx
        ,infoBox
        ,gameAnimation
        ,player
        ,background;                

    function init(){
        
        canvas = document.getElementById("gameScreen");
        canvas.width = 600;
        canvas.height = 400;
        ctx = canvas.getContext("2d");

        game = new Game();
        infoBox = new InfoBox();
        infoBox.drawBox("welcome");
        background = new Background(ctx);
        player = new Player(ctx, playerSettings);
        new keyboardEventsHandler(game, player);

        loadEventListeners();
    };

    function gameLoop () {
        var state = game.get("state");
        game.animation = window.requestAnimationFrame(gameLoop);
        switch(state){
            case "running":
                var count = utils.increaseAndSet(game, "count", 1);
                background.init();
                infoBox.drawBox(state, count);
                player.draw();
            break;
            case "gameover":
                utils.clearCanvas(ctx, canvas);
            default: 
                window.cancelAnimationFrame(game.animation);
                infoBox.drawBox(state, count);
            break;
        };
    };
    
    /// Game controls the top level game functionality
    function Game(){

        var params = {
            state : "welcome",
            frame : 0,
            count : 1
        };

        var gameInterfaces = {
            start : function(){
                params.state = "running";
                utils.clearCanvas(ctx, canvas);
                gameLoop();
            },
            get : function(paramIn){
                return params[paramIn];
            },
            set : function(paramIn, value){
                params[paramIn] = value;
            },
            update : function(paramsIn){
                for(key in paramsIn){
                    params[key] = paramsIn[key];
                }
            }
        }

        return gameInterfaces;
    }
    
    function loadEventListeners(){
        var spinLrButton = document.getElementById("start");
        spinLrButton.addEventListener("click", game.start);

        var stopButton = document.getElementById("stop");
        stopButton.addEventListener("click", function(){
            game.update({
                "state" : "gameover",
                "count" : 0
            });
            player.reset();
        });
    };

    function InfoBox(){

        var internals = {
            state : "none"
        };

        var boxOptions = utils.boxOptions;

        function clearExistingText(){
            ctx.font = boxOptions[internals.state].font;
            ctx.fillStyle = boxOptions[internals.state].background;
            ctx.strokeStyle = boxOptions[internals.state].background;
            var tempValue;
            internals.value ? tempValue = internals.value : tempValue = boxOptions[internals.state].text;
            utils.clearText(
                ctx
                ,tempValue
                ,boxOptions[internals.state].x
                ,boxOptions[internals.state].y
            );
        }

        var boxInterfaces = {
            drawBox : function(state, value){
                if(internals.state != "none"){
                    clearExistingText();
                }
                ctx.font = boxOptions[state].font;
                ctx.fillStyle = boxOptions[state].colour;
                if(value){
                    ctx.fillText(value, boxOptions[state].x, boxOptions[state].y);
                    internals.value = value;
                }else{
                    ctx.fillText(boxOptions[state].text, boxOptions[state].x, boxOptions[state].y);
                    internals.value = undefined;
                }
                internals.state = state;
            }
        };

        return boxInterfaces;
    };

    init();

} (getDefaultCharSettings()));
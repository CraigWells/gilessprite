var utils = {
	clearText : function(context, text, x, y){
		context.fillText(text, x, y);
		context.strokeText(text, x, y);	
	},
	increaseAndSet : function(obj, attr, value){
    	var temp = obj.get(attr) + value;
    	obj.set(attr, temp);
    	return temp;
    },
    addedValues : function(args){
        var output = 0;
        for(var i = 0; i < args.length; i++){
            output += args[i];
        }
        return output;
    },
    noParamDoCallback(param, callback, args){
        if(!param){
            return callback(args);
        }else{
            return args[0];
        }
    },
    clearCanvas : function(ctx, canvas){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
	boxOptions : {
        running : {
            font : "12px Arial",
            text : "Info Box",
            x : 0,
            y : 12,
            background : "rgb(255,255,255)",
            colour : "rgb(0,0,0)" 
        },
        welcome : {
            font : "30px Arial",
            text : "Basildown Farm",
            x : 0,
            y : 30,
            background : "rgb(255,255,255)",
            colour : "rgb(0,0,0)" 
        },
        gameover : {
            font : "30px Arial",
            text : "Game Over",
            x : 0,
            y : 30,
            background : "rgb(255,255,255)",
            colour : "rgb(0,0,0)" 
        }
    }
};
function keyboardEventsHandler(game, player){
	window.addEventListener("keydown", function(event){
		if(game.get("state") == "running"){
			actionFilter(event.code);
			event.preventDefault();
		};
	});

	window.addEventListener("keyup", function(event){
		if(game.get("state") == "running"){
			console.log("stop");
			player.stop();
		};
	});
	// event.type must be keypress
	function actionFilter(code) {
		switch(code){
			case "ArrowLeft":
			case "KeyA":
				player.left();
				break;
			case "ArrowRight": 
			case "KeyD":
				player.right();
				break;
			case "Space": // Arrow Up
				player.jump();	
				break;
			default:
				break;
		}
	};
}
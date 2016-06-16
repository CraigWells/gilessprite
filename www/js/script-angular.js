/*
    Outstanding: 

    - Expose and position the stats as the graph updates:
    		- Current value : 
    		- Last value 	:
    		- Diff 			:
    		- Diff %	 	:

    - Prettify the dom with CSS and nice buttons.		
*/
(function(angular) {
    'use strict';
    var gameApp = angular.module('gameApp', [])

    .controller('MainCtrl', ['$scope', function($scope) {}])
    /* 
        graphCtrl, keep it slim! 
    */
    .controller('gameCtrl', ['$scope', 'sprite', function($scope, sprite) {
        var stage = new createjs.Stage("gameCanvas");
        sprite.bindToStage(stage);
        stage.addChild(sprite.getSprite());
        stage.update();
    }]);

    gameApp.factory('sprite', function(){
        var stage;
        var circle = new createjs.Shape();
        circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
        circle.x = 100;
        circle.y = 100;

        createjs.Tween.get(circle, { loop: false })
        .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(4));
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener(function(e) {
            if (e.keyCode == 37) {
                console.log("West");
            }
            if (e.keyCode == 39) {
                console.log("East");
            }
        }, stage);

        return {
            bindToStage : function(stageIn){
                stage = stageIn;
            },
            getSprite : function(){
                return circle;
            },
            updateSprite : function(spriteIn){
                circle = spriteIn;
            }

        };   
    });    

    /* Declare the graph directive as Element type */
    gameApp.directive('gamearea', function() {      
        return {
            restrict: 'E',
            templateUrl: 'views/canvas.html'
        }
    });

})(window.angular);
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

    gameApp.directive('shortcut', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            link:    function postLink(scope, iElement, iAttrs){
                jQuery(document).on('keypress', function(e){
                    scope.$apply(scope.keyPressed(e));
                });
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

    gameApp.controller('MainCtrl', ['$scope', 'sprite', function($scope, sprite) {
        $scope.keyPressed = function(e) {
            console.log(e.which);
            sprite.move();
        };
    }]);
    /* 
        graphCtrl, keep it slim! 
    */
    gameApp.controller('gameCtrl', ['$scope', 'sprite', function($scope, sprite) {
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
/*
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
*/
        return {
            bindToStage : function(stageIn){
                stage = stageIn;
            },
            getSprite : function(){
                return circle;
            },
            updateSprite : function(spriteIn){
                circle = spriteIn;
            },
            move : function(){
                createjs.Tween.get(circle, { loop: false })
                .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(4));
                createjs.Ticker.setFPS(60);
                createjs.Ticker.addEventListener("tick", stage);
            }
        };   
    });    

})(window.angular);
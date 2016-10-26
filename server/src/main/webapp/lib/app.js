var app = angular.module('sinkDaShip',['ui.mask','ngRoute']);

app.config(['uiMask.ConfigProvider', function(uiMaskConfigProvider) {
	uiMaskConfigProvider.maskDefinitions({'H': /[a-j,A-J]/, 'V': /[0-9]/});
	uiMaskConfigProvider.clearOnBlur(true);
	uiMaskConfigProvider.addDefaultPlaceholder(true);
}]);

app.config(function($routeProvider){
	$routeProvider.when("/battle", {
		templateUrl : "view/battle.html",
		controller : "battleController"
	});
	$routeProvider.when("/game-over", {
		templateUrl : "view/game-over.html"
	});
	$routeProvider.otherwise({
		templateUrl : "view/new-player.html",
		controller : "newPlayerController"
	});
});

app.controller('newPlayerController', function ($scope, $http, $location) {

	var dictLetters = {
							"A":1,"B":2,"C":3,"D":4,"E":5,"F":6,"G":7,"H":8,"I":9,"J":10,
							"a":1,"b":2,"c":3,"d":4,"e":5,"f":6,"g":7,"h":8,"i":9,"j":10
						};
	var dictNumbers = {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"0":10};

	$scope.player = {
		"board" : {
			"ships" : [
				{
					"type" : "CARRIER",
					"parts" : [
						{ 
							"positionOnTable" : {}
						},
						{ 
							"positionOnTable" : {}
						},
						{ 
							"positionOnTable" : {}
						},
						{ 
							"positionOnTable" : {}
						},
						{ 
							"positionOnTable" : {}
						}
					]
				},{
					"type" : "BATTLESHIP",
					"parts" : [
						{ 
							"positionOnTable" : {}
						},
						{ 
							"positionOnTable" : {}
						},
						{ 
							"positionOnTable" : {}
						},
						{ 
							"positionOnTable" : {}
						}
					]
				},{
					"type" : "CRUISER",
					"parts" : [
						{ 
							"positionOnTable" : {}
						},
						{ 
							"positionOnTable" : {}
						},
						{ 
							"positionOnTable" : {}
						}
					]
				},{
					"type" : "SUBMARINE",
					"parts" : [
						{ 
							"positionOnTable" : {}
						},
						{ 
							"positionOnTable" : {}
						},
						{ 
							"positionOnTable" : {}
						}
					]
				},{
					"type" : "DESTROYER",
					"parts" : [
						{ 
							"positionOnTable" : {}
						},
						{ 
							"positionOnTable" : {}
						}
					]
				}
			]
		}
	};

	$scope.enterNewGame = function (player) {
		console.log('enterNewGame');
		if ($scope.form.$valid){
			var playerParameters = preparePlayerParameters(player);
			$http.post('http://rnlabs.com.br:8080/sinkdaship/match/add-new-player',playerParameters).then(enterNewGameSuccessCallback, enterNewGameErrorCallback);	
		}
	};

	var preparePlayerParameters = function (player) {
		for (var shipIndex = 0; shipIndex < player.board.ships.length; shipIndex++) {
			var currentShip = player.board.ships[shipIndex];
			for (var partIndex = 0; partIndex < currentShip.parts.length; partIndex++) {
				var positions = currentShip.parts[partIndex].position.split("",2);
				
				currentShip.parts[partIndex].positionOnTable = {
					"verticalPosition": dictLetters[positions[0]],
					"horizontalPosition": dictNumbers[positions[1]]
				};
			};
		};
		return JSON.stringify(player);
	}

	var enterNewGameSuccessCallback = function (response) {
		var data = response.data;
		console.log(data);
		if (data.ok){
			console.log('success entering in new match, take your ID: '+data.resultObject.matchIdentificator+' you are the player '+data.resultObject.playerNumber);
			$location.path('/battle');
		} else {
			enterNewGameErrorCallback(data);
		}
	};

	var enterNewGameErrorCallback = function (data) {
		console.log('error while entering new game',data);
	};

});


app.controller('battleController', function ($scope, $http, $location) {

});
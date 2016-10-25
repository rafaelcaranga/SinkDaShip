var app = angular.module('sinkDaShip',['ui.mask']);

app.config(['uiMask.ConfigProvider', function(uiMaskConfigProvider) {
	uiMaskConfigProvider.maskDefinitions({'H': /[a-j,A-J]/, 'V': /[0-9]/});
	uiMaskConfigProvider.clearOnBlur(true);
	uiMaskConfigProvider.addDefaultPlaceholder(true);
}]);

app.controller('sinkController', function ($scope, $http) {

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
		$http.post('http://rnlabs.com.br:8080/sinkdaship/match/add-new-player',JSON.stringify(player)).then(enterNewGameSuccessCallback, enterNewGameErrorCallback);
	};

	var enterNewGameSuccessCallback = function (data) {
		console.log('success while entering new game',data);
	};

	var enterNewGameErrorCallback = function (data) {
		console.log('error while entering new game',data);
	};

});
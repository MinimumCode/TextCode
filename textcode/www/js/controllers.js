(function() {

var app = angular.module('textcode.controllers', []);


    app.service('textcodeService', function( $http ) {
        var txtcodeSrv = this;
        this.textcodes = [];

        var addTextCode = function(newObj) {
            textcodes.push(newObj);
        };

        var getTextCodes = function() {
            return this.textcodes;
        };

        var setTextCodes = function(txtcode) {
            this.textcodes = txtcode;
        };

        return {
            addTextCode: addTextCode,
            getTextCodes: getTextCodes,
            setTextCodes: setTextCodes
        };

    });


app.controller('AppCtrl', function($scope, $http, $ionicModal, $timeout ,textcodeService ) {

    $scope.groups = [];

    this.getDataJson = function() {
        $http({
            method: 'GET',
            url: "js/textcode.json?ran=" + Math.random()
        }).then(function successCallback(response) {
            textcodeService.setTextCodes(response.data);
            $scope.groups = response.data;
            console.log($scope.groups);
        }, function errorCallback(response) {
            console.log("Failed to get data.json");
        });
    };


    if (!$scope.groups.length)
      $scope.groups = this.getDataJson();

    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

app.controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [{
        title: 'Reggae',
        id: 1
    }, {
        title: 'Chill',
        id: 2
    }, {
        title: 'Dubstep',
        id: 3
    }, {
        title: 'Indie',
        id: 4
    }, {
        title: 'Rap',
        id: 5
    }, {
        title: 'Cowbell',
        id: 6
    }];
})

app.controller('FrontPageCtrl', function($scope) {

})


app.controller('MobileCtrl', function($scope, $stateParams,textcodeService ) {
  var ind = $stateParams.grouplistsId.substr(1);
  var groups = textcodeService.getTextCodes(); 
  $scope.group = groups[ind] ;
   
});

app.controller('PlaylistCtrl', function($scope, $stateParams) {});

})();
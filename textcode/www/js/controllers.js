(function() {

    var app = angular.module('textcode.controllers', ['textcode.services']);

    app.controller('AppCtrl', function($scope, $http, $ionicModal, $timeout, textcodeService) {

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

        $scope.setGroupId = function(ind) {
            textcodeService.setId("group", ind);
        };

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


    app.controller('MobileCtrl', function($scope, $stateParams, textcodeService, mobileService) {

        var textcodes = textcodeService.getTextCodes();
        $scope.mobile = textcodes[textcodeService.groupId];

        $scope.setItems = function(items) {
            mobileService.items = items;
        };




    });

    app.controller('SubMobileCtrl', function($scope, $stateParams, textcodeService, mobileService) {

        $scope.items = mobileService.items;
        $scope.setItem = function(item) {
            textcodeService.currentItem = item;
        }

    });


    app.controller('MobileItemCtrl', function($scope, $ionicPopup, $ionicLoading, textcodeService) {
        $scope.item = textcodeService.currentItem;
        $scope.sendstatus = "Send";

        $scope.btn_send_status = false;


        $scope.togglefav = function( item ) {

            if ($scope.item.fav) {
                //TODO: add code for removing from favorites
                $scope.item.fav = false;
                textcodeService.removeFromFavorites( item );
            } else {
                //TODO: add code for adding to favorites
                $scope.item.fav = true;
                textcodeService.addToFavorites( item );
            }
        };
        $scope.show = function() {
            $ionicLoading.show({
                template: '<ion-spinner class="spinner-energized"></ion-spinner>'
            });
            $scope.sendstatus = "Sending...";

            setTimeout(function() {
                $ionicLoading.hide();
                $scope.sendstatus = "Sent...";
            }, 1000);

        };

        $scope.showAlert = function( items ) {
            $scope.sendstatus = "Sending...";
            $scope.btn_send_status = true;
           
            console.log( "Sending item code: ", $scope.item );
            setTimeout(function() {

                $ionicPopup.alert({
                    title: 'Sent!',
                    template: 'Sending successful.'
                }).then(function(res) {
                    console.log('TODO: actually send the text code.');
                    $scope.sendstatus = "Send";
                    $scope.btn_send_status = false;
                });
            }, 1000);

        };


    });


    app.controller('FavoritesCtrl', function($scope, textcodeService) {
        $scope.favorites = [];
        $scope.favorites = textcodeService.getFavorites();
    });


    app.controller('PlaylistCtrl', function($scope, $stateParams) {});

})();
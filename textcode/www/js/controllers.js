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

    app.controller('MobileItemsCtrl', function($scope, $stateParams, textcodeService, mobileService) {

        $scope.items = mobileService.items;
        $scope.setItem = function(item) {
            textcodeService.currentItem = item;
        }

        $scope.toggleFav = function(item) {

            if (item.fav) {
                item.fav = false;
                textcodeService.removeFromFavorites(item);
            } else {
                item.fav = true;
                textcodeService.addToFavorites(item);
            }
        };


    });


    app.controller('MobileItemCtrl', function($scope, $ionicPopup, $ionicLoading, $cordovaSms, textcodeService) {

        $scope.item = textcodeService.currentItem;
        $scope.sendstatus = "Send";
        $scope.btn_send_status = false;

        $scope.toggleFav = function(item) {

            if ($scope.item.fav) {
                $scope.item.fav = false;
                textcodeService.removeFromFavorites(item);
            } else {

                $scope.item.fav = true;
                textcodeService.addToFavorites(item);
            }
        };


        var showLoading = function() {
            $ionicLoading.show({
                template: '<ion-spinner class="spinner-energized"></ion-spinner>'
            });
            $scope.sendstatus = "Sending...";
            $scope.btn_send_status = true;

            setTimeout(function() {
                $ionicLoading.hide();
                $scope.sendstatus = "Send";
                $scope.btn_send_status = false;
            }, 1000);

        };

        $scope.sendCode = function() {

            var sendSMSCode = function() {

                document.addEventListener("deviceready", function() {

                    //CONFIGURATION
                    var options = {
                        replaceLineBreaks: false, // true to replace \n by a new line, false by default
                        android: {
                            intent: ''
                        }
                    };

                    var success = function() {

                        $ionicPopup.alert({
                            title: 'Sent!',
                            template: 'Sending successful.'
                        }).then(function(res) {
                            textcodeService.addToSentItems($scope.item);
                            $scope.sendstatus = "Send";
                            $scope.btn_send_status = false;

                        });

                    };

                    /*TODO: Remove debug number*/
                    console.log("Sending code , Number: " +  $scope.item.number + " code:'" + $scope.item.textcode + "'");
                    var error = function(e) { alert('Message Failed:' + e); };
                    sms.send( $scope.item.number, $scope.item.textcode, options, success, error);



                });
            };

            
            showLoading();
            if (!textcodeService.isDebugMode())
                sendSMSCode();
            else
                textcodeService.addToSentItems($scope.item);



        };

    });


    app.controller('FavoritesCtrl', function($scope, textcodeService) {

        $scope.favorites = [];
        $scope.$on("$ionicView.enter", function(event, data) {
            if ($scope.favorites.length !== textcodeService.getFavorites().length) {
                $scope.favorites = textcodeService.getFavorites();
            }

            $scope.favorites.length == 0 ? $scope.isFavEmpty = true :
                $scope.isFavEmpty = false;
        });
    });


    app.controller('SentItemsCtrl', function($scope, $ionicPopup, textcodeService) {

        $scope.sentItems = [];
        $scope.$on("$ionicView.enter", function(event, data) {
            if ($scope.sentItems.length !== textcodeService.getSentItems().length) {
                $scope.sentItems = textcodeService.getSentItems();
            }
        });


        $scope.showFilters = function() {
            $scope.filterdate = new Date();

            var filterpopup = $ionicPopup.show({
                template: '<input type="date" ng-model="filterdate">',
                title: 'Filter date',
                subTitle: 'Enter date that you want to filter',
                scope: $scope,
                buttons: [{
                    text: 'Cancel'
                }, {
                    text: '<b>Filter</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.filterdate) {
                            e.preventDefault();
                        } else {
                            return $scope.filterdate;
                        }
                    }
                }]
            });

        }




    });

    app.controller('PlaylistCtrl', function($scope, $stateParams) {});

})();

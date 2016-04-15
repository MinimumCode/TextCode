(function() {

    var app = angular.module('textcode.controllers', []);


    /*
      Code from flavordaaave. Thanks dude this is awesome :)
      https://forum.ionicframework.com/t/ion-option-button-in-list-toggle-by-icon-click-instead-of-swipe/9703/12
    */

    app.directive('clickForOptions', ['$ionicGesture',
        function($ionicGesture) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.bind('click', function(e) {
                        e.stopPropagation();

                        // Grab the content
                        var content = element.parent()[0];

                        // Grab the buttons and their width
                        var buttons = element.parent().parent()[0].querySelector('.item-options');

                        if (!buttons) {
                            console.log('There are no option buttons');
                            return;
                        }
                        var buttonsWidth = buttons.offsetWidth;

                        ionic.requestAnimationFrame(function() {
                            content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

                            if (!buttons.classList.contains('invisible')) {
                                console.log('close');
                                content.style[ionic.CSS.TRANSFORM] = '';
                                setTimeout(function() {
                                    buttons.classList.add('invisible');
                                }, 250);
                            } else {
                                buttons.classList.remove('invisible');
                                content.style[ionic.CSS.TRANSFORM] = 'translate3d(-' + buttonsWidth + 'px, 0, 0)';
                            }
                        });
                    });
                }
            };
        }
    ]);

    app.service('textcodeService', function($http) {
        var txtcodeSrv = this;
        this.textcodes = [];


        this.groupId = 0;
        this.subId = 0;
        this.item = 0;

        var addTextCode = function(newObj) {
            textcodes.push(newObj);
        };

        var getTextCodes = function() {
            return this.textcodes;
        };

        var setTextCodes = function(txtcode) {
            this.textcodes = txtcode;
        };

        var setId = function(type, ind) {
            if (type == "group")
                this.groupId = ind;
            else if (type == "sub")
                this.subId = ind;
            else if (type == "item")
                this.item = ind;
        }
        return {
            addTextCode: addTextCode,
            getTextCodes: getTextCodes,
            setTextCodes: setTextCodes,
            setId: setId
        };

    });


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


    app.controller('MobileCtrl', function($scope, $stateParams, textcodeService) {

        var textcodes = textcodeService.getTextCodes();
        $scope.mobile = textcodes[textcodeService.groupId];

        $scope.subId = 0;

        $scope.setSubId = function(ind) {
            textcodeService.subId = ind;
        };

    });

    app.controller('SubMobileCtrl', function($scope, $stateParams, $ionicListDelegate, textcodeService) {

        var textcodes = textcodeService.getTextCodes();
        $scope.group = textcodes[textcodeService.groupId].groups[textcodeService.subId];

    });

    app.controller('PlaylistCtrl', function($scope, $stateParams) {});

})();
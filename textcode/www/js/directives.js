 (function() {

     /*
      Code from flavordaaave. Thanks dude this is awesome :)
      https://forum.ionicframework.com/t/ion-option-button-in-list-toggle-by-icon-click-instead-of-swipe/9703/12
    */
    
    var app = angular.module('textcode.directives', []);

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

})();
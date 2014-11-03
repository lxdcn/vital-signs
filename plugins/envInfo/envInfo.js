app.directive("envInfo", ["proxy", "timer", "$timeout", function (proxy, timer, $timeout) {
    return {
        priority:0,
        templateUrl:'/resource/html?path=plugins/envInfo/envInfo.html',
        replace:true,
        transclude:false,
        restrict:'EA',
        scope:true,
        controller:function ($scope) {
            $scope.check = $scope.dashboardConfig.envInfo || [];

            var checker = function () {
                angular.forEach($scope.check, function (c) {

                    if(!c.inUse) {
                        c.inUse = true;
                        c.ip = c.url;

                        c.img = new Image();

                        c.img.onload = function() {
                            if (c.inUse) {
                                c.result = true; c.inUse = false;
                            }
                        };
                        c.img.onerror = function() {
                            if (c.inUse) {
                                c.result = true; c.inUse = false;
                            }
                        };

                        c.start = new Date().getTime();
                        c.img.src = "http://" + c.ip;
                        c.timer = setTimeout(function() {
                            if (c.inUse) {
                                c.result = false; c.inUse = false;
                            }
                        }, 1500);

                    }



                    // proxy.get(c.url, function (html) {
                    //     $timeout(function () {
                    //         // c.result = html.match(c.match).length > 0;
                    //         c.result =false;
                    //     });
                    // });

                });
            };
            timer.start(checker);
        }
    };
}]);

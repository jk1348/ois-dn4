(function () {
    "use strict";

    angular.module("Konda.OIS.DN4").controller('MapCtrl', ['$scope', '$http', function($scope, $http) {
            var that = this;

            $http.get('http://healthmap.org/getAlerts.php?time_interval=1+week')
                .success(function(data, status, headers, config) {
                    alert("ok!")
                }).error(function(data, status, headers, config) {
                    console.log(data);
                });
        }
    ]);
})();
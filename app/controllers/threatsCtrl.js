(function () {
    "use strict";


    function ToRadians(degree) {
        return (degree * (Math.PI / 180));
    }

    function CalcHaversineDistance(lat1, lat2, long1, long2) {

        var radianLat1 = ToRadians(lat1);
        var radianLong1 = ToRadians(long1);
        var radianLat2 = ToRadians(lat2);
        var radianLong2 = ToRadians(long2);
        var radianDistanceLat = radianLat1 - radianLat2;
        var radianDistanceLong = radianLong1 - radianLong2;
        var sinLat = Math.sin(radianDistanceLat / 2.0);
        var sinLong = Math.sin(radianDistanceLong / 2.0);
        var a = Math.pow(sinLat, 2.0) + Math.cos(radianLat1) * Math.cos(radianLat2) * Math.pow(sinLong, 2.0);
        var distance = 6378.1 * 2 * Math.asin(Math.min(1, Math.sqrt(a)));

        return distance;
    }


    angular.module("Konda.OIS.DN4").controller('ThreatsCtrl', ['$http', 'geolocation', function($http, geolocation) {
            var that = this;

            that.position = false;
            var posData = null;
            that.data = false;
            that.dataD = false;

            that.threats = [];

            geolocation.getLocation().then(function (pos) {
                that.posData = pos;
                that.position = true;
                process();
            });

            $http.get('./server/threats.json')
                .success(function(data, status, headers, config) {
                    that.data = data;
                    that.dataD = true;
                    process();
                }).error(function(data, status, headers, config) {
                    console.log(data);
                });

            function process() {
                if (that.position === false || that.dataD === false)
                    return;

                for (var i in that.data.markers) {
                    var obj = that.data.markers[i];
                    var dst = CalcHaversineDistance(that.posData.coords.latitude, obj.lat, that.posData.coords.longitude, obj.lon);

                    if (dst < 100) {

                        obj.class = "";

                        if (dst < 75)
                            obj.class = "list-group-item-warning";
                        if (dst < 50)
                            obj.class = "list-group-item-danger";

                        obj.dst = parseFloat(Math.round(dst * 100) / 100).toFixed(2);
                        that.threats.push(obj);
                    }
                }
            }
        }
    ]);
})();
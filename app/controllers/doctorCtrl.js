(function () {
    "use strict";

    angular.module("Konda.OIS.DN4").controller('DoctorCtrl', ["$http", function ($http) {
        var that = this;
        that.threads = [];

        $http.get("./server/threads.json").then(function (data) {
            that.threads = data.data.threads;
        });
    }
    ]);
})();
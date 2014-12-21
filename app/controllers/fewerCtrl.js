(function () {
    "use strict";

    angular.module("Konda.OIS.DN4").controller('FewerCtrl', ['EhrScapeService', function (ehr) {
        var that = this;

        that.data = [];

        ehr.getFewerData().then(function (d) {
            that.data = d.resultSet;

            for (var i in that.data) {
                var t = new Date(that.data[i].time);
                that.data[i].time = (t.getDay()+1) + "." + (t.getMonth()+1) + "." + t.getFullYear();
             }
        });
    }
    ]);
})();
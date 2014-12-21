(function () {
    "use strict";

    angular.module("Konda.OIS.DN4").controller('O2Ctrl', ['EhrScapeService', function (ehr) {
        var that = this;

        that.options = {
            chart: {
                type: 'bulletChart',
                transitionDuration: 250
            }
        };

        that.data = {
            "title": "Oxygen (%)",
            "ranges": [0, 80, 90, 100],
            "measures": [80],
            "markers": [95],
        }

        ehr.getMeasurment("spO2").then(function (d) {
            that.data.measures.push(d[d.length - 1].spO2)
        });
    }
    ]);
})();
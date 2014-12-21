(function () {
    "use strict";

    angular.module("Konda.OIS.DN4").controller("BodyWeightCtrl", ["EhrScapeService", function (ehr) {
        var that = this;

        that.options = {
            chart: {
                type: 'lineChart',
                height: 200,
                x: function (d) { return new Date(d.time); },
                y: function (d) { return d.weight; },
                useInteractiveGuideline: false,
                xAxis: {
                    axisLabel: 'Date',
                    staggerLabels: true,
                    tickFormat: function (t) {
                        var tmp = new Date(t);
                        return tmp.getDay() + "." + (tmp.getMonth() + 2) + "." + tmp.getFullYear();
                    }
                },
                yAxis: {
                    axisLabel: 'Body Weight (kg)',
                    axisLabelDistance: 30
                },
                showLegend: false,
            }
        };

        that.data = [];
        ehr.getMeasurment("weight").then(function (data) {

            that.data = [
                {
                    values: data,
                    key: "Weight",
                }
            ];
        })
    }
    ]);
})();
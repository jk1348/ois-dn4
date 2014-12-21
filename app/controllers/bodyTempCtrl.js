(function () {
    "use strict";

    angular.module("Konda.OIS.DN4").controller('BodyTempCtrl', ['EhrScapeService', function (ehr) {
        var that = this;

        that.options = {
            chart: {
                type: 'multiBarChart',
                height: 200,
                x: function (d) { return new Date(d.time); },
                y: function (d) { return d.temperature; },
                useInteractiveGuideline: true,
                xAxis: {
                    axisLabel: 'Date',
                    staggerLabels: true,
                    tickFormat: function (t) {
                        var tmp = new Date(t);
                        return tmp.getDay() + "." + (tmp.getMonth() + 2) + "." + tmp.getFullYear();
                    }
                },
                yAxis: {
                    axisLabel: 'Body Temperature (°C)',
                    axisLabelDistance: 30
                },
                showLegend: false,
                showControls: false,
            }
        };

        that.data = [];
        ehr.getMeasurment("body_temperature").then(function (d) {
            that.data = [
                {
                    key: "Temperature",
                    values: d.reverse(),
                }
            ];
        });
    }
    ]);
})();
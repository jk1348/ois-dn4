(function () {
    "use strict";

    angular.module("Konda.OIS.DN4").controller('BloodPressureCtrl', ["EhrScapeService" , function (ehr) {
        var that = this;

        that.options = {
            chart: {
                type: 'stackedAreaChart',
                height: 200,
                x: function (d) { return new Date(d.x); },
                y: function (d) { return d.y; },
                useInteractiveGuideline: false,
                xAxis: {
                    axisLabel: 'Date',
                    staggerLabels: true,
                    tickFormat: function (t) {
                        var tmp = new Date(t);
                        return tmp.getDay() + " ." + (tmp.getMonth() + 2) + " ." + tmp.getFullYear();
                    }
                },
                yAxis: {
                    axisLabel: 'Blood pressure (mm[Hg])',
                    axisLabelDistance: 30
                },
                //showLegend: false,
                showControls: true,
            }
        };

        that.data = [];

        ehr.getMeasurment("blood_pressure").then(function (d) {
            var d1 = [];
            var d2 = [];

            for (var i in d) {
                d1.push({ x: d[i].time, y: d[i].systolic });
                d2.push({ x: d[i].time, y: d[i].diastolic });
            }

            that.data = [
                {
                    key: "Systolic",
                    values: d1,
                },
                {
                    key: "Diastolic",
                    values: d2,
                }
            ];
        });
    }
    ]);
})();
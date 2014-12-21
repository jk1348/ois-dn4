(function () {
    "use strict";

    angular.module("Konda.OIS.DN4").controller('BodyHeightCtrl', ['EhrScapeService', function (ehr) {
            var that = this;

            that.options = {
                chart: {
                    type: 'lineChart',
                    height: 200,
                    x: function(d) { return new Date(d.time); },
                    y: function(d) { return d.height; },
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
                        axisLabel: 'Body Height (cm)',
                        axisLabelDistance: 30
                    },
                    showLegend: false,
                }
            };

            that.data = [];
            ehr.getMeasurment("height").then(function (data) {

                that.data = [
                    {
                        values: data,
                        key: "height",
                    }
                ];
            })
        }
    ]);
})();
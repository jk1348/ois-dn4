(function () {
    "use strict";

    angular.module("Konda.OIS.DN4").controller('HeartCircleCtrl', ['$scope', function($scope) {
            var that = this;
            var element = document.getElementById('heartRateCircle');

            that.progressBar = new ProgressBar.Circle(element, {
                duration: 200,
                color: "#000",
                trailColor: "#F00",
                strokeWidth: 7,
            });

            that.heartRateNr = 100;

            that.data = [
                {
                    key: "Heart Rate",
                    values: [],
                }
            ];

            setInterval(function () {
                for (var i = 0; i < that.data[0].values.length; i++)
                    that.data[0].values[i][0]--;

                that.heartRateNr = Math.round(Math.random() * 20 + 70);
                that.data[0].values.push([0, that.heartRateNr]);

                if (that.data[0].values.length > 61)
                    that.data[0].values.shift();

                that.progressBar.animate(that.heartRateNr / 240, function () {
                });

                $scope.$apply();
            }, 1000);

            that.options = {
                chart: {
                    showYAxis: false,
                    showXAxis: false,
                    height: 1080,
                    type: 'stackedAreaChart',
                    x: function(d) { return d[0]; },
                    y: function(d) { return d[1]; },
                    useVoronoi: false,
                    clipEdge: true,
                    showLegend: false,
                    showControls: false,
                    transitionDuration: 0,
                    useInteractiveGuideline: true,
                    xDomain: [-60, 0],
                    xAxis: {
                        showMaxMin: false,
                        tickFormat: function (d) {
                            return d;
                        },
                        ticks: 5,

                    },
                    yDomain: [0, 240],
                    yAxis: {
                        tickFormat: function (d) {
                            return d3.format(',.0f')(d);
                        }
                    }
                }
            };

        }

    ]);
})();
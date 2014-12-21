(function () {
    angular.module("Konda.OIS.DN4").controller('GeneratorCtrl', ['EhrScapeService', "$location", function (ehr, $location) {
        var that = this;

        that.names = ["Fyodor Dostoyevsky", "Hitman Agent 47", "Child The Famous"];
        that.selected = "Fyodor Dostoyevsky";

        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        function generate() {
            var url = getParameterByName('subject');

            if (url == "")
                url = "1";

            that.selected = that.names[url * 1.0-1];

            if (localStorage.getItem(url) != null && localStorage.getItem(url) != "null") {
                ehr.setId(localStorage.getItem(url));
                return;
            }

            

            //function addMeasurments(dt, height, weight, temp, sys, dis, o2, doc) {

            if (url == "1") {
                ehr.createUser({
                    firstName: "Fyodor",
                    lastNames: "Dostoyevsky",
                    dateOfBirth: "1882-10-11",
                });

                for (var i = 0; i < 10; i++) {
                    ehr.addMeasurments(
                        new Date(1900 + i * 5*Math.round(Math.random()), Math.round(Math.random() * 12), Math.round(Math.random() * 29)),
                        187 + Math.round(Math.random() * 6, 1),
                        100 + Math.round(Math.random() * 20, 1),
                        35 + Math.round(Math.random() * 3.5, 1),
                        95 + Math.round(Math.random() * 45, 0),
                        60 + Math.round(Math.random() * 45, 0),
                        80 + Math.round(Math.random() * 20, 2),
                        "Nikolay Pirogov"
                    );
                }
            }
            else if (url == "2") {
                ehr.createUser({
                    firstName: "Hitman",
                    lastNames: "Agent 47",
                    dateOfBirth: new Date(1990, 5, 10),
                });
                for (var i = 0; i < 10; i++) {
                    ehr.addMeasurments(
                        new Date(1992 + i * 2, Math.round(Math.random() * 12), Math.round(Math.random() * 29)),
                        179 + Math.round(Math.random() * 6, 1),
                        80 + Math.round(Math.random() * 10, 1),
                        35 + Math.round(Math.random() * 3.5, 1),
                        95 + Math.round(Math.random() * 25, 0),
                        60 + Math.round(Math.random() * 35, 0),
                        90 + Math.round(Math.random() * 5, 2),
                        "Dr. House"
                    );
                }
            }
            else if (url == "3") {
                ehr.createUser({
                    firstName: "Child",
                    lastNames: "The Famous",
                    dateOfBirth: new Date(2004, 1, 28),
                });
                for (var i = 0; i < 10; i++) {
                    ehr.addMeasurments(
                        new Date(2004 + i, Math.round(Math.random() * 12), Math.round(Math.random() * 29)),
                        50 + Math.round(Math.random() * 6+i*8, 1),
                        3.5 + Math.round(Math.random() * 10+i*2.5, 1),
                        35 + Math.round(Math.random() * 3.5, 1),
                        95 + Math.round(Math.random() * 25, 0),
                        60 + Math.round(Math.random() * 35, 0),
                        90 + Math.round(Math.random() * 5, 2),
                        "Albert Fish"
                    );
                }
            }
            localStorage.setItem(url, ehr.getId());
            
        }

        generate();
    }
    ]);
})();
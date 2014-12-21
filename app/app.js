(function() {
    "use strict";

    var app = angular.module("Konda.OIS.DN4", [
        "ngRoute",
        "nvd3",
        "geolocation",
        "ui.bootstrap"
    ]);

    app.constant("_", window._);
})();
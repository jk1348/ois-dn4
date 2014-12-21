(function () {
	"use strict";

	angular.module("Konda.OIS.DN4").factory("EhrScapeService", ["$http", "$q", "$location", function ($http, $q, $location) {
	    var that = this;
	    var baseUrl = "https://rest.ehrscape.com/rest/v1";

	    that.username = "ois.seminar";
	    that.password = "ois4fri";

	    that.ehrId = null;

	    function getSessionId() {
	        var response = $.ajax({
	            type: "POST",
	            url: baseUrl + "/session?username=" + encodeURIComponent(that.username) +
                        "&password=" + encodeURIComponent(that.password),
	            async: false
	        });
	        return JSON.parse(response.responseText).sessionId;
	    }


	    function getMeasurment(name) {
	        var req = $http.get(baseUrl + "/view/" + that.ehrId + "/" + name, {
	            headers: { "Ehr-Session": getSessionId() },
	        })

	        return req.then(_handleSuccess, _handleError);
	    }


	    function addMeasurments(dt, height, weight, temp, sys, dis, o2, doc) {
	        $.ajaxSetup({
	            headers: { "Ehr-Session": getSessionId() }
	        });
	        var pacientData = {
	            "ctx/language": "en",
	            "ctx/territory": "SI",
	            "ctx/time": dt,
	            "vital_signs/height_length/any_event/body_height_length": height,
	            "vital_signs/body_weight/any_event/body_weight": weight,
	            "vital_signs/body_temperature/any_event/temperature|magnitude": temp,
	            "vital_signs/body_temperature/any_event/temperature|unit": "°C",
	            "vital_signs/blood_pressure/any_event/systolic": sys,
	            "vital_signs/blood_pressure/any_event/diastolic": dis,
	            "vital_signs/indirect_oximetry:0/spo2|numerator": o2,
	        };
	        var params = {
	            "ehrId": that.ehrId,
	            templateId: 'Vital Signs',
	            format: 'FLAT',
	            committer: doc
	        };
	        $.ajax({
	            url: baseUrl + "/composition?" + $.param(params),
	            type: 'POST',
	            async: false,
	            contentType: 'application/json',
	            data: JSON.stringify(pacientData),
	            success: function (res) {
	                console.log(res.meta.href);
	            },
	            error: function (err) {
	                console.log(err);
	            }
	        });
	    }

	    function createUser(pacient) {
	        $.ajaxSetup({
	            headers: { "Ehr-Session": getSessionId() }
	        });
	        $.ajax({
	            url: baseUrl + "/ehr",
	            type: 'POST',
	            async: false,
	            success: function (data) {
	                that.ehrId = data.ehrId;
	                var partyData = {
	                    firstNames: pacient.firstNames,
	                    lastNames: pacient.lastNames,
	                    dateOfBirth: pacient.dateOfBirth,
	                    partyAdditionalInfo: [{ key: "ehrId", value: that.ehrId }]
	                };
	                $.ajax({
	                    url: baseUrl + "/demographics/party",
	                    type: 'POST',
	                    async: false,
	                    contentType: 'application/json',
	                    data: JSON.stringify(partyData),
	                    success: function (party) {
	                        console.log("Created user: '" + that.ehrId + "'.");
	                    }
	                });
	            }
	        });
	    }

	    function getFewerData() {
	        var sql = "select " +
    						"t/data[at0002]/events[at0003]/time/value as time, " +
    						"t/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude as temperature, " +
    						"t/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/units as unit " +
						"from EHR e[e/ehr_id/value='" + that.ehrId + "'] " +
						"contains OBSERVATION t[openEHR-EHR-OBSERVATION.body_temperature.v1] " +
						"where t/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude>37 " +
						"order by t/data[at0002]/events[at0003]/time/value desc " +
						"limit 10";

	        var req = $http.get(baseUrl + "/query", {
	            params: {aql: sql},
	            headers: { "Ehr-Session": getSessionId() }
	        })

	        return req.then(_handleSuccess, _handleError);
	    }

	    // Return API
	    return ({
	        createUser: createUser,
	        setId: setId,
	        getId: getId,
	        addMeasurments: addMeasurments,
	        getMeasurment: getMeasurment,
	        getFewerData: getFewerData
	    });

	    function setId(id) {
	        that.ehrId = id;
	    }

	    function getId() {
	        return that.ehrId;
	    }

	    // Private Methods
	    function _handleError(response) {
	        if (!angular.isObject(response.data) || !response.data.message) {
	            return $q.reject("Unknown error occured!");
	        }

	        return $q.reject(response.data.message);
	    }

	    function _handleSuccess(response) {
	        return response.data;
	    }
	}
	]);
})();
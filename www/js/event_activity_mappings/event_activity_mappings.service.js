(function () {

  'use strict';

  var app = angular.module('EventActivityMappings');

  app.factory('eventActivityMappingsSrvc', eventActivityMappingsSrvc);

  eventActivityMappingsSrvc.$inject = ['$q', 'activityevents', 'activitiesSrvc'];

  function eventActivityMappingsSrvc($q, activityevents, activitiesSrvc) {

    var service = {};

    service.getEventActivityMappings = function getEventActivityMappings(eventID) {
      var promiseObj = $q.defer();
      var config = { params: { event: eventID } };
      activityevents.getEventActivityMappings(config).then(
        function succes(response) {
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.postEventActivityMapping = function postEventActivityMapping(mapping) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.postEventActivityMappings(mapping, config).then(
        function success(response) {
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.deleteEventActivityMapping = function deleteEventActivityMapping(mappingID) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.deleteEventActivityMappingsEventActivityMappingid(mappingID, config).then(
        function success(response) {
          promiseObj.resolve(response);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    // see the events.service.js folder for a commented version of this function
    service.deleteActivitiesForThisEvent = function deleteActivitiesForThisEvent(eventID) {
      var promiseObj = $q.defer();
      service.getEventActivityMappings(eventID).then(
        function success(data) {
          var promisesArray = [];
          var thisEventsActivities = data;
          for (var i = 0; i < thisEventsActivities.length; i++) {
            promisesArray.push(service.deleteEventActivityMapping(thisEventsActivities[i].id));
          }
          promiseObj.resolve($q.all(promisesArray));
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    return service;

  }

})();

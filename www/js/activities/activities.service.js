(function () {

  'use strict';

  var app = angular.module('Activities');

  app.factory('activitiesSrvc', activitiesSrvc);

  activitiesSrvc.$inject = ['$q', 'activityevents'];

  function activitiesSrvc($q, activityevents) {
    
    var service = {};

    service.activities = [];

    service.getAllActivities = function getAllActivities() {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.getActivities(config).then(
        function success(response) {
          service.syncActivities(response.data);
          promiseObj.resolve(service.activities);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.getActivity = function getActivity(activityID) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.getActivitiesActivityid(activityID, config).then(
        function success(response) {
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.postActivity = function postActivity(activity) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.postActivities(activity, config).then(
        function success(response) {
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.deleteActivity = function deleteActivity(activityID) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.deleteActivitiesActivityid(activityID, config).then(
        function success(response) {
          promiseObj.resolve(response);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.addActivity = function addActivity(activity) {
      service.activities.push(activity);
    };

    service.syncActivities = function syncActivities(data) {
      for (var testItemIndex in data) {
        var testitem = data[testItemIndex];
        var matchResult = service.activities.reduce(function (matches, item) { return ((item.id === testitem.id) ? matches + 1 : matches); }, 0);
        if (matchResult === 0) {
          service.activities.push(testitem);
        }
      }
    };

    service.getActivitiesForThisEvent = function getActivitiesForThisEvent(eventID) {
      var promiseObj = $q.defer(); // defer the operation
      var config = { params: { event: eventID } }; // pass the event ID to the config object to filter the mappings that are retrieved from the DB
      activityevents.getEventActivityMappings(config).then( // get event activity mappings for this event
        function success(response) { // success callback
          var activityPromises = []; // the array that will hold all the promises
          var mappingsArray = response.data; // the event activity mappings
          for (var i = 0; i < mappingsArray.length; i++) {
            // loop through and push promises to get activities into the promise array
            activityPromises.push(service.getActivity(mappingsArray[i].activity));
          }
          promiseObj.resolve($q.all(activityPromises)); // resolve all the promises
        },
        function failure(error) { // failure callback
          promiseObj.reject(error); // reject any errors from the promises in the array
        }
      );
      return promiseObj.promise; // return promise to retrieve all activities for this event
    };

    return service;

  }

})();
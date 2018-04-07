(function () {

  'use strict';

  var app = angular.module('Events');

  app.factory('eventsSrvc', eventsSrvc);

  eventsSrvc.$inject = ['$q', 'activityevents', 'eventActivityMappingsSrvc'];

  function eventsSrvc($q, activityevents, eventActivityMappingsSrvc) {
    
    var service = {}; // declare an object to hold all the functions
  
    service.events = []; // declare the local array for events in the service object

    service.getAllEvents = function getAllEvents() {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.getEvents(config).then(
        function success(response) {
          // sync local copy of events with API copy
          service.syncEvents(response.data);
          promiseObj.resolve(service.events);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    // most simple HTTP requests follow this functions format
    service.postEvent = function postEvent(event) {
      // defer the operation
      var promiseObj = $q.defer();
      var config = {}; // config object allows to filter results
      activityevents.postEvents(event, config).then( // restlet API sdk (module.js file) service HTTP call
        function success(response) { // handle success
          // response usually consists of headers and a response.data object that contains the data that was requested
          promiseObj.resolve(response.data);
        },
        function failure(error) { // handle error
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise; // return a promise to deliver the data as soon as it is received
    };

    service.getEvent = function getEvent(eventID) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.getEventsEventid(eventID, config).then(
        function success(response) {
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.putEvent = function putEvent(event) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.putEventsEventid(event.id, event, config).then(
        function success(response) {
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.deleteEvent = function deleteEvent(eventID) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.deleteEventsEventid(eventID, config).then(
        function success(response) {
          service.removeEvent(eventID);
          var cleanupPromiseArray = [];
          // delete mappings between events and activities.?
          // delete activities in question?
          cleanupPromiseArray.push(eventActivityMappingsSrvc.deleteActivitiesForThisEvent(eventID));
          // delete mappings between events and subjects?
          // delete subjects in question?
          cleanupPromiseArray.push(service.deleteSubjectsForThisEvent(eventID));
          // delete observations in question?
          cleanupPromiseArray.push(service.deleteObservationsForThisEvent(eventID));
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };
    
    service.deleteSubject = function deleteSubject(subjectID) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.deleteSubjectsSubjectid(subjectID, config).then(
        function success(response) {
          promiseObj.resolve(subjectID);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };
    
    service.deleteEventSubjectMapping = function deleteEventSubjectMapping(mappingID) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.deleteEventSubjectMappingsEventSubjectMappingid(mappingID, config).then(
        function success(response) {
          promiseObj.resolve(response);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.deleteSubjectsForThisEvent = function deleteSubjectsForThisEvent(eventID) {
      var promiseObj = $q.defer(); // defer the operation
      var config = { params: { event: eventID } }; // pass the event ID to the config object to filter the mappings that are retrieved from the DB
      activityevents.getEventSubjectMappings(config).then( // get event subject mappings for this event
        function success(response) { // success callback
          var promisesArray = []; // array that will hold all promises
          var deleteMappingsArray = []; // array for promises to delete event subject mappings
          var deleteSubjectsArray = []; // array for promises to delete subjects
          var thisEventsSubjects = response.data; // the event to subject mappings for this event
          for (var i = 0; i < thisEventsSubjects.length; i++) {
            // loop through and push promises to delete mappings to subjects and subjects themselves into their respective arrays
            deleteMappingsArray.push(service.deleteEventSubjectMapping(thisEventsSubjects[i].id));
            deleteSubjectsArray.push(service.deleteSubject(thisEventsSubjects[i].subject));
          }
          // push the arrays into the array for all the promises
          promisesArray.push(deleteMappingsArray);
          promisesArray.push(deleteSubjectsArray);
          promiseObj.resolve($q.all(promisesArray)); // resolve all promises
        },
        function failure(error) { // failure callback
          promiseObj.reject(error); // reject any errors from the promises in the array
        }
      );
      return promiseObj.promise; // return the promise to delete subjects and the event to subject mappings for this event
    };

    // same as service.deleteSubjectsForThisEvent except their is only one group of promises
    service.deleteObservationsForThisEvent = function deleteObservationsForThisEvent(eventID) {
      var promiseObj = $q.defer();
      var config = { params: { event: eventID } };
      activityevents.getObservations(config).then(
        function success(response) {
          var promiseArray = [];
          var thisEventsObservations = response.data;
          config = {};
          for (var i = 0; i < thisEventsObservations.length; i++) {
            promiseArray.push(activityevents.deleteObservationsObservationid(thisEventsObservations[i].id, config));
          }
          promiseObj.resolve($q.all(promiseArray));
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    // loop through the local copy of the events, find the one that was requested and return it
    service.fetchEvent = function fetchEvent(eventID) {      
      for (var i = 0; i < service.events.length; i++) {
        if (service.events[i].id === eventID) {
          return service.events[i];
        }
      }
    };

    // push the new event to the local copy of events (should not destroy bindings if done this way (ask Dave for details))
    service.addEvent = function addEvent(event) {
      service.events.push(event);
    };

    // remove the existing event from the local copy of events and push the updated one into it
    service.updateEvent = function updateEvent(event) {
      for (var i = 0; i < service.events.length; i++) {
        if (service.events[i].id === event.id) {
          service.events.splice(i, 1);
          service.events.push(event);
        }
      }
    };

    // splice the local copy of the events in the database at the point where the event that needs to be removed is stored
    service.removeEvent = function removeEvent(eventID) {
      for (var i = 0; i < service.events.length; i++) {
        if (service.events[i].id === eventID) {
          service.events.splice(i, 1);
        }
      }
    };

    // check whether any of the events from the database are not in the local copy and add them if they are not.
    service.syncEvents = function syncEvents(data) {
      for (var testItemIndex in data) {
        var testitem = data[testItemIndex];
        var matchResult = service.events.reduce(function (matches, item) { return ((item.id === testitem.id) ? matches + 1 : matches); }, 0);
        if (matchResult === 0) {
          service.events.push(testitem);
        } else { }
      }
    };

    return service; // return the service object

  }

})();
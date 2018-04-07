(function () {

  'use strict';

  var app = angular.module('Events');

  app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('event-list', {
      cache: false,
      url: '/event-list',
      templateUrl: 'templates/event.list.html',
      controller: 'EventListCtrl as vm'
    });

    $stateProvider.state('event-edit', {
      cache: false,
      url: '/event-edit/:eventID',
      templateUrl: 'templates/event.edit.html',
      controller: 'EventEditCtrl as vm',
      resolve: {
        
        selectedEvent: function ($stateParams, eventsSrvc) {
          // the event being edited
          return eventsSrvc.fetchEvent($stateParams.eventID);
        },

        activities: function ($stateParams, activitiesSrvc) {
          // the event's activities
          return activitiesSrvc.getActivitiesForThisEvent($stateParams.eventID);
        },

        mappings: function ($stateParams, eventActivityMappingsSrvc) {
          // the mappings between the event and its activities, needed to find and delete mappings between the event and the activities
          return eventActivityMappingsSrvc.getEventActivityMappings($stateParams.eventID);
        }

      }
    });

    $stateProvider.state('event-add', {
      cache: false,
      url: '/event-add',
      templateUrl: 'templates/event.edit.html',
      controller: 'EventAddCtrl as vm'
    });

    $urlRouterProvider.otherwise('event-list');

  });

})();
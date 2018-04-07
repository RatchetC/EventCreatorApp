(function () {

  'use strict';

  var app = angular.module('Activities');

  app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('activity-list', {
      cache: false,
      url: '/activity-list/:eventID',
      templateUrl: 'templates/activity.list.html',
      controller: 'ActivityListCtrl as vm',
      resolve: {
        thisEventsMappings: function (eventActivityMappingsSrvc, $stateParams) {
          // get activities for event being created or edited, to check if activities that the user wants to add are already added to the event
          return eventActivityMappingsSrvc.getEventActivityMappings($stateParams.eventID);
        }
      }
    });

    $stateProvider.state('activity-add', {
      cache: false,
      url: '/activity-add',
      templateUrl: 'templates/activity.add.html',
      controller: 'ActivityAddCtrl as vm'
    });

    $urlRouterProvider.otherwise('event-list');

  });

})();
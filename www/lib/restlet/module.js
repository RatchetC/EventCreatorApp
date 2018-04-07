(function () {
  'use strict';

  angular.module('restlet.sdk', []);

  angular.module('restlet.sdk')
    .service('activityevents', ['$http', activityevents]);

  function activityevents ($http) {

    var endpoint = 'https://activityevents.restlet.net/v1';
    var globalSecurity = {};
    var securityConfigurations = {};

    this.setEndpoint = setEndpoint;

    this.configureGlobalBasicAuthentication = configureGlobalBasicAuthentication(globalSecurity);
    this.configureGlobalApiToken = configureGlobalApiToken(globalSecurity);
    this.configureGlobalOAuth2Token = configureGlobalOAuth2Token(globalSecurity);

    this.configureHTTP_BASICAuthentication = configureHTTP_BASICAuthentication;

    /**
     * Loads a list of Activity
     *
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     {
       "description" : "Allows to filter the collections of result by the value of field description",
       "minLegalValue" : "Allows to filter the collections of result by the value of field minLegalValue",
       "name" : "Allows to filter the collections of result by the value of field name",
       "maxLegalValue" : "Allows to filter the collections of result by the value of field maxLegalValue",
       "units" : "Allows to filter the collections of result by the value of field units",
       "id" : "Allows to filter the collections of result by the value of field id",
       "$size" : "Size of the page to retrieve. Integer value",
       "$page" : "Number of the page to retrieve. Integer value.",
       "$sort" : "Order in which to retrieve the results. Multiple sort criteria can be passed. Example: sort=age ASC,height DESC"
     }
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     [
     {
       "description" : "sample description",
       "id" : "sample id",
       "maxLegalValue" : 1.1,
       "minLegalValue" : 1.1,
       "name" : "sample name",
       "units" : "J.s^-1"
     }
     ]
     */
    this.getActivities = function (config) {
      var url = endpoint + '/activities/';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Adds a Activity
     *
     * @param body - the payload; is of type Activity; has the following structure:
     {
       "description" : "sample description",
       "id" : "sample id",
       "maxLegalValue" : 1.1,
       "minLegalValue" : 1.1,
       "name" : "sample name",
       "units" : "J.s^-1"
     }
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "description" : "sample description",
       "id" : "sample id",
       "maxLegalValue" : 1.1,
       "minLegalValue" : 1.1,
       "name" : "sample name",
       "units" : "J.s^-1"
     }
     */
    this.postActivities = function (body, config) {
      var url = endpoint + '/activities/';

      return send('POST', url, addSecurityConfiguration(config, 'HTTP_BASIC'), body);
    };

    /**
     * Loads a Activity
     *
     * @param activityid - REQUIRED - Identifier of the Activity
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "description" : "sample description",
       "id" : "sample id",
       "maxLegalValue" : 1.1,
       "minLegalValue" : 1.1,
       "name" : "sample name",
       "units" : "J.s^-1"
     }
     */
    this.getActivitiesActivityid = function (activityid, config) {
      checkPathVariables(activityid, 'activityid');

      var url = endpoint + '/activities/' + activityid + '';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Stores a Activity
     *
     * @param activityid - REQUIRED - Identifier of the Activity
     * @param body - the payload; is of type Activity; has the following structure:
     {
       "description" : "sample description",
       "id" : "sample id",
       "maxLegalValue" : 1.1,
       "minLegalValue" : 1.1,
       "name" : "sample name",
       "units" : "J.s^-1"
     }
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "description" : "sample description",
       "id" : "sample id",
       "maxLegalValue" : 1.1,
       "minLegalValue" : 1.1,
       "name" : "sample name",
       "units" : "J.s^-1"
     }
     */
    this.putActivitiesActivityid = function (activityid, body, config) {
      checkPathVariables(activityid, 'activityid');

      var url = endpoint + '/activities/' + activityid + '';

      return send('PUT', url, addSecurityConfiguration(config, 'HTTP_BASIC'), body);
    };

    /**
     * Deletes a Activity
     *
     * @param activityid - REQUIRED - Identifier of the Activity
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     */
    this.deleteActivitiesActivityid = function (activityid, config) {
      checkPathVariables(activityid, 'activityid');

      var url = endpoint + '/activities/' + activityid + '';

      return send('DELETE', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Loads a list of EventActivityMapping
     *
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     {
       "$sort" : "Order in which to retrieve the results. Multiple sort criteria can be passed. Example: sort=age ASC,height DESC",
       "$page" : "Number of the page to retrieve. Integer value.",
       "event" : "Allows to filter the collections of result by the value of field event",
       "id" : "Allows to filter the collections of result by the value of field id",
       "activity" : "Allows to filter the collections of result by the value of field activity",
       "$size" : "Size of the page to retrieve. Integer value"
     }
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     [
     {
       "activity" : "sample activity",
       "event" : "sample event",
       "id" : "sample id"
     }
     ]
     */
    this.getEventActivityMappings = function (config) {
      var url = endpoint + '/eventActivityMappings/';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Adds a EventActivityMapping
     *
     * @param body - the payload; is of type EventActivityMapping; has the following structure:
     {
       "activity" : "sample activity",
       "event" : "sample event",
       "id" : "sample id"
     }
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "activity" : "sample activity",
       "event" : "sample event",
       "id" : "sample id"
     }
     */
    this.postEventActivityMappings = function (body, config) {
      var url = endpoint + '/eventActivityMappings/';

      return send('POST', url, addSecurityConfiguration(config, 'HTTP_BASIC'), body);
    };

    /**
     * Loads a EventActivityMapping
     *
     * @param eventActivityMappingid - REQUIRED - Identifier of the EventActivityMapping
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "activity" : "sample activity",
       "event" : "sample event",
       "id" : "sample id"
     }
     */
    this.getEventActivityMappingsEventActivityMappingid = function (eventActivityMappingid, config) {
      checkPathVariables(eventActivityMappingid, 'eventActivityMappingid');

      var url = endpoint + '/eventActivityMappings/' + eventActivityMappingid + '';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Stores a EventActivityMapping
     *
     * @param eventActivityMappingid - REQUIRED - Identifier of the EventActivityMapping
     * @param body - the payload; is of type EventActivityMapping; has the following structure:
     {
       "activity" : "sample activity",
       "event" : "sample event",
       "id" : "sample id"
     }
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "activity" : "sample activity",
       "event" : "sample event",
       "id" : "sample id"
     }
     */
    this.putEventActivityMappingsEventActivityMappingid = function (eventActivityMappingid, body, config) {
      checkPathVariables(eventActivityMappingid, 'eventActivityMappingid');

      var url = endpoint + '/eventActivityMappings/' + eventActivityMappingid + '';

      return send('PUT', url, addSecurityConfiguration(config, 'HTTP_BASIC'), body);
    };

    /**
     * Deletes a EventActivityMapping
     *
     * @param eventActivityMappingid - REQUIRED - Identifier of the EventActivityMapping
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     */
    this.deleteEventActivityMappingsEventActivityMappingid = function (eventActivityMappingid, config) {
      checkPathVariables(eventActivityMappingid, 'eventActivityMappingid');

      var url = endpoint + '/eventActivityMappings/' + eventActivityMappingid + '';

      return send('DELETE', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Loads a list of EventSubjectMapping
     *
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     {
       "id" : "Allows to filter the collections of result by the value of field id",
       "$size" : "Size of the page to retrieve. Integer value",
       "event" : "Allows to filter the collections of result by the value of field event",
       "$sort" : "Order in which to retrieve the results. Multiple sort criteria can be passed. Example: sort=age ASC,height DESC",
       "$page" : "Number of the page to retrieve. Integer value.",
       "subject" : "Allows to filter the collections of result by the value of field subject"
     }
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     [
     {
       "event" : "sample event",
       "id" : "sample id",
       "subject" : "sample subject"
     }
     ]
     */
    this.getEventSubjectMappings = function (config) {
      var url = endpoint + '/eventSubjectMappings/';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Adds a EventSubjectMapping
     *
     * @param body - the payload; is of type EventSubjectMapping; has the following structure:
     {
       "event" : "sample event",
       "id" : "sample id",
       "subject" : "sample subject"
     }
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "event" : "sample event",
       "id" : "sample id",
       "subject" : "sample subject"
     }
     */
    this.postEventSubjectMappings = function (body, config) {
      var url = endpoint + '/eventSubjectMappings/';

      return send('POST', url, addSecurityConfiguration(config, 'HTTP_BASIC'), body);
    };

    /**
     * Loads a EventSubjectMapping
     *
     * @param eventSubjectMappingid - REQUIRED - Identifier of the EventSubjectMapping
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "event" : "sample event",
       "id" : "sample id",
       "subject" : "sample subject"
     }
     */
    this.getEventSubjectMappingsEventSubjectMappingid = function (eventSubjectMappingid, config) {
      checkPathVariables(eventSubjectMappingid, 'eventSubjectMappingid');

      var url = endpoint + '/eventSubjectMappings/' + eventSubjectMappingid + '';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Stores a EventSubjectMapping
     *
     * @param eventSubjectMappingid - REQUIRED - Identifier of the EventSubjectMapping
     * @param body - the payload; is of type EventSubjectMapping; has the following structure:
     {
       "event" : "sample event",
       "id" : "sample id",
       "subject" : "sample subject"
     }
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "event" : "sample event",
       "id" : "sample id",
       "subject" : "sample subject"
     }
     */
    this.putEventSubjectMappingsEventSubjectMappingid = function (eventSubjectMappingid, body, config) {
      checkPathVariables(eventSubjectMappingid, 'eventSubjectMappingid');

      var url = endpoint + '/eventSubjectMappings/' + eventSubjectMappingid + '';

      return send('PUT', url, addSecurityConfiguration(config, 'HTTP_BASIC'), body);
    };

    /**
     * Deletes a EventSubjectMapping
     *
     * @param eventSubjectMappingid - REQUIRED - Identifier of the EventSubjectMapping
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     */
    this.deleteEventSubjectMappingsEventSubjectMappingid = function (eventSubjectMappingid, config) {
      checkPathVariables(eventSubjectMappingid, 'eventSubjectMappingid');

      var url = endpoint + '/eventSubjectMappings/' + eventSubjectMappingid + '';

      return send('DELETE', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Loads a list of Event
     *
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     {
       "date" : "Allows to filter the collections of result by the value of field date",
       "$page" : "Number of the page to retrieve. Integer value.",
       "postcode" : "Allows to filter the collections of result by the value of field postcode",
       "$sort" : "Order in which to retrieve the results. Multiple sort criteria can be passed. Example: sort=age ASC,height DESC",
       "name" : "Allows to filter the collections of result by the value of field name",
       "id" : "Allows to filter the collections of result by the value of field id",
       "$size" : "Size of the page to retrieve. Integer value"
     }
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     [
     {
       "date" : "2017-12-31",
       "id" : "sample id",
       "name" : "sample name",
       "postcode" : "M3 4FP"
     }
     ]
     */
    this.getEvents = function (config) {
      var url = endpoint + '/events/';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Adds a Event
     *
     * @param body - the payload; is of type Event; has the following structure:
     {
       "date" : "2017-12-31",
       "id" : "sample id",
       "name" : "sample name",
       "postcode" : "M3 4FP"
     }
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "date" : "2017-12-31",
       "id" : "sample id",
       "name" : "sample name",
       "postcode" : "M3 4FP"
     }
     */
    this.postEvents = function (body, config) {
      var url = endpoint + '/events/';

      return send('POST', url, addSecurityConfiguration(config, 'HTTP_BASIC'), body);
    };

    /**
     * Loads a Event
     *
     * @param eventid - REQUIRED - Identifier of the Event
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "date" : "2017-12-31",
       "id" : "sample id",
       "name" : "sample name",
       "postcode" : "M3 4FP"
     }
     */
    this.getEventsEventid = function (eventid, config) {
      checkPathVariables(eventid, 'eventid');

      var url = endpoint + '/events/' + eventid + '';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Stores a Event
     *
     * @param eventid - REQUIRED - Identifier of the Event
     * @param body - the payload; is of type Event; has the following structure:
     {
       "date" : "2017-12-31",
       "id" : "sample id",
       "name" : "sample name",
       "postcode" : "M3 4FP"
     }
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "date" : "2017-12-31",
       "id" : "sample id",
       "name" : "sample name",
       "postcode" : "M3 4FP"
     }
     */
    this.putEventsEventid = function (eventid, body, config) {
      checkPathVariables(eventid, 'eventid');

      var url = endpoint + '/events/' + eventid + '';

      return send('PUT', url, addSecurityConfiguration(config, 'HTTP_BASIC'), body);
    };

    /**
     * Deletes a Event
     *
     * @param eventid - REQUIRED - Identifier of the Event
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     */
    this.deleteEventsEventid = function (eventid, config) {
      checkPathVariables(eventid, 'eventid');

      var url = endpoint + '/events/' + eventid + '';

      return send('DELETE', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Loads a list of Observation
     *
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     {
       "value" : "Allows to filter the collections of result by the value of field value",
       "$page" : "Number of the page to retrieve. Integer value.",
       "$sort" : "Order in which to retrieve the results. Multiple sort criteria can be passed. Example: sort=age ASC,height DESC",
       "$size" : "Size of the page to retrieve. Integer value",
       "subject" : "Allows to filter the collections of result by the value of field subject",
       "timestamp_s_unix_epoch_utc" : "Allows to filter the collections of result by the value of field timestamp_s_unix_epoch_utc",
       "id" : "Allows to filter the collections of result by the value of field id",
       "activity" : "Allows to filter the collections of result by the value of field activity",
       "event" : "Allows to filter the collections of result by the value of field event"
     }
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     [
     {
       "activity" : "sample activity",
       "event" : "sample event",
       "id" : "sample id",
       "subject" : "sample subject",
       "timestamp_s_unix_epoch_utc" : 1510568560,
       "value" : 0.0
     }
     ]
     */
    this.getObservations = function (config) {
      var url = endpoint + '/observations/';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Adds a Observation
     *
     * @param body - the payload; is of type Observation; has the following structure:
     {
       "activity" : "sample activity",
       "event" : "sample event",
       "id" : "sample id",
       "subject" : "sample subject",
       "timestamp_s_unix_epoch_utc" : 1510568560,
       "value" : 0.0
     }
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "activity" : "sample activity",
       "event" : "sample event",
       "id" : "sample id",
       "subject" : "sample subject",
       "timestamp_s_unix_epoch_utc" : 1510568560,
       "value" : 0.0
     }
     */
    this.postObservations = function (body, config) {
      var url = endpoint + '/observations/';

      return send('POST', url, addSecurityConfiguration(config, 'HTTP_BASIC'), body);
    };

    /**
     * Loads a Observation
     *
     * @param observationid - REQUIRED - Identifier of the Observation
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "activity" : "sample activity",
       "event" : "sample event",
       "id" : "sample id",
       "subject" : "sample subject",
       "timestamp_s_unix_epoch_utc" : 1510568560,
       "value" : 0.0
     }
     */
    this.getObservationsObservationid = function (observationid, config) {
      checkPathVariables(observationid, 'observationid');

      var url = endpoint + '/observations/' + observationid + '';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Stores a Observation
     *
     * @param observationid - REQUIRED - Identifier of the Observation
     * @param body - the payload; is of type Observation; has the following structure:
     {
       "activity" : "sample activity",
       "event" : "sample event",
       "id" : "sample id",
       "subject" : "sample subject",
       "timestamp_s_unix_epoch_utc" : 1510568560,
       "value" : 0.0
     }
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "activity" : "sample activity",
       "event" : "sample event",
       "id" : "sample id",
       "subject" : "sample subject",
       "timestamp_s_unix_epoch_utc" : 1510568560,
       "value" : 0.0
     }
     */
    this.putObservationsObservationid = function (observationid, body, config) {
      checkPathVariables(observationid, 'observationid');

      var url = endpoint + '/observations/' + observationid + '';

      return send('PUT', url, addSecurityConfiguration(config, 'HTTP_BASIC'), body);
    };

    /**
     * Deletes a Observation
     *
     * @param observationid - REQUIRED - Identifier of the Observation
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     */
    this.deleteObservationsObservationid = function (observationid, config) {
      checkPathVariables(observationid, 'observationid');

      var url = endpoint + '/observations/' + observationid + '';

      return send('DELETE', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Loads a list of Subject
     *
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     {
       "$page" : "Number of the page to retrieve. Integer value.",
       "$size" : "Size of the page to retrieve. Integer value",
       "id" : "Allows to filter the collections of result by the value of field id",
       "nickname" : "Allows to filter the collections of result by the value of field nickname",
       "$sort" : "Order in which to retrieve the results. Multiple sort criteria can be passed. Example: sort=age ASC,height DESC"
     }
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     [
     {
       "id" : "sample id",
       "nickname" : "sample nickname"
     }
     ]
     */
    this.getSubjects = function (config) {
      var url = endpoint + '/subjects/';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Adds a Subject
     *
     * @param body - the payload; is of type Subject; has the following structure:
     {
       "id" : "sample id",
       "nickname" : "sample nickname"
     }
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "id" : "sample id",
       "nickname" : "sample nickname"
     }
     */
    this.postSubjects = function (body, config) {
      var url = endpoint + '/subjects/';

      return send('POST', url, addSecurityConfiguration(config, 'HTTP_BASIC'), body);
    };

    /**
     * Loads a Subject
     *
     * @param subjectid - REQUIRED - Identifier of the Subject
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "id" : "sample id",
       "nickname" : "sample nickname"
     }
     */
    this.getSubjectsSubjectid = function (subjectid, config) {
      checkPathVariables(subjectid, 'subjectid');

      var url = endpoint + '/subjects/' + subjectid + '';

      return send('GET', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    /**
     * Stores a Subject
     *
     * @param subjectid - REQUIRED - Identifier of the Subject
     * @param body - the payload; is of type Subject; has the following structure:
     {
       "id" : "sample id",
       "nickname" : "sample nickname"
     }
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     *   * Status code : 200 - Payload :
     {
       "id" : "sample id",
       "nickname" : "sample nickname"
     }
     */
    this.putSubjectsSubjectid = function (subjectid, body, config) {
      checkPathVariables(subjectid, 'subjectid');

      var url = endpoint + '/subjects/' + subjectid + '';

      return send('PUT', url, addSecurityConfiguration(config, 'HTTP_BASIC'), body);
    };

    /**
     * Deletes a Subject
     *
     * @param subjectid - REQUIRED - Identifier of the Subject
     * @param config - Object describing the request to be made and how it should be processed. The object has following properties:
     * @param config.params - Map of strings or objects which will be serialized with the paramSerializer and appended as query parameters.
     * @param config.headers - Map of strings or functions which return strings representing HTTP headers to send to the server.
     *
     * @throws will throw an error if a required parameter is not set
     *
     * @returns {HttpPromise} - a promise resolved with the response from the server.
     * In case of success (status in the 2XX range)
     */
    this.deleteSubjectsSubjectid = function (subjectid, config) {
      checkPathVariables(subjectid, 'subjectid');

      var url = endpoint + '/subjects/' + subjectid + '';

      return send('DELETE', url, addSecurityConfiguration(config, 'HTTP_BASIC'));
    };

    function configureHTTP_BASICAuthentication(username, key) {
      securityConfigurations.HTTP_BASIC = {
        type: 'BASIC',
        token: 'Basic ' + btoa(username + ':' + key)
      };
    }

    function isNotAuthenticated (securityRequirementName) {
      return securityRequirementName === '_NONE';
    }

    /**
     * Enhances the provided request configuration with the configured
     * security requirements.
     *
     * One might notice that the security requirements are not explicitly defined
     * in the method signature. The reason is that one method might have zero,
     * one or more security requirement(s), so security requirements are recovered
     * dynamically from the `arguments`.
     *
     * The security configuration is defined as follow:
     *  - If no specific security requirements is defined for the method then:
     *    - if a global security is set the call will be authenticated
     *    - if no security is configured then the call will be unauthenticated
     *  - If a specific security requirements is defined for the method then:
     *    - one of them is configured and the first of them is used for the authentication
     *    - none of them is configured and an error is thrown
     *
     * @param {Object} config - a configuration object used inside the requests
     * which can contain among other things the headers & the params
     * @param {String...} requirement - the name of the security scheme to support
     */
    function addSecurityConfiguration (config) {
      var securityRequirements = Array.prototype.slice.call(arguments, 1);

      return securityConfigurationHelper(config, globalSecurity, 
        securityConfigurations, isNotAuthenticated, 
        securityRequirements);
    }

    /**
     * Sends a request to server.
     *
     * @param methodName - The name of method: GET, POST, PUT, DELETE
     * @param url - url
     * @param body - body
     * @param config - Object describing the request to be made and how it should be processed.
     * @returns{HttpPromise} a promise object
     */
    function send (methodName, url, config, body) {
      return sendHelper ($http, methodName, url, config, body);
    };

    /**
     * Sets a new endpoint.
     *
     * @param newEndPoint - the endpoint to be set.
     */
    function setEndpoint (newEndPoint) {
      endpoint = newEndPoint;
    }
  }

  function securityConfigurationHelper (config, globalSecurity, 
    securityConfigurations, isNotAuthenticated, 
    securityRequirements) {
    
    if (securityRequirements.length === 0) {
      return enhanceWithGlobalSecurityIfRequired(config, globalSecurity);
    }

    for (var i = 0; i < securityRequirements.length; i++) {
      var securityRequirementName = securityRequirements[i];
      var securityConfig = securityConfigurations[securityRequirementName];

      if (isNotAuthenticated(securityRequirementName)) {
        return angular.copy(config);
      } else if (angular.isDefined(securityConfig)) {
        return enhanceConfigurationWithSpecificSecurity(config, securityConfig);
      }
    }

    throw new Error('There is no configured security scheme found among: ' + securityRequirements.join(', '));
  }

  function enhanceWithGlobalSecurityIfRequired (config, globalSecurity) {
    if (!isEmpty(globalSecurity)) {
      config = angular.copy(config);
      config = enhanceConfigurationWithSpecificSecurity(config, globalSecurity);
    }

    return config;
  }

  function enhanceConfigurationWithSpecificSecurity (config, securityConfig) {
    config = angular.copy(config) || {};

    if (!config.headers) {
      config.headers = {};
    }

    if (!config.params) {
      config.params = {};
    }

    if (securityConfig.type === 'BASIC') {
      config.headers.Authorization = securityConfig.token;
    } else if (securityConfig.type === 'API_KEY' && securityConfig.placement === 'HEADER') {
      config.headers[securityConfig.name] = securityConfig.token;
    } else if (securityConfig.type === 'API_KEY' && securityConfig.placement === 'QUERY') {
      config.params[securityConfig.name] = securityConfig.token;
    } else if (securityConfig.type === 'OAUTH2') {
      config.headers.Authorization = securityConfig.token;
    } else {
      throw new Error('Cannot update config for unknown scheme');
    }

    return config;
  }

  /**
   * Validates the path variables to ensure that those are properly defined
   * since any variable defined in the path should be defined to avoid having
   * something like '/foo/undefined/bar'
   *
   * The arguments are dynamically recovered from the `arguments` object and
   * are looked for by pair where
   *   - the 2n set (even indexes) are the values
   *   - the 2n + 1 set (odd indexes) are the labels for the error reports
   */
  function checkPathVariables () {

    var errors = [];

    for (var i = 0; i < arguments.length; i += 2) {
      if (angular.isUndefined(arguments[ i ])) {
        errors.push(arguments[ i + 1 ]);
      }
    }

    if (errors.length > 0) {
      throw new Error('Missing required parameter: ' + errors.join(', '));
    }
  };

  /**
   * Sets up the authentication to be performed through basic auth.
   *
   * @param username - the user's username
   * @param password - the user's password
   */
  function configureGlobalBasicAuthentication (globalSecurity) {
    return function (username, password) {
      globalSecurity.type = 'BASIC';
      globalSecurity.token = 'Basic ' + btoa(username + ':' + password);
    };
  };

  /**
   * Sets up the authentication to be performed through oAuth2 protocol
   * meaning that the Authorization header will contain a Bearer token.
   *
   * @param token - the oAuth token to use
   */
  function configureGlobalOAuth2Token (globalSecurity) {
    return function (token) {
      globalSecurity.type = 'OAUTH2';
      globalSecurity.token = 'Bearer ' + token;
    };
  };

  /**
   * Sets up the authentication to be performed through API token.
   *
   * @param tokenName - the name of the query parameter or header based on the location parameter.
   * @param tokenValue - the value of the token.
   * @param location - the location of the token, either header or query.
   */
  function configureGlobalApiToken (globalSecurity) {
    return function (tokenName, tokenValue, location) {
      if (angular.isUndefined(location)) {
        location = 'header';
      }

      if (location !== 'header' && location !== 'query') {
        throw new Error('Unknown location: ' + location);
      }

      globalSecurity.type = 'API_KEY';
      globalSecurity.placement = location;
      globalSecurity.name = tokenName;
      globalSecurity.token = tokenValue;
    };
  };

  /**
   * Sends a request to server.
   *
   * @param $http - the angular $http provider
   * @param methodName - The name of method: GET, POST, PUT, DELETE
   * @param url - url
   * @param body - body
   * @param config - Object describing the request to be made and how it should be processed.
   * @returns{HttpPromise} a promise object
   */
  function sendHelper ($http, methodName, url, config, body) {

    config = config || {};

    return $http({
      method: methodName,
      url: url,
      params: angular.extend({}, config.params),
      data: body,
      headers: angular.extend({}, config.headers)
    });
  };

  function isEmpty (obj) {
    return Object.keys(obj).length === 0;
  }

})();
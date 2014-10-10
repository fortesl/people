/**
 * Created by fortesl on 10/9/2014.
 *
 * all javascript should be included in a function
 * no global variables need be created.
 */

(function () {
    'use strict';

    var peopleApp = angular.module('peopleApp', ['ngRoute', 'people-service']);

    peopleApp.config(['$routeProvider', '$httpProvider',
        function($routeProvider, $httpProvider) {

            $routeProvider.
                when('/', {
                    templateUrl: 'views/people-list.html',
                    controller: 'PeopleListController as peopleListCtrl'
                }).
                when('/people/:personId', {
                    templateUrl: 'views/person.html',
                    controller: 'PersonController as personCtrl'
                }).
                when('/addperson', {
                    templateUrl: 'views/add-person.html',
                    controller: 'AddPersonController as addPersonCtrl'
                }).
                otherwise({
                    redirectTo: '/'
                });

            // enable $http caching
            $httpProvider.defaults.cache = true;

        }]);

})();
/**
 * Created by fortesl on 10/9/2014.
 *
 * all javascript should be included in a function
 * no global variables need be created.
 */

(function () {
    'use strict';

    var app = angular.module('peopleApp');

    app.controller('PersonController', ['$routeParams', 'PeopleService', '$rootScope', 'dateFilter', function($routeParams, PeopleService, $rootScope, dateFilter) {

        var self = this;

        self.person = PeopleService.person($routeParams.personId);
        self.person.birthDate = dateFilter(new Date(self.person.birthDate), 'longDate');

        $rootScope.appTitle = 'MyPeople' + ' - ' + self.person.firstName + ' ' + self.person.lastName;

        PeopleService.personAge(self.person.birthDate, function(response) {
            self.person.age = response;
        });

    }]);


})();
/**
 * Created by fortesl on 10/9/2014.
 *
 * all javascript should be included in a function
 * no global variables need be created.
 */

(function () {
    'use strict';

    var app = angular.module('peopleApp');

    app.controller('AddPersonController', ['PeopleService', '$rootScope', '$location', function(PeopleService, $rootScope, $location) {

        var self = this;

        self.person = {};

        $rootScope.appTitle = 'MyPeople' + ' - ' + 'add person';

        self.addPerson = function() {
            var personId = PeopleService.addPerson(self.person);
            $location.path('/#/people/' + personId);
        };

    }]);

})();
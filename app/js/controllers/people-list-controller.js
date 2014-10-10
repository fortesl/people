/**
 * Created by fortesl on 10/9/2014.
 *
 * all javascript should be included in a function
 * no global variables need be created.
 */

(function () {
    'use strict';

    var app = angular.module('peopleApp');

    app.controller('PeopleListController', ['PeopleService', '$rootScope', function(PeopleService, $rootScope) {

        var self = this;

        self.peopleList = [];

        self.peopleList = PeopleService.people();

        $rootScope.appTitle = 'MyPeople';

    }]);


})();
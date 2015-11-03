/* global angular */

'use strict';

angular.module('poupatudo.login.controller', [])
        .controller('ManagerController', ['$scope', '$rootScope', '$modal', 'messageService', 'Auth', 'AUTH_EVENTS', 'USER_ROLES',
            function ($scope, $rootScope, $modal, messageService, Auth, AUTH_EVENTS, USER_ROLES) {

                $scope.modalShown = false;
                $scope.currentUser = null;
                $scope.userRoles = USER_ROLES;
                $scope.isAuthorized = Auth.isAuthorized;

                var showLoginDialog = function () {
                    //if (!$scope.modalShown) {
                    //    $scope.modalShown = true;
                    //    var modalInstance = $modal.open({
                    //        templateUrl: 'app/login/views/login.html',
                    //        controller: "LoginController",
                    //        backdrop: 'static'
                    //    });
                    //
                    //    modalInstance.result.then(function () {
                    //        $scope.modalShown = false;
                    //    });
                    //}
                };

                var setCurrentUser = function () {
                    $scope.currentUser = $rootScope.currentUser;
                    $scope.modalShown = true;
                };

                var showNotAuthorized = function () {
                    messageService.error({messageProperties: 'LG001'});
                };

                if ($scope.currentUser === null)
                    showLoginDialog();

                $rootScope.$on(AUTH_EVENTS.notAuthorized, showNotAuthorized);
                $rootScope.$on(AUTH_EVENTS.notAuthenticated, showLoginDialog);
                $rootScope.$on(AUTH_EVENTS.sessionTimeout, showLoginDialog);
                $rootScope.$on(AUTH_EVENTS.logoutSuccess, showLoginDialog);
                $rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);
            }])

        .controller('LoginController', ['$scope', '$state', '$window', 'authenticateService', 'messageService',
            function ($scope, $state, $window, authenticateService, messageService) {
                $scope.usuario = {username:"admin", password:"password"};
                $scope.loginForm = {};

                $scope.submit = function () {
                    $scope.submitted = true;
                    if (!$scope.loginForm.$invalid) {
                        $scope.login($scope.usuario);
                    } else {
                        messageService.error({messageProperties: 'LG002'});
                    }
                };

                $scope.login = function (credentials) {
                    authenticateService.login(credentials, function () {
                        $state.go('dashboard');
                    });
                };
                /*
                TODO: remover
                 */
                $scope.login($scope.usuario);
                // refresh page, if a session exists for current user log him in again 
                //if ($window.sessionStorage["userInfo"]) {
                //    var credentials = JSON.parse($window.sessionStorage["userInfo"]);
                //    $scope.login(credentials);
                //}

            }])
        ;
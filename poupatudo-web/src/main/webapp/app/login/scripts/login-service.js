/* global angular */

'use strict';

angular.module('poupatudo.login.service', [])

        .service('Session', function ($rootScope, USER_ROLES) {

            this.create = function (user) {
                this.token = user.token;
                this.user = user;
                this.userRole = user.userRole;
            };

            this.destroy = function () {
                this.token = false;
                this.user = {};
                this.userRole = null;
            };

            return this;
        })

        /*Constants regarding user login defined here*/
        .constant('USER_ROLES', {
            all: '*',
            admin: 'admin',
            editor: 'editor',
            guest: 'guest'
        })

        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
        })

        /* Adding the auth interceptor here, to check every $http request*/
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push([
                '$injector',
                function ($injector) {
                    return $injector.get('AuthInterceptor');
                }
            ]);
        })

        .factory('Auth', ['$http', '$rootScope', '$window', 'Session', 'AUTH_EVENTS', 'messageService', 'loginService','mockJsonService','$state',
            function ($http, $rootScope, $window, Session, AUTH_EVENTS, messageService, loginService,mockJsonService,$state) {
                var authService = {};
                var dataToken = {};

                authService.login = function (user, success, error) {
                    dataToken = {};

                    /*
                    loginService.authToken(user).then(function (retorno) {
                        dataToken = retorno.data || {};
                        if (dataToken) {
                            if (dataToken.token) {
                                $window.sessionStorage["userInfo"] = JSON.stringify(dataToken);
                                Session.create(dataToken);
                                $rootScope.currentUser = dataToken;
                                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                                success(dataToken);
                            } else {
                                messageService.error({messageProperties: 'LG004'});
                                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                                error();
                                return;
                            }

                        }
                    }).catch(function (e) {
                        messageService.error({messageProperties: 'LG003'});
                    });
                    */
                    /*
                    TODO:REMOVER
                     */
                    var usersMock = ["dvlima","admin","editor","guest"];
                    if(usersMock.indexOf(user.username) != -1){
                        mockJsonService.getMock('user',usersMock.indexOf(user.username))
                            .then(function(response) {
                                Session.create(response);
                                $rootScope.currentUser = response;
                                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                                $state.go('dashboard');
                            }, function(reason) {
                                alert('Failed: ' + reason);
                            });
                    }else{messageService.error({messageProperties: 'LG003'});}



                };

                authService.isAuthenticated = function () {
                    return !!Session.user;
                };

                //e.g. <p ng-if="isAuthorized(authorizedRoles)">show this only to admins</p>
                authService.isAuthorized = function (authorizedRoles) {
                    if (!angular.isArray(authorizedRoles)) {
                        authorizedRoles = [authorizedRoles];
                    }
                    return (authService.isAuthenticated() &&
                            authorizedRoles.indexOf(Session.userRole) !== -1);
                };

                //log out the user and broadcast the logoutSuccess event
                authService.logout = function () {
                    dataToken = {};
                    Session.destroy();
                    $window.sessionStorage.removeItem("userInfo");
                    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                };

                return authService;
            }])


        .factory('AuthInterceptor', ['$rootScope', '$q', 'Session', 'AUTH_EVENTS',
            function ($rootScope, $q, Session, AUTH_EVENTS) {
                return {
                    responseError: function (response) {
                        $rootScope.$broadcast({
                            401: AUTH_EVENTS.notAuthenticated,
                            403: AUTH_EVENTS.notAuthorized,
                            419: AUTH_EVENTS.sessionTimeout,
                            440: AUTH_EVENTS.sessionTimeout
                        }[response.status], response);
                        return $q.reject(response);
                    }
                };
            }])

        .service('loginService', ['utilCRUD', function (utilCRUD) {
                return angular.extend({}, utilCRUD, {
                    route: 'auth',
                    authToken: function (user) {
                        return this.obter().all('token').post(user);
                    }
                });

            }])

        .service('authenticateService', ['Auth', function (Auth) {
                return angular.extend(Auth, {});
            }])


        ;
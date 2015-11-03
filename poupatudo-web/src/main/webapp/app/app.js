/* global angular */

angular.module('poupatudo', [
    'ngRoute', 
    'restangular', 
    'ui.router', 
    'ui.bootstrap',
    'blockUI',
    'validation',
    'validation.rule',

    'poupatudo.controller', 
    'poupatudo.directive', 
    'poupatudo.filter', 
    'poupatudo.route', 
    'poupatudo.service', 
    'poupatudo.login', 

    'poupatudo.preference',
    'poupatudo.dashboard',
    'poupatudo.usuario',
    'poupatudo.categoria', 
    'poupatudo.conta',
    'poupatudo.profile'
])

        .run(function ($rootScope, $http, $state, Auth, AUTH_EVENTS) {
            $http.get('app/json/message.json')
                    .success(function (response) {
                        var jsonString = angular.toJson(response);
                        $rootScope.messagePropertiesTable = angular.fromJson(jsonString);
                    });

            $rootScope.$on('$stateChangeStart', function (event, next) {
                var authorizedRoles = next.data.authorizedRoles;
                if (!Auth.isAuthorized(authorizedRoles)) {
                    event.preventDefault();
                    if (Auth.isAuthenticated()) {
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    } else {
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    }
                }
            });

            $rootScope.getClass = function (path) {
                if ($state.current.name == path) {
                    return "active";
                } else {
                    return "hide";
                }
            };

            $rootScope.logout = function () {
                Auth.logout();
            };
        })

        .config(function (RestangularProvider) {
            RestangularProvider.setBaseUrl('/poupatudo-web/rest/');
        })

        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('httpErrorInterceptor');
        })

        .config(function (paginationConfig) {
            paginationConfig.firstText = "<<<";
            paginationConfig.previousText = '<<';
            paginationConfig.nextText = '>>';
            paginationConfig.lastText = '>>>';
        })

        .config(function (blockUIConfig) {
            blockUIConfig.message = 'Aguarde...';
            blockUIConfig.delay = 50;
            blockUIConfig.resetOnException = true;
            blockUIConfig.preventRouting = false;
            blockUIConfig.cssClass = 'block-ui my-custom-class';
        })

        ;

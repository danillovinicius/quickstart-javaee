/* global angular */

angular.module('poupatudo.service', [])

        .factory('httpErrorInterceptor', ['$q', 'messageService', 'util', function ($q, messageService, util) {
                function interceptor(rejection) {
                    var messageObj = {};
                    try {
                        if (util.isUndefined(rejection.data)) {
                            messageObj.code = rejection.status;
                            messageObj.messageProperties = "WS001";
                            messageObj.type = 'warning';
                            messageObj.detail = rejection.statusText;
                        } else {
                            messageObj = rejection.data;
                        }
                        messageService.add(messageObj);
                    } catch (ex) {
                        console.log('$httpProvider', ex);
                    }
                    return $q.reject(rejection);
                }
                return {
                    requestError: interceptor,
                    responseError: interceptor
                };
            }])

        .factory('messageService', ['$rootScope', '$timeout', 'messageProperties', function ($rootScope, $timeout, messageProperties) {
                var alertService;
                $rootScope.alerts = [];
                var count = 1;

                return alertService = {
                    add: function (obj, timeout) {
                        var timeout = timeout || 12000;
                        var messageObj = obj || {};

                        var messageText = messageObj.messageProperties
                                ? messageProperties.get(messageObj.messageProperties)
                                : messageObj.message;

                        $rootScope.alerts.push({
                            count: count,
                            code: messageObj.code,
                            message: messageText,
                            type: messageObj.type.toLowerCase(),
                            detail: messageObj.detail,
                            detailShow: false,
                            date: new Date().toLocaleString(),
                            close: function () {
                                count--;
                                return alertService.closeAlert(this);
                            }
                        });
                        count++;
                        if (timeout) {
                            $timeout(function () {
                                $rootScope.alerts = [];
                                count = 1;
                            }, timeout);
                        }
                    },
                    closeAlert: function (alert) {
                        return this.closeAlertIdx($rootScope.alerts.indexOf(alert));
                    },
                    closeAlertIdx: function (index) {
                        return $rootScope.alerts.splice(index, 1);
                    },
                    warn: function (obj) {
                        this.add({
                            code: obj.code,
                            message: obj.message,
                            messageProperties: obj.messageProperties,
                            type: "warning",
                            detail: obj.detail
                        });
                    },
                    info: function (obj) {
                        this.add({
                            code: obj.code,
                            message: obj.message,
                            messageProperties: obj.messageProperties,
                            type: "info",
                            detail: obj.detail
                        });
                    },
                    error: function (obj) {
                        this.add({
                            code: obj.code,
                            message: obj.message,
                            messageProperties: obj.messageProperties,
                            type: "danger",
                            detail: obj.detail
                        });
                    },
                    success: function (obj) {
                        this.add({
                            code: obj.code,
                            message: obj.message,
                            messageProperties: obj.messageProperties,
                            type: "success",
                            detail: obj.detail
                        });
                    }
                };
            }])

        .factory('messageProperties', function ($rootScope, $filter) {
            return {
                get: function (key) {
                    return $filter('filter')($rootScope.messagePropertiesTable, {'key': key})[0].value;
                }
            };
        })

        .factory('mockJsonService', function ($q,$http,$filter) {
            return {
                getListMock: function (jsonFileName){

                    var file = 'app/json/'+jsonFileName+'.json';
                    var toJsonString,
                        fromJsonString = "";
                    var deferred = $q.defer();

                    setTimeout(function() {
                        $http.get(file)
                            .success(function (response) {
                                toJsonString = angular.toJson(response);
                                fromJsonString = angular.fromJson(toJsonString);
                                deferred.resolve(fromJsonString);
                            })
                            .error(function (erro){
                                deferred.reject('json não localizado ' + jsonFileName + '.json');
                            });
                    }, 1000);

                    return deferred.promise;
                },
                getMock: function (jsonFileName, key){

                    var file = 'app/json/'+jsonFileName+'.json';
                    var toJsonString,
                        fromJsonString = "";
                    var deferred = $q.defer();

                    setTimeout(function() {
                        $http.get(file)
                            .success(function (response) {
                                toJsonString = angular.toJson(response);
                                fromJsonString = angular.fromJson(toJsonString);

                                var result = $filter('filter')(fromJsonString, {'codigo': key})[0];

                                deferred.resolve(result);
                            })
                            .error(function (erro){
                                deferred.reject('json não localizado ' + jsonFileName + '.json');
                            });
                    }, 1000);

                    return deferred.promise;
                }
            };
        })

        .factory('util', function () {

            var isUndefined = function (obj) {
                return angular.isUndefined(obj) || obj === null;
            };

            return {
                isUndefined: isUndefined
            };
        })

        .factory('utilCRUD', ['Restangular', function (Restangular) {
                return {
                    route: function (route) {
                        return route;
                    },
                    listar: function () {
                        return Restangular.all(this.route).getList().$object;
                    },
                    paginar: function (page, perPage) {
                        var paginacao = Restangular.one(this.route).one("pager", page).one("of", perPage);
                        return paginacao.get();
                    },
                    filtrar: function (page, perPage, object) {
                        return Restangular.one(this.route).one("pager", page).one("of", perPage).post(object);
                    },
                    obter: function () {
                        return Restangular.all(this.route);
                    },
                    obterID: function (id) {
                        return Restangular.one(this.route, id).get();
                    },
                    obterRota: function () {
                        return Restangular.one(this.route);
                    },
                    salvar: function (object) {
                        return Restangular.all(this.route).post(object);
                    },
                    atualizar: function (object) {
                        return object.put();
                    }
                };
            }])


        ;
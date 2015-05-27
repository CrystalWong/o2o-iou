'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:AccountCtrl
 * @description
 * # UserCenterAccountCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('AccountCtrl', ['$scope', '$rootScope', '$state', 'HongcaiUser', 'restmod', 'DEFAULT_DOMAIN', function ($scope, $rootScope, $state, HongcaiUser, restmod, DEFAULT_DOMAIN) {
    $rootScope.selected =  'account';

  }]);

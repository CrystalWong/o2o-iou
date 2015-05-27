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
    if ($rootScope.hasLoggedUser) {
      HongcaiUser.$find($rootScope.hasLoggedUser.id + '/account').$then(function(response) {
        if (response.$status === 'ok') {
          // 获取用户金额信息
          $scope.userAccount = response;
        } else {
          // 获取信息失败。
        }
      });
    }

    $rootScope.selected =  'account';

  }]);

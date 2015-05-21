'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:BankcardCtrl
 * @description
 * # BankcardCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('PaymentCollectionCtrl',['$scope', '$rootScope', 'HongcaiUser', function ($scope, $rootScope, HongcaiUser) {
    if ($rootScope.hasLoggedUser) {
      HongcaiUser.$find($rootScope.hasLoggedUser.id + '/bankcard').$then(function(response) {
        if (response.$status === 'ok') {
          // 获取用户的银行卡信息
          $scope.simpleBankcard = response;
        } else {
          // 获取信息失败。
        }
      });
    }
  }]);

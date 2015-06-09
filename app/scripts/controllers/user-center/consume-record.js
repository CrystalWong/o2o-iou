'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:ConsumeRecordCtrl
 * @description
 * # ConsumeRecordCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('ConsumeRecordCtrl', ['$scope', '$rootScope', '$state', 'IouUser', 'restmod', 'DEFAULT_DOMAIN', 'config', function ($scope, $rootScope, $state, IouUser, restmod, DEFAULT_DOMAIN, config) {

  if ($rootScope.userInfo) {
    IouUser.$find($rootScope.userInfo.id +'/consumptions').$then(function(response) {
	    if (response.$status === 'ok') {
	      // 获取用户金额信息
	      // $scope.userAccount = response;
	      $scope.userConsume = response;
	    } else {
	      // 获取信息失败。
	    }
	  });
    IouUser.$find($rootScope.userInfo.id +'/account').$then(function(response) {
        if (response.$status === 'ok') {
          // 获取用户金额信息
          // $scope.userAccount = response;
          $scope.userAccount = response;
        } else {
          // 获取信息失败。
        }
      });
  } else {
    window.location.href = config.weixin_redirect;
  }

  }]);

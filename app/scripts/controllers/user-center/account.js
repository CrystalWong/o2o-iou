'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:AccountCtrl
 * @description
 * # UserCenterAccountCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('AccountCtrl', ['$scope', '$rootScope', '$state', 'IouUser', function ($scope, $rootScope, $state, IouUser) {
    $rootScope.selected =  'account';

    $rootScope.checkSession.promise.then(function(){
        IouUser.$find($rootScope.userInfo.id + '/account').$then(function(response) {
          if (response.$status === 'ok') {
            // 获取用户金额信息
            $scope.userAccount = response;
          } else {
            // 获取信息失败。
          }
        });
    });



  }]);

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

    // var checkModel = restmod.model(DEFAULT_DOMAIN + '/users');
    $rootScope.checkSession.promise.then(function(){
      if ($rootScope.userInfo) {

        $scope.page = 1;
        $scope.pageSize = 10;
        $scope.getConsumeRecord = function () {
          IouUser.$find($rootScope.userInfo.id + '/consumptions', {
            page: $scope.page,
            pageSize: $scope.pageSize
          }).$then(function(response) {
            if (response.$status === 'ok') {
              // 获取用户购买记录列表
              $scope.userConsume = response;
            } else {
              $scope.msg = '获取购买信息失败';
            }
          });
        };

        $scope.getConsumeRecord();

        // 加载更多消费记录
        $scope.loadConsumeRecordMore = function() {
          $scope.pageSize = $scope.pageSize + 10;
          $scope.getConsumeRecord();
        };

        //获取账户信息
        IouUser.$find($rootScope.userInfo.id +'/account').$then(function(response) {
          if (response.$status === 'ok') {
            // 获取用户金额信息
            // $scope.userAccount = response;
            $scope.userAccount = response;
          } else {
            // 获取信息失败。
          }
        });
         
        //用户未登录状态
      } 
    });

  }]);

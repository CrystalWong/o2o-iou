'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:InvestmentRecordCtrl
 * @description
 * # InvestmentRecordCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('InvestmentRecordCtrl', ['$scope', '$rootScope', '$state', 'IouUser', 'restmod', 'DEFAULT_DOMAIN', 'config', function ($scope, $rootScope, $state, IouUser, restmod, DEFAULT_DOMAIN, config) {
    if ($rootScope.userInfo.id) {
      IouUser.$find($rootScope.userInfo.id + '/account').$then(function(response) {
        if (response.$status === 'ok') {
          // 获取用户购买记录列表
          $scope.account = response;
        } else {
          $scope.msg = '获取购买信息失败';
        }
      });   
      $scope.page = 1;
      $scope.pageSize = 10;
      $scope.getDeals = function () {
        IouUser.$find($rootScope.userInfo.id + '/credits', {
          page: $scope.page,
          pageSize: $scope.pageSize
        }).$then(function(response) {
          if (response.$status === 'ok') {
            // 获取用户购买记录列表
            $scope.creditsList = response.data;
          } else {
            $scope.msg = '获取购买信息失败';
          }
        });
      }

      $scope.getDeals();           

      // 加载更多购买记录
      $scope.loadDealMore = function() {
        $scope.pageSize = $scope.pageSize + 10;
        $scope.getDeals();
      };
    } else {
      window.location.href = config.weixin_redirect;
    }



  }]);

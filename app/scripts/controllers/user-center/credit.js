'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:CreditCtrl
 * @description
 * # CreditCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('CreditCtrl', ['$scope', '$rootScope', '$state', 'HongcaiUser', 'restmod', 'DEFAULT_DOMAIN', function($scope, $rootScope, $state, HongcaiUser, restmod, DEFAULT_DOMAIN) {

    // tab
    $scope.toggle = {};
    $scope.tabs = [{
      title: '回款中',
    }, {
      title: '已回款',
    }];

    $rootScope.selectedSide = 'investments-stat';
    $scope.page = 1;
    $scope.pageSize = 10;

    if ($rootScope.hasLoggedUser) {
      HongcaiUser.$find($rootScope.hasLoggedUser.id + '/totalProfit').$then(function(response){
        if (response.$status === 'ok') {
          $scope.totalProfit = response;
        }
      });
    }
    $scope.toggle.switchTab = function(tabIndex) {
      $scope.toggle.activeTab = tabIndex;
      if (tabIndex === 0) {
        $scope.creditStatus = '1,2';
      } else {
        $scope.creditStatus = '3';
      }
      $scope.getCredits($scope.creditStatus);
    };

    $scope.getCredits = function(status) {
      if ($rootScope.hasLoggedUser) {
        $scope.creditStatus = status;
        $scope.credits = HongcaiUser.$find($rootScope.hasLoggedUser.id + '/credits', {
          status: $scope.creditStatus,
          page: $scope.page,
          pageSize: $scope.pageSize
        });
      }
    };

    $scope.loadCreditMore = function() {
      $scope.pageSize = $scope.pageSize + 10;
      $scope.getCredits($scope.creditStatus);
    };

    $scope.getCredits('1,2');
  }]);

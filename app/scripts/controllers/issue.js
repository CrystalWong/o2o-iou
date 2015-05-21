'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:IssueCtrl
 * @description
 * # IssueCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('IssueCtrl', function ($scope) {
    $scope.toggle = {};
    $scope.tabs = [{
      title: '七日盈',
    }, {
      title: '月月盈',
    }, {
      title: '季度盈',
    }, {
      title: '半年盈',
    }];
    $scope.toggle.switchTab = function(tabIndex) {
      $scope.toggle.activeTab = tabIndex;
    };
  });

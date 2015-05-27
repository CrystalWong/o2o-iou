'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:FundsProjectDetailCtrl
 * @description
 * # FundsProjectDetailCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('MainCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'fundsProjects', 'restmod', 'DEFAULT_DOMAIN', 'config', function($scope, $state, $rootScope, $stateParams, fundsProjects, restmod, DEFAULT_DOMAIN, config) {
    $rootScope.selected = 'financing';
    
    $scope.showFundsAgreement = false;
    $scope.toggle = function () {
      $scope.showFundsAgreement = !$scope.showFundsAgreement;
    };

    // simple project
    fundsProjects.$find('recommendations').$then(function(response) {
      if (response.$status === 'ok') {
        // 项目详情
        $scope.simpleFundsProject = response;
        $scope.profitSingle = $scope.simpleFundsProject.product.baseRate*$scope.simpleFundsProject.product.sealingDays/36500;
      } else {
        // do anything?
        // 请求数据失败，请重新加载该页面
      }
    });

    $scope.toInvest = function(simpleFundsProject) {
      /*if (simpleFundsProject.isRepeatFlag && $scope.fundsFlag === 3) {
        $scope.isRepeat = 1;
      } else {
        $scope.isRepeat = 2;
      }
      $scope.investAmount = simpleFundsProject.investAmount;
      if ($scope.fundsFlag === 0) {
        $state.go('root.login');
      } else if ($scope.fundsFlag === 1) {
        // 需要跳到实名认证页面
      } else if ($scope.checkLargeUserCanAmount(simpleFundsProject)) {
        $state.go('root.user-center.recharge');
      } else if ($scope.fundsFlag === 2 || $scope.fundsFlag === 3) {*/
        // how to bulid investment path restmod.model
        // restmod.model(DEFAULT_DOMAIN + '/projects')
        
        restmod.model(DEFAULT_DOMAIN + '/fundsProjects/' + simpleFundsProject.number + '/users/' + $rootScope.userInfo.id + '/investment').$create({
        // restmod.model(DEFAULT_DOMAIN + '/fundsProjects/' + simpleFundsProject.number + '/users/6/investment').$create({
          amount: simpleFundsProject.investAmount,
          projectId: simpleFundsProject.id,
          isRepeat: 2
        }).$then(function(response) {
          // 重复下单后，response.number为undefined
          if (response.$status === 'ok') {
            if (response.number !== null && response.number !== undefined) {
              // restmod.model(DEFAULT_DOMAIN + '/orders/' + simpleFundsProject.number + '/users/' + $rootScope.hasLoggedUser.id + '/payment').$create({'orderNumber' : response.number}).$then(function(response) {
              // restmod.model(DEFAULT_DOMAIN + '/orders/' + simpleFundsProject.number + '/users/6/payment').$create({'orderNumber' : response.number}).$then(function(response) {
              //   if (response.$status === 'ok') {
                $state.go('identity',{'number': response.number});
              //   } else {
              //     $scope.msg = response.msg;
              //   }
              // })
            } else if (response.ret === -1) {
              $scope.msg = response.msg;
            }
          } else {
            $scope.msg = "服务器累瘫了，请稍后访问。";
          }
        })
      // }
    };

  }]);

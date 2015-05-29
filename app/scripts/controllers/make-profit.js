'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:FundsProjectDetailCtrl
 * @description
 * # FundsProjectDetailCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('MakeProfitCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'fundsProjects', 'restmod', 'DEFAULT_DOMAIN', 'config', function($scope, $state, $rootScope, $stateParams, fundsProjects, restmod, DEFAULT_DOMAIN, config) {
    $rootScope.selected = 'financing';
    
    $scope.showFundsAgreement = false;
    $scope.toggle = function () {
      $scope.showFundsAgreement = !$scope.showFundsAgreement;
    };

    if (!$rootScope.openid || $rootScope.openid === null || $rootScope.openid === undefined) {
      var checkModel = restmod.model(DEFAULT_DOMAIN + '/users');
      // 获取微信code
      $rootScope.wechatCodeStr = location.search.split('code=')[1];
      if ($rootScope.wechatCodeStr) {
        $rootScope.wechatCode = $rootScope.wechatCodeStr.split('&state')[0];
        if ($rootScope.wechatCode) {
          checkModel.$find($rootScope.wechatCode + '/openid').$then(function(response){
            $rootScope.openid = response.openid;
            $rootScope.userInfo = response;
            if (!response.mobile || $rootScope.openid === null || $rootScope.openid === undefined) {
              $state.go('register');
            }
          });
        }
      }
    }

    // simple project
    fundsProjects.$find('recommendations').$then(function(response) {
      if (response.$status === 'ok') {
        // 项目详情
        $scope.simpleFundsProject = response;
        $scope.profitSingle = $scope.simpleFundsProject.product.baseRate*$scope.simpleFundsProject.product.sealingDays/36500;
      } else {
        $scope.msg = response.msg;
      }
    });

    $scope.toInvest = function(simpleFundsProject) {
        restmod.model(DEFAULT_DOMAIN + '/fundsProjects/' + simpleFundsProject.number + '/users/' + $rootScope.userInfo.id + '/investment').$create({
          amount: simpleFundsProject.investAmount,
          projectId: simpleFundsProject.id,
          isRepeat: 2
        }).$then(function(response) {
          if (response.$status === 'ok') {
            if (response.number !== null && response.number !== undefined) {
                $state.go('identity',{'number': response.number});
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

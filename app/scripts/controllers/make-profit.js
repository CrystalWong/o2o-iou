'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:FundsProjectDetailCtrl
 * @description
 * # FundsProjectDetailCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('MakeProfitCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'fundsProjects', 'restmod', 'DEFAULT_DOMAIN', 'config', 'IouUser', function($scope, $state, $rootScope, $stateParams, fundsProjects, restmod, DEFAULT_DOMAIN, config, IouUser) {
    $rootScope.selected = 'financing';
    
    $scope.showFundsAgreement = false;
    $scope.toggle = function () {
      $scope.showFundsAgreement = !$scope.showFundsAgreement;
    };

    $rootScope.checkSession.promise.then(function(){
      if ($rootScope.account){
        $scope.userAccount = $rootScope.account;
      } else {
        IouUser.$find($rootScope.userInfo.id + '/account').$then(function(response) {
          if (response.$status === 'ok') {
            // 获取用户金额信息
            $scope.userAccount = response;
          } else {
            // 获取信息失败。
          }
        });
      }
    });
    

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

    function newForm() {
      var f = document.createElement('form');
      document.body.appendChild(f);
      f.method = 'post';
      // f.target = '_blank';
      return f;
    }

    function createElements(eForm, eName, eValue) {
      var e = document.createElement('input');
      eForm.appendChild(e);
      e.type = 'text';
      e.name = eName;
      if (!document.all) {
        e.style.display = 'none';
      } else {
        e.style.display = 'block';
        e.style.width = '0px';
        e.style.height = '0px';
      }
      e.value = eValue;
      return e;
    }

    $scope.investmentFlag = false;
    $scope.toInvest = function(simpleFundsProject) {
      if (!$scope.investmentFlag) {
        $scope.investmentFlag = true;
        IouUser.$find($rootScope.userInfo.id + '/quickRecharge' + '?amount=' + simpleFundsProject.investAmount)
          .$then(function(response) {
            if (response.ret === -1){
              $scope.msg = response.msg;
            }
        });
      }

    };

  }]);

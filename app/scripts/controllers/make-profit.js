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
        IouUser.$find('checkSession').$then(function(response) {
          if (response.user) {
            $rootScope.userInfo = response.user;
            // restmod.model(DEFAULT_DOMAIN + '/fundsProjects/' + simpleFundsProject.number + '/users/6/investment').$create({
            restmod.model(DEFAULT_DOMAIN + '/fundsProjects/' + simpleFundsProject.number + '/users/' + $rootScope.userInfo.id + '/investment').$create({
              amount: simpleFundsProject.investAmount,
              projectId: simpleFundsProject.id,
              isRepeat: 2
            }).$then(function(response) {
              if (response.ret !== -1) {
                if (response.number) {
                  // restmod.model(DEFAULT_DOMAIN + '/orders/' + response.number + '/users/6/payment').$create({
                  restmod.model(DEFAULT_DOMAIN + '/orders/' + response.number + '/users/' + $rootScope.userInfo.id + '/payment').$create({
                      payType: 2
                    }).$then(function(response) {
                    if (response.ret !== -1) {
                      var merchantaccount = response.merchantaccount;
                      var encryptkey = response.encryptkey;
                      var data = response.data;
                      var _f = newForm(); //创建一个form表单
                      createElements(_f, 'merchantaccount', merchantaccount); //创建form中的input对象
                      createElements(_f, 'encryptkey', encryptkey); //创建form中的input对象
                      createElements(_f, 'data', data); //创建form中的input对象
                      _f.action = 'https://ok.yeepay.com/paymobile/api/pay/request'; //form提交地址
                      _f.submit(); //提交
                    } else {
                      $scope.msg = response.msg;
                    }
                  });
                }

              } else {
                $scope.msg = response.msg;
              }
            });
          }
        });
      }

    };

  }]);

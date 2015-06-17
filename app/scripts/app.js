'use strict';
/**
 * @ngdoc overview
 * @name o2oWechatIou
 * @description
 * # o2oWechatIou
 *
 * Main module of the application.
 */
var o2oWechatIou = angular.module('o2oWechatIou', [
  'ngAnimate',
  'ngTouch',
  // 'famous.angular',
  'ui.router',
  'restmod',
  'config',
  'ipCookie',
  'angularMoment',
  'angular-md5'
]);

o2oWechatIou
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', '$uiViewScrollProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $uiViewScrollProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $uiViewScrollProvider.useAnchorScroll();
    $stateProvider
      .state('register', {
        url: '/register/:openid',
        views: {
          'register': {
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl',
            controllerUrl: 'scripts/controllers/register'
          }
        }
      })
      .state('root', {
        abstract: true,
        views: {
          '': {
            templateUrl: 'views/root.html'
          },
          'header': {
            templateUrl: 'views/_header.html'
          }
        }
      })
      // 打白条
      .state('root.iou', {
        url: '/iou',
        views: {
          '': {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerUrl: 'scripts/controllers/main'
          }
        }
      })
      // 去赚钱
      .state('root.main', {
        url: '/',
        views: {
          '': {
            templateUrl: 'views/make-profit.html',
            controller: 'MakeProfitCtrl',
            controllerUrl: 'scripts/controllers/make-profit'
          }
        }
      })
      .state('yeepay-callback', {
        url: '/yeepay-callback/:number',
        views: {
          'yeepay-callback': {
            templateUrl: 'views/yeepay-callback.html',
            controller: 'YeepayCallbackCtrl',
            controllerUrl: 'scripts/controllers/yeepay-callback'
          }
        }
      })
      //我的账户
      .state('root.account', {
        url: '/account',
        views: {
          '': {
            templateUrl: 'views/user-center/account.html',
            controller: 'AccountCtrl',
            controllerUrl: 'scripts/controllers/user-center/account'
          }
        }
      })
      //购买记录
      .state('investment-record', {
        url: '/investment-record',
        views: {
          '': {
            templateUrl: 'views/user-center/investment-record.html',
            controller: 'InvestmentRecordCtrl',
            controllerUrl: 'scripts/controllers/user-center/investment-record'
          }
        }
      })
      //消费记录
      .state('consume-record', {
        url: '/consume-record',
        views: {
          '': {
            templateUrl: 'views/user-center/consume-record.html',
            controller: 'ConsumeRecordCtrl',
            controllerUrl: 'scripts/controllers/user-center/consume-record'
          }
        }
      })
      //消费店铺列表页
      .state('root.consume', {
        url: '/consume',
        views: {
          '': {
            templateUrl: 'views/shop-consume/shop_list_iou.html',
            controller: 'ConsumeCtrl',
            controllerUrl: 'scripts/controllers/shop-consume/consume'
          }
        }
      })
      //消费店铺详情页
      .state('shop-detail', {
        url: '/shop-detail/:shopId',
        views: {
          '': {
            templateUrl: 'views/shop-consume/shop_details.html',
            controller: 'ShopDetailCtrl',
            controllerUrl: 'scripts/controllers/shop-consume/shop-detail'
          }
        }
      })
      //消费店铺详情页
      .state('root.consume-ok', {
        url: '/consume-ok',
        views: {
          '': {
            templateUrl: 'views/shop-consume/pay_ok.html',
            controller: 'AccountCtrl',
            controllerUrl: 'scripts/controllers/user-center/account'
          }
        }
      })
      // 常见问题
      .state('faq', {
        url: '/faq',
        views: {
          '': {
            templateUrl: 'views/faq.html',
            controller: 'FaqCtrl',
            controllerUrl: 'scripts/controllers/faq'
          }
        }
      })
      // 关于我们
      .state('about', {
        url: '/about',
        views: {
          '': {
            templateUrl: 'views/about.html'
          }
        }
      });

    // 导致IE8不兼容的地方。
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.when('', '/');

}])
  .run(function($q, $rootScope, $stateParams, DEFAULT_DOMAIN, $state, $location, $http, restmod, config, IouUser) {
    $rootScope.config = config;
    // var titleMap = {'issue': '常见问题', 'about': '帮助中心', 'safe': '安全保障', 'account': '账户总览'};
    $rootScope.$on('$stateChangeStart', function() {
      /*var checkModel = restmod.model(DEFAULT_DOMAIN + '/users');*/
      $rootScope.checkSession = $q.defer();
      IouUser.$find('checkSession').$then(function(response) {
        $rootScope.checkSession.resolve(response);
        if (response.user) {
          // $rootScope.isLogged = true;
          $rootScope.openid = response.user.openid;
          $rootScope.userInfo = response.user;
          $rootScope.account = response.account;
          //用户未登录状态
        } else if(response.ret === -1) {
          // $rootScope.isLogged = false;
          $rootScope.userInfo = null;
          $rootScope.openid = null;
        }
      });
        
    });


    $rootScope.$on('$stateChangeSuccess', function() {
      console.log('stateChangeSuccess');
      /*var path = $location.path().split('/')[1];
      $rootScope.showPath = path;
      $rootScope.showTitle = titleMap[path];*/
    });
  })

  .constant('DEFAULT_DOMAIN', '/ious/rest');

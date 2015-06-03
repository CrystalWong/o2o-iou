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
            templateUrl: 'views/_header.html',
            controller: 'HeaderCtrl',
            controllerUrl: 'scripts/controller/header-ctrl'
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
      /*.state('identity', {
        url: '/identity/:number',
        views: {
          'identity': {
            templateUrl: 'views/identity.html',
            controller: 'IdentityCtrl',
            controllerUrl: 'scripts/controllers/identity'
          }
        }
      })*/
      .state('root.lianlian-callback', {
        url: '/lianlian-callback/:number',
        views: {
          '': {
            templateUrl: 'views/lianlian-callback.html',
            controller: 'LianlianCallbackCtrl',
            controllerUrl: 'scripts/controllers/lianlian-callback'
          }
        }
      })
      /*.state('root.registration-agreement', {
        url: '/registration-agreement',
        views: {
          '': {
            templateUrl: 'views/registration-agreement.html'
          }
        }
      })*/
      // 个人中心
      .state('root.user-center', {
        abstract: true,
        url: '/user-center',
        views: {
          'user-center': {
            templateUrl: 'views/user-center/user-center.html'
          }
        }
      })
      //我的账户
      .state('root.user-center.account', {
        url: '/account',
        views: {
          '': {
            templateUrl: 'views/user-center/account.html',
            controller: 'AccountCtrl',
            controllerUrl: 'scripts/controllers/user-center/account'
          }
        }
      })
      // 常见问题
      .state('root.faq', {
        url: '/faq',
        views: {
          '': {
            templateUrl: 'views/faq.html',
            controller: 'FaqCtrl',
            controllerUrl: 'scripts/controllers/faq'
          }
        }
      });
      // 关于我们
      /*.state('root.about', {
        url: '/about',
        views: {
          '': {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl',
            controllerUrl: 'scripts/controllers/about'

          }
        }
      });*/

    // 导致IE8不兼容的地方。
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.when('', '/');

}])
  .run(function($rootScope, $stateParams, DEFAULT_DOMAIN, $state, $location, $http, restmod) {
    var routespermission = [
      '/user-center'
    ];
    var titleMap = {'issue': '常见问题', 'about': '帮助中心', 'safe': '安全保障', 'account': '账户总览'};
    $rootScope.$on('$stateChangeStart', function() {
/*      var checkModel = restmod.model(DEFAULT_DOMAIN + '/users');
      checkModel.$find('checkSession').$then(function(response) {
        if (response.user) {
          $rootScope.isLogged = true;
          $rootScope.openid = response.openid;
          $rootScope.userInfo = response;
          //用户未登录状态
        } else if(response.ret === -1) {
          $rootScope.isLogged = false;
          $rootScope.userInfo = null;
          $rootScope.openid = null;
        }
      });*/
      
    });
    $rootScope.$on('$stateChangeSuccess', function() {
      var path = $location.path().split('/')[1];
      $rootScope.showPath = path;
      $rootScope.showTitle = titleMap[path];
    });
  })

  .constant('DEFAULT_DOMAIN', '/ious/rest');

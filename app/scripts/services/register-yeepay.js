'use strict';

/**
 * @ngdoc service
 * @name o2oWechatIou.registerYeepay
 * @description
 * # register
 * Service in the o2oWechatIou.
 */
angular.module('o2oWechatIou')
  .service('registerYeepay', function (restmod, DEFAULT_DOMAIN, $stateParams) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return restmod.model(DEFAULT_DOMAIN + '/users/' + $stateParams.userId + '/yeepayRegister');
  });

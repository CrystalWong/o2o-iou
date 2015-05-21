'use strict';

/**
 * @ngdoc service
 * @name o2oWechatIou.mobileCaptcha
 * @description
 * # mobileCaptcha
 * Service in the o2oWechatIou.
 */
angular.module('o2oWechatIou')
  .service('mobileCaptcha', function (restmod) {
    return restmod.model('/hongcai/rest/users/mobileCaptcha');
    // AngularJS will instantiate a singleton by calling "new" on this function
  });

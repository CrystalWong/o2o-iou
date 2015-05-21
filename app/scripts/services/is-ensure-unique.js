'use strict';

/**
 * @ngdoc service
 * @name o2oWechatIou.isEnsureUnique
 * @description
 * # isEnsureUnique
 * Service in the o2oWechatIou.
 */
angular.module('o2oWechatIou')
  .service('isEnsureUnique', function (restmod, DEFAULT_DOMAIN) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return restmod.model(DEFAULT_DOMAIN + '/users/isUnique');
  });

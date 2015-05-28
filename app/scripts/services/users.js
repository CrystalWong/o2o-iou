'use strict';
angular.module('o2oWechatIou')
  .factory('User', function(restmod) {
    return restmod.model('/ipa/admin/users');
  });

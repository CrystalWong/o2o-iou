'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:SafeCtrl
 * @description
 * # SafeCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('FaqCtrl', function ($scope) {
    $scope.faqs = [
    {name: '1.第一个问题？', content: '电子协议商户 在线支付1%，神州行充值卡20%，骏网卡25%。纸质协议费率具体需要在签订纸质协议合同时和客户经理沟通洽谈。', fa: 'fa-gavel'},
    {name: '2.第二个问题？', content: '电子协议商户 在线支付1%，神州行充值卡20%，骏网卡25%。纸质协议费率具体需要在签订纸质协议合同时和客户经理沟通洽质协议费率具质协议费率具谈。', fa: 'fa-briefcase'},
    {name: '3.第三个问题？', eName: 'Risk Control System', content: '电子协议商户 在线支付1%，神州行充值卡20%，骏网卡25%。纸质协议费率具体需要在。', fa: 'fa-bell'}
    ];
  });

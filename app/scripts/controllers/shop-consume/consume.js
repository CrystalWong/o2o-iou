'use strict';

/**
 * @ngdoc function
 * @name o2oWechatIou.controller:AccountCtrl
 * @description 消费列表页的ctrl
 * # UserCenterAccountCtrl
 * Controller of the o2oWechatIou
 */
angular.module('o2oWechatIou')
  .controller('ConsumeCtrl', ['$scope', '$rootScope', '$state', 'IouUser', 'Consume', 'config', function ($scope, $rootScope, $state, IouUser, Consume, config) {
    $rootScope.selected =  'iou';


    $scope.goShopDetail = function(shop){
      $state.go('shop-detail', {shopId: shop.shopId});
    }

    // wx.config({
    //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //     appId: '', // 必填，公众号的唯一标识
    //     timestamp: config.wechatAppid, // 必填，生成签名的时间戳
    //     nonceStr: '', // 必填，生成签名的随机串
    //     signature: '',// 必填，签名，见附录1
    //     jsApiList: [
    //         'checkJsApi',
    //         'hideMenuItems',
    //         'showMenuItems',
    //         'hideAllNonBaseMenuItem',
    //         'showAllNonBaseMenuItem',
    //         'translateVoice',
    //         'startRecord',
    //         'stopRecord',
    //         'onRecordEnd',
    //         'playVoice',
    //         'pauseVoice',
    //         'stopVoice',
    //         'uploadVoice',
    //         'downloadVoice',
    //         'chooseImage',
    //         'previewImage',
    //         'uploadImage',
    //         'downloadImage',
    //         'getNetworkType',
    //         'openLocation',
    //         'getLocation',
    //         'hideOptionMenu',
    //         'showOptionMenu',
    //         'closeWindow',
    //         'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    // });

    // wx.getLocation({
    //     success: function (res) {
    //         var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
    //         var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
    //         var speed = res.speed; // 速度，以米/每秒计
    //         var accuracy = res.accuracy; // 位置精度
    //         alert(res);
    //     }
    // });

    $rootScope.checkSession.promise.then(function(){
      Consume.$find('/').$then(function(response) {
        if (response.$status === 'ok') {
          
          $scope.pagingShops = response; // 当前页店铺信息
        } else {
          // 获取信息失败。
        }
      });


  });




}]);

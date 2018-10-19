// (function($){
  //解决上传图片时capture="camera"在安卓与IOS的兼容性问题（在IOS只能拍照，不能选相册）
  var ua = navigator.userAgent.toLowerCase();//获取浏览器的userAgent,并转化为小写——注：userAgent是用户可以修改的
  var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);//判断是否是苹果手机，是则是true
  if (isIos) {
    $("input:file").removeAttr("capture");
  };

  // 上传照片弹出框
  function onPopup(){
    $('.popUp_Box').removeClass('display_N');
  }
  // 关闭弹出框
  function closePopup(){
    $('.popUp_Box').addClass('display_N');
  }
// })(jQuery);
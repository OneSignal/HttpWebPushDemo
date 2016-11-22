window.OneSignal = window.OneSignal || [];
var initOptions = {
  appId: "fc6d5514-687f-4765-bd11-431b312b17fc",
  autoRegister: true,
  notifyButton: {
    enable: true
  }
};

OneSignal.push(function() {
  OneSignal.init(initOptions);
});

window.OneSignal = window.OneSignal || [];
var initOptions = {
  appId: "12634044-7970-4268-8513-c679c2c6cee5",
  subdomainName: 'onesignal-demo',
  autoRegister: true,
  notifyButton: {
    enable: true
  }
};

OneSignal.push(function() {
  OneSignal.init(initOptions);
});

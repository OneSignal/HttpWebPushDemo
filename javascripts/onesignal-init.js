window.OneSignal = window.OneSignal || [];
var initOptions = {
  appId: "fc6d5514-687f-4765-bd11-431b312b17fc",
  autoRegister: true,
  notifyButton: {
    enable: true
  }
};

/*
  Special Case: Worker files in a subdirectory
  
  We're hosting on GitHub pages so the worker files can't be uploaded to the root.
 */
function changeServiceWorkerFilePath() {
  OneSignal.SERVICE_WORKER_PATH = 'WebPushDemo/OneSignalSDKWorker.js';
  OneSignal.SERVICE_UPDATER_WORKER_PATH = 'WebPushDemo/OneSignalSDKUpdaterWorker.js';
  OneSignal.SERVICE_WORKER_PARAM = {scope: '/WebPushDemo' };
};

OneSignal.push(function() {
  changeServiceWorkerFilePath();
  OneSignal.init(initOptions);
});

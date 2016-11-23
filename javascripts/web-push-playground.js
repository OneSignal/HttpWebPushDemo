function hookSendNotificationButton() {
  document.querySelector('#button-send-notification').addEventListener('click', function() {
    OneSignal.sendSelfNotification(
      /* Title (defaults if unset) */
      "OneSignal Web Push Notification",
      /* Message (defaults if unset) */
      "Action buttons increase the ways your users can interact with your notification.", 
       /* URL (defaults if unset) */
      'https://example.com/?_osp=do_not_open',
      /* Icon */
      'https://onesignal.com/images/notification_logo.png',
      {
        /* Additional data hash */
        notificationType: 'news-feature'
      }, 
      [{ /* Buttons */
        /* Choose any unique identifier for your button. The ID of the clicked button 			 is passed to you so you can identify which button is clicked */
        id: 'like-button',
        /* The text the button should display. Supports emojis. */
        text: 'Like',
        /* A valid publicly reachable URL to an icon. Keep this small because it's 				 downloaded on each notification display. */
        icon: 'http://i.imgur.com/N8SN8ZS.png',
        /* The URL to open when this action button is clicked. See the sections below 			 for special URLs that prevent opening any window. */
        url: 'https://example.com/?_osp=do_not_open'
      },
      {
        id: 'read-more-button',
        text: 'Read more',
        icon: 'http://i.imgur.com/MIxJp1L.png',
        url: 'https://example.com/?_osp=do_not_open'
      }]
    );
    swal({
        title: "Notification sent!",
        text: "You should see it right about now.",
        timer: 1500,
        html: true,
        type: "success"
    });
  });
}

function hookSubscribe() {
  document.querySelector('#button-subscribe').addEventListener('click', function() {
    OneSignal.registerForPushNotifications();
  });
}

function hookResubscribe() {
  document.querySelector('#button-resubscribe').addEventListener('click', function() {
    OneSignal.setSubscription(true);
  });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTagData() {
  return {
    number: getRandomInt(100, 999)
  };
}

function hookTagData() {
    document.querySelector('#button-tag-data').addEventListener('click', function() {
        OneSignal.sendTags(getRandomTagData())
            .then(function() {
                swal({
                    title: "You've been tagged!",
                    text: "Check out the <a href='https://onesignal.com/apps/fc6d5514-687f-4765-bd11-431b312b17fc/players'>All Users page</a> (be sure to <a href='https://onesignal.com'>login first</a>) of your dashboard to see your tagged user entry.",
                    html: true,
                    type: "success"
                })
            });
    });
}

function showHideContentOnSubscriptionChange() {
  OneSignal.on('subscriptionChange', showHideContent);
}

function oneSignalStuff() {
  OneSignal.push(function() {
    showHideContent();
    showHideContentOnSubscriptionChange();
    hookSubscribe();
    hookResubscribe();
    hookTagData();
    hookSendNotificationButton();
  });
}

function showHideContent() {
  Promise.all([
    OneSignal.isPushNotificationsEnabled(),
    OneSignal.isOptedOut()
  ]).then(function(results) {
             var isEnabled = results[0];
             var isOptedOut = results[1];
             if (isEnabled) {
               var elements = document.querySelectorAll('.show-when-subscribed');
               elements.forEach(function(element) {    
                 element.classList.remove("hidden");
               });
               var elements = document.querySelectorAll('.show-when-unsubscribed');
               elements.forEach(function(element) {    
                 element.classList.add("hidden");
               });
               var elements = document.querySelectorAll('.show-when-subscribed-and-opted-out');
               elements.forEach(function(element) {    
                 element.classList.add("hidden");
               });
             } else {
               if (isOptedOut) {
                 var elements = document.querySelectorAll('.show-when-subscribed-and-opted-out');
                 elements.forEach(function(element) {    
                   element.classList.remove("hidden");
                 });
                 var elements = document.querySelectorAll('.show-when-unsubscribed');
                 elements.forEach(function(element) {    
                   element.classList.add("hidden");
                 });
                 var elements = document.querySelectorAll('.show-when-subscribed');
                 elements.forEach(function(element) {    
                   element.classList.add("hidden");
                 });                 
               } else {
                 var elements = document.querySelectorAll('.show-when-unsubscribed');
                 elements.forEach(function(element) {    
                   element.classList.remove("hidden");
                 });
                 var elements = document.querySelectorAll('.show-when-subscribed');
                 elements.forEach(function(element) {    
                   element.classList.add("hidden");
                 });
                 var elements = document.querySelectorAll('.show-when-subscribed-and-opted-out');
                 elements.forEach(function(element) {    
                   element.classList.add("hidden");
                 });
               }
             }
           });
}

function run() {
  oneSignalStuff();
}

if (document.readyState === "interactive" || document.readyState === "complete") {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run);
}

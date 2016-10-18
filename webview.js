const path = require('path');

module.exports = (Franz, options) => {
  var counterKeeper = 0;
  var notificationsCounter = 0;
  const getMessages = () =>
  {

    notificationsCounter = 0;

    var chatCounters = document.querySelectorAll(".chat-counter:not(.d-none)");
    for (var i = 0; i < chatCounters.length; i++) {
      notificationsCounter += +(chatCounters[i].innerText);
    }

    if (chatCounters.length == 0) {
      var latestCounters = document.querySelectorAll(".item-body > .counter");
      for (var i = 0; i < latestCounters.length; i++) {
        notificationsCounter += +(latestCounters[i].innerText);
      }
    }

    var mainLatestCounter = +document.getElementById('sr-last-counter').innerText;
    if (typeof latestCounters !== 'undefined' && latestCounters && mainLatestCounter > 0) {
      notificationsCounter += mainLatestCounter - latestCounters.length;
    } else {
      notificationsCounter += mainLatestCounter;
    }

    if (notificationsCounter > 0 && notificationsCounter != counterKeeper) {
      audio.play();
    }

    counterKeeper = notificationsCounter;

    Franz.setBadge(notificationsCounter);

    live("click", 'item-playOnMessage', function (event) {
      var audio = new Audio('/sounds/classic/message.mp3');
      audio.currentTime = 0;
      audio.play();
    });
  }

  function live(eventType, elementId, cb) {
    document.addEventListener(eventType, function (event) {
      if (event.target.id === elementId) {
        cb.call(event.target, event);
      }
    });
  }

  var audio = new Audio('/sounds/classic/message.mp3');

  Franz.injectCSS(path.join(__dirname, 'css', 'gg.css'));
  Franz.loop(getMessages);
}

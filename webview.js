const path = require('path');

module.exports = (Franz, options) => {
  const getMessages = () => {

    var notificationsCounter = 0;

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
    if ( typeof latestCounters !== 'undefined' && latestCounters && mainLatestCounter > 0) {
      notificationsCounter += mainLatestCounter - latestCounters.length;
    } else {
      notificationsCounter += mainLatestCounter;
    }

    Franz.setBadge(notificationsCounter);
  }

  Franz.injectCSS(path.join(__dirname, 'css', 'gg.css'));
  Franz.loop(getMessages);
}

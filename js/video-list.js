(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var apiUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&key=AIzaSyDxpcGtEL7bMKiyQDjBjHXTjZXuZbs2ppk&type=video&q=';
document.querySelector('#form').addEventListener('submit', function (e) {
  e.preventDefault();
  var query = document.querySelector('#search').value;

  window.fetch(apiUrl + query).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data.items[0].id.videoId);
    //window.player.loadVideoById(data.items[0].id.videoId)
    var list = data.items.map(function (item) {
      return item.id.videoId;
    });

    window.player.loadPlaylist(list, 0);
    window.player.setLoop(true);
    console.log(window.player, list);
  });
});

window.player;

window.onYouTubeIframeAPIReady = function () {
  window.player = new YT.Player('player', {
    videoId: '',
    width: 300,
    height: 200,
    events: {
      onReady: function onReady(event) {
        console.log(event);
      },
      onStateChange: function onStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
          console.log(event.data);
        }
      },
      onError: function onError(err) {
        console.log(err);
      }
    }
  });
};

},{}]},{},[1]);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var elFileInput = document.querySelector('#file-input'),
    elFileList = document.querySelector('#file-list');

elFileInput.addEventListener('change', function (ev) {
  var files = ev.target.files;

  var template = '';

  for (var i = 0, max = files.length; i < max; i++) {
    template += '<li>';
    template += files[i].name;
    template += ' / ';
    template += files[i].type;
    template += '</li>';

    console.log(files[i]);
  }

  elFileList.innerHTML = template;
});

},{}]},{},[1]);

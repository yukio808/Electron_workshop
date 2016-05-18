'use strict';
// Modified by hokein
// Additionally Modified by Yukio Yamamoto
//
// Copyright 2014 Intel Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// Author: Dongseong Hwang (dongseong.hwang@intel.com)

window.$ = window.jQuery = require('./js/jquery.js');
require('./js/image-picker.js');

const electron = require('electron');
const desktopCapturer = electron.desktopCapturer;

let desktopSharing = false;
let localStream = null;
function refresh() {
  $('select').imagepicker({
    hide_select : true
  });
}

function addSource(source) {
  $('select').append($('<option>', {
    value: source.id.replace(":", ""),
    text: source.name
  }));
  console.log(' source', source.thumbnail.toDataUrl());
  $('select option[value="' + source.id.replace(":", "") + '"]')
    .attr('data-img-src', source.thumbnail.toDataUrl());
  refresh();
}

function showSources() {
  desktopCapturer.getSources({ types:['window', 'screen'] }, function(error, sources) {
    for (var i = 0; i < sources.length; ++i) {
      console.log("Name: " + sources[i].name, sources[i]);
      addSource(sources[i]);
    }
  });
}

function toggle() {
  if (!desktopSharing) {
    var id = ($('select').val()).replace(/window|screen/g, function(match) { return match + ":"; });
    onAccessApproved(id);
  } else {
    desktopSharing = false;

    if (localStream)
      localStream.getTracks()[0].stop();
    localStream = null;

    document.querySelector('button').innerHTML = "Enable Capture";

    $('select').empty();
    showSources();
    refresh();
  }
}

function onAccessApproved(desktop_id) {
  if (!desktop_id) {
    console.log('Desktop Capture access rejected.');
    return;
  }
  desktopSharing = true;
  document.querySelector('button').innerHTML = "Disable Capture";
  console.log("Desktop sharing started.. desktop_id:" + desktop_id);
  navigator.webkitGetUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: desktop_id,
        minWidth: 1280,
        maxWidth: 1280,
        minHeight: 720,
        maxHeight: 720
      }
    }
  }, gotStream, getUserMediaError);

  function gotStream(stream) {
    localStream = stream;
    document.querySelector('video').src = URL.createObjectURL(stream);
    stream.onended = function() {
      if (desktopSharing) {
        toggle();
      }
    };
  }

  function getUserMediaError(e) {
    console.log('getUserMediaError: ' + JSON.stringify(e, null, '---'));
  }
}

$(document).ready(function() {
  showSources();
  refresh();
});

document.querySelector('button').addEventListener('click', function(e) {
  toggle();
});

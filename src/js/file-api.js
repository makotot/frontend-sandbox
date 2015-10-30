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


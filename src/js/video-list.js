var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var apiUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&key=AIzaSyDxpcGtEL7bMKiyQDjBjHXTjZXuZbs2ppk&type=video&q=';
document.querySelector('#form').addEventListener('submit', function (e) {
  e.preventDefault();
  var query = document.querySelector('#search').value;

  window.fetch(apiUrl + query)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data.items[0].id.videoId)
      //window.player.loadVideoById(data.items[0].id.videoId)
      var list = data.items.map(function (item) {
        return item.id.videoId;
      });

      window.player.cuePlaylist(list);
      console.log(list)
    })
});

window.player;

window.onYouTubeIframeAPIReady = function () {
  window.player = new YT.Player('player', {
    videoId: '',
    width: 300,
    height: 200,
    events: {
      onReady: function (event) {
        console.log(event)
      },
      onStateChange: function (event) {
        if (event.data === YT.PlayerState.ENDED) {
          console.log(event.data)
        }
      },
      onError: function (err) {
        console.log(err)
      }
    }
  })
}

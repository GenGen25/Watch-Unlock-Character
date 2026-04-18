let player;

// Load YouTube API
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

// Create player
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '315',
    width: '560',
 videoId: 'AAEiOngOzIY'

function goNext() {
  window.location.href = "video5.html";
}
// Detect end
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    document.getElementById("okBtn").style.display = "inline";
  }
}

// OK click
document.getElementById("okBtn").addEventListener("click", function() {
  alert("Video completed!");
  document.getElementById("nextBtn").disabled = false;
});

// Go to next page
function goNext() {
  window.location.href = "video2.html";
}
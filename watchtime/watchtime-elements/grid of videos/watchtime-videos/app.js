// ============================
// 🎬 VIDEO SYSTEM (iframe version)
// ============================

// Map anime → iframe embed links
const videos = {
  chainsaw: `<iframe width="560" height="315" src="https://www.youtube.com/embed/d6kBeJjTGnY" allowfullscreen></iframe>`,
  hxh: `<iframe width="560" height="315" src="https://www.youtube.com/embed/JMxlDSO9bOM" allowfullscreen></iframe>`,
  onepiece: `<iframe width="560" height="315" src="https://www.youtube.com/embed/AAEiOngOzIY" allowfullscreen></iframe>`
};

// Get anime from URL
function getAnimeFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("anime");
}

// Run when page loads
window.onload = function () {

  const anime = getAnimeFromURL();
  const videoFrame = document.getElementById("videoFrame");
  const finishBtn = document.getElementById("finishBtn");

  // Load correct video
  if (videos[anime]) {
    videoFrame.innerHTML = videos[anime];
  } else {
    videoFrame.innerHTML = "<p>Video not found</p>";
  }

  // Show "finished" button after delay (simulate watching)
  setTimeout(() => {
    finishBtn.style.display = "inline-block";
  }, 8000); // 8 seconds (you can increase this)

  // When user clicks finished
  finishBtn.onclick = function () {
    unlockCharacter();
  };

  // Restore progress
  if (localStorage.getItem(`videoCompleted_${anime}`) === "true") {
    unlockCharacter(true);
  };
};

// ============================
// 🔓 UNLOCK SYSTEM
// ============================

function unlockCharacter(skipAlert = false) {
  const btn = document.getElementById('unlockBtn');
  const status = document.getElementById('status');
  const anime = getAnimeFromURL();

  // Save unlocked characters
  let unlocked = JSON.parse(localStorage.getItem("unlockedCharacters")) || [];

  if (!unlocked.includes(anime)) {
    unlocked.push(anime);
    localStorage.setItem("unlockedCharacters", JSON.stringify(unlocked));
  }

  localStorage.setItem(`videoCompleted_${anime}`, "true");

  status.textContent = '✅ Character Unlocked!';

  // Only show alert if not restoring
  if (!skipAlert) {
    alert("🎉 You've unlocked a character!");
  }

  // AFTER alert → update button
  btn.disabled = false;
  btn.textContent = '🎨 Design Character';
  btn.classList.add('unlocked');

  btn.onclick = function () {
    window.location.href = `character.html?anime=${anime}`;
  };
}
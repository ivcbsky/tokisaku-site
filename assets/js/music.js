    /* ===============================
       Music Player
    =============================== */

    const audioPlayer = document.getElementById("audioPlayer");
    const playBtn = document.getElementById("playBtn");
    const nextBtn = document.getElementById("nextBtn");
    const musicTitle = document.getElementById("musicTitle");
    const musicStatus = document.getElementById("musicStatus");

    // 你需要创建目录：assets/music/ 并放入 mp3 文件
    const musicList = [
      { name: "Lo-fi Track 1", src: "assets/music/track1.mp3" },
      { name: "Lo-fi Track 2", src: "assets/music/track2.mp3" },
      { name: "Lo-fi Track 3", src: "assets/music/track3.mp3" }
    ];

    let currentIndex = 0;

    function loadMusic(index) {
      const track = musicList[index];
      audioPlayer.src = track.src;
      musicTitle.textContent = "🎧 当前歌曲：" + track.name;
      musicStatus.textContent = "状态：暂停";
    }

    function togglePlay() {
      if (!audioPlayer.src) loadMusic(currentIndex);

      if (audioPlayer.paused) {
        audioPlayer.play();
        musicStatus.textContent = "状态：播放中";
      } else {
        audioPlayer.pause();
        musicStatus.textContent = "状态：暂停";
      }
    }

    function nextMusic() {
      currentIndex = (currentIndex + 1) % musicList.length;
      loadMusic(currentIndex);
      audioPlayer.play();
      musicStatus.textContent = "状态：播放中";
    }

    playBtn.addEventListener("click", togglePlay);
    nextBtn.addEventListener("click", nextMusic);

    audioPlayer.addEventListener("ended", nextMusic);

    loadMusic(currentIndex);
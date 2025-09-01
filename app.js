
  const carousel = document.getElementById('carousel');
  const images = carousel.getElementsByTagName('img');
  const total = images.length;
  const audioPlayer = document.getElementById('player');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const radius = 300;
  let currentIndex = 0;
  function positionCarousel() {
    const angleStep = 360 / total;
    for(let i = 0; i < total; i++) {
      const angle = i * angleStep;
      images[i].style.transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`;
    }
  }
  function updateCarousel() {
    const angle = (360 / total) * currentIndex;
    carousel.style.transform = `translateZ(-${radius}px) rotateY(${-angle}deg)`;
  }
  function playAudioForIndex(index) {
    const track = images[index];
    const audioSrc = track.getAttribute('data-audio');
    const title = track.getAttribute('data-title');
    if(audioPlayer.src !== audioSrc) {
      audioPlayer.src = audioSrc;
    }
    audioPlayer.play();
    document.title = `${title} - Music Player`;
  }
  for(let i = 0; i < total; i++) {
    images[i].addEventListener('click', () => {
      if(currentIndex === i) {
        audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
      } else {
        currentIndex = i;
        updateCarousel();
        playAudioForIndex(i);
      }
    });
  }
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + total) % total;
    updateCarousel();
    playAudioForIndex(currentIndex);
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % total;
    updateCarousel();
    playAudioForIndex(currentIndex);
  });
  positionCarousel();
  updateCarousel();
  playAudioForIndex(currentIndex);
  const songList = document.getElementById("songList");
  for (let i = 0; i < total; i++) {
    const title = images[i].getAttribute("data-title");
    const listItem = document.createElement("div");
    listItem.className = "song-item";
    listItem.textContent = title;
    listItem.dataset.index = i;
    listItem.addEventListener("click", () => {
      currentIndex = parseInt(listItem.dataset.index);
      updateCarousel();
      playAudioForIndex(currentIndex);
      highlightActiveSong();
    });
    songList.appendChild(listItem);
  }
  function highlightActiveSong() {
    const allItems = songList.querySelectorAll(".song-item");
    allItems.forEach(item => item.classList.remove("active"));
    allItems[currentIndex].classList.add("active");
  }
  audioPlayer.addEventListener('play', highlightActiveSong);
  highlightActiveSong();

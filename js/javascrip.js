document.addEventListener("DOMContentLoaded", () => {
  const tileGrid = document.getElementById("tileGrid");
  if (!tileGrid) return;

  const images = [
    "./img/intro/Frame1.png",
    "./img/intro/Frame2.png",
    "./img/intro/Frame3.png",
    "./img/intro/Frame4.png",
    "./img/intro/Frame5.png",
    "./img/intro/Frame6.png",
    "./img/intro/Frame7.png",
    "./img/intro/Frame8.png",
    "./img/intro/Frame9.png"
  ];

  function drawTiles() {
    tileGrid.innerHTML = "";

    let cols, rows;
    if (window.innerWidth <= 400) {
      cols = 3; rows = 5;
    } else if (window.innerWidth <= 500) {
      cols = 3; rows = 4;
    } else if (window.innerWidth <= 700) {
      cols = 4; rows = 5;
    } else if (window.innerWidth <= 960) {
      cols = 5; rows = 4;
    } else if (window.innerWidth <= 1240) {
      cols = 6; rows = 4;
    } else {
      cols = 7; rows = 3;
    }

    // grid 설정
    tileGrid.style.display = "grid";
    tileGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    tileGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    tileGrid.style.gap = "5px";

    for (let i = 0; i < cols * rows; i++) {
      const img = images[i % images.length];
      const tile = document.createElement("div");
      tile.style.backgroundImage = `url('${img}')`;
      tile.style.backgroundSize = "cover";
      tile.style.backgroundPosition = "center";
      tile.style.transition = "opacity 0.5s ease";
      tileGrid.appendChild(tile);
    }
  }

  // 초기 렌더링
  drawTiles();

  // 리사이즈 시 반응형 재배치
  window.addEventListener("resize", () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(drawTiles, 250);
  });

  // 랜덤 이미지 전환
  setInterval(() => {
    const tiles = document.querySelectorAll("#tileGrid div");
    if (tiles.length === 0) return;
    const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
    const newImg = images[Math.floor(Math.random() * images.length)];

    randomTile.style.opacity = 0;
    setTimeout(() => {
      randomTile.style.backgroundImage = `url('${newImg}')`;
      randomTile.style.opacity = 1;
    }, 500);
  }, 2500);
});






function setupScrollTrigger() {
  // 기존 트리거 제거
  ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));

  const boxes = gsap.utils.toArray(".site_box");

  if (window.innerWidth > 400) {
    // 박스 오른쪽 밖에서 시작
    gsap.set(boxes, { right: "-100%" });

    gsap.timeline({
      scrollTrigger: {
        trigger: "#site",
        start: "top top",
        end: "+=" + boxes.length * 1000,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      }
    })
    .to(boxes, {
      right: (i) => `${i * -8}%`,
      opacity: 1,
      stagger: 1,
      ease: "power1.inOut"
    });
  } else {
    // 모바일: 모든 효과 해제
    ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    gsap.set(".site_box", {
      clearProps: "all", // transform, right, pin 등 초기화
      position: "relative",
      opacity: 1,
      right: "auto",
    });
  }
}


setupScrollTrigger();


window.addEventListener("resize", () => {
  clearTimeout(window.resizeTimer);
  window.resizeTimer = setTimeout(setupScrollTrigger, 300);
});






  // 탑버튼

$(document).ready(function(){
  $(".header_mnav").click(function(){
    $(".header_nav").toggleClass("open");
  });

  $(".header_nav ul li a").click(function(){
    if ($(window).width() <= 800) {
      $(".header_nav").removeClass("open");
    }
  });

  // 화면 리사이즈 시 초기화 (데스크탑 전환 시 강제 닫힘 방지)
  $(window).resize(function(){
    if ($(window).width() > 800) {
      $(".header_nav").removeClass("open");
    }
  });
});
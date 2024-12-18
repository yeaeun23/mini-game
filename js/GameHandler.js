export default class GameHandler {
  constructor(app) {
    this.app = app;
    this._status = "READY"; // READY → PLAYING ↔ FINISHED

    this.init();
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;

    switch (value) {
      case "READY":
        this.showReadyScreen();
        break;
      case "FINISHED":
        this.showFinishScreen();
        break;
    }
  }

  init() {
    // 준비 화면 요소
    this.readyScreen = document.querySelector(".ready-screen");
    this.titleImage = this.readyScreen.querySelector(".title-img");
    this.playBtn = this.readyScreen.querySelector(".play-img");

    // 시작 버튼 클릭 이벤트
    this.playBtn.addEventListener("click", () => {
      this.hideReadyScreen();
    });

    // 종료 화면 요소
    this.finishScreen = document.querySelector(".finish-screen");
    this.distanceText = this.finishScreen.querySelector(".distance");
    this.coinText = this.finishScreen.querySelector(".coin");
    this.replayBtn = this.finishScreen.querySelector(".replay-img");

    // 재시작 버튼 클릭 이벤트
    this.replayBtn.addEventListener("click", () => {
      this.hideFinishScreen();
    });

    // 초기 상태
    this.status = "READY";
  }

  showReadyScreen() {
    // 준비 화면 애니메이션
    gsap.to(this.titleImage, { scale: 1, rotation: 720, opacity: 1, duration: 0.5 });
    gsap.to(this.playBtn, { scale: 1, duration: 1, ease: "elastic.inOut(2, 0.5)", delay: 0.5 });
  }

  hideReadyScreen() {
    gsap.to(this.readyScreen, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
      onComplete: () => {
        this.status = "PLAYING";
      },
    });
  }

  showFinishScreen() {
    // 점수 텍스트
    this.distanceText.innerText = Math.floor(this.app.score.distCount) + "m";
    this.coinText.innerText = this.app.score.coinCount + " coin";

    // 종료 화면 애니메이션
    gsap.fromTo(
      this.finishScreen,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, pointerEvents: "all" }
    );
    gsap.fromTo(
      this.distanceText,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, delay: 1 }
    );
    gsap.fromTo(
      this.coinText,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, delay: 1.1 }
    );
    gsap.fromTo(
      this.replayBtn,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, rotation: 720, duration: 0.5, delay: 1.3 }
    );
  }

  hideFinishScreen() {
    gsap.fromTo(
      this.finishScreen,
      { opacity: 1 },
      { opacity: 0, duration: 0.1, pointerEvents: "none" }
    );

    // 상태 초기화
    this.status = "PLAYING";
    this.app.reset();
  }
}

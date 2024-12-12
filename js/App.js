import Background from "./Background.js";

export default class App {
  static canvas = document.querySelector("canvas");
  static ctx = App.canvas.getContext("2d");
  static dpr = devicePixelRatio > 1 ? 2 : 1;
  static fps = 60;
  static interval = 1000 / App.fps;
  static width = 1024; // 4:3 비율
  static height = 768;

  constructor() {
    this.backgrounds = [
      new Background({ img: document.querySelector("#bg3-img"), speed: -1 }), // 맨뒤
      new Background({ img: document.querySelector("#bg2-img"), speed: -2 }),
      new Background({ img: document.querySelector("#bg1-img"), speed: -4 }), // 맨앞
    ];

    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    App.canvas.width = App.width * App.dpr;
    App.canvas.height = App.height * App.dpr;
    App.ctx.scale(App.dpr, App.dpr);

    const width = innerWidth > innerHeight ? innerHeight * 0.9 : innerWidth * 0.9;

    App.canvas.style.width = width + "px";
    App.canvas.style.height = width * (3 / 4) + "px";
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);

      now = Date.now();
      delta = now - then;

      if (delta < App.interval) {
        return;
      }

      // 화면 지우기
      App.ctx.clearRect(0, 0, App.width, App.height);

      // 배경 그리기
      this.backgrounds.forEach((background) => {
        background.update();
        background.draw();
      });

      then = now - (delta % App.interval);
    };

    requestAnimationFrame(frame);
  }
}

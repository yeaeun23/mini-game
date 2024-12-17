import Background from "./Background.js";
import Coin from "./Coin.js";
import Player from "./Player.js";
import Wall from "./Wall.js";

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
    this.walls = [new Wall({ type: "SMALL" })];
    this.player = new Player();
    this.coins = [];

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

      // 벽 그리기
      for (let i = this.walls.length - 1; i >= 0; i--) {
        this.walls[i].update();
        this.walls[i].draw();

        // 사라진 벽 지우기
        if (this.walls[i].isOutside) {
          this.walls.splice(i, 1);
          continue;
        }

        // 다음 벽 생성
        if (this.walls[i].canGenerateNext) {
          this.walls[i].generateNext = true;

          const newWall = new Wall({ type: Math.random() > 0.3 ? "SMALL" : "BIG" });
          this.walls.push(newWall);

          // 코인 생성
          if (Math.random() < 0.5) {
            const x = newWall.x + newWall.width / 2;
            const y = newWall.y2 - newWall.gapY / 2;

            this.coins.push(new Coin(x, y));
          }
        }

        // 벽과 새 충돌 감지
        if (this.walls[i].isColliding(this.player.boundingBox)) {
          this.player.boundingBox.color = `rgba(255, 0, 0, 0.3)`;
        } else {
          this.player.boundingBox.color = `rgba(0, 0, 255, 0.3)`;
        }
      }

      // 새 그리기
      this.player.update();
      this.player.draw();

      // 코인 그리기
      for (let i = this.coins.length - 1; i >= 0; i--) {
        this.coins[i].update();
        this.coins[i].draw();

        // 사라진 코인 지우기
        if (this.coins[i].x + this.coins[i].width <= 0) {
          this.coins.splice(i, 1);
          continue;
        }

        // 코인과 새 충돌 감지
        if (this.coins[i].boundingBox.isColliding(this.player.boundingBox)) {
          console.log("코인과 충돌!");

          // 충돌한 코인 지우기
          this.coins.splice(i, 1);
        }
      }

      then = now - (delta % App.interval);
    };

    requestAnimationFrame(frame);
  }
}

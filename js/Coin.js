import App from "./App.js";

export default class Coin {
  constructor(x, y) {
    this.img = document.querySelector("#coin-img");

    // 코인 좌표
    this.x = x;
    this.y = y;

    // 코인 크기
    this.width = 50;
    this.height = 50;

    this.counter = 0;
    this.frameX = 0;
  }

  update() {
    // 스프라이트 이미지 조절
    if (++this.counter % 5 === 0) {
      this.frameX = ++this.frameX % 10;
    }

    // 코인 이동
    this.x -= 6;
  }

  draw() {
    App.ctx.drawImage(
      this.img,
      (this.img.width / 10) * this.frameX,
      0,
      this.img.width / 10,
      this.img.height,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }
}

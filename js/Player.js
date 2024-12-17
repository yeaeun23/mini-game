import App from "./App.js";

export default class Player {
  constructor() {
    this.img = document.querySelector("#bird-img");

    // 새 좌표
    this.x = App.width * 0.1;
    this.y = App.width * 0.5;

    // 새 크기 (스프라이트 이미지: 2096*96, 15개)
    this.width = 130;
    this.height = this.width * (96 / 140); // 2096÷15=140

    this.counter = 0;
    this.frameX = 0;
  }

  update() {
    // 스프라이트 속도 조절
    if (++this.counter % 2 === 0) {
      this.frameX = ++this.frameX % 15;
    }
  }

  draw() {
    App.ctx.drawImage(
      this.img,
      (this.img.width / 15) * this.frameX,
      0,
      this.img.width / 15,
      this.img.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

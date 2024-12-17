import App from "./App.js";
import BoundingBox from "./BoundingBox.js";

export default class Coin {
  constructor(x, y) {
    this.img = document.querySelector("#coin-img");

    // 코인 크기
    this.width = 50;
    this.height = 50;

    // 코인 좌표
    this.x = x - this.width / 2;
    this.y = y - this.height / 2;

    // 충돌 감지용 박스 생성
    this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);

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
    this.boundingBox.x = this.x;
  }

  draw() {
    App.ctx.drawImage(
      this.img,
      (this.img.width / 10) * this.frameX,
      0,
      this.img.width / 10,
      this.img.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    // this.boundingBox.draw();
  }
}

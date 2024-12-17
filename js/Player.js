import App from "./App.js";
import BoundingBox from "./BoundingBox.js";

export default class Player {
  constructor() {
    this.img = document.querySelector("#bird-img");

    // 새 크기 (스프라이트 이미지: 2096*96, 15개)
    this.width = 130;
    this.height = this.width * (96 / 140); // 2096÷15=140

    // 새 좌표
    this.x = App.width * 0.1;
    this.y = App.width * 0.5;

    // 충돌 감지용 박스 생성
    this.boundingBox = new BoundingBox(this.x + 10, this.y + 16, this.width - 20, this.height - 20);

    this.counter = 0;
    this.frameX = 0;

    this.vy = -10;
    this.gravity = 0.3;

    App.canvas.addEventListener("click", () => {
      this.vy -= 5;
    });
  }

  update() {
    // 스프라이트 이미지 조절
    if (++this.counter % 2 === 0) {
      this.frameX = ++this.frameX % 15;
    }

    // 새 떨어지게(중력)
    this.vy += this.gravity;
    this.y += this.vy;
    this.boundingBox.y = this.y + 16;
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

    // this.boundingBox.draw();
  }
}

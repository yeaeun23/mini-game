import App from "./App.js";
import BoundingBox from "./BoundingBox.js";
import { randomNumBetween } from "./utils.js";

export default class Wall {
  constructor(config) {
    this.img = document.querySelector("#wall-img");

    this.type = config.type;

    switch (this.type) {
      case "SMALL":
        this.sx = this.img.width * (0 / 30); // 자르기 시작할 X좌표
        this.sizeX = 9 / 30; // 자를 가로 크기 비율
        break;
      case "BIG":
        this.sx = this.img.width * (9 / 30);
        this.sizeX = 18 / 30;
        break;
    }

    // 벽 크기
    this.height = App.height;
    this.width = this.height * this.sizeX;

    // 위아래 벽 간격
    this.gapY = randomNumBetween(App.height * 0.2, App.height * 0.35);
    // 위아래 벽 X좌표
    this.x = App.width;
    // 위벽 Y좌표의 최소값: - this.height
    // 위벽 Y좌표의 최대값: App.height - this.gapY - this.height
    this.y1 = randomNumBetween(30, App.height - this.gapY - 30) - this.height; // png 여백 때문에 30
    // 아래벽 Y좌표
    this.y2 = this.y1 + this.height + this.gapY;

    // 다음 벽 생성여부
    this.generateNext = false;
    // 좌우 벽 간격
    this.gapNextX = App.width * randomNumBetween(0.6, 0.75);

    // 충돌 감지용 박스 생성
    this.boundingBox1 = new BoundingBox(
      this.x + 30,
      this.y1 + 30,
      this.width - 60,
      this.height - 60
    );
    this.boundingBox2 = new BoundingBox(
      this.x + 30,
      this.y2 + 30,
      this.width - 60,
      this.height - 60
    );
  }

  get isOutside() {
    return this.x + this.width < 0;
  }

  get canGenerateNext() {
    return !this.generateNext && this.x + this.width < this.gapNextX;
  }

  isColliding(target) {
    return this.boundingBox1.isColliding(target) || this.boundingBox2.isColliding(target);
  }

  update() {
    // 벽 이동
    this.x -= 6;
    this.boundingBox1.x = this.boundingBox2.x = this.x + 30;
  }

  draw() {
    App.ctx.drawImage(
      this.img,
      this.sx,
      0,
      this.img.width * this.sizeX,
      this.img.height,
      this.x,
      this.y1,
      this.width,
      this.height
    );

    App.ctx.drawImage(
      this.img,
      this.sx,
      0,
      this.img.width * this.sizeX,
      this.img.height,
      this.x,
      this.y2,
      this.width,
      this.height
    );

    // this.boundingBox1.draw();
    // this.boundingBox2.draw();
  }
}

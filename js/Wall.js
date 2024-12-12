import App from "./App.js";

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

    this.height = App.height;
    this.width = this.height * this.sizeX;
  }

  update() {}

  draw() {
    App.ctx.drawImage(
      this.img,
      this.sx,
      0,
      this.img.width * this.sizeX,
      this.img.height,
      0,
      0,
      this.width,
      this.height
    );
  }
}

import App from "./App.js";

export default class Background {
  constructor(config) {
    this.img = config.img;

    this.height = App.height;
    this.width = this.height * (this.img.width / this.img.height); // a:b=c:d

    this.leftPos = { x: 0, y: 0 }; // bg1 시작점
    this.rightPos = { x: this.width - 4, y: 0 }; // bg2 시작점 (png 여백 때문에 -4)

    this.speed = config.speed; // bg 이동 속도
  }

  update() {
    // bg1이 밖으로 완전히 사라지면
    if (this.leftPos.x + this.width < 0) {
      // bg1을 bg2 뒤로 이동 (무한 효과)
      this.leftPos.x = this.rightPos.x + this.width - 4;
    }
    // bg2이 밖으로 완전히 사라지면
    if (this.rightPos.x + this.width < 0) {
      // bg2을 bg1 뒤로 이동
      this.rightPos.x = this.leftPos.x + this.width - 4;
    }

    // bg 이동
    this.leftPos.x += this.speed;
    this.rightPos.x += this.speed;
  }

  draw() {
    App.ctx.drawImage(this.img, this.leftPos.x, this.leftPos.y, this.width, this.height); // bg1
    App.ctx.drawImage(this.img, this.rightPos.x, this.rightPos.y, this.width, this.height); // bg2
  }
}

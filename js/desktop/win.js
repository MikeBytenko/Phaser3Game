class win extends Phaser.Scene {
  constructor() {
    super("win");
  }
  init(data) {
    this.ImageID = data.id;
    this.imageFile = data.image;
    this.place = data.place;
    this.border = data.border;
  }

  preload() {
    this.load.image(this.place, `/assets/${this.place}.png`);
    this.load.image("playb", "/assets/plboy.png");
    this.load.image("gradient", "/assets/gradient.png");
    this.load.image("playNow", "/assets/playNow.png");
  }

  create() {

    const room = this.add
      .image(-400, 0, this.place)
      .setOrigin(0)
      .setScale(1.05);

    const girl = this.add.sprite(0, 500, this.ImageID).setScale(1);
    this.tweens.add({
      targets: girl,
      x: 310,
      duration: 750,
      ease: "Linear",
    });

    const button1 = this.add.sprite(150, 650, "button").setInteractive();
    const button2 = this.add.sprite(450, 650, "button").setInteractive();

    const border = this.add.sprite(this.border, 650, "border");

    const place1 = this.add.image(150, 650, "place1").setScale(0.95);
    const place2 = this.add.image(450, 650, "place2").setScale(0.95);

    const gameOptions = {
      initialTime: 60,
    };

    this.timeLeft = gameOptions.initialTime;

    const expCont = this.add.image(300, 50, "expCont");
    const expBar1 = this.add.sprite(expCont.x - 200, expCont.y, "expBar");
    const expBar2 = this.add.sprite(expCont.x - 67, expCont.y, "expBar");
    const expBar3 = this.add.sprite(expCont.x + 66, expCont.y, "expBar");
    const expBar = this.add.sprite(expCont.x + 199, expCont.y, "expBar");

    this.expMask = this.add.sprite(expBar.x - 95, expBar.y, "expBar");

    this.expMask.visible = false;

    expBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.expMask);

    this.gameTimer = this.time.addEvent({
      delay: 10,

      callback: () => {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
          this.timeLeft = 0;
        }

        let stepWidth =
          this.expMask.displayWidth / (1.4 * gameOptions.initialTime);
        if (this.timeLeft <= 0) {
          stepWidth = 0;
          this.time.addEvent.loop = false;
        }

        this.expMask.x += stepWidth;
      },
      callbackScope: this,
      loop: true,
    });

    this.input.once("pointerdown", () => {
      place1.destroy();
      place2.destroy();
      expCont.destroy();
      expBar.destroy();
      expBar1.destroy();
      expBar2.destroy();
      expBar3.destroy();
      border.destroy();
      button1.destroy();
      button2.destroy();

      girl.destroy();

      const playboy = this.add.sprite(1000, 450, "playb");
      this.tweens.add({
        targets: playboy,
        x: 420,
        duration: 750,
        ease: "Linear",
      });
      const honey = this.add.sprite(0, 500, this.ImageID);
      this.tweens.add({
        targets: honey,
        x: 200,
        duration: 750,
        ease: "Linear",
      });
      setTimeout(() => {
        let message = this.add.image(300, 500, "message1");
        this.sys.install("DialogModalPlugin");
        this.sys.dialogModal.init();
        this.sys.dialogModal.setText("You looking so beautiful!❤️", true);
        setTimeout(() => {
          this.tweens.add({
            targets: playboy,
            x: 410,
            duration: 750,
            ease: "Linear",
          });
          this.tweens.add({
            targets: honey,
            x: 210,
            duration: 750,
            ease: "Linear",
          });
          setTimeout(() => {
            this.add.image(300, 750, "gradient");
            this.add.image(300, 650, "playNow");
            this.input.once("pointerdown", () => {
              const url = "https://apps.apple.com/us/app/id1491717191";
              window.open(url);
            });
          }, 870);
        }, 750);
      }, 750);
    });
  }
}

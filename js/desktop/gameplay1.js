class gameplay1 extends Phaser.Scene {
  constructor() {
    super("gameplay1");
  }
  init(data) {
    this.ImageID = data.id;
    this.imageFile = data.image;
    this.border = data.border;
  }

  preload() {
    this.load.image("words", "/assets/Choose-your-bag.png");
    this.load.image(this.ImageID, `/assets/${this.imageFile}`);
    this.load.image("bag1", "/assets/bag1.png");
    this.load.image("bag2", "/assets/bag2.png");
    this.load.image("expBar", "/assets/expBar.png");
    this.load.image("expCont", "/assets/expContainer.png");

  }

  create() {
 
  
    const room = this.add.image(-400, -5, "room").setOrigin(0).setScale(1);

    const girl = this.add.sprite(0, 500, this.ImageID).setScale(1);
    this.tweens.add({
      targets: girl,
      x: 310,
      duration: 750,
      ease: "Linear",
    });

    this.add.sprite(150, 650, "button").setInteractive();

    this.add.sprite(450, 650, "button2").setInteractive();

    const border = this.add.sprite(this.border, 650, "border");

    const dress1 = this.add.image(150, 650, "dress1");
    const dress2 = this.add.image(450, 650, "dress2");

    const gameOptions = {
      initialTime: 60,
    };

    this.timeLeft = gameOptions.initialTime;
    const expCont = this.add.image(300, 50, "expCont");
    const expBar = this.add.sprite(expCont.x - 200, expCont.y, "expBar");

    this.expMask = this.add.sprite(expBar.x - 100, expBar.y, "expBar");

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
          this.expMask.displayWidth / (1.21 * gameOptions.initialTime);
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
      dress1.destroy();
      dress2.destroy();
      expCont.destroy();
      expBar.destroy();
      room.destroy();
      border.destroy();
      girl.destroy();
      this.add.sprite(-400, -5, "room").setOrigin(0).setScale(1);
      const graphics = this.add.graphics();

      graphics.fillStyle(0x000000, 0.5);
      graphics.fillRect(0, 0, 1000, 1000);
      graphics.setVisible(true);

      this.add.image(300, 50, "frame");

      this.add.image(300, 50, "words");

      this.add.sprite(310, 500, this.ImageID).setScale(1);

      const button = this.add.sprite(150, 650, "button").setInteractive();

      button.on("pointerover", function (event) {
        this.setTint(0xffefd5);
      });

      button.on("pointerout", function (event) {
        this.clearTint();
      });

      button.once("pointerdown", () =>
        this.scene.start("gameplay2", {
          id: `bag1${this.ImageID}`,
          image: `bag1${this.imageFile}`,
          border: 150,
          dings: this.ImageID.indexOf("dress1") !== -1 ? "ding1" : "ding2",
        })
      );

      const button2 = this.add.sprite(450, 650, "button").setInteractive();

      button2.on("pointerover", function (event) {
        this.setTint(0xffefd5);
      });

      button2.on("pointerout", function (event) {
        this.clearTint();
      });
      button2.once("pointerdown", () =>
        this.scene.start("gameplay2", {
          id: `bag2${this.ImageID}`,
          image: `bag2${this.imageFile}`,
          border: 450,
          dings: this.ImageID.indexOf("dress1") !== -1 ? "ding1" : "ding2",
        })
      );

      this.add.image(150, 650, "bag1");
      this.add.image(450, 650, "bag2");
    });
  }
}

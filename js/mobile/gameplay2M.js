class gameplay2M extends Phaser.Scene {
  constructor() {
    super("gameplay2M");
  }
  init(data) {
    this.ImageID = data.id;
    this.imageFile = data.image;
    this.border = data.border;
    this.dings = data.dings;
  }

  preload() {
    this.load.image(this.ImageID, `/assets/${this.imageFile}`);
    this.load.image(this.dings, `/assets/${this.dings}.png`);
    this.load.image("glasses", "/assets/glasses.png");
    this.load.image("words", "/assets/Choose-your-accessory.png");
  }

  create() {
    this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });

    const room = this.add.sprite(0, 0, "room");
    this.aGrid.placeAtIndex(55, room);
    Align.scaleToGameW(room, 2.7);

    const girl = this.add
      .sprite(-1000, this.aGrid.placeAtIndexY(70.2), this.ImageID)
      .setInteractive();
    Align.scaleToGameW(girl, 0.8);

    this.tweens.add({
      targets: girl,
      x: this.aGrid.placeAtIndexX(70.2),
      duration: 750,
      ease: "Linear",
    });

    const button = this.add.sprite(0, 0, "button");
    this.aGrid.placeAtIndex(90, button);
    Align.scaleToGameW(button, 0.4);

    const button2 = this.add.sprite(0, 0, "button").setInteractive();
    this.aGrid.placeAtIndex(95.8, button2);
    Align.scaleToGameW(button2, 0.4);

    const bag1 = this.add.image(0, 0, "bag1");
    this.aGrid.placeAtIndex(90, bag1);
    Align.scaleToGameW(bag1, 0.25);

    const bag2 = this.add.image(0, 0, "bag2");
    this.aGrid.placeAtIndex(95.8, bag2);
    Align.scaleToGameW(bag2, 0.28);

    const border = this.add.sprite(
      this.border,
      this.aGrid.placeAtIndexY(95.8),
      "border"
    );
    Align.scaleToGameW(border, 0.441);

    const gameOptions = {
      initialTime: 60,
    };

    this.timeLeft = gameOptions.initialTime;
    const expCont = this.add.image(0, 0, "expCont").setScale(1.3);
    this.aGrid.placeAtIndex(5, expCont);

    const expBar1 = this.add.sprite(0, 0, "expBar").setScale(1.3);
    this.aGrid.placeAtIndex(2.18, expBar1);
    const expBar2 = this.add.sprite(0, 0, "expBar").setScale(1.3);
    this.aGrid.placeAtIndex(4.09, expBar2);

    this.expMask = this.add
      .sprite(this.aGrid.placeAtIndexX(2.53), expBar2.y, "expBar")
      .setScale(1.3);

    this.expMask.visible = false;

    expBar2.mask = new Phaser.Display.Masks.BitmapMask(this, this.expMask);

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
      bag1.destroy();
      bag2.destroy();
      expCont.destroy();
      expBar1.destroy();
      expBar2.destroy();
      border.destroy();
      girl.destroy();

      const room = this.add.sprite(0, 0, "room");

      this.aGrid.placeAtIndex(55, room);
      Align.scaleToGameW(room, 2.7);

      const graphics = this.add.graphics();

      graphics.fillStyle(0x000000, 0.5);
      graphics.fillRect(0, 0, 10000, 10000);
      graphics.setVisible(true);

      const startgirl = this.add.sprite(0, 0, this.ImageID);
      this.aGrid.placeAtIndex(70.2, startgirl);
      Align.scaleToGameW(startgirl, 0.8);

      const frame = this.add.image(0, 0, "frame");
      this.aGrid.placeAtIndex(5, frame);
      Align.scaleToGameW(frame, 0.7);

      const words = this.add.image(0, 0, "words");
      this.aGrid.placeAtIndex(5, words);
      Align.scaleToGameW(words, 0.37);

      const button = this.add.sprite(0, 0, "button").setInteractive();
      this.aGrid.placeAtIndex(90, button);
      Align.scaleToGameW(button, 0.4);

      button.on("pointerover", function (event) {
        this.setTint(0xffefd5);
      });

      button.on("pointerout", function (event) {
        this.clearTint();
      });

      button.once("pointerdown", () =>
        this.scene.start("gameplay3M", {
          id: `glasses${this.ImageID}`,
          image: `glasses${this.imageFile}`,
          border: this.aGrid.placeAtIndexX(90),
          dings: this.ImageID.indexOf("dress1") !== -1 ? "ding1" : "ding2",
        })
      );

      const button2 = this.add.sprite(0, 0, "button").setInteractive();
      this.aGrid.placeAtIndex(95.8, button2);
      Align.scaleToGameW(button2, 0.4);

      button2.on("pointerover", function (event) {
        this.setTint(0xffefd5);
      });

      button2.on("pointerout", function (event) {
        this.clearTint();
      });
      button2.once("pointerdown", () =>
        this.scene.start("gameplay3M", {
          id: `dings${this.ImageID}`,
          image: `dings${this.imageFile}`,
          border: this.aGrid.placeAtIndexX(95.8),
          dings: this.dings,
        })
      );

      const glasses = this.add.image(0, 0, "glasses");
      this.aGrid.placeAtIndex(90, glasses);
      Align.scaleToGameW(glasses, 0.35);

      const accessory = this.add.image(0, 0, this.dings);
      this.aGrid.placeAtIndex(95.8, accessory);
      Align.scaleToGameW(accessory, 0.35);
    });
  }
}

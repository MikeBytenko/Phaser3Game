class wastedM extends Phaser.Scene {
  constructor() {
    super("wastedM");
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
    this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });

    const room = this.add.sprite(0, 0, this.place);
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

    const place1 = this.add.image(0, 0, "place1");
    this.aGrid.placeAtIndex(90, place1);
    Align.scaleToGameW(place1, 0.4);

    const place2 = this.add.image(0, 0, "place2");
    this.aGrid.placeAtIndex(95.8, place2);
    Align.scaleToGameW(place2, 0.4);

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
    const expBar3 = this.add.sprite(0, 0, "expBar").setScale(1.3);
    this.aGrid.placeAtIndex(6, expBar3);
    const expBar4 = this.add.sprite(0, 0, "expBar").setScale(1.3);
    this.aGrid.placeAtIndex(7.91, expBar4);

    this.expMask = this.add
      .sprite(this.aGrid.placeAtIndexX(6.35), expBar4.y, "expBar")
      .setScale(1.3);

    this.expMask.visible = false;

    expBar4.mask = new Phaser.Display.Masks.BitmapMask(this, this.expMask);

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
      place1.destroy();
      place2.destroy();
      expCont.destroy();
      expBar4.destroy();
      expBar1.destroy();
      expBar2.destroy();
      expBar3.destroy();
      border.destroy();
      button.destroy();
      button2.destroy();

      girl.destroy();

      const playboyy = this.add.sprite(0, 0, "playb");
      this.aGrid.placeAtIndex(76, playboyy);
      Align.scaleToGameW(playboyy, 1);
      this.tweens.add({
        targets: playboyy,
        x: this.aGrid.placeAtIndexX(73.7),
        duration: 750,
        ease: "Linear",
      });

      const honey = this.add.sprite(0, 0, this.ImageID);
      this.aGrid.placeAtIndex(66, honey);
      Align.scaleToGameW(honey, 0.8);
      this.tweens.add({
        targets: honey,
        x: this.aGrid.placeAtIndexX(67.5),
        duration: 750,
        ease: "Linear",
      });
      setTimeout(() => {
        let message = this.add.image(0, 0, "message1");
        this.aGrid.placeAtIndex(70.6, message);
        Align.scaleToGameW(message, 0.8);

        this.sys.install("DialogModalPlugin");
        this.sys.dialogModal.init();
        this.sys.dialogModal.setText(
          "Honey, you are amazing)(wasted map)",
          true
        );
        setTimeout(() => {
          this.tweens.add({
            targets: playboyy,
            x: this.aGrid.placeAtIndexX(72.2),
            duration: 750,
            ease: "Linear",
          });
          this.tweens.add({
            targets: honey,
            x: this.aGrid.placeAtIndexX(69),
            duration: 750,
            ease: "Linear",
          });
          setTimeout(() => {
            const gradient = this.add.image(0, 0, "gradient");
            this.aGrid.placeAtIndex(104, gradient);
            Align.scaleToGameW(gradient, 2.7);

            const playNow = this.add.image(0, 0, "playNow");
            this.aGrid.placeAtIndex(104, playNow);
            Align.scaleToGameW(playNow, 0.9);
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

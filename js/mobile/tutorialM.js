class tutorialM extends Phaser.Scene {
  // class SceneMain extends Phaser.Scene {
  constructor() {
    super("tutorialM");
  }

  preload() {}
  create() {
    this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
    let room = this.add.sprite(0, 0, "room");

    this.aGrid.placeAtIndex(55, room);
    Align.scaleToGameW(room, 2.7);

    const graphics = this.add.graphics();

    graphics.fillStyle(0x000000, 0.5);
    graphics.fillRect(0, 0, 10000, 10000);
    graphics.setVisible(true);

    const startgirl = this.add.sprite(0, 0, "startgirl");
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
      this.scene.start("gameplay1M", {
        id: "dress1Girl",
        image: "dress1Girl.png",
        border: this.aGrid.placeAtIndexX(90),
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
      this.scene.start("gameplay1M", {
        id: "dress2Girl",
        image: "dress2Girl.png",
        border: this.aGrid.placeAtIndexX(95.8),
      })
    );

    const dress1 = this.add.image(0, 0, "dress1");
    this.aGrid.placeAtIndex(90, dress1);
    Align.scaleToGameW(dress1, 0.28);

    const dress2 = this.add.image(0, 0, "dress2");
    this.aGrid.placeAtIndex(95.8, dress2);
    Align.scaleToGameW(dress2, 0.28);

    setTimeout(() => {
      const hend = this.add.sprite(1000, 2500, "hend");
      Align.scaleToGameW(hend, 0.4);

      this.tweens.add({
        targets: hend,
        x: this.aGrid.placeAtIndexX(97),
        y: this.aGrid.placeAtIndexY(99),
        duration: 1000,
        ease: "Linear",
      });
      setTimeout(() => {
        this.tweens.add({
          targets: hend,
          x: this.aGrid.placeAtIndexX(91),
          y: this.aGrid.placeAtIndexY(99),
          duration: 1000,
          ease: "Linear",
        });
        setTimeout(() => {
          this.tweens.add({
            targets: hend,
            x: this.aGrid.placeAtIndexX(97),
            y: this.aGrid.placeAtIndexY(99),
            duration: 1000,
            ease: "Linear",
          });
          setTimeout(() => {
            this.tweens.add({
              targets: hend,
              x: 1000,
              y: 2500,
              duration: 500,
              ease: "Linear",
            });
          }, 1200);
        }, 1200);
      }, 1200);
    }, 4000);
  }
  shutdown() {
    hend.shutdown();
  }
}

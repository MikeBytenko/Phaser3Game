class tutorial extends Phaser.Scene {
  // class SceneMain extends Phaser.Scene {
  constructor() {
    super("tutorial");
  }

  preload() {}
  create() {
    this.add.sprite(-400, -5, "room").setOrigin(0).setScale(1);
    const graphics = this.add.graphics();

    graphics.fillStyle(0x000000, 0.5);
    graphics.fillRect(0, 0, 1000, 1000);
    graphics.setVisible(true);

    this.add.image(300, 50, "frame");

    this.add.image(300, 50, "words");

    this.add.sprite(310, 500, "startgirl").setScale(1);

    const button = this.add.sprite(150, 650, "button").setInteractive();

    button.on("pointerover", function (event) {
      this.setTint(0xffefd5);
    });

    button.on("pointerout", function (event) {
      this.clearTint();
    });

    button.once("pointerdown", () =>
      this.scene.start("gameplay1", {
        id: "dress1Girl",
        image: "dress1Girl.png",
        border: 150,
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
      this.scene.start("gameplay1", {
        id: "dress2Girl",
        image: "dress2Girl.png",
        border: 450,
      })
    );

    this.add.image(150, 650, "dress1");
    this.add.image(450, 650, "dress2");

    setTimeout(() => {
      const hend = this.add.sprite(600, 1000, "hend");
      this.tweens.add({
        targets: hend,
        x: 500,
        y: 800,
        duration: 1000,
        ease: "Linear",
      });
      setTimeout(() => {
        this.tweens.add({
          targets: hend,
          x: 200,
          y: 800,
          duration: 1000,
          ease: "Linear",
        });
        setTimeout(() => {
          this.tweens.add({
            targets: hend,
            x: 500,
            y: 800,
            duration: 1000,
            ease: "Linear",
          });
          setTimeout(() => {
            this.tweens.add({
              targets: hend,
              x: 600,
              y: 1100,
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

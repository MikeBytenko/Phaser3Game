class introM extends Phaser.Scene {
  constructor() {
    super("introM");
  }
  preload() {
    this.load.plugin("DialogModalPlugin", "/dialog_plugin.js");
    this.load.image("room", "/assets/img-room.png");
    this.load.image("border", "/assets/border.png");
    this.load.image("message1", "/assets/message1.png");
    this.load.image("playb", "/assets/plboy.png");
    this.load.image("message2", "/assets/message2.png");
    this.load.image("startgirl", "/assets/coosegirl.png");
    this.load.image("words", "/assets/Choose-your-dress.png");
    this.load.image("frame", "/assets/choose.png");
    this.load.image("button", "/assets/button.png");
    this.load.image("button2", "/assets/button2.png");
    this.load.image("dress1", "/assets/dress1.png");
    this.load.image("dress2", "/assets/dress2.png");
    this.load.image("hend", "/assets/hendOfGode.png");
    this.load.audio("music", "/assets/audio/music.mp3");
  }
  create() {
    this.input.once("pointerdown", () => {
      this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
      this.input.once("pointerdown", () => {
        let music = this.sound.add("music");
        music.play();
        let room = this.add.sprite(0, 0, "room");

        this.aGrid.placeAtIndex(60, room);
        Align.scaleToGameW(room, 2.7);
        this.tweens.add({
          targets: room,
          x: this.aGrid.placeAtIndexX(50),
          duration: 750,
          ease: "Linear",
        });

        const playboyy = this.add.sprite(0, 0, "playb");
        this.aGrid.placeAtIndex(76, playboyy);
        Align.scaleToGameW(playboyy, 1);
        this.tweens.add({
          targets: playboyy,
          x: this.aGrid.placeAtIndexX(70.2),
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
            "Honey, tomorrow we will go on vacation✈️",
            true
          );

          setTimeout(() => {
            this.input.once(
              "pointerdown",
              () => {
                playboyy.destroy();
                message.destroy();

                this.tweens.add({
                  targets: room,
                  x: this.aGrid.placeAtIndexX(55),
                  duration: 750,
                  ease: "Linear",
                });
                this.sys.dialogModal.setText("", false);
                const startgirl = this.add.sprite(0, 0, "startgirl");
                this.aGrid.placeAtIndex(66, startgirl);
                Align.scaleToGameW(startgirl, 0.8);
                this.tweens.add({
                  targets: startgirl,
                  x: this.aGrid.placeAtIndexX(70.2),
                  duration: 750,
                  ease: "Linear",
                });

                message = this.add.image(0, 0, "message2");
                this.aGrid.placeAtIndex(70.6, message);
                Align.scaleToGameW(message, 0.8);

                this.sys.install("DialogModalPlugin");
                this.sys.dialogModal.init();
                this.sys.dialogModal.setText(
                  "Oh, I don't have much time to pack my things",
                  true
                );
                setTimeout(() => {
                  this.input.once("pointerdown", () =>
                    this.scene.start("tutorialM")
                  );
                }, 1000);
              },
              750
            );
          }, 750);
        });
      });
    });
  }
}

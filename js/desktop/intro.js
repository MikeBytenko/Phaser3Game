class intro extends Phaser.Scene {
  constructor() {
    super("intro");
  }
  preload() {
    this.load.plugin("DialogModalPlugin", "./dialog_plugin.js");
    this.load.image("room", "/assets/img-room.png");
    this.load.image("border", "/assets/border.png");
    this.load.image("message1", "/assets/message1.png");
    this.load.image("playb", "/assets/plb.png");
    this.load.image("message2", "/assets/message2.png");
    this.load.image("startgirl", "/assets/g1.png");
    this.load.image("words", "/assets/Choose-your-dress.png");
    this.load.image("frame", "/assets/choose.png");
    this.load.image("button", "/assets/button.png");
    this.load.image("dress1", "/assets/dress1.png");
    this.load.image("dress2", "/assets/dress2.png");
    this.load.image("hend", "/assets/hendOfGode.png");
    this.load.audio("music", "/assets/audio/music.mp3");
  }
  create() {
    this.input.once("pointerdown", () => {
      let music = this.sound.add("music");
      music.play();
      const room = this.add.sprite(-400, 0, "room").setOrigin(0).setScale(1);
      this.tweens.add({
        targets: room,
        x: -470,
        duration: 750,
        ease: "Linear",
      });

      const playboyy = this.add.sprite(1000, 500, "playb").setScale(1);
      this.tweens.add({
        targets: playboyy,
        x: 310,
        duration: 750,
        ease: "Linear",
      });

      setTimeout(() => {
        let message = this.add.image(300, 500, "message1");

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
                x: -400,
                duration: 750,
                ease: "Linear",
              });
              this.sys.dialogModal.setText("", false);
              const startgirl = this.add
                .sprite(0, 500, "startgirl")
                .setScale(1);
              this.tweens.add({
                targets: startgirl,
                x: 310,
                duration: 750,
                ease: "Linear",
              });
              // this.message1 = this.physics.add.staticGroup();
              message = this.add.image(300, 500, "message2");
              this.sys.install("DialogModalPlugin");
              this.sys.dialogModal.init();
              this.sys.dialogModal.setText(
                "Oh, I don't have much time to pack my things",
                true
              );
              setTimeout(() => {
                this.input.once("pointerdown", () =>
                  this.scene.start("tutorial")
                );
              }, 1000);
            },
            750
          );
        }, 750);
      });
    });
  }
}

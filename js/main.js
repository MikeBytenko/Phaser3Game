var isMobile = navigator.userAgent.indexOf("Mobile");
if (isMobile == -1) {
  isMobile = navigator.userAgent.indexOf("Tablet");
}
if (isMobile == -1) {
  var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 900,
    parent: "phaser-game",
    scene: [intro, tutorial, gameplay1, gameplay2, gameplay3, win, wasted],
  };
} else {
  var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "phaser-game",
    scene: [
      introM,
      tutorialM,
      gameplay1M,
      gameplay2M,
      gameplay3M,
      winM,
      wastedM,
    ],
  };
}
var game = new Phaser.Game(config);

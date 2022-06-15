var DialogModalPlugin = function (scene) {
  this.scene = scene;
  this.systems = scene.sys;
  this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });

  if (!scene.sys.settings.isBooted) {
    scene.sys.events.once("boot", this.boot, this);
  }
};

DialogModalPlugin.register = function (PluginManager) {
  PluginManager.register("DialogModalPlugin", DialogModalPlugin, "dialogModal");
};

var isMobile = navigator.userAgent.indexOf("Mobile");
if(isMobile == -1) {
DialogModalPlugin.prototype = {
  // called when the plugin is loaded by the PluginManager
  boot: function () {
    var eventEmitter = this.systems.events;
    eventEmitter.on("destroy", this.destroy, this);
  },

  //  Called when a Scene shuts down, it may then come back again later
  // (which will invoke the 'start' event) but should be considered dormant.
  shutdown: function () {
    if (this.timedEvent) this.timedEvent.remove();
    if (this.text) this.text.destroy();
  },

  // called when a Scene is destroyed by the Scene Manager
  destroy: function () {
    this.shutdown();
    this.scene = undefined;
  },

  // Initialize the dialog modal
  init: function (opts) {
    // Check to see if any optional parameters were passed
    if (!opts) opts = {};

    this.dialogSpeed = opts.dialogSpeed || 3;

    this.eventCounter = 0;
    this.visible = true;
    this.text;
    this.dialog;
  },

  // Slowly displays the text in the window to make it appear annimated
  _animateText: function () {
    this.eventCounter++;
    this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
    if (this.eventCounter === this.dialog.length) {
      this.timedEvent.remove();
    }
  },

  // Sets the text for the dialog window
  setText: function (text, animate) {
    // Reset the dialog
    this.eventCounter = 0;
    this.dialog = text.split("");
    if (this.timedEvent) this.timedEvent.remove();

    var tempText = animate ? "" : text;
    this._setText(tempText);

    if (animate) {
      this.timedEvent = this.scene.time.addEvent({
        delay: 30,
        callback: this._animateText,
        callbackScope: this,
        loop: true,
      });
    }
  },

  // Calcuate the position of the text in the dialog window
  _setText: function (text) {
    // Reset the dialog
    if (this.text) this.text.destroy();

    var x = 132;
    var y = 480;

    this.text = this.scene.make
      .text({
        x,
        y,
        text,
        style: {
          wordWrap: { width: 370 },
        },
      })
      .setFontSize(30)
      .setFontStyle("italic")
      .setFontFamily("Arial")
      .setColor("Black")
      .setAlign("center");
  },
};
} else {



  DialogModalPlugin.prototype = {
    
    // called when the plugin is loaded by the PluginManager
    boot: function () {
      var eventEmitter = this.systems.events;
      eventEmitter.on("destroy", this.destroy, this);
    },
  
    //  Called when a Scene shuts down, it may then come back again later
    // (which will invoke the 'start' event) but should be considered dormant.
    shutdown: function () {
      if (this.timedEvent) this.timedEvent.remove();
      if (this.text) this.text.destroy();
    },
  
    // called when a Scene is destroyed by the Scene Manager
    destroy: function () {
      this.shutdown();
      this.scene = undefined;
    },
  
    // Initialize the dialog modal
    init: function (opts) {
      // Check to see if any optional parameters were passed
      if (!opts) opts = {};
  
      this.dialogSpeed = opts.dialogSpeed || 3;
  
      this.eventCounter = 0;
      this.visible = true;
      this.text;
      this.dialog;
    },
  
    // Slowly displays the text in the window to make it appear annimated
    _animateText: function () {
      this.eventCounter++;
      this.text.setText(this.text.text + this.dialog[this.eventCounter - 1]);
      if (this.eventCounter === this.dialog.length) {
        this.timedEvent.remove();
      }
    },
  
    // Sets the text for the dialog window
    setText: function (text, animate) {
      // Reset the dialog
      this.eventCounter = 0;
      this.dialog = text.split("");
      if (this.timedEvent) this.timedEvent.remove();
  
      var tempText = animate ? "" : text;
      this._setText(tempText);
  
      if (animate) {
        this.timedEvent = this.scene.time.addEvent({
          delay: 30,
          callback: this._animateText,
          callbackScope: this,
          loop: true,
        });
      }
    },
  
    // Calcuate the position of the text in the dialog window
    _setText: function (text) {
      // Reset the dialog
      if (this.text) this.text.destroy();
  
      var x = this.aGrid.placeAtIndexX(2)
      var y = this.aGrid.placeAtIndexY(70)
  
  
      this.text = this.scene.make
        .text({
          x,
          y,
          text,
          style: {
            wordWrap: { width: this.aGrid.placeAtIndexX(4.9) },
          },
        })
        .setFontSize(43)
        .setFontStyle("italic")
        .setFontFamily("Arial")
        .setColor("Black")
        .setAlign("center");
    },
  };
}

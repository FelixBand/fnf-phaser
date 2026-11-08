const config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	antialias: true,
	disableContextMenu: true,
	backgroundColor: '#000000',
	fps: {
		target: 240,
	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	scene: [
		MainMenu,
		Transition
	]
};

var centerX = config.width / 2;
var centerY = config.height / 2;

var game = new Phaser.Game(config);
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
	scene: [MainMenu]
};

var game = new Phaser.Game(config);
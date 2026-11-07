class MainMenu extends Phaser.Scene {
	constructor() {
		super('MainMenu');
	}

	preload() {
		// see helpers.js
		makeXMLSprite(this, 'funkinLogo', 'logoBumpin');
		makeXMLSprite(this, 'gfTitle', 'gfDanceTitle');
	}

	create() {
		addAnimationByPrefix(this, 'gfTitle', 'idle', 'gfDance', 24, -1);

		const gfTitle = this.add.sprite(872, 370, 'gfTitle');
		gfTitle.play('idle');
	}
}
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
		addAnimationByPrefix(this, 'funkinLogo', 'bump', 'logo bumpin', 24, -1);

		const gfTitle = this.add.sprite(872, 370, 'gfTitle');
		gfTitle.play('idle');

		const funkinLogo = this.add.sprite(330, 250, 'funkinLogo');
		funkinLogo.play('bump');
	}
}
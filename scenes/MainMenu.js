class MainMenu extends Phaser.Scene {
	constructor() {
		super('MainMenu');
	}

	preload() {
		// see helpers.js
		makeXMLSprite(this, 'gfTitle', 'gfDanceTitle');
		makeXMLSprite(this, 'funkinLogo', 'logoBumpin');
		makeXMLSprite(this, 'titleEnter', 'titleEnter');
	}

	create() {
		addAnimationByPrefix(this, 'gfTitle', 'idle', 'gfDance', 24, -1);
		const gfTitle = this.add.sprite(872, 370, 'gfTitle');
		playAnim(gfTitle, 'idle');

		addAnimationByPrefix(this, 'funkinLogo', 'idle', 'logo bumpin', 24, -1);
		const funkinLogo = this.add.sprite(320, 251, 'funkinLogo');
		playAnim(funkinLogo, 'idle');

		addAnimationByPrefix(this, 'titleEnter', 'idle', 'ENTER IDLE', 24, -1);
		const titleEnter = this.add.sprite(839, 615, 'titleEnter');
		playAnim(titleEnter, 'idle');
		titleEnter.setTint(0x90d5ff)
	}

	update() {
		// console.log(this.time)
	}
}
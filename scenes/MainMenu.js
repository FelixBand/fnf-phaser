class MainMenu extends Phaser.Scene {
	constructor() {
		super('MainMenu');
	}

	preload() {
		// see helpers.js
		makeXMLSprite(this, 'gfTitle', 'gfDanceTitle');
		makeXMLSprite(this, 'funkinLogo', 'logoBumpin');
		makeXMLSprite(this, 'titleEnter', 'titleEnter');
		makeSprite(this, 'transition', 'transition');
	}

	create() {
		addAnimationByPrefix(this, 'gfTitle', 'idle', 'gfDance', 24, -1);
		this.gfTitle = this.add.sprite(872, 370, 'gfTitle');
		playAnim(this.gfTitle, 'idle');

		addAnimationByPrefix(this, 'funkinLogo', 'idle', 'logo bumpin', 24, -1);
		this.funkinLogo = this.add.sprite(320, 251, 'funkinLogo');
		playAnim(this.funkinLogo, 'idle');

		addAnimationByPrefix(this, 'titleEnter', 'idle', 'ENTER IDLE', 24, -1);
		addAnimationByPrefix(this, 'titleEnter', 'pressed', 'ENTER PRESSED', 24, -1);
		this.titleEnter = this.add.sprite(839, 615, 'titleEnter');
		playAnim(this.titleEnter, 'idle');
	}

	update(frame, delta) {
		this.titleEnter.setTint(Phaser.Display.Color.GetColor(0, ((Math.sin(this.time.now / 400) + 1) / 2) * 255, 255))

		if (this.input.keyboard.checkDown(
			this.input.keyboard.addKey('SPACE')
		)) {
			console.log('i fucken pressed spacebar')
			// Space is held
			playAnim(this.titleEnter, 'pressed')
		}
	}
}
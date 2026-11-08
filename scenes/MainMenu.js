let pressedEnter = false;

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
		if (!pressedEnter && (keyDown(this, 'ENTER') || keyDown(this, 'SPACE'))) {
			pressedEnter = true;
			playAnim(this.titleEnter, 'pressed')
			this.titleEnter.setTint(0xffffff)
		}

		if (!pressedEnter) {
			this.titleEnter.setTint(Phaser.Display.Color.GetColor( // rgb
				0, 
				((Math.sin(this.time.now / 400) + 1) / 2) * 255,
				205 + ((Math.sin(this.time.now / 400) + 1) / 2) * 50
			))
		}
	}
}
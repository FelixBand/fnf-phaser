let pressedEnter = false

const mainMenuItems = [
	'story_mode',
	'freeplay',
	'donate',
	'options'
]

let mainMenuItemCurSelection = 0
let mainMenuActive = false

function updateMainMenuSelection(scene, playSound = true) {
	for (let i = 0; i < mainMenuItems.length; i++) {
		const menuItem = scene['menuItem_' + mainMenuItems[i]] // for exmample, scene.menuItem_story_mode
		if (i === mainMenuItemCurSelection) {
			playAnim(menuItem, 'selected')
		} else {
			if (menuItem.anims.isPlaying && getCurrentAnimKey(menuItem) === menuItem.texture.key + 'selected') {
				playAnim(menuItem, 'idle')
			}
		}
	}
	if (playSound) {
		scene.sound.play('scrollMenu')
	}
}

function makeMainMenu(scene) {
	scene.menuBG = scene.add.sprite(centerX, centerY, 'menuBG')

	let menuItemSpacing = 150

	for (let i = 0; i < mainMenuItems.length; i++) {
		let yPos = (mainMenuItems.length - ((mainMenuItems.length/2) + (mainMenuItems.length - i))) * menuItemSpacing + centerY + (menuItemSpacing / 2)
		scene['menuItem_' + mainMenuItems[i]] = scene.add.sprite(centerX, yPos, 'menuItem_' + mainMenuItems[i])
		addAnimationByPrefix(scene, 'menuItem_' + mainMenuItems[i], 'selected', mainMenuItems[i] + ' selected', 24, -1)
		addAnimationByPrefix(scene, 'menuItem_' + mainMenuItems[i], 'idle', mainMenuItems[i] + ' idle', 24, -1)
	}
	mainMenuActive = true
}

class MainMenu extends Phaser.Scene {
	constructor() {
		super('MainMenu')
	}

	preload() {
		// see helpers.js
		makeXMLSprite(this, 'gfTitle', 'gfDanceTitle')
		makeXMLSprite(this, 'funkinLogo', 'logoBumpin')
		makeXMLSprite(this, 'titleEnter', 'titleEnter')
		makeSprite(this, 'menuBG', 'menuBG')

		this.load.audio('confirmMenu', 'assets/sounds/confirmMenu.ogg')
		this.load.audio('scrollMenu', 'assets/sounds/scrollMenu.ogg')

		for (let i = 0; i < mainMenuItems.length; i++) {
			makeXMLSprite(this, 'menuItem_' + mainMenuItems[i], 'mainmenu/menu_' + mainMenuItems[i])
		}
	}

	create() {
		addAnimationByPrefix(this, 'gfTitle', 'idle', 'gfDance', 24, -1)
		this.gfTitle = this.add.sprite(872, 370, 'gfTitle')
		playAnim(this.gfTitle, 'idle')

		addAnimationByPrefix(this, 'funkinLogo', 'idle', 'logo bumpin', 24, -1)
		this.funkinLogo = this.add.sprite(320, 251, 'funkinLogo')
		playAnim(this.funkinLogo, 'idle')

		addAnimationByPrefix(this, 'titleEnter', 'idle', 'ENTER IDLE', 24, -1)
		addAnimationByPrefix(this, 'titleEnter', 'pressed', 'ENTER PRESSED', 24, -1)
		this.titleEnter = this.add.sprite(839, 615, 'titleEnter')
		playAnim(this.titleEnter, 'idle')

	}

	update(frame, delta) {
		if (!pressedEnter && (keyDown(this, 'ENTER') || keyDown(this, 'SPACE'))) {
			pressedEnter = true
			playAnim(this.titleEnter, 'pressed')
			this.titleEnter.setTint(0xffffff)
			this.sound.play('confirmMenu')
			this.time.delayedCall(1000, () => {
				transition(this, {
					onCovered: () => {
						this.gfTitle.setVisible(false)
						this.funkinLogo.setVisible(false)
						this.titleEnter.setVisible(false)
						makeMainMenu(this)
						updateMainMenuSelection(this, false)
					}
				})
			})
		}

		if (!pressedEnter) {
			this.titleEnter.setTint(Phaser.Display.Color.GetColor( // rgb
				0, 
				((Math.sin(this.time.now / 400) + 1) / 2) * 255,
				205 + ((Math.sin(this.time.now / 400) + 1) / 2) * 50
			))
		}

		if (mainMenuActive) {
			if (keyJustPressed(this, 'DOWN') || keyJustPressed(this, 'S')) {
				mainMenuItemCurSelection += 1
				if (mainMenuItemCurSelection >= mainMenuItems.length) {
					mainMenuItemCurSelection = 0
				}
				updateMainMenuSelection(this)
			}
			if (keyJustPressed(this, 'UP') || keyJustPressed(this, 'W')) {
				mainMenuItemCurSelection -= 1
				if (mainMenuItemCurSelection < 0) {
					mainMenuItemCurSelection = mainMenuItems.length - 1
				}
				updateMainMenuSelection(this)
			}
		}
	}
}
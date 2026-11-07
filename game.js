const config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	pixelArt: false, // Anti-aliasing
	backgroundColor: '#000000',
	fps: {
		target: 240,
	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);

let imgDir = 'assets/images/'

// Awesome helper functions
	function makeXMLSprite(scene, tag, path) { // we're psych engine'ing the fuck outta this
		console.log("i did a thing:", path);

		scene.load.atlasXML(tag, imgDir + path + '.png', imgDir + path + '.xml');
	}

	function addAnimationByPrefix(scene, tag, animName, prefix, fps = 24, loops = true) {
		const frames = scene.textures.get(tag)
			.getFrameNames()
			.filter(name => name.startsWith(prefix))
			.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

		scene.anims.create({
			key: animName,
			frames: frames.map(frame => ({ key: tag, frame: frame })),
			frameRate: fps,
			repeat: loops
		});
	}
//

function preload() { // create assets here and actually add them to the game on create()
	makeXMLSprite(this, 'funkinLogo', 'logoBumpin');
	makeXMLSprite(this, 'gfTitle', 'gfDanceTitle');
	// console.log(this); // the fuck is "this"?? I'm new ;-; 
}

function create() {
    const gfTexture = this.textures.get('gfTitle');

    addAnimationByPrefix(this, 'gfTitle', 'idle', 'gfDance', 24, -1);

    const gfTitle = this.add.sprite(872, 370, 'gfTitle');
    gfTitle.play('idle');
}

function update() {
}
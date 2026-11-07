const imgDir = 'assets/images/';

function makeXMLSprite(scene, tag, path) {
	scene.load.atlasXML(tag, imgDir + path + '.png', imgDir + path + '.xml');
}

function addAnimationByPrefix(scene, tag, animName, prefix, fps = 24, loops = true) {
	const frames = scene.textures.get(tag)
		.getFrameNames()
		.filter(name => name.startsWith(prefix))
		.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

	scene.anims.create({
		key: animName,
		frames: frames.map(frame => ({ key: tag, frame })),
		frameRate: fps,
		repeat: loops
	});
}
const imgDir = 'assets/images/';

function makeSprite(scene, tag, path) {
    scene.load.image(tag, imgDir + path + '.png');
}

function makeXMLSprite(scene, tag, path) {
    scene.load.atlasXML(tag, imgDir + path + '.png', imgDir + path + '.xml');
}

function addAnimationByPrefix(
    scene,
    tag,
    animName,
    prefix,
    fps = 24,
    repeat = -1
) {
    const frames = scene.textures.get(tag)
        .getFrameNames()
        .filter(name => name.startsWith(prefix))
        .sort((a, b) => a.localeCompare(a, undefined, { numeric: true }));

    const key = tag + animName;

    // Avoid trying to create an animation that already exists
    if (scene.anims.exists(key)) {
        return;
    }

    scene.anims.create({
        key: key,
        frames: frames.map(frame => ({ key: tag, frame })),
        frameRate: fps,
        repeat: repeat
    });
}

function playAnim(sprite, animName) {
    const tag = sprite.texture.key;
    const key = tag + animName;

    sprite.play(key);
}

function keyDown(scene, key) {
    return scene.input.keyboard.checkDown(scene.input.keyboard.addKey(key))
}

function getRandom(min, max, decimals = 0) {
	const randomValue = Math.random() * (max - min) + min;
	return Number(randomValue.toFixed(decimals));
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function screenCenter(scene, sprite, axis = 'xy') {
    const centerX = scene.scale.width / 2;
    const centerY = scene.scale.height / 2;

    if (axis.includes('x')) {
        sprite.x = centerX;
    }

    if (axis.includes('y')) {
        sprite.y = centerY;
    }

    return sprite;
}

function transition(scene, { onCovered = () => {}, targetScene } = {}) {
    const transitionScene = scene.scene.get('Transition')

    const playTransition = () => {
        transitionScene.play('in', () => {
            onCovered()
            if (targetScene) {
                scene.scene.start(targetScene)
            }
            transitionScene.play('out', () => scene.scene.stop('Transition'))
        })
    }

    if (scene.scene.isActive('Transition')) {
        playTransition()
        return
    }

    transitionScene.events.once(Phaser.Scenes.Events.CREATE, playTransition)
    scene.scene.launch('Transition')
}
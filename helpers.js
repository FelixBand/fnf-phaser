const imgDir = 'assets/images/';

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
class Transition extends Phaser.Scene {
    constructor() {
        super('Transition')
    }

    preload() {
        makeSprite(this, 'transition', 'transition')
    }

    create() {
        this.transitionSprite = this.add.sprite(0, 0, 'transition')

        screenCenter(this, this.transitionSprite, 'x')

        this.transitionSprite.y = -this.transitionSprite.height / 2
    }

    play(direction, onComplete = () => {}) {
        if (direction === 'in') {
            this.transitionSprite.y = -this.transitionSprite.height / 2

            this.tweens.add({
                targets: this.transitionSprite,
                y: this.scale.height / 2,
                duration: 500,
                ease: 'Linear',
                onComplete
            })
        }

        if (direction === 'out') {
            this.transitionSprite.y = this.scale.height / 2

            this.tweens.add({
                targets: this.transitionSprite,
                y: this.transitionSprite.height,
                duration: 500,
                ease: 'Linear',
                onComplete
            })
        }
    }
}
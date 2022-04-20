/**
 * @extends Phaser.Scene
 */
export default class menu extends Phaser.Scene {

    constructor() {
        super({ key: 'menu' });
    }

    preload(){

    }

    create(text){
        this.input.keyboard.on('keyup', function (pointer) {
            this.scene.start('Map2');
        }, this);

        this.add.text(0, 0, text, {fontSize: '20px'});
    }
}
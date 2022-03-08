import Enemy from './enemy.js';
import Player from './player.js';

/**
 * @extends Phaser.Scene
 */
export default class menu extends Phaser.Scene {

    constructor() {
        super({ key: 'menu' });
    }

    preload(){}

    create(){
        this.input.keyboard.on('keyup', function (pointer) {
            this.scene.start('myMap');
        }, this);

        this.add.text(300, 200, 'Pulsa cualquier tecla para empezar', {fontSize: '20px'});
    }
}
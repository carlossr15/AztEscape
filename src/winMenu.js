import Enemy from './enemy.js';
import Player from './player.js';

/**
 * @extends Phaser.Scene
 */
export default class winMenu extends Phaser.Scene {

    constructor() {
        super({ key: 'winMenu' });
    }

    preload(){}

    create(){
        this.add.text(300, 200, 'Lo has conseguido, ¡Enhorabuena!', {fontSize: '20px'});
    }
}
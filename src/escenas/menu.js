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
        this.scene.start('intro');
        //this.scene.start('Map2');

        this.add.text(0, 0, text, {fontSize: '20px'});
    }
}

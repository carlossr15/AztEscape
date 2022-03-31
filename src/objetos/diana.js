export default class Diana extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y){
        super(scene, x, y, 'diana');
        this.meHanDado = false;
        this.setDepth(0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this,true);
        this.body.setSize(32,32);
    }

    destruir(){
        this.meHanDado = true;
        this.destroy();
    }

}
export default class PiedraMovil extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y){
        super(scene, x, y, 'piedraMovil');
        this.setScale(0.5,0.5);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
        this.body.setDrag(5000, 0);
        this.scene.add.layer(this);

        this.scene.physics.add.collider(this, this.scene.player);
        this.scene.physics.add.collider(this, this.scene.suelo);
    }

}
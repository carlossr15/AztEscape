export default class Diana extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, acciona){ //acciona es lo que activa
        super(scene, x, y, 'diana');
        this.meHanDado = false;
        this.setDepth(0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this,true);
        this.body.setSize(32,32);
        this.acciona = acciona;

        this.sonidoDiana = this.scene.sound.add('sonidoDiana', {volume: 1});

        this.anims.create({
            key: 'impacto-diana',
            frames: this.anims.generateFrameNames('diana', { frames: [1] }),
            frameRate: 3,
            repeat: 0
        });

    }

    impactar(){
        if(!this.meHanDado){
            this.play('impacto-diana');
            this.sonidoDiana.play();
            this.meHanDado = true;
        }
    }

    getAcciona(){
        return this.acciona;
    }

}
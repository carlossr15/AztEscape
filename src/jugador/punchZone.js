export default class PunchZone extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de la Plataforma
     * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
     * @param {Player} player Jugador del juego
     * @param {Phaser.GameObjects.Group} baseGroup Grupo en el que se incluirá la base creada por la plataforma
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     */
     
    constructor(scene, x, y, flip){
        super(scene, x, y, 'punch');
        this.scene.time.delayedCall(0.1, function(){
            this.destroy();
        }, [], this);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setSize(200,420);
        this.setScale(0.2,0.2);
        this.flipX = flip
        this.scene.physics.add.overlap(this, this.scene.enemies, (golpe, enemigo) => {
            enemigo.attack();
        });
        
        this.scene.anims.create({
            key: 'player-punch',
            frames: this.scene.anims.generateFrameNames('punch', { frames: [1, 2] }),
            frameRate: 1,
            repeat: -1
        });
        this.play('player-punch', true ); 
    }

    preUpdate() {

    }
  
}
  
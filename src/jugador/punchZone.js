export default class PunchZone extends Phaser.GameObjects.Zone {
  
    /**
     * Constructor de la Plataforma
     * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
     * @param {Player} player Jugador del juego
     * @param {Phaser.GameObjects.Group} baseGroup Grupo en el que se incluirá la base creada por la plataforma
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     */
     
    constructor(scene, x, y){
        super(scene, x, y);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setSize(200,420);
        this.setScale(0.2,0.2);
        this.scene.physics.add.overlap(this, this.scene.enemies, (golpe, enemigo) => {
            enemigo.attack();
        });
        this.scene.time.delayedCall(150, function(){
            this.destroy();
          }, [], this);
    }

    preUpdate() {

    }
  
}
  
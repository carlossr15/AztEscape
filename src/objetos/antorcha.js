/**
 * Clase para los objetos estrella que el jugador ha de recoger
 * Una estrella aparece sobre una base. Cuando el jugador la recoge, se crea 
 * una nueva estrella en otra posición, si el juego no ha terminado.
 * @extends Phaser.GameObjects.Sprite
 */
 export default class Antorcha extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de Star
     * @param {Sceme} scene Escena en la que aparece la estrella
     * @param {Base} base Objeto base sobre el que se va a dibujar la estrella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y) {
      super(scene, x, y, 'antorcha');
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.allowGravity = false;
      this.setDepth(0);
      //Establecemos tamaño y hitbox
      this.body.setSize(32,32);

      this.scene.anims.create({
        key: 'antorcha-move',
        frames: this.scene.anims.generateFrameNames('antorcha', { frames: [0, 1, 2] }),
        frameRate: 2,
        repeat: -1
      });

      let timer  = this.scene.time.addEvent( {
        delay: this.getRandom(30, 1500),
        callback: this.move,
        callbackScope: this
      });
      
    }

    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    move(){
        this.play('antorcha-move');
    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t,dt) {
        super.preUpdate(t,dt);

    }


  }
  
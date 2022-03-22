
import Star from './star.js';
import Enemy from './enemy.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Momia extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */

   //super(scene, x, y, 'momia');
  constructor(scene, x, y) {
    super(scene, x, y, 'momia');
    this.setDepth(0);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();

    //Establecemos tamaño y hitbox
    this.body.setSize(52,28);

    this.speed = 175;
    this.vida = 1;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.scene.add.layer(this);
    


    this.dir = true;

    this.setFlip(true, false);

  }

 
  checkGolpe()
  {
    //this.onLadder = false;
    if(this.scene.physics.overlap(this.scene.player, this))
    {
      this.scene.player.hurt();

      console.log("GOLPE MOMIA");
    }
  }

  seguir()
  {
    if(this.x < this.scene.player.x) //Jugador a la derecha
    {
        this.body.setVelocityX(this.speed);
    }
    else //Jugador a la izquierda
    {
        this.body.setVelocityX(-this.speed);
    }

  }

  preUpdate() {
    // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
    // no se podrá ejecutar la animación del sprite. 
    
    super.preUpdate();

    this.seguir()

    this.checkGolpe();
    this.anims.play('move-enemy', true);
  }
}

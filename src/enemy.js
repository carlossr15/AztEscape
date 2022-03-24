
import Star from './star.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Enemy extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy');
    this.setDepth(0);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();

    //Establecemos tamaño y hitbox
    this.body.setSize(52,28);

    this.speed = 100;
    this.vida = 1;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.scene.add.layer(this);
    this.scene.enemies.add(this);

    this.dir = true;

    this.setFlip(true, false);
    this.body.setVelocityX(this.speed);
    this.triggerTimer = this.scene.time.addEvent({
        callback: this.timerEvent,
        callbackScope: this,
        delay: 2500, // 1000 = 1 second
        loop: true
    });
    this.scene.enemies.add(this);

  }


  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
   timerEvent()
   {
     if(this.vida > 0){
        if(this.dir)
        {
            this.body.setVelocityX(-this.speed);
            this.dir = false;
            this.setFlip(false, false);
            //this.player.setFlip(true, false)
            console.log("izq");
        }
        else{
            this.body.setVelocityX(this.speed);
            this.dir = true;
            this.setFlip(true, false);

            console.log("der");
        }
        
      }
      
   }
 
  attack(){
    if(this.scene.player.cursors.space.isDown){
      this.hurt();
    }else{
      this.scene.player.hurt();
    }
      console.log("GOLPE");
  }

  hurt(){
    this.vida -=1;
    this.destroy();
  }

  preUpdate(t, d) {
    // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
    // no se podrá ejecutar la animación del sprite. 

    super.preUpdate(t, d);
    this.anims.play('move-enemy', true);
  }
}

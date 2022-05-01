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
        //delay: 2000,// + getRandom(0, 1000), // 1000 = 1 second
        delay: this.getRandom(2000, 3000),
        loop: true
    });
    this.scene.enemies.add(this);
    this.puñetazo = this.scene.sound.add('puñetazo', {volume: 1});

    this.scene.physics.add.collider(this, this.scene.suelo);
    
    this.scene.anims.create({
      key: 'move-enemy',
      frames: this.scene.anims.generateFrameNames('enemy', {frames: [0, 1]}),
      frameRate: 7,
      repeat: -1
    })
  }

  getRandom(min, max) {
    return Math.random() * (max - min) + min;
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
        }
        else{
            this.body.setVelocityX(this.speed);
            this.dir = true;
            this.setFlip(true, false);
        }
        
      }
      
   }
 
  attack(){
    if(this.scene.player.cursors.space.isDown && this.scene.player.atacando){
      this.hurt();      
      this.puñetazo.play();
    }/*else{
      this.scene.player.hurt();
    }*/
  }

  checkGolpe()
  {
    if(this.scene.physics.overlap(this.scene.player, this))
    {
      
      this.scene.player.hurt();

    }
  }

  hurt(){
    this.vida -=1;
    this.setFlip(false, true);
    this.body.setVelocityX(0);
    this.anims.stop();
    this.body.enable = false;
    this.setTintFill(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
    this.scene.time.delayedCall(800, function(){
      this.destroy();
    }, [], this);
    
  }

  preUpdate(t, d) {
    // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
    // no se podrá ejecutar la animación del sprite. 

    this.checkGolpe();

    super.preUpdate(t, d);
    this.anims.play('move-enemy', true);
  }
}

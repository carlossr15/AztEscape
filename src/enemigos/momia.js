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

  constructor(scene, x, y) {
    super(scene, x, y, 'momia');
    this.setDepth(0);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds();


    this.speed = 175;
    this.vida = 1;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.scene.add.layer(this);
    
    this.setSize(32,24);
    this.setScale(3,3);
    this.body.setSize(12,25);
    this.body.setOffset(5,7);


    this.dir = true;

    this.setFlip(true, false);
    this.puñetazo = this.scene.sound.add('puñetazo', {volume: 1});

    //Animaciones momia
    this.scene.anims.create({
      key: 'move-right-momia',
      frames: this.scene.anims.generateFrameNames('momia', { frames: [3, 4, 5] }),
      frameRate: 3,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'move-left-momia',
      frames: this.scene.anims.generateFrameNames('momia', { frames: [9, 10, 11] }),
      frameRate: 3,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'death-momia-left',
      frames: this.scene.anims.generateFrameNames('momia', { frames: [12, 13, 14, 18] }),
      frameRate: 3,
      repeat: 0
    });

    this.scene.anims.create({
      key: 'death-momia-right',
      frames: this.scene.anims.generateFrameNames('momia', { frames: [17, 16, 15, 18] }),
      frameRate: 3,
      repeat: 0
    });

  }

 hurt() {
  this.vida -=1;

  if(this.x < this.scene.player.x) //Jugador a la derecha
    this.play('death-momia-left');
  else//Jugador a la izquierda
    this.play('death-momia-right');
    
    
  this.body.enable = false;
  
 }
  
 checkGolpe()
  {
    if(this.scene.physics.overlap(this.scene.player, this))
    {
      this.scene.player.hurt();

      console.log("GOLPE MOMIA");
    }
  }

  attack(){
    if(this.scene.player.cursors.space.isDown && this.scene.player.atacando){
      this.hurt();
      this.puñetazo.play();
    }
  }

  seguir()
  {
    if(Math.round(Math.abs(this.x - this.scene.player.x) < 1500) && Math.round(Math.abs(this.x - this.scene.player.x) > 50) && this.vida > 0)
    {
      if(this.x < this.scene.player.x) //Jugador a la derecha
      {
        this.body.setVelocityX(this.speed);
        this.play('move-left-momia', true);
      }
      else//Jugador a la izquierda
      {
        this.body.setVelocityX(-this.speed);
        this.play('move-right-momia', true);
      }
    }
    else{
      this.body.setVelocityX(0);
    }

  }

  preUpdate(t, d) {
    // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
    // no se podrá ejecutar la animación del sprite. 
    
    super.preUpdate(t, d);

    this.seguir()

    this.checkGolpe();
  }
}

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
    //this.body.setSize(52,28);

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

    //this.scene.physics.add.collider(this, this.scene.suelo);

  }

 hurt()
 {
  this.vida -=1;
  this.destroy();
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

  attack(){
    if(this.scene.player.cursors.space.isDown && this.scene.player.atacando){
      this.hurt();
      this.puñetazo.play();
    }/*else{
      this.scene.player.hurt();
    }*/
      //console.log("GOLPE");
  }

  seguir()
  {
    //console.log(Math.round(Math.abs(this.x - this.scene.player.x)));
    if(Math.round(Math.abs(this.x - this.scene.player.x) < 1500))
    {
      if(this.x < this.scene.player.x) //Jugador a la derecha
      {
        this.body.setVelocityX(this.speed);
        this.play('move-left-momia', true);
        //console.log("momia sigue a la derecha");
      }
      else//Jugador a la izquierda
      {
        this.body.setVelocityX(-this.speed);
        this.play('move-right-momia', true);
        //console.log("momia sigue a la izquierda");


      }
    }
    else{
      //console.log("momia parada");
      this.body.setVelocityX(0);
     
      //console.log(this.x );
      //console.log(this.scene.player.x);
    }

  }

  preUpdate(t, d) {
    // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
    // no se podrá ejecutar la animación del sprite. 
    
    super.preUpdate(t, d);

    this.seguir()

    this.checkGolpe();
    //this.attack();
    //this.anims.play('move-enemy', true);
  }
}

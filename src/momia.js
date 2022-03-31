
import Star from './star.js';
import Enemy from './enemy.js';
//import * from 'mathjs'
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

  
  //Detectar dirección en la que esta mirando 
  //Si el ugador esta a X bloques en esa dirección, empezar a seguirle
  //tambien puede seguirle en otra dirección Y (Y<X) bloques
  
  /*
    Container con hitbox
    Mayor HB por delante que por la espalda
    Si el jugador toca la hitbox, seguirle hasta que se salga de la HB
    Si no detecta al jugador, patrullar de izquierda a derecha 
  
  
  */
  seguir()
  {
    //if(this.x < this.scene.player.x && math.abs(this.x, this.scene.player.x) < 100) //Jugador a la derecha
    if(this.x < this.scene.player.x) //Jugador a la derecha
    {
        this.body.setVelocityX(this.speed);
        this.play('move-left-momia', true);
        
    }
    //else if(this.x > this.scene.player.x && math.abs(this.x, this.scene.player.x) < 100) //Jugador a la izquierda
    else if(this.x > this.scene.player.x) //Jugador a la izquierda
    {
        this.body.setVelocityX(-this.speed);
        this.play('move-right-momia', true);


    }
    else if(this.x == this.scene.player.x)
    {
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

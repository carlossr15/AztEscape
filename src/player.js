
import Star from './star.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    
    this.score = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    //Establecemos tamaño y hitbox
    this.setSize(16,16);
    this.setScale(0.2,0.2);
    this.body.setSize(400,420);
    this.body.setOffset(0,175);

    
    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.speed = 300;
    this.jumpSpeed = -400;
    this.onLadder = false;
    
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.scene.add.layer(this);
    this.vida = 10;
    this.vidas = [];
    //this.scene.add.image(0, 500, 'vida').setDepth(1);
    //this.scene.add.image(200, 500, 'vida').setDepth(1);
    this.pintarVida()
  }

  pintarVida()  {
    if(this.vida >= -0.5)
    {
      for(let j = 0; j < this.vidas.length; j++)
      {
        this.vidas[j].destroy();
      }
      for(let i = 0; i < this.vida; i++)
      {
        this.vidas[i] = this.scene.add.image(31*i + 35, 30, 'vida').setDepth(1).setScrollFactor(0);
      }
    }else{
      this.scene.death();
    }
  }

  /**
   * El jugador ha recogido una estrella por lo que este método añade un punto y
   * actualiza la UI con la puntuación actual.
   */
  point() {
    this.score++;
    this.updateScore();
  }
  
  


  hurt()
  {
    this.vida = this.vida - 0.1;
    this.pintarVida();
  }

  eat(){
    this.vida = this.vida + 1;
    console.log("Vida" + this.vida);

    this.pintarVida();

  }

  
  /**
   * Actualiza la UI con la puntuación actual
   */
  updateScore() {
    this.label.text = 'Score: ' + this.score;
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);

    if(this.onLadder)
    {
      this.body.setAllowGravity(false);
      console.log("cayendo");
      this.body.setVelocityY(0);
      //this.body.setVelocityY(0);
    }
    else
    {
      this.body.setAllowGravity(true);
    }

    if(this.cursors.up.isDown && this.onLadder)
    {
      console.log("subiendo");

      this.body.setVelocityY(-300);

    }
    else
    {
      /*console.log("cayyendo");
      this.body.setVelocityY(100);*/
    }
    if(this.cursors.down.isDown && this.onLadder)
    {
      console.log("bajando");

      this.body.setVelocityY(250);

    }
    
    if (this.cursors.up.isDown && this.body.onFloor()) {
      this.body.setVelocityY(this.jumpSpeed);
      this.play('jump', true);
    }
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-this.speed);
      if (this.body.onFloor()){
        this.play('walk', true);
      }
    }
    else if (this.cursors.right.isDown) {
      this.body.setVelocityX(this.speed);
      if (this.body.onFloor()){
        this.play('walk', true);
      }
    }
    else {
      this.body.setVelocityX(0);
      this.play('stand', true);
    }
  }
  
}

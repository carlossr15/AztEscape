import Bullets from '../objetos/bullets.js';
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

    //Dirección a la que esta mirando
    this.lado = 'der';
    this.caminando = false;

    this.puedeGolpear = true;
    this.atacando = false;

    // Queremos que el jugador no se salga de los límites del mundo
    this.body.setCollideWorldBounds();
    this.speed = 300;
    this.jumpSpeed = -400;
    this.onLadder = false;
    this.invencible = false;
    this.llave = 0;
    this.llaves = [];
    
    // Esta label es la UI en la que pondremos la puntuación del jugador
    //this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.cursors = this.scene.input.keyboard.addKeys({
      up:Phaser.Input.Keyboard.KeyCodes.W,
      down:Phaser.Input.Keyboard.KeyCodes.S,
      left:Phaser.Input.Keyboard.KeyCodes.A,
      right:Phaser.Input.Keyboard.KeyCodes.D,
      space:Phaser.Input.Keyboard.KeyCodes.SPACE
    });
    
    this.scene.add.layer(this);
    this.vida = 10;
    this.vidas = [];
    this.bullets = new Bullets(this.scene);
    this.setDepth(1);
    //this.scene.add.image(0, 500, 'vida').setDepth(1);
    //this.scene.add.image(200, 500, 'vida').setDepth(1);
    this.pintarVida();
    this.pintarLlaves();

    //TextBox
    this.texto = this.scene.add.image(700, 600, 'textBox').setScale(0.8,0.8).setDepth(3).setScrollFactor(0);
    this.bgtexto = this.scene.add.image(445,600, 'bgtextBox').setScale(8,6.5).setSize(200,200).setDepth(1).setScrollFactor(0);
    this.MCtexto = this.scene.add.image(445,600, 'MCtextBox').setScale(0.55,0.55).setDepth(2).setScrollFactor(0);

    this.hideDialog();

    this.triggerTimer = this.scene.time.addEvent({
      callback: this.timerEventGolpe,
      callbackScope: this,
      delay: 2500, // 1000 = 1 second
      loop: true
    });


    this.salto = this.scene.sound.add('jump', {volume: 0.5});
    this.daño = this.scene.sound.add('daño', {volume: 1});
    this.extraLife = this.scene.sound.add('extraLife', {volume: 1});


    this.puñetazo = this.scene.sound.add('puñoaire', {volume: 1.5});
    
  }

  
  showDialog(){
    this.texto.setAlpha(1);
    this.bgtexto.setAlpha(1);
    this.MCtexto.setAlpha(1);
  }

  hideDialog(){
    this.texto.setAlpha(0);
    this.bgtexto.setAlpha(0);
    this.MCtexto.setAlpha(0);
  }

  timerEventGolpe()
  {
    //this.puedeGolpear = true;
  }


  pintarVida()  {
    console.log(this.vida);
    if(this.vida >= 1)
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


  hurt(){
    if(!this.invencible){
      this.vida = this.vida - 1;
      this.daño.play();
      this.pintarVida();
      this.invencible = true;

      this.scene.time.delayedCall(800, function(){
        this.invencible = false;
      }, [], this);
      this.body.setVelocityX(-100);
      this.body.setVelocityY(-100);
    }
  }

  eat(){
    this.vida = this.vida + 1;
    console.log("Vida" + this.vida);
    this.pintarVida();
    this.extraLife.play();
  }

  getTheKey(){
    this.llave += 1;
    this.pintarLlaves();
  }

  pintarLlaves()  {
    console.log(this.llave);
    for(let j = 0; j < this.llaves.length; j++)
    {
      this.llaves[j].destroy();
    }
    for(let i = 0; i < this.llave; i++)
    {
      this.llaves[i] = this.scene.add.image(31*i + 35, 70, 'llave').setDepth(1).setScrollFactor(0);
    }
  }

  abrirPuerta(){
    if(this.llave > 0){
      if(this.scene.physics.overlap(this.scene.puerta, this)){ //agrupar puertas
        console.log("ABRIR-PUERTA");
        this.llave -= 1;
        this.pintarLlaves();
        this.scene.puerta.abrirPuerta();
      }
    }
  }
 
  atacar()
  {
    
    this.puedeGolpear = false;
    this.atacando = true;
    this.puñetazo.play();
    this.scene.time.delayedCall(250, function(){
      //this.puedeGolpear = true;
      this.atacando = false;
    }, [], this);

    this.scene.time.delayedCall(500, function(){
      this.puedeGolpear = true;
    }, [], this);

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
    //console.log(this.onLadder);
    if(this.onLadder){
      this.body.setAllowGravity(false);
      console.log("cayendo");
      this.body.setVelocityY(0);
      this.body.setVelocityX(0);
      if(this.cursors.up.isDown || this.cursors.down.isDown) {
        //this.play('escalar', true);
      }else this.play('escalar-izq', true);
    }
    else
    {
      this.body.setAllowGravity(true);
    }

    if(this.cursors.up.isDown && this.onLadder)
    {
      console.log("subiendo");
      this.play('escalar', true);
      this.body.setVelocityY(-300);

    }
    
    if(this.cursors.down.isDown && this.onLadder)
    {
      console.log("bajando");
      this.play('escalar', true);
      this.body.setVelocityY(250);

    }

    this.scene.input.on('pointerdown', (pointer) =>{
      let p = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
      this.bullets.fireBullet(this.x, this.y, p.x, p.y);
    })
    
    if (this.cursors.up.isDown && this.body.onFloor()) {
      this.body.setVelocityY(this.jumpSpeed);
      this.salto.play();
    }
    if(!this.body.onFloor() && this.lado == 'izq' && !this.onLadder) 
      this.play('jump-left', true);
    else if(!this.body.onFloor() && this.lado == 'der' && !this.onLadder)
      this.play('jump-right', true);


    if (this.cursors.left.isDown) {
      this.lado = 'izq';
      this.body.setVelocityX(-this.speed);
      this.caminando = true;
    }
    else if (this.cursors.right.isDown) {
      this.lado = 'der';
      this.body.setVelocityX(this.speed);
      this.caminando = true;
    }
    else if(this.body.onFloor()){
      this.body.setVelocityX(0);
      this.caminando = false;
      //this.play('stand', true);
    }

    if(this.caminando && !this.onLadder)
    {
      if (this.body.onFloor() && this.lado == 'izq')
      {
        this.play('walk-left', true);
      }
      else if(this.body.onFloor() && this.lado == 'der')
      {
        this.play('walk-right', true);
      }
    }
    else
    {
      if (this.body.onFloor() && this.lado == 'izq')
      {
        this.play('stand-left', true);
      }
      else if(this.body.onFloor() && this.lado == 'der')
      {
        this.play('stand-right', true);
      }
    }
    

    if(this.cursors.space.isDown && this.puedeGolpear){
      console.log("ATACA");
      console.log(this.x + " " + this.y);
      this.atacar();
      /*if(this.cursors.left.isDown){
        this.play('attack-left', true);
        this.setSize(16,16);
        this.setScale(0.2,0.2);
        this.body.setSize(525,420);
        this.body.setOffset(0,175);
      }else {
        this.play('attack-right', true);
        this.setSize(16,16);
        this.setScale(0.2,0.2);
        this.body.setSize(525,420);
        this.body.setOffset(0,175);
      }*/
    }else{
      this.setSize(16,16);
      this.setScale(0.2,0.2);
      this.body.setSize(400,420);
      this.body.setOffset(0,175);
    }
    
    if(this.atacando){
      
      if(this.lado == 'izq'){
      this.play('attack-left', true);
      this.setSize(16,16);
      this.setScale(0.2,0.2);
      this.body.setSize(525,420);
      this.body.setOffset(0,175);
      }else {
      this.play('attack-right', true);
      this.setSize(16,16);
      this.setScale(0.2,0.2);
      this.body.setSize(525,420);
      this.body.setOffset(0,175);
      }
    }
    else{
      this.setSize(16,16);
      this.setScale(0.2,0.2);
      this.body.setSize(400,420);
      this.body.setOffset(0,175);
    }
  
    //this.atacando = false;
    this.abrirPuerta();
  }
  
}

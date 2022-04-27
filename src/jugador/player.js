import Bullets from '../objetos/bullets.js';
import Vida from '../objetos/vida.js';
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
    this.body.updateFromGameObject(); 

    

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
    this.onWallDoor= false;
    this.invencible = false;
    this.enPiedra = false;
    this.llave = 1;
    this.llaves = [];

    this.nota = 0;
    this.notas = [];
    
    // Esta label es la UI en la que pondremos la puntuación del jugador
    //this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.setControls();
    
    this.scene.add.layer(this);
    this.maxVida = 6;
    this.vida = 1;
    this.vidas = this.scene.add.group();
    console.log(this.scene.mapa)
    if(this.scene.mapa != 'mapa1') this.bullets = new Bullets(this.scene);
    this.setDepth(1);
    //this.scene.add.image(0, 500, 'vida').setDepth(1);
    //this.scene.add.image(200, 500, 'vida').setDepth(1);
    this.pintarVida();
    this.pintarLlaves();

    this.pintarNotas();


    this.notaText = this.scene.add.image(600, 350, 'notaText').setScrollFactor(0);
    this.hideNote();

    this.triggerTimer = this.scene.time.addEvent({
      callback: this.timerEventGolpe,
      callbackScope: this,
      delay: 2500, // 1000 = 1 second
      loop: true
    });


    this.salto = this.scene.sound.add('jump', {volume: 0.5});
    this.daño = this.scene.sound.add('daño', {volume: 1});
    this.extraLife = this.scene.sound.add('extraLife', {volume: 1});
    this.deathSound = this.scene.sound.add('deathSound', {volume: 1});

    this.puñetazo = this.scene.sound.add('puñoaire', {volume: 1.5});

    this.cargarAnimaciones();


    this.movement = true;
    
    this.cursors = this.scene.input.keyboard.addKeys({
      up:Phaser.Input.Keyboard.KeyCodes.W,
      down:Phaser.Input.Keyboard.KeyCodes.S,
      left:Phaser.Input.Keyboard.KeyCodes.A,
      right:Phaser.Input.Keyboard.KeyCodes.D,
      space:Phaser.Input.Keyboard.KeyCodes.SPACE,
      E:Phaser.Input.Keyboard.KeyCodes.E,
      ESC:Phaser.Input.Keyboard.KeyCodes.ESC
    });
  }

  cargarAnimaciones(){
    this.scene.anims.create({
      key: 'walk-right',
      frames: this.scene.anims.generateFrameNames('player', { frames: [0, 1, 2] }),
      frameRate: 10,
      repeat: -1
  });

  this.scene.anims.create({
      key: 'walk-left',
      frames: this.scene.anims.generateFrameNames('player', { frames: [10, 11, 12] }),
      frameRate: 10,
      repeat: -1
  });

  this.scene.anims.create({
      key: 'stand-right',
      frames: this.scene.anims.generateFrameNames('player', { frames: [0] }),
      frameRate: 10,
      repeat: -1
  });

  this.scene.anims.create({
      key: 'stand-left',
      frames: this.scene.anims.generateFrameNames('player', { frames: [10] }),
      frameRate: 10,
      repeat: -1
  });

  this.scene.anims.create({
      key: 'jump-right',
      frames: this.scene.anims.generateFrameNames('player', { frames: [4] }),
      frameRate: 10,
      repeat: -1
  });

  this.scene.anims.create({
      key: 'jump-left',
      frames: this.scene.anims.generateFrameNames('player', { frames: [13] }),
      frameRate: 10,
      repeat: -1
  });

  this.scene.anims.create({
      key: 'attack-right',
      frames: this.scene.anims.generateFrameNames('player', { frames: [15] }),
      frameRate: 10,
      repeat: -1
  });

  this.scene.anims.create({
      key: 'attack-left',
      frames: this.scene.anims.generateFrameNames('player', { frames: [16] }),
      frameRate: 10,
      repeat: -1
  });

  this.scene.anims.create({
      key: 'escalar',
      frames: this.scene.anims.generateFrameNames('player', { frames: [8, 9] }),
      frameRate: 10,
      repeat: -1
  });

  this.scene.anims.create({
      key: 'escalar-izq',
      frames: this.scene.anims.generateFrameNames('player', { frames: [8] }),
      frameRate: 10,
      repeat: -1
  });

  this.scene.anims.create({
      key: 'escalar-der',
      frames: this.scene.anims.generateFrameNames('player', { frames: [9] }),
      frameRate: 10,
      repeat: -1
  });

  this.scene.anims.create({
    key: 'muerte',
    frames: this.scene.anims.generateFrameNames('player', { frames: [18, 19] }),
    frameRate: 10,
    repeat: -1
  });

  }

  /********************/

  showNote(){
    this.notaText.setAlpha(1);
    this.scene.nota.leerNota();
    this.body.setVelocityX(0);
  }

  hideNote(){
    this.notaText.setAlpha(0);
  }

  getNotes(){
    this.nota += 1;
    this.pintarNotas();
  }

  pintarNotas()  {
    for(let j = 0; j < this.notas.length; j++)
    {
      this.notas[j].destroy();
    }
    for(let i = 0; i < this.nota; i++) {
      this.notas[i] = this.scene.add.image(1240 - 31*i, 30, 'nota').setDepth(1).setScrollFactor(0);
    }
  }

  /********************/

  setControls(value){
    this.movement = value;
  }

  pintarVida()  {
    console.log(this.vida);
    let beatRate = (2+(this.maxVida-this.vida)*0.75);
    let i = 0;
    if(this.vida >= 1)
    {
      this.vidas.clear(true, true);
      while(i <parseInt(this.vida/2))
      {
        console.log("vida: "+this.vida/2 + " i: " + i + " bucle 1");
        this.vidas.add(new Vida(this.scene, 31*i + 35, 30, 2, beatRate));
        i++;
      }
      if(this.vida%2){
        this.vidas.add(new Vida(this.scene,31*i+35, 30, 1, beatRate));
        i++;
      }
      while(i < this.maxVida/2)
      {
        console.log("vida: "+this.vida/2 + " i: " + i + " bucle 2");
        this.vidas.add(new Vida(this.scene, 31*i + 35, 30, 0, beatRate));
        i++;
      }
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

  triggerTimer = this.scene.time.addEvent({
    callback: this.blink,
    callbackScope: this,
    //delay: 2000,// + getRandom(0, 1000), // 1000 = 1 second
    delay: 100,
    loop: true
  });

  numBlink = 0;
  
  blink()
  {
    if(this.invencible && this.vida > 0)
    {
      
      if(this.numBlink < 10)
      {
        if(this.numBlink%2 == 0)
        {
          this.setAlpha(0.3);
       }
        else
        {
          this.setAlpha(1);
        }

        this.numBlink++;
      }  
      else
      {
        this.numBlink = 0;
      }
    }
    else{
      this.setAlpha(1);
    }
  }

  hurt(){
    if(!this.invencible && this.vida > 0){
      this.vida -= 1;
      this.daño.play();
      this.pintarVida();
      //(this.vidas.getChildren())[parseInt(this.vida/2)].reduce();
      this.invencible = true;

      //parpadea cuando le hacen daño
      this.numBlink = 0;
      this.blink();
      
      this.scene.time.delayedCall(800, function(){
        this.invencible = false;
      }, [], this);
      this.body.setVelocityX(this.lado === "der" ? -300 : 300);
      this.body.setVelocityY(-150);
    }
    if(this.vida == 0){
      this.vida -= 1;
      this.deathSound.play();
      this.movement = false;
      this.invencible = true;
      this.play('muerte');

      this.scene.time.delayedCall(2000, function(){
        this.scene.death();


      }, [], this);
    }
  }

  eat(){
    if(this.vida < this.maxVida){
      this.vida = this.vida + 1;
      console.log("Vida" + this.vida);
      this.pintarVida();
      this.extraLife.play();
    }
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
      if(this.scene.physics.overlap(this.scene.puerta, this)){
        console.log("ABRIR-PUERTA");
        this.llave -= 1;
        this.pintarLlaves();
        this.scene.puerta.abrirPuerta();
      }
    }
  }

  caerAlFondo(){
    if(this.y > 2500){
      //while(!this.body.onFloor()){
        this.x -= 200;
        this.y = 1000;
        this.hurt();
     // }
    }
  }
 
  atacar()
  {
   // this.scene.puente.bajarPuente();
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
  healing(){
    this.scene.cura.start();
    this.scene.time.delayedCall(750, function(){
      this.scene.cura.stop();
    }, [], this);
  }

  preUpdate(t,dt) {
    super.preUpdate(t,dt);
    if(this.movement){
      //console.log(this.onLadder);
      /*var allPiedras = this.scene.piedras.getChildren()
      for (var i = 0; i < this.scene.piedras.getLength(); i++){
        if (this.scene.physics.overlap(allPiedras[i], this)) {
          this.enPiedra = true;
          console.log(this.enPiedra)
        }
        else{
          this.enPiedra = false;
          console.log(this.enPiedra)
        } 
        
      }*/

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
        if(this.scene.mapa != 'mapa1') this.bullets.fireBullet(this.x, this.y, p.x, p.y);
      })
      
      if (this.cursors.up.isDown) {
        console.log("jj: " + this.enPiedra)
        if(this.body.onFloor()){
          this.body.setVelocityY(this.jumpSpeed);
          this.salto.play();
        } else if(this.enPiedra){
          this.body.setVelocityY(this.jumpSpeed);
          this.salto.play();
        }
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
      else if(this.body.onFloor() || this.enPiedra){
        this.body.setVelocityX(0);
        this.caminando = false;
        //this.play('stand', true);
      }

      if(this.caminando && !this.onLadder)
      {
        if ((this.body.onFloor() || this.enPiedra) && this.lado == 'izq')
        {
          this.play('walk-left', true);
        }
        else if((this.body.onFloor() || this.enPiedra) && this.lado == 'der')
        {
          this.play('walk-right', true);
        }
      }
      else
      {
        if ((this.body.onFloor() || this.enPiedra) && this.lado == 'izq')
        {
          this.play('stand-left', true);
        }
        else if((this.body.onFloor() || this.enPiedra) && this.lado == 'der')
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
      /****************/
      if(this.cursors.E.isDown && this.nota >= 1) this.showNote();
      else this.hideNote();
      /****************/

      if(this.cursors.ESC.isDown){
        //this.scene.scene.pause('Map1'); /// <----------------------------------------------------
        this.scene.scene.start('menuPausa');
        //this.scene.scene.setActive(true);
      }

      //this.atacando = false;
      this.abrirPuerta();
      this.caerAlFondo();
    }
    else{
      this.body.setVelocityX(0);
      this.anims.stop();
    }

  }
}



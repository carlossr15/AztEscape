import Arrows from "./flechas.js";

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
 export default class Esqueleto extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
  
     //this.load.spritesheet('esqueleto', 'assets/sprites/esqueleto.png', {frameWidth: 24, frameHeight: 32});

  
    constructor(scene, x, y) {
      super(scene, x, y, 'esqueleto');
      this.setDepth(0);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      // Queremos que el jugador no se salga de los límites del mundo
      this.body.setCollideWorldBounds();
  
      //Establecemos tamaño y hitbox
      this.body.setSize(90,90);
      this.atacando = false;
      this.speed = 200;
      this.vida = 2;
      // Esta label es la UI en la que pondremos la puntuación del jugador
      this.scene.add.layer(this);
      this.scene.enemies.add(this);
      //this.setRotation(Math.PI)
      //this.setScale(0.2, 0.2)

      this.arrows = new Arrows(this.scene);

      this.dir = true;
      this.invencible = false;
      this.tracking = false;

      this.setFlip(false, false)
      this.body.setVelocityX(this.speed);
      this.triggerTimer = this.scene.time.addEvent({
          callback: this.timerEvent,
          callbackScope: this,
          //delay: 2000,// + getRandom(0, 1000), // 1000 = 1 second
          delay: this.getRandom(4000, 5000),
          loop: true
      });

      this.triggerTimerRetroceso = this.scene.time.addEvent({
        callback: this.retroceder,
        callbackScope: this,
        //delay: 2000,// + getRandom(0, 1000), // 1000 = 1 second
        //delay: 100,
        loop: true
      });
     
      
      this.scene.enemies.add(this);
      this.puñetazo = this.scene.sound.add('puñetazo', {volume: 1});
  
      this.scene.physics.add.collider(this, this.scene.suelo);
      
      this.cargarAnimaciones();

      let timer = this.scene.time.addEvent( {
        delay: this.getRandom(2000, 4000),
        callback: this.shooting,
        callbackScope: this,
        loop: true
      });
     
    }

    cargarAnimaciones(){

      this.scene.anims.create({
        key: 'move-enemy',
        frames: this.scene.anims.generateFrameNames('esqueleto', {frames: [/*0,*/ 1, /*2,*/ 3]}),
        frameRate: 2,
        repeat: -1
      })

      this.scene.anims.create({
        key: 'disparar',
        frames: this.scene.anims.generateFrameNames('esqueleto', {frames: [4, 0]}),
        frameRate: 7,
        repeat: 1
      })

      this.scene.anims.create({
        key: 'morir',
        frames: this.scene.anims.generateFrameNames('esqueleto', {frames: [5]}),
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
       if(this.vida > 0 && !this.tracking){
          if(this.dir)
          {
          //this.anims.play('move-enemy', true);
            this.body.setVelocityX(-this.speed);
            this.dir = false;
            this.setFlip(true, false);
            this.player.setFlip(true, false);
          }
          else{
          //this.anims.play('move-enemy', true);
            this.body.setVelocityX(this.speed);
            this.dir = true;
            this.setFlip(false, false);

          }
          
        }
        
     }
  
      retroceder()
      {
        if(this.atacando)
        {
          this.anims.play('move-enemy', true);

            //console.log("Retrocediendo");
            if(this.x < this.scene.player.x) //Jugador a la derecha
            {
                this.body.setVelocityX(-this.speed);
            }
            else//Jugador a la izquierda
            {
                this.body.setVelocityX(this.speed);
            }

            this.scene.time.delayedCall(this.getRandom(500, 1200), function(){
                this.atacando = false;

            }, [], this);

        }
      }

      

    checkGolpe()
    {

        //CREAR FLECHA Y QUE LA LANCE

      if(this.scene.physics.overlap(this.scene.player, this))
      {
        this.scene.player.hurt();

         //Tras atacar retrocede un poco
         this.atacando = true;
        this.retroceder();
  
        //console.log("GOLPE Esqueleto");
      }
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
        if(this.invencible)
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
        
      if(!this.invencible){
        this.invencible = true;
        this.vida -=1;
        //console.log("Vida: " +this.vida)
      }
      this.scene.time.delayedCall(800, function(){
        this.invencible = false;

      }, [], this);

      if(this.vida <= 0)
        {
          console.log("muerte")
          this.stop();
          this.body.setVelocityX(0);
          
          this.body.enable = false;
          this.play("morir")
          this.scene.time.delayedCall(800, function(){
            this.destroy();
          }, [], this);
            
        }
        
      
    }

    vision(){
        //Check if player is in range of 100 pixels from the enemy and the enemy is looking to him
        //If the enemy is tracking the player, he will stop the movement and attack
        
        if(Math.round(Math.abs(this.x - this.scene.player.x) < 1500) && Math.round(Math.abs(this.x - this.scene.player.x) > 50))
        {
            this.tracking = true;
        }
        else
        {
            this.tracking = false;
        }

        if(this.x < this.scene.player.x) //Jugador a la derecha
        {
            if(this.dir)
            {
                this.setFlip(true, false);
            }
            else{
                this.setFlip(true, false);
            }
        }
        else //Jugador a la izquierda
        {
            if(this.dir)
            {
                this.setFlip(false, false);
            }
            else{
                this.setFlip(false, false);
            }
        }
        
        if(Math.round(Math.abs(this.x - this.scene.player.x) < this.getRandom(300, 550))) //Si el jugador esta a menos de distancia aleatoria para que parezca que se coloca
        {
            this.body.setVelocityX(0);
            
            //this.attack();
        }
        else{

            this.scene.time.delayedCall(this.getRandom(1000, 2000), this.follow(), [], this);
        }
    }

    follow()
    {
      if(this.x < this.scene.player.x) //Jugador a la derecha
      {
        this.anims.play('move-enemy', true);

          this.body.setVelocityX(this.speed);
      }
      else//Jugador a la izquierda
      {
        this.anims.play('move-enemy', true);

          this.body.setVelocityX(-this.speed);
      }
    }


    
    attack(){
      if(this.scene.player.cursors.space.isDown && this.scene.player.atacando){
        this.hurt();      
        this.puñetazo.play();
      }dddd
    }

    shooting(){
      if(this.vida > 0){
        if(Math.abs(this.x - this.scene.player.x) <= 600 && this.scene.player.vida > 0){          
          this.play('disparar', true)
          this.arrows.fireArrow(this.x, this.y, this.scene.player.x, this.scene.player.y);
        }
      }
    }
  
    getRandom(min, max) {
        return Math.random() * (max - min) + min;
      }

    preUpdate(t, d) {
      this.vision();
      this.checkGolpe();
      
      super.preUpdate(t, d);
    }
  }
  
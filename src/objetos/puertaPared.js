
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
 export default class PuertaPared extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de la Plataforma
     * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     */
    constructor(scene, x, y){
      super(scene, x, y, 'puertaPared');
      this.setScale(1, 1);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
      //this.body.setSize(400,420);
      this.abriendoCerrando = false;
      this.abierta = false;
      
      //this.scene.physics.add.collider(this.mediaPuerta, this.player, 44, 44);
      //this.scene.physics.add.collider(this, this.player);
      
    }
  
  
    abrirPuerta(){
       // this.y = 570;
        var aux = this.y - 100;
        while(this.y > aux){
          this.y -= 1;
        }
        this.scene.player.onWallDoor = true;
        this.abriendoCerrando = false;
        this.abierta = true;
        this.scene.cameras.main.shake(500, 0.01); //provoca un shake de la camara al abrir la puerta
      
    }

    cerrarPuerta(){
      // this.y = 570;
       var aux = this.y + 100;
       while(this.y < aux){
         this.y += 1;
       }
       this.scene.player.onWallDoor = false;
       this.abriendoCerrando = false;
       this.abierta = false;     
   }


    checkWallDoor()
    {
      //this.onLadder = false;
      if(this.scene.physics.overlap(this.scene.player, this)){
        this.scene.player.onWallDoor = true;
        console.log("puertaPared");
        if(!this.abriendoCerrando)
          this.abrirPuerta();
        this.abriendoCerrando = true;
      }
      else {
        this.scene.player.onWallDoor = false;
        if(this.abierta)
          this.cerrarPuerta();
      }
    }

    preUpdate() {
      // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
      // no se podrá ejecutar la animación del sprite. 
      
      super.preUpdate();
      this.scene.time.delayedCall(1000, function(){
        this.checkWallDoor();
      }, [], this);
    }
  
  
    
  }
  
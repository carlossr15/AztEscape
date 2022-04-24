
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
      this.scene.physics.add.collider(this, this.scene.player);
      this.body.setSize(0.5, 1);
      //this.scene.physics.add.collider(this.mediaPuerta, this.player, 44, 44);
      //this.scene.physics.add.collider(this, this.player);
      
    }
  
  
    abrirPuerta(){
      // this.y = 570;
      this.scene.cameras.main.centerOn(this.x, this.y);
      this.scene.cameras.main.stopFollow();
      this.scene.time.delayedCall(250, function(){
        var aux = this.y - 100;
        while(this.y > aux){
          this.y -= 1;
        }
        this.scene.player.onWallDoor = true;
        this.abriendoCerrando = false;
        this.abierta = true;
        this.body.enable = false;
        this.scene.cameras.main.shake(500, 0.01); //provoca un shake de la camara al abrir la puerta
      }, [], this);
      this.scene.time.delayedCall(2000, function(){
        this.scene.cameras.main.startFollow(this.scene.player, false, 0.05, 0.5);
      }, [], this);
    
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


    

    preUpdate() {
      // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
      // no se podrá ejecutar la animación del sprite. 
      
      super.preUpdate();
    }
  
  
    
  }
  
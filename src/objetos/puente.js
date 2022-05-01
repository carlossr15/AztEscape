/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
 export default class Puente extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de la Plataforma
     * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     */
    constructor(scene, x, y){
      super(scene, x, y, 'puente');
      this.setScale(1.2, 1.2);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
      this.setDepth(0);
      this.setOrigin(0, 1);
      this.bajar = false;
      this.body.setSize(10, 450, 50, 0);
      this.scene.physics.add.collider(this, this.scene.player);
    }
  
  
    /*bajarPuente(){
      while(this.angle < 45){
        this.angle += 0.001;
      }
    }*/
  
    preUpdate(){
      super.preUpdate();
      if(this.bajar && this.angle < -1){
        this.scene.cameras.main.centerOn(this.x, this.y - 110);
        this.scene.cameras.main.stopFollow();
        this.scene.cameras.main.shake(500, 0.01);
        this.angle += 1;
        this.scene.player.body.setVelocityX(0);
        if(this.angle <= 0)
          this.body.enable = false;
        
        this.scene.time.delayedCall(2000, function(){
          this.scene.cameras.main.startFollow(this.scene.player, false, 0.05, 0.5);
        }, [], this)
      }
    }

    setBajar(){
      this.bajar = true;
    }
  
    
  }
  
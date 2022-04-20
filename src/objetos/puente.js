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
      this.setScale(1, 1);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
      this.setDepth(0);
      
    }
  
  
    bajarPuente(){
        var pi = 3 * Math.PI / 2;
        while(pi < 2 * Math.PI){
            this.setRotation(pi);            
            this.scene.time.delayedCall(200, function(){
                pi += 0.2;
            }, [], this);
        }
    }
  
  
  
    
  }
  
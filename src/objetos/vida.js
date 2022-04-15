/**
 * Clase para los objetos estrella que el jugador ha de recoger
 * Una estrella aparece sobre una base. Cuando el jugador la recoge, se crea 
 * una nueva estrella en otra posición, si el juego no ha terminado.
 * @extends Phaser.GameObjects.Sprite
 */
 export default class Vida extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de Star
     * @param {Sceme} scene Escena en la que aparece la estrella
     * @param {Base} base Objeto base sobre el que se va a dibujar la estrella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y, amount, beatRate) {
        super(scene, x, y, 'vida');
        this.scene.add.existing(this);
        this.setDepth(1);
        this.setScrollFactor(0);
        this.cantidad = amount;
        //console.log(this);
        
    }
    
    reduce(){
        this.cantidad -=1;
    }

    preUpdate() {
      super.preUpdate();
      // NO FUNCIONA
        if(this.cantidad === 2)
            this.anims.play('full', true);
        else if(this.cantidad === 1)
            this.anims.play('half', true);
        else
            this.anims.play('zero', true);
    }
  }
  
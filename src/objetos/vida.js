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
        this.full = this.scene.anims.create({ 
            key: 'full', 
            frames: this.scene.anims.generateFrameNames('vida', { frames: [0, 3] }), 
            frameRate: 7,
            repeat: -1 
        });

        this.half = this.scene.anims.create({ 
            key: 'half', 
            frames: this.scene.anims.generateFrameNames('vida', { frames: [1, 4] }), 
            //frameRate: 7,
            repeat: -1 
        });
        
        this.empty = this.scene.anims.create({ 
            key: 'zero', 
            frames: this.scene.anims.generateFrameNames('vida', { frames: [2] }), 
            //frameRate: 5,
            repeat: -1 
        });
        this.full.frameRate = beatRate;
        this.half.frameRate = beatRate;
    }
    
    reduce(){
        this.cantidad -=1;
    }

    preUpdate(t, d) {
      super.preUpdate(t, d);
      // NO FUNCIONA
        if(this.cantidad === 2)
            this.anims.play('full', true);
        else if(this.cantidad === 1)
            this.anims.play('half', true);
        else
            this.anims.play('zero', true);
    }
  }
  
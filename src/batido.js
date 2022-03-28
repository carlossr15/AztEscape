/**
 * Clase para los objetos estrella que el jugador ha de recoger
 * Una estrella aparece sobre una base. Cuando el jugador la recoge, se crea 
 * una nueva estrella en otra posición, si el juego no ha terminado.
 * @extends Phaser.GameObjects.Sprite
 */
 export default class Batido extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de Star
     * @param {Sceme} scene Escena en la que aparece la estrella
     * @param {Base} base Objeto base sobre el que se va a dibujar la estrella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y) {
      super(scene, x, y, 'batido');
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this, true);
      
      //Establecemos tamaño y hitbox
    this.body.setSize(25,25);
    }

    checkCons()
  {
    //this.onLadder = false;
    if(this.scene.physics.overlap(this.scene.player, this))
    {
      this.scene.player.eat();
      console.log("COME");
      this.destroy();
    }
  }
  
    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate() {
      super.preUpdate();
      this.checkCons(); //el jugador coge el consumible
     
    }
  }
  
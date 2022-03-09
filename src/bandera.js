/**
 * Clase para los objetos estrella que el jugador ha de recoger
 * Una estrella aparece sobre una base. Cuando el jugador la recoge, se crea 
 * una nueva estrella en otra posición, si el juego no ha terminado.
 * @extends Phaser.GameObjects.Sprite
 */
export default class Bandera extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de Star
   * @param {Sceme} scene Escena en la que aparece la estrella
   * @param {Base} base Objeto base sobre el que se va a dibujar la estrella
   * @param {number} x coordenada x
   * @param {number} y coordenada y
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'bandera');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    
    //Establecemos tamaño y hitbox
    this.setSize(16,16);
    this.setScale(0.2,0.2);
    this.body.setSize(40,80);
    this.body.setOffset(295,280);
  }

  checkWin()
  {
    //this.onLadder = false;
    if(this.scene.physics.overlap(this.scene.player, this)){
      console.log("WIN");
      this.scene.win();
    }
  }
  /**
   * Redefinición del preUpdate de Phaser
   * @override
   */
  preUpdate() {
    super.preUpdate();
    this.checkWin()
  }
}

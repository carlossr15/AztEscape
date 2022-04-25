/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
 export default class Invisible extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {Phaser.GameObjects.Group} baseGroup Grupo en el que se incluirá la base creada por la plataforma
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, x, y, w, h){
    super(scene, x, y, 'invisible');
    this.setScale(1, 1);
    this.alpha = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.body.setSize(w,h);
    this.scene.physics.add.collider(this, this.scene.player);
  }


}
import Base from './base.js';
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Escalera extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {Phaser.GameObjects.Group} baseGroup Grupo en el que se incluirá la base creada por la plataforma
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, player, baseGroup, x, y) {
    super(scene, x, y, 'escalera');
    //this.setAngle(90);
    this.scene.add.existing(this);
    
    this.scene.physics.add.existing(this, true);
    new Base(scene, this, x, y, baseGroup);
   
    //this.scene.physics.add.collider(this, player);    
    this.scene.physics.add.overlap(this, player);

  }

  checkLadder()
  {
    //this.onLadder = false;
    if(this.scene.physics.overlap(this.scene.player, this))
    {
      this.scene.player.onLadder = true;

      //console.log("escalera");
    }
    else{
      this.scene.player.onLadder = false;
    }
  }

  preUpdate() {
    // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
    // no se podrá ejecutar la animación del sprite. 
    super.preUpdate();
    this.checkLadder();
  }

}

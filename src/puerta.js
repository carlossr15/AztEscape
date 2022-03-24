import Base from './base.js';
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Puerta extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {Phaser.GameObjects.Group} baseGroup Grupo en el que se incluirá la base creada por la plataforma
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, player, x, y){
    super(scene, x, y, 'puerta');
    this.setScale(1, 1);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    
    this.setDepth(0);
    

  }


  // preUpdate(t, d) {
  //   // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
  //   // no se podrá ejecutar la animación del sprite. 

  //   super.preUpdate(t, d);
  // }
  

  abrirPuerta(){
    this.play('abrir-puerta');
    console.log("PUERTA-ABIERTA");
    this.scene.time.delayedCall(650, function(){
      this.scene.add.image(474, 451.5, 'mediaPuerta').setDepth(1);
    }, [], this);

    //this.scene.physics.add.collider(mediaPuerta, this.player);
    
  }



  
}

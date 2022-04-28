export default class PlayerContainer extends Phaser.GameObjects.Container {
  
    /**
     * Constructor de la Plataforma
     * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
     * @param {Player} player Jugador del juego
     * @param {Phaser.GameObjects.Group} baseGroup Grupo en el que se incluirá la base creada por la plataforma
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     */
     
    constructor(scene, x, y, player, golpear){
        super(scene, x, y);
        this.player = player;
        this.golpear = golpear;
        
    }

    preUpdate() {
        
    }
  
}
  
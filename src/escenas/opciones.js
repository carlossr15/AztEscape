import { SimboloMasButton } from "./components/simbolo+Button.js";
import { SimboloMenosButton } from "./components/simbolo-Button.js";


/**
 * @extends Phaser.Scene
 */
export default class opciones extends Phaser.Scene {

    constructor() {
        super({ key: 'opciones' });
        this.simboloMasButton = new SimboloMasButton(this);
        this.simboloMenosButton = new SimboloMenosButton(this);

    }
    
    preload() {
        this.load.image('background', 'assets/sprites/background.png');

        this.load.image('sonido', 'assets/sprites/sonido.png');
        this.load.image('opciones', 'assets/sprites/opciones.png');
        this.load.image('controles', 'assets/sprites/controles.png');
        this.load.spritesheet('simboloMasButton', 'assets/sprites/simbolo+.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('simboloMenosButton', 'assets/sprites/simbolo-.png', {frameWidth: 50, frameHeight: 50});


    }
      
    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0);

        this.add.image(650, 100, 'opciones');
        this.add.image(350, 350, 'controles');
        this.add.image(950, 260, 'sonido');

        this.simboloMasButton.create();
        this.simboloMenosButton.create();


        this.input.keyboard.on('keydown-' + 'F', function (event){
            console.log("full");
                if (this.scene.game.scale.isFullscreen)
                    this.scene.game.scale.stopFullscreen();
                else
                    this.scene.game.scale.startFullscreen();
        })
    }
    
}

import { BackButton } from "./components/backButton.js";
import { SimboloMasButton } from "./components/simbolo+Button.js";
import { SimboloMenosButton } from "./components/simbolo-Button.js";


/**
 * @extends Phaser.Scene
 */
export default class opciones extends Phaser.Scene {

    constructor() {
        super({ key: 'opciones' });
        this.volumen = 5;
        this.simboloMasButton = new SimboloMasButton(this);
        this.simboloMenosButton = new SimboloMenosButton(this);
        this.backButton = new BackButton(this);
        this.nombre;
    }
    
    preload() {
        this.load.image('background', 'assets/sprites/background.png');

        this.load.image('sonido', 'assets/sprites/sonido.png');
        this.load.image('opciones', 'assets/sprites/opciones.png');
        this.load.image('controles', 'assets/sprites/controles.png');
        this.load.image('movimientoFlechas', 'assets/sprites/movimientoFlechas.png');

        this.load.spritesheet('simboloMasButton', 'assets/sprites/simbolo+.png', {frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('simboloMenosButton', 'assets/sprites/simbolo-.png', {frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('backButton', 'assets/sprites/atrasButton.png', {frameWidth: 100, frameHeight: 100});


    }

    init(nombre){
        this.nombre = nombre;
    }
      
    create() {
        this.mapa = 'opciones';
        this.scene.bringToTop();
        this.add.image(0, 0, 'background').setOrigin(0, 0);

        this.add.image(650, 100, 'opciones');
        this.add.image(350, 260, 'controles');
        this.add.image(950, 260, 'sonido');
        this.add.image(350, 500, 'movimientoFlechas');
        
        this.volumeText = this.add.text(937, 485, this.volumen).setFontSize(50).setColor("#FFFFFF").setBackgroundColor("#000000");


        this.simboloMasButton.create();
        this.simboloMenosButton.create();
        this.backButton.create(this.nombre);


        this.input.keyboard.on('keydown-' + 'F', function (event){
            console.log("full");
                if (this.scene.game.scale.isFullscreen)
                    this.scene.game.scale.stopFullscreen();
                else
                    this.scene.game.scale.startFullscreen();
        })
    }

    update(){
        this.volumeText.text = this.volumen;
        if(this.volumen == 10) this.volumeText.x = 920;
    }

    aumentarVolumen(){
        this.volumen += 1;
    }

    disminuirVolumen(){
        this.volumen -= 1;
    }

    
    
}

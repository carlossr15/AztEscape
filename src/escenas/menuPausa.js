import { BackButton } from './components/backButton.js';
import { ContinueButton } from './components/continueButton.js';
import { MapsButton } from './components/mapsButton.js';
import { SoundButton } from './components/soundButton.js';

/**
 * @extends Phaser.Scene
 */
export default class menuPausa extends Phaser.Scene {

    constructor() {
        super({ key: 'menuPausa' });
        this.soundButton = new SoundButton(this);
        this.mapsButton = new MapsButton(this);
        this.continueButton = new ContinueButton(this);
        this.backButton = new BackButton(this);
        this.nombre;
    }

    init(nombre){
        console.log("init: " + nombre)
        this.nombre = nombre;
    }    
      
    create() {
        this.mapa = 'menuPausa';
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.soundButton.create();
        this.mapsButton.create();
        this.continueButton.create();
        this.backButton.create(this.nombre);
        this.pause = this.add.image(650, 200, 'pausa');
        console.log("create: " + this.nombre)
        this.scene.bringToTop();

    }

    continuar(){
        this.scene.stop();
        this.scene.resume(this.nombre);
    }

}

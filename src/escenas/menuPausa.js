import { BackButton } from './components/backButton.js';
import { ExitButton } from './components/exitButton.js';
import { RestartButton } from './components/restartButton.js';
import { SoundButton } from './components/soundButton.js';

/**
 * @extends Phaser.Scene
 */
export default class menuPausa extends Phaser.Scene {

    constructor() {
        super({ key: 'menuPausa' });
        this.soundButton = new SoundButton(this);
        this.backButton = new BackButton(this);
        this.exitButton = new ExitButton(this);
        this.restartButton = new RestartButton(this);
        this.nombre;
    }

    init(nombre){
        this.nombre = nombre;
    }    
      
    create() {
        this.mapa = 'menuPausa';
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.soundButton.create();
        this.backButton.create(this.nombre);
        this.restartButton.create(this.nombre);
        this.exitButton.create();
        this.pause = this.add.image(650, 200, 'pausa');
        this.scene.bringToTop();
    }

    continuar(){
        this.scene.stop();
        this.scene.resume(this.nombre);
    }

    reiniciar(){
        this.scene.stop();
        this.scene.stop(this.nombre);
        this.scene.launch(this.nombre);
    }

}
    
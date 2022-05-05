import { ExitButton } from './components/exitButton.js';
import { RestartButton } from './components/restartButton.js';
import { SoundButton } from './components/soundButton.js';

/**
 * @extends Phaser.Scene
 */
export default class loseMenu extends Phaser.Scene {

    constructor() {
        super({ key: 'lose' });
        this.restartButton = new RestartButton(this);
        this.exitButton = new ExitButton(this);
        //this.soundButton = new SoundButton(this);
        this.nombre;
    }
    
    init(nombre){
        this.nombre = nombre;
    }
      
    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0)
        this.restartButton.create();
        this.exitButton.create();
        //this.soundButton.create();
        this.congratsImage = this.add.image(650, 200, 'hasPerdido');
    }

    reiniciar(){
        this.scene.stop();
        console.log("Reinicioa: " + this.nombre);
        this.scene.stop(this.nombre);
        this.scene.launch(this.nombre);
    }

}

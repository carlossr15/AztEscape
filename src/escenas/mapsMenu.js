import { BackButton } from './components/backButton.js';
import { ContinueButton } from './components/continueButton.js';
import { Level1Button } from './components/level1Button.js';
import { Level2Button } from './components/level2Button.js';
import { MapsButton } from './components/mapsButton.js';
import { SoundButton } from './components/soundButton.js';

/**
 * @extends Phaser.Scene
 */
export default class MapsMenu extends Phaser.Scene {

    constructor() {
        super({ key: 'mapsMenu' });
        this.soundButton = new SoundButton(this);
        this.lvl1Button = new Level1Button(this);
        this.lvl2Button = new Level2Button(this, false);
        this.backButton = new BackButton(this);
    }
    
    preload() {
        this.load.image('background', 'assets/sprites/background.png');

        this.load.spritesheet('soundButton', 'assets/sprites/sonidoButton.png', {frameWidth: 75, frameHeight: 75});
        this.load.spritesheet('lvl1Button', 'assets/sprites/lvl1Image.png', {frameWidth: 252, frameHeight: 207});
        this.load.spritesheet('lvl2Button', 'assets/sprites/lvl2Image.png', {frameWidth: 252, frameHeight: 213});
        this.load.spritesheet('backButton', 'assets/sprites/atrasButton.png', {frameWidth: 100, frameHeight: 100});

        this.load.image('mapsIm', 'assets/sprites/maps.png');
        this.load.image('lvl1Im', 'assets/sprites/lvl1.png');
        this.load.image('lvl2Im', 'assets/sprites/lvl2.png');

    }
      
    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.soundButton.create();
        this.lvl1Button.create();
        this.lvl2Button.create();
        this.backButton.create();
        this.mapsIm = this.add.image(650, 100, 'mapsIm');
        this.lvl1Im = this.add.image(380, 300, 'lvl1Im');
        this.lvl2Im = this.add.image(920, 300, 'lvl2Im');
        this.scene.bringToTop();
        console.log("Escena: "+ this.scene)
    }

    preUpdate(){
        if(this.scene.scene.mapa == "Map2") this.lvl2Button.desbloquear(); //COMPROBAR
    }

    continuar(){
        this.scene.resume("Map2");
        this.scene.stop();
    }

}

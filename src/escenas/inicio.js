
import { OptionsButton } from './components/optionsButton.js';
import { SoundButton } from './components/soundButton.js';
import { StartButton } from './components/startButton.js';

/**
 * @extends Phaser.Scene
 */
export default class inicio extends Phaser.Scene {

    constructor() {
        super({ key: 'inicio' });
        this.soundButton = new SoundButton(this); 
        this.startButton = new StartButton(this);
        this.optionsButton = new OptionsButton(this);
    
    }
    
    preload() {
        this.load.image('background', 'assets/sprites/background.png');
        this.load.image('preparado', 'assets/sprites/preparado.png');        
        this.load.spritesheet('soundButton', 'assets/sprites/sonidoButton.png', {frameWidth: 75, frameHeight: 75});
        this.load.spritesheet('soundButtonOff', 'assets/sprites/sonidoOff.png', {frameWidth: 75, frameHeight: 75});
        this.load.spritesheet('startButton', 'assets/sprites/empezarButton.png', {frameWidth: 600, frameHeight: 170});
        this.load.spritesheet('optionsButton', 'assets/sprites/opcionesButton.png', {frameWidth: 75, frameHeight: 75});

        this.load.audio('menuInicioMusic', 'assets/music/menuInicioMusic.mp3');

    }
      
    create() {
        this.musica = this.sound.add('menuInicioMusic', {volume: 0.2});
        this.musica.loop = true;
        this.musica.play();

        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.soundButton.create();
        this.startButton.create();
        this.optionsButton.create();
        this.pause = this.add.image(650, 200, 'preparado');
        this.input.keyboard.on('keydown-' + 'F', function (event){
            console.log("full");
                if (this.scene.game.scale.isFullscreen)
                    this.scene.game.scale.stopFullscreen();
                else
                    this.scene.game.scale.startFullscreen();
        })
    }
    
}

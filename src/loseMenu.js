import Enemy from './enemy.js';
import Player from './player.js';
import { RestartButton } from './components/restartButton.js';
import { MapsButton } from './components/mapsButton.js';

/**
 * @extends Phaser.Scene
 */
export default class loseMenu extends Phaser.Scene {

    constructor() {
        super({ key: 'lose' });
        this.restartButton = new RestartButton(this);
        this.mapsButton = new MapsButton(this);
    }
    
      
    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0)
        this.restartButton.create();
        this.mapsButton.create();
        this.congratsImage = this.add.image(650, 200, 'hasPerdido');
    }

}

import { RestartButton } from './components/restartButton.js';

/**
 * @extends Phaser.Scene
 */
export default class winMenu extends Phaser.Scene {

    constructor() {
        super({ key: 'congratulations' });
        this.restartButton = new RestartButton(this);
    }
    
      
    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0)
        this.restartButton.create();
        this.congratsImage = this.add.image(650, 200, 'congratulations');
    }

}

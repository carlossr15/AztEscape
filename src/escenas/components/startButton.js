import { Button } from './button.js';

export class StartButton extends Button {
  constructor(scene) {
    super(scene, 'startButton', 635, 450);
  }

  doClick() {
    this.relatedScene.scene.start('Map1');
    this.relatedScene.musica.stop();
  }

}
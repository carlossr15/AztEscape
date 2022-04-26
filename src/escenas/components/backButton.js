import { Button } from './button.js';

export class BackButton extends Button {
  constructor(scene) {
    super(scene, 'backButton', 80, 100);
  }

  doClick() {
    this.relatedScene.scene.stop();
  }

}
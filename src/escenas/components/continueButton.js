import { Button } from './button.js';

export class ContinueButton extends Button {
  constructor(scene) {
    super(scene, 'continueButton', 950, 400);
  }

  doClick() {
    //this.relatedScene.scene.stop();
    this.relatedScene.continuar();
  }

}
import { Button } from './button.js';

export class OptionsButton extends Button {
  constructor(scene) {
    super(scene, 'optionsButton', 80, 100);
  }

  doClick() {
    this.relatedScene.scene.start('opciones');
  }

}
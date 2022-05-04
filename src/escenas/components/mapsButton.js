import { Button } from './button.js';

export class MapsButton extends Button {
  constructor(scene) {
    super(scene, 'mapsButton', 400, 400);
  }

  doClick() {
    this.relatedScene.scene.stop("Map1");
    this.relatedScene.scene.start('Inicio');
  }

}
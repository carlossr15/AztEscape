import { Button } from './button.js';

export class RestartButton extends Button {
  constructor(scene) {
    super(scene, 'restartButton', 850, 400);
  }

  doClick() {
    this.relatedScene.scene.start('Map2'); //Cambiar a que vaya al mapa en el que esté
  }

}
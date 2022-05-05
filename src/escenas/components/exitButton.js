import { Button } from './button.js';

export class ExitButton extends Button {
  constructor(scene) {
    super(scene, 'exitButton', 650, 600);
  }

  doClick() {
    this.relatedScene.scene.stop();
    this.relatedScene.sound.pauseAll();
    this.relatedScene.scene.start('inicio'); //Cambiar a que vaya al mapa en el que esté
  }

}
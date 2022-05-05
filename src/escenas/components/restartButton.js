import { Button } from './button.js';

export class RestartButton extends Button {
  constructor(scene) {
    super(scene, 'reiniciarButton', 650, 400);
    this.nombre;
  }

  doClick() {
    this.relatedScene.sound.pauseAll();

    this.relatedScene.reiniciar();
  }

  create(nombre){
    super.create();
    this.nombre = nombre;
  }

}
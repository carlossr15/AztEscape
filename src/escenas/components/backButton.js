import { Button } from './button.js';

export class BackButton extends Button {
  constructor(scene, nombre) {
    super(scene, 'backButton', 80, 100);
    this.nombre = nombre;
  }

  doClick() {
    console.log("Bacccckk " + this.nombre)
    this.relatedScene.scene.stop();
    this.relatedScene.scene.resume(this.nombre);
  }

  create(nombre){
    super.create();
    this.nombre = nombre;
  }

}
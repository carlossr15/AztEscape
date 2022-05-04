import { Button } from './button.js';

export class OptionsButton extends Button {
  constructor(scene, nombre) {
    super(scene, 'optionsButton', 80, 100);
    this.nombre = nombre;
    console.log("Opciones nombre: " + nombre)
  }

  doClick() {
    this.relatedScene.scene.launch('opciones', this.nombre);
  }

  setNombre(nombre){
    this.nombre = nombre;
  }

  create(nombre){
    this.nombre = nombre;
    super.create();
  }

}
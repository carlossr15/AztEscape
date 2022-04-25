import { Button } from './button.js';

export class SoundButton extends Button {
  constructor(scene) {
    console.log("Ook")
    super(scene, 'soundButton', 1200, 100);
    this.encendido = true;
    this.sonido = 0;
  }

  doClick() {
   /* console.log("hola")
    if(this.encendido) {      
      this.relatedScene.sound.setVolume(0);
      this.encendido = false;
      
    }
    else {
      this.relatedScene.sound.setVolume(1);
      this.image = 'soundButton';
      this.encendido = true;
    }*/

    this.relatedScene.sound.setVolume(this.sonido);
    this.sonido += 0.2;
    if(this.sonido > 1) this.sonido = 0;
  }

}
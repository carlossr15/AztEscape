import { Button } from './button.js';

export class SimboloMenosButton extends Button {
  constructor(scene) {
    super(scene, 'simboloMenosButton', 850, 500);
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

    if(this.relatedScene.sound.volume > 0) this.relatedScene.sound.setVolume(this.relatedScene.sound.volume - 0.1);
  }

}
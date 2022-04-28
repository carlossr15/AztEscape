import { Button } from './button.js';

export class SimboloMasButton extends Button {
  constructor(scene) {
    super(scene, 'simboloMasButton', 1050, 500);
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

    if(this.relatedScene.sound.volume < 2){
      this.relatedScene.sound.setVolume(this.relatedScene.sound.volume + 0.2);
     // this.scene.volumen += 0.1;
      this.relatedScene.aumentarVolumen();

    } 
  }

}
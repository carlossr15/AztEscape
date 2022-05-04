import { Button } from './button.js';

export class SoundButton extends Button {
  constructor(scene) {
    super(scene, 'soundButton', 1200, 100);
    this.encendido = true;
    this.sonido = 1;


  }

  doClick() {
    if(this.sonido == 1){
     this.sonido = 0;
     this.ponerImage('soundButtonOff');
    }
    else {
      this.sonido = 1;
      this.ponerImage('soundButton');
    }
    this.relatedScene.sound.setVolume(this.sonido);
  }

}
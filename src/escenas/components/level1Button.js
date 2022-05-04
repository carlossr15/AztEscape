import { Button } from './button.js';

export class Level1Button extends Button {
  constructor(scene) {
    super(scene, 'lvl1Button', 380, 500);
  }

  doClick() {
    this.relatedScene.volume = 0;
    //this.relatedScene.scene.stop()

    this.relatedScene.scene.launch("Inicio");
  }

}
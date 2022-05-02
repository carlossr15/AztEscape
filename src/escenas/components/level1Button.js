import { Button } from './button.js';

export class Level1Button extends Button {
  constructor(scene) {
    super(scene, 'lvl1Button', 380, 500);
  }

  doClick() {
    this.relatedScene.scene.launch("Map1");
  }

}
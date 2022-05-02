import { Button } from './button.js';

export class Level2Button extends Button {
  constructor(scene, puedeLvl2) {
    super(scene, 'lvl2Button', 920, 500);
    this.puedeLvl2 = puedeLvl2;
  }

  doClick() {
    if(this.puedeLvl2) this.relatedScene.scene.launch("Map2");
  }

  desbloquear(){
    this.puedeLvl2 = true;
  }

}
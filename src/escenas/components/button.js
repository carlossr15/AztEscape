export class Button{
    constructor(scene, image, x, y) {
      this.image = image;
      this.relatedScene = scene;
      this.x = x;
      this.y = y;
    }
  
    create() {
      this.startButton = this.relatedScene.add.sprite(this.x, this.y, this.image).setInteractive();
      //this.startButton.setFrame(3);
      this.startButton.on('pointerover', () => {
        if(this.image == 'soundButtonOff') this.startButton.setFrame(3);
        else if(this.image == 'soundButton') this.startButton.setFrame(2);
        else this.startButton.setFrame(1);
      });
      this.startButton.on('pointerout', () => {
        if(this.image == 'soundButtonOff') this.startButton.setFrame(1);
        else if(this.image == 'soundButton') this.startButton.setFrame(0);
        else this.startButton.setFrame(0);      });
      this.startButton.on('pointerdown', () => {
        this.doClick();
      });
    }

    ponerImage(image){
      this.image = image;
    }

  }
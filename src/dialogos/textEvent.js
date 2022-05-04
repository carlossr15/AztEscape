export default class TextEvent extends Phaser.GameObjects.Zone {
  
    /**
     * Constructor de la Plataforma
     * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
     * @param {Player} player Jugador del juego
     * @param {Phaser.GameObjects.Group} baseGroup Grupo en el que se incluirá la base creada por la plataforma
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     */
     
    constructor(scene, x, y, w, h, texto, parar){
        super(scene, x, y);

        this.parar = parar;
        this.setScale(1, 1);
        this.setSize(w,h);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.moves = false;
        this.textoAMostrar = texto;
        this.textoPantalla = this.scene.add.text(590, 505, '', { font: "18px Arial", fill: "#000000" }).setDepth(100).setScrollFactor(0);

        this.line = [];

        this.wordIndex = 0;
        this.lineIndex = 0;

        this.wordDelay = 10;
        this.lineDelay = 400;
        
        //TextBox
        this.texto = this.scene.add.image(700, 600, 'textBox').setScale(0.8,0.8).setDepth(3).setScrollFactor(0);
        this.bgtexto = this.scene.add.image(445,600, 'bgtextBox').setScale(8,6.5).setSize(200,200).setDepth(1).setScrollFactor(0);
        this.MCtexto = this.scene.add.image(445,600, 'MCtextBox').setScale(0.55,0.55).setDepth(2).setScrollFactor(0);

        this.hideDialog();
    }
  
    mostrar(){
        if(this.parar){
            this.scene.player.setControls(false);
        }
        this.showDialog();
        this.body.setEnable(false);
        this.nextLine();
    }
  
    showDialog(){
        this.texto.setAlpha(1);
        this.bgtexto.setAlpha(1);
        this.MCtexto.setAlpha(1);
    }
    
    hideDialog(){
        if(this.parar){
            this.scene.player.setControls(true);
        }
        this.texto.setAlpha(0);
        this.bgtexto.setAlpha(0);
        this.MCtexto.setAlpha(0);
    }

    nextLine(){
        if (this.lineIndex === this.textoAMostrar.length)
        {
            this.scene.time.addEvent({
                delay: this.lineDelay*8,
                callback: this.clearText,
                callbackScope: this,
                repeat: 0
            });
            return;
        }
        //  Split the current line on spaces, so one word per array element
        this.line = this.textoAMostrar[this.lineIndex].split('');
    
        //  Reset the word index to zero (the first word in the line)
        this.wordIndex = 0;
    
        //  Call the 'nextWord' function once for each word in the line (line.length)
        //this.scene.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);
        this.scene.time.addEvent({
            delay: this.wordDelay*2,
            callback: this.nextWord,
            callbackScope: this,
            repeat: this.line.length
        });
        //this.scene.time.delayedCall(this.wordDelay, this.nextWord, [], this);

        //  Advance to the next line
        this.lineIndex++;
    
    }

    nextWord() {

        //  Add the next word onto the text string, followed by a space
        if (this.wordIndex !== this.line.length)
        {
            this.textoPantalla.text = this.textoPantalla.text.concat(this.line[this.wordIndex]);
        }
        //  Advance the word index to the next word in the line
        this.wordIndex++;

        //  Last word?
        if (this.wordIndex === this.line.length)
        {
            //  Get the next line after the lineDelay amount of ms has elapsed
            //this.scene.time.events.add(this.lineDelay, this.nextLine, this);
            this.scene.time.addEvent({
                delay: this.lineDelay*2,
                callback: this.nextLine,
                callbackScope: this,
                repeat: 0
            });
        }

    }

    clearText(){
        this.hideDialog();
        this.textoPantalla.text = "";
        this.destroy();
    }

    preUpdate() {

    }
  
}
  
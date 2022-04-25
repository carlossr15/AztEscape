/**
 * Escena de fin de juego. Cuando se han recogido todas las estrellas, se presenta un
 * texto que indica que el juego se ha acabado.
 * Si se pulsa cualquier tecla, se vuelve a iniciar el juego.
 */
 export default class introScene extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
      super({ key: 'intro' });
    }
  
    preload ()
    {
        this.load.video('videointro', 'assets/video/intro.mp4', 'loadeddata', false, false);
    }
    /**
     * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
     */
    create() 
    {

        this.input.keyboard.on('keyup', function (pointer) {

            this.scene.start('Map1');
        }, this);

        let vid = this.add.video(640, 360, 'videointro');
        //Adjust vid size to the center of the screen
        /*vid.setScale(0.5);
        vid.setOrigin(0,0);*/
        //vid.setSize(995, 559.688);
        vid.setScale(0.68);
        vid.play(true);
        vid.setLoop(false);
        // Prevents video freeze when game is out of focus (i.e. user changes tab on the browser)
        vid.setPaused(false);

        //after the video end, start the next scene (Map1)
        vid.on('complete', function () {
            this.scene.start('inicio');
        }, this);

    }
      
  
  }
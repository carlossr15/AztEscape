/**
 * Escena de fin de juego. Cuando se han recogido todas las estrellas, se presenta un
 * texto que indica que el juego se ha acabado.
 * Si se pulsa cualquier tecla, se vuelve a iniciar el juego.
 */
 export default class escenaFinal extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
      super({ key: 'final' });
    }
  
    preload ()
    {
        this.load.video('videofinal', 'assets/video/final.mp4', 'loadeddata', false, false);
    }
   
    
    create() 
    {

       
        console.log("ESCENA FINAL");
        let vid = this.add.video(640, 360, 'videofinal');
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
            this.scene.start('menu', "Has ganado, ¬°Enhorabuena! Pulsa cualquier tecla para volver a jugar");
        }, this);

    }
      
  
  }
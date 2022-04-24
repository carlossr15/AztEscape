export default class BotonMecanismo extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, nombre, numero, acciona, pulsado){ //escena, x, y, nombre que tiene el boton (siempre va a ser B y el numero de boton, ej: B1), numero de botones implicado en el mecanismo, acciona se refiere a lo que activa (un puente una puerta...) y booleano de si esta ya pulsado o no
        super(scene, x, y, 'botonMecanismo');
        this.meHanDado = false;
        this.nombre = nombre;
        this.pulsado = pulsado;
        this.numero = numero;
        this.acciona = acciona;
        this.setDepth(0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this,true);
        this.body.setSize(32,32);
        this.cargarAnimaciones();

        this.pulsaBoton = this.scene.sound.add('pulsaBoton', {volume: 1});

    }

    pulsar(){
        this.play('pulsar-boton');
        this.pulsaBoton.play();
    }

    sacar(){ //animacion de que salga el boton hacia fuera
        this.play('sacar-boton');
    }
    
    destruir(){
        this.destroy();
    }

    cargarAnimaciones(){
        //Animaciones botonMecansimo HAY QUE MOVERLO AL OBJETO DEL MECANISMO
        this.anims.create({
            key: 'pulsar-boton',
            frames: this.anims.generateFrameNames('botonMecanismo', { frames: [1] }),
            frameRate: 3,
            repeat: 0
        });

        this.anims.create({
            key: 'sacar-boton',
            frames: this.anims.generateFrameNames('botonMecanismo', { frames: [0] }),
            frameRate: 3,
            repeat: 0
        });
    }

    getNombre(){
        return this.nombre;
    }

    getPulsado(){
        return this.pulsado;
    }

    getNumero(){ //devuelve el numero de botones del mecanismo
        return this.numero;
    }

    getAcciona(){
        return this.acciona;
    }

}
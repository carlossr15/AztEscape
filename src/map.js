import Enemy from './enemy.js';
import Player from './player.js';
import Bandera from './bandera.js';
import Batido from './batido.js';
import Spike from './Spike.js';
import Escalera from './escalera.js';
import Momia from './momia.js';
import Llave from './llave.js';
import Puerta from './puerta.js';
import Invisible from './invisible.js';
import Bullets from './bullets.js';
import Idolo from './idolo.js';
import TextEvent from './textEvent.js';

/**
 * @extends Phaser.Scene
 */

export default class MyMap extends Phaser.Scene {


    constructor() {
        super({ key: 'myMap' });
    }


    preload() {
        this.load.audio('musicaFondo', 'assets/music/8bit Dungeon Level.mp3');
        this.load.audio('jump', 'assets/music/jump.wav');
        this.load.audio('daño', 'assets/music/daño.wav');
        this.load.audio('escritura', 'assets/music/escritura.wav');
        this.load.audio('texto', 'assets/music/texto.wav');
        this.load.audio('extraLife', 'assets/music/extraLife.wav');

        this.load.spritesheet('templo', 'assets/tilesets/tile_temple.png', { frameWidth: 544, frameHeight: 256 });
        this.load.spritesheet('objetos', 'assets/tilesets/objetos.png', { frameWidth: 256, frameHeight: 256 });
        this.load.tilemapTiledJSON('map', 'assets/maps/Lvl1.json');
        this.load.spritesheet('player', 'assets/sprites/MC-Spritesheet.png', {frameWidth: 600, frameHeight: 600});
        this.load.spritesheet('enemy', 'assets/sprites/araña.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('bandera','assets/sprites/Bandera.png');
        this.load.image('vida', 'assets/sprites/life.png' );
        this.load.image('llave', 'assets/sprites/Llave.png' );
        this.load.image('escalera', 'assets/sprites/escalera.png');
        this.load.spritesheet('batido', 'assets/sprites/Batido.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('cursor', 'assets/sprites/player.png');
        this.load.image('bullet', 'assets/sprites/roca.png');
        this.load.spritesheet('puerta', 'assets/sprites/Puerta Abierta y Cerrada.png', {frameWidth: 104, frameHeight: 127});
        this.load.spritesheet('mediaPuerta', 'assets/sprites/mediaPuerta.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('momia', 'assets/sprites/momiaSpritesheet.png', {frameWidth: 24, frameHeight: 32});
        this.load.spritesheet('idolo', 'assets/sprites/Idolo.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('cartel', 'assets/sprites/Cartel.png'/*, {frameWidth: 32, frameHeight: 32}*/);

        //this.load.spritesheet('piedraMovil', 'assets/sprites/PiedraMovil.png', {frameWidth: 128, frameHeight: 128});
       
        this.load.image('textBox', 'assets/tilesets/TextBox.png');
        this.load.image('bgtextBox', 'assets/tilesets/BGTextBox.png');
        this.load.image('MCtextBox', 'assets/tilesets/MCTextBox.png');
    }

    create() {

        this.musica = this.sound.add('musicaFondo',{volume: 0.5});
        this.musica.loop = true;
        this.musica.play();
    
        const map = this.make.tilemap({ key: 'map' });
        const tilesetTemplo = map.addTilesetImage('Templo', 'templo');
        const tilesetObjetos = map.addTilesetImage('Objetos', 'objetos');
        const fondo = map.createLayer('Fondo', tilesetTemplo, 0, 0);
        const efectoSuelo = map.createLayer('EfectoSuelo', tilesetObjetos, 0, 0);
        //const decoracion2 = map.createLayer('DecoracionTemplo', tilesetObjetos2, 0, 0);
        const decoracion = map.createLayer('Decoracion', tilesetObjetos, 0, 0);
        const suelo = map.createLayer('Suelo', tilesetTemplo, 0, 0);
        const objetosUtiles = map.createLayer('ObjetosUtiles', tilesetObjetos, 0, 0);

        //const pinchos = map.createFromObjects('Pinchos', tilesetObjetos)

        //var piedra = map.createFromObjects('PiedraObject', {gid: })

        this.cameras.main.setBounds(0, 0, 16000, 3000); //Y = 250
        this.cameras.main.zoom = 1;
        this.physics.world.setBounds(0, 0, 16000, 3000);

        this.enemies = this.add.group();
        this.escaleras = this.add.group();
        this.dialogos = this.add.group();

        //this.bandera = new Bandera(this, 6750, 455);
        
        this.puerta = new Puerta(this, this.player, 15820, 1150);
        this.player = new Player(this, 0, 600);
        
        this.dialogos.add(new TextEvent(this, 175, 682, 25, 25, ["Con este ídolo dorado por fin podré llegar a fin de mes.", "¿Por qué decidí vivir en el centro de Madrid?"]));
        this.dialogos.add(new TextEvent(this, 900, 500, 100, 300, ["¡Una araña! Iugh que asco. Me gustaría que desapareciese.", "Si alguien me estuviese controlando, pulsando la tecla [Espacio] conseguría que soltase un puñetazo"]));

        this.araña1 = new Enemy(this, 1200, 700);
        this.araña2 = new Enemy(this, 4200, 700);
        this.araña3 = new Enemy(this, 10250, 920);
        this.araña4 = new Enemy(this, 10500, 920);
        this.araña5 = new Enemy(this, 10900, 920);
        this.araña6 = new Enemy(this, 11200, 920);
        this.araña7 = new Enemy(this, 9200, 1300);
        this.enemies.add(this.araña1);
        this.enemies.add(this.araña2);
        this.enemies.add(this.araña3);
        this.enemies.add(this.araña4);
        this.enemies.add(this.araña5);
        this.enemies.add(this.araña6);
        this.enemies.add(this.araña7);
        this.enemies.setActive(true);

        /*
        this.momiaPruebas = new Momia(this, 0, 0);
        this.physics.add.collider(this.momiaPruebas, suelo);
        */
        this.momia1 = new Momia(this, 9000, 1250);

        this.spikes1 = new Spike(this, this.player, 3025, 720, 950, 30);      
        this.spikes2 = new Spike(this, this.player, 7100, 500, 900, 30);

        this.escalera1 = new Escalera(this, 4530, 500, 10, 500); //x = 4530
        this.escalera2 = new Escalera(this, 6160, 375, 10, 170);
        this.escalera3 = new Escalera(this, 6865, 225, 10, 310);
        this.escalera4 = new Escalera(this, 7120, 225, 10, 310);
        this.escalera5 = new Escalera(this, 7375, 225, 10, 310);
        this.escalera6 = new Escalera(this, 9170, 850, 10, 750);


        this.batido1 = new Batido(this, 5025, 235);
        this.batido2 = new Batido(this, 9375, 1300);
        
        this.llave = new Llave(this, 8965, 1300);

        this.inv = new Invisible(this, this.player, 15880, 1150, 10, 100);

        this.idolo = new Idolo(this, 174, 682);

        this.cartel = this.physics.add.image(9000, 700, 'cartel');    

        //this.inv = new Invisible(this, this.player, 5360, 450, 10, 150);
        //this.physics.add.collider(this.player, this.inv);

        //this.piedraMovil = new (this, 450, 550);
        
        //this.player = new Player(this, 4550, 350);


        //this.enemy = new Momia(this, 450, 500);

        //this.player = new Player(this, 4550, 350);


        //this.enemy = new Momia(this, 450, 500);

        /*this.enemy = new Enemy(this, 450, 500);
        this.enemies.add(this.enemy);
        this.enemy2 = new Enemy(this, 1500, 500);
        this.enemy3 = new Enemy(this, 4000, 500);
        this.enemy4 = new Enemy(this, 4300, 500);
        this.enemy5 = new Enemy(this, 3800, 500);*/



        //this.escalera2 = new Escalera(this, this.player, 4550, 900, 10, 1500);
        //this.escalera = new Escalera(this, this.player, 4550, 1000, 10, 1500);




       // this.batido = new Batido(this, 975, 260);


        //this.puerta = this.physics.add.image(450, 450, 'puerta').setImmovable();
        
        this.physics.add.collider(this.player, suelo);
        

        this.physics.add.collider(this.araña1, suelo);
        this.physics.add.collider(this.araña2, suelo);
        this.physics.add.collider(this.araña3, suelo);
        this.physics.add.collider(this.araña4, suelo);
        this.physics.add.collider(this.araña5, suelo);
        this.physics.add.collider(this.araña6, suelo);
        this.physics.add.collider(this.momia1, suelo);
        this.physics.add.collider(this.araña7, suelo);

        this.physics.add.collider(this.cartel, suelo);
        
        //this.physics.add.collider(this.enemy3, suelo);
        //this.physics.add.collider(this.enemy4, suelo);
        //this.physics.add.collider(this.enemy5, suelo);

        //this.physics.add.collider(this.piedraMovil, suelo);

        //this.add.image(553, 450, "mediaPuerta").set

        //this.physics.add.collider(this.bandera, suelo);

        //this.physics.add.collider(this.batido, suelo);


        this.cameras.main.startFollow(this.player, false, 0.05, 0.5);
        this.cameras.main.fadeIn(1000);


        suelo.setCollisionByExclusion(-1, true);



        //Animaciones jugador
        this.anims.create({
            key: 'walk-right',
            frames: this.anims.generateFrameNames('player', { frames: [0, 1, 2] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walk-left',
            frames: this.anims.generateFrameNames('player', { frames: [10, 11, 12] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'stand',
            frames: this.anims.generateFrameNames('player', { frames: [0] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump-right',
            frames: this.anims.generateFrameNames('player', { frames: [4] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump-left',
            frames: this.anims.generateFrameNames('player', { frames: [13] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack-right',
            frames: this.anims.generateFrameNames('player', { frames: [15] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack-left',
            frames: this.anims.generateFrameNames('player', { frames: [16] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'escalar',
            frames: this.anims.generateFrameNames('player', { frames: [8, 9] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'escalar-izq',
            frames: this.anims.generateFrameNames('player', { frames: [8] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'escalar-der',
            frames: this.anims.generateFrameNames('player', { frames: [9] }),
            frameRate: 10,
            repeat: -1
        });

        //Animaciones araña
        this.anims.create({
            key: 'move-enemy',
            frames: this.anims.generateFrameNames('enemy', {frames: [0, 1]}),
            frameRate: 7,
            repeat: -1
        })

        this.anims.create({
            key: 'abrir-puerta',
            frames: this.anims.generateFrameNames('puerta', {frames: [0, 1, 2]}),
            frameRate: 7,
            repeat: 0
        })

        //Animaciones momia
        this.anims.create({
            key: 'move-right-momia',
            frames: this.anims.generateFrameNames('momia', { frames: [3, 4, 5] }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'move-left-momia',
            frames: this.anims.generateFrameNames('momia', { frames: [9, 10, 11] }),
            frameRate: 3,
            repeat: -1
        });


        // this.physics.add.overlap(this.player, this.enemies, this.golpe, this); 
        this.physics.add.overlap(this.player, this.enemies, (player, enemigo) => {
                enemigo.attack();
        });

        this.physics.add.overlap(this.player, this.escaleras, (player, escalera) => {
            escalera.checkLadder();
        });

        this.physics.add.overlap(this.player, this.dialogos, (player, dialogo) => {
            dialogo.mostrar();
        });
    }

    // golpe(player, enemy) {
    //     this.enemy.attack();
    // }

    win() {
        this.scene.start('menu', "Has ganado, ¡Enhorabuena! Pulsa cualquier tecla para volver a jugar");
    }

    death() {
        this.scene.start('menu', "Game Over! Pulsa cualquier tecla para continuar");
    }

}

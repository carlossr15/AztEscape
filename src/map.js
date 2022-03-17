import Enemy from './enemy.js';
import Player from './player.js';
import Bandera from './bandera.js';
import Batido from './batido.js';
import Spike from './Spike.js';
import Escalera from './escalera.js';
/**
 * @extends Phaser.Scene
 */
export default class MyMap extends Phaser.Scene {


    constructor() {
        super({ key: 'myMap' });
    }

    preload(){
        this.load.spritesheet('templo', 'assets/tilesets/tile_temple.png', {frameWidth: 544, frameHeight: 256});
        this.load.spritesheet('objetos', 'assets/tilesets/objetos.png', {frameWidth: 256, frameHeight: 256});
        this.load.tilemapTiledJSON('map', 'assets/maps/Level1.json');
        this.load.spritesheet('player', 'assets/sprites/MC-Spritesheet.png', {frameWidth: 600, frameHeight: 600});
        this.load.spritesheet('enemy', 'assets/sprites/araña.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('bandera','assets/sprites/bandera.png');
        this.load.image('vida', 'assets/sprites/life.png' );
        this.load.image('escalera', 'assets/sprites/escalera.png');
        this.load.spritesheet('batido', 'assets/sprites/Batido.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('bullet', 'assets/sprites/player.png');
    }

    create(){
        const map = this.make.tilemap({ key: 'map' });
        const tilesetTemplo = map.addTilesetImage('TemploTiles', 'templo');
        const tilesetObjetos = map.addTilesetImage('ObjetosDecoracion', 'objetos');
        const fondo = map.createLayer('Fondo', tilesetTemplo, 0, 0);
        const efectoSuelo = map.createLayer('EfectoSuelo', tilesetObjetos, 0, 0);
        const decoracion = map.createLayer('Decoracion', tilesetObjetos, 0, 0);
        const suelo = map.createLayer('Suelo', tilesetTemplo, 0, 0);
        const pinchos = map.createFromObjects('Pinchos', tilesetObjetos)

        //var piedra = map.createFromObjects('PiedraObject', {gid: })

        this.cameras.main.setBounds(0, 0, 6800,1000);
        this.cameras.main.zoom = 1;
<<<<<<< Updated upstream
        this.physics.world.setBounds(0, 0, 6800,1000);
        
=======
        this.physics.world.setBounds(0, 0, 4800,1000);
>>>>>>> Stashed changes

        this.bandera = new Bandera(this, 6750, 455);
        this.player = new Player(this, 0, 450);
        
        //this.player = new Player(this, 4550, 350);


        this.enemy = new Enemy(this, 450, 500);
        this.enemy2 = new Enemy(this, 1500, 500);
        this.enemy3 = new Enemy(this, 4000, 500);
        this.enemy4 = new Enemy(this, 4300, 500);
        this.enemy5 = new Enemy(this, 3800, 500);

        this.escalera2 = new Escalera(this, this.player, 4550, 450, 10, 150);
        this.escalera = new Escalera(this, this.player, 1915, 450, 10, 150);

        this.spikes = new Spike(this, this.player, 2500, 500, 750, 30);

        

        this.batido = new Batido(this, 975, 260);
        //this.batido2 = new Batido(this, 2200, 360);

        this.physics.add.collider(this.player, suelo);
        
        this.physics.add.collider(this.enemy, suelo);
        this.physics.add.collider(this.enemy2, suelo);
        this.physics.add.collider(this.enemy3, suelo);
        this.physics.add.collider(this.enemy4, suelo);
        this.physics.add.collider(this.enemy5, suelo);


        this.physics.add.collider(this.bandera, suelo);

        this.physics.add.collider(this.batido, suelo);


        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        this.cameras.main.fadeIn(1000);
        

        suelo.setCollisionByExclusion(-1, true);

        this.anims.create({
            key: 'walk-right',
            frames: this.anims.generateFrameNames('player', {frames: [0, 1, 2]}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'walk-left',
            frames: this.anims.generateFrameNames('player', {frames: [10, 11, 12]}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'stand',
            frames: this.anims.generateFrameNames('player', {frames: [0]}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'jump-right',
            frames: this.anims.generateFrameNames('player', {frames: [4]}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'jump-left',
            frames: this.anims.generateFrameNames('player', {frames: [13]}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'attack-right',
            frames: this.anims.generateFrameNames('player', {frames: [15]}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'attack-left',
            frames: this.anims.generateFrameNames('player', {frames: [16]}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'escalar',
            frames: this.anims.generateFrameNames('player', {frames: [8, 9]}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'escalar-izq',
            frames: this.anims.generateFrameNames('player', {frames: [8]}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'escalar-der',
            frames: this.anims.generateFrameNames('player', {frames: [9]}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'move-enemy',
            frames: this.anims.generateFrameNames('enemy', {frames: [0, 1]}),
            frameRate: 10,
            repeat: -1
        })



    }

    win(){
        this.scene.start('menu', "Has ganado, ¡Enhorabuena! Pulsa cualquier tecla para volver a jugar");
    }

    death(){
        this.scene.start('menu', "Game Over! Pulsa cualquier tecla para continuar");
    }

}

import Enemy from './enemy.js';
import Player from './player.js';
import Bandera from './bandera.js';
import Batido from './batido.js';

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
        this.load.image('enemy', 'assets/sprites/araña.png');
        this.load.image('bandera','assets/sprites/bandera.png');
        this.load.image('vida', 'assets/sprites/life.png' );
        this.load.image('escalera', 'assets/sprites/escalera.png');
        this.load.spritesheet('batido', 'assets/sprites/Batido.png', {frameWidth: 32, frameHeight: 32});
    }

    create(){
        const map = this.make.tilemap({ key: 'map' });
        const tilesetTemplo = map.addTilesetImage('TemploTiles', 'templo');
        const tilesetObjetos = map.addTilesetImage('ObjetosDecoracion', 'objetos');
        const fondo = map.createLayer('Fondo', tilesetTemplo, 0, 0);
        const decoracion = map.createLayer('Decoracion', tilesetObjetos, 0, 0);
        const suelo = map.createLayer('Suelo', tilesetTemplo, 0, 0);
        const pinchos = map.createFromObjects('Pinchos', tilesetObjetos)

        //var piedra = map.createFromObjects('PiedraObject', {gid: })

        this.cameras.main.setBounds(0, 0, 4800,800);
        this.cameras.main.zoom = 1;
        this.physics.world.setBounds(0, 0, 4800,800);
        
        this.player = new Player(this, 0, 450);
        
        this.enemy = new Enemy(this, 150, 500);

        this.bandera = new Bandera(this, 500, 455);


        

        this.batido = new Batido(this, 975, 260);

        this.physics.add.collider(this.player, suelo);
        this.physics.add.collider(this.enemy, suelo);
        this.physics.add.collider(this.bandera, suelo);
        //if(this.physics.add.overlap(this.pinchos, this.player)) this.player.hurt()

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


    }

    death(){
        this.scene.start('menu');
    }

}
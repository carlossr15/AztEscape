import Player from './player.js';

/**
 * @extends Phaser.Scene
 */
export default class MyMap extends Phaser.Scene {


    constructor() {
        super({ key: 'myMap' });
    }

    preload(){
        this.load.spritesheet('templo', 'assets/tilesets/SueloDorado.png', {frameWidth: 50, frameHeight: 50});
        this.load.tilemapTiledJSON('map', 'assets/maps/MyMap2.json');
        this.load.spritesheet('player', 'assets/sprites/MC-Spritesheet.png', {frameWidth: 600, frameHeight: 600});
    }

    create(){
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('TemploDorado', 'templo');
        const fondo = map.createLayer('Fondo', tileset, 0, 0);
        const suelo = map.createLayer('Suelo', tileset, 0, 0);

        //var piedra = map.createFromObjects('PiedraObject', {gid: })

        this.cameras.main.setBounds(0, 0, 1600,400);
        this.physics.world.setBounds(0, 0, 1600,400);
        this.player = new Player(this, 0, 250);
        this.anims.create({key:'move', frame: this.anims.generateFrameNumbers('player', {start: 0, end: 20 }), frameRate: 10, repeat: -1})
        
        this.physics.add.collider(this.player, suelo);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        suelo.setCollisionByExclusion(-1, true);

        
    }



}
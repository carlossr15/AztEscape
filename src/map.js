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
        this.load.image('player', 'assets/sprites/player.png');
        this.load.spritesheet('player2', 'assets/sprites/MC-Spritesheet.png', {frameWidth: 602, frameHeight: 602});
    }

    create(){
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('TemploDorado', 'templo');
        const fondo = map.createLayer('Fondo', tileset, 0, 0);
        const suelo = map.createLayer('Suelo', tileset, 0, 0);

        //var piedra = map.createFromObjects('PiedraObject', {gid: })

        this.cameras.main.setBounds(0, 0, 1600,400);
        this.physics.world.setBounds(0, 0, 1600,400);

        this.player = new Player(this, 0, 300);
        this.physics.add.collider(this.player, suelo);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

        suelo.setCollisionByExclusion(-1, true);

        
    }



}
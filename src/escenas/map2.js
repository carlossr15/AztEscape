import Enemy from '../enemigos/enemy.js';
import Player from '../jugador/player.js';
import Batido from '../objetos/batido.js';
import Spike from '../trampas/Spike.js';
import Escalera from '../objetos/escalera.js';
import Momia from '../enemigos/momia.js';
import Llave from '../objetos/llave.js';
import Puerta from '../objetos/puerta.js';
import Invisible from '../objetos/invisible.js';
import Idolo from '../objetos/idolo.js';
import TextEvent from '../dialogos/textEvent.js';
import Diana from '../objetos/diana.js';
import PuertaPared from '../objetos/puertaPared.js';
import BotonMecanismo from '../objetos/botonMecansimo.js';
import Nota from '../objetos/nota.js';
import Puente from '../objetos/puente.js';
import PiedraMovil from '../objetos/piedraMovil.js';
import BotonSuelo from '../objetos/botonSuelo.js';
import Esqueleto from '../enemigos/esqueleto.js'; 
import PunchZone from '../jugador/punchZone.js';
import Antorcha from '../objetos/antorcha.js';

//import PiedraMovil from './piedraMovil.js';

/**
 * @extends Phaser.Scene
 */

export default class MyMap extends Phaser.Scene {


    constructor() {
        super({ key: 'Map2' });
    }


    preload() {
        this.load.tilemapTiledJSON('map2', 'assets/maps/Lvl2.json');

        this.load.image('textBox', 'assets/tilesets/TextBox.png');
        this.load.image('bgtextBox', 'assets/tilesets/BGTextBox.png');
        this.load.image('MCtextBox', 'assets/tilesets/MCTextBox.png');
        this.load.image('bandera','assets/sprites/Bandera.png');
        this.load.image('llave', 'assets/sprites/Llave.png' );
        this.load.image('escalera', 'assets/sprites/escalera.png');
        this.load.image('bullet', 'assets/sprites/roca.png');
        this.load.image('arrow', 'assets/sprites/flecha.png');
        this.load.image('cartel', 'assets/sprites/Cartel.png');
         this.load.image('puertaPared', 'assets/sprites/puertaPared.png');
        this.load.image('puente', 'assets/sprites/Puente.png');
        //this.load.image('cursor', 'assets/sprites/player.png');

        this.load.spritesheet('templo', 'assets/tilesets/tile_temple.png', { frameWidth: 544, frameHeight: 256 });
        this.load.spritesheet('objetos', 'assets/tilesets/objetos.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('player', 'assets/sprites/MC.png',{ frameWidth: 370, frameHeight: 600 }) //{ frameWidth: 370, frameHeight: 600 }
        this.load.spritesheet('player-hit', 'assets/sprites/MC-Pegando.png', { frameWidth: 600, frameHeight: 600 }) //{ frameWidth: 370, frameHeight: 600 }
        this.load.spritesheet('player-dead', 'assets/sprites/MC-Muerte.png', { frameWidth: 600, frameHeight: 600 })       
        this.load.spritesheet('enemy', 'assets/sprites/araña.png', {frameWidth: 64, frameHeight: 64});        
        this.load.spritesheet('vida', 'assets/sprites/health.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('batido', 'assets/sprites/Batido.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('puerta', 'assets/sprites/Puerta Abierta y Cerrada.png', {frameWidth: 104, frameHeight: 127});
        this.load.spritesheet('mediaPuerta', 'assets/sprites/mediaPuerta.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('momia', 'assets/sprites/momiaSpritesheet.png', {frameWidth: 24, frameHeight: 32});
        this.load.spritesheet('antorcha', 'assets/sprites/Antorcha.png', {frameWidth: 32, frameHeight: 32});

        this.load.spritesheet('player', 'assets/sprites/MC.png',{ frameWidth: 370, frameHeight: 600 }) //{ frameWidth: 370, frameHeight: 600 }
        this.load.spritesheet('player-hit', 'assets/sprites/MC-Pegando.png', { frameWidth: 600, frameHeight: 600 }) //{ frameWidth: 370, frameHeight: 600 }
        this.load.spritesheet('player-dead', 'assets/sprites/MC-Muerte.png', { frameWidth: 600, frameHeight: 600 })
        
        this.load.spritesheet('idolo', 'assets/sprites/Idolo.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('restartButton', 'assets/sprites/restartButton.png', {frameWidth: 480, frameHeight: 170});
        this.load.spritesheet('mapsButton', 'assets/sprites/mapsButton.png', {frameWidth: 480, frameHeight: 170});
        this.load.spritesheet('botonMecanismo', 'assets/sprites/Boton.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('botonSuelo', 'assets/sprites/BotonSuelo.png', {frameWidth: 50, frameHeight: 50});
        this.load.spritesheet('piedraMovil', 'assets/sprites/PiedraMovil.png', {frameWidth: 128, frameHeight: 128}); 
        this.load.spritesheet('diana', 'assets/sprites/diana.png', {frameWidth: 75, frameHeight: 60});
        this.load.spritesheet('esqueleto', 'assets/sprites/esqueleto.png', {frameWidth: 90, frameHeight: 90});

        this.load.atlas('heal', 'assets/sprites/heal.png','assets/sprites/heal.json');
        this.load.atlas('white', 'assets/sprites/white.png', 'assets/sprites/white.json');
        

        this.load.audio('musicaFondo', 'assets/music/8bit Dungeon Level.mp3');
        this.load.audio('jump', 'assets/music/jump.wav');
        this.load.audio('daño', 'assets/music/daño.wav');
        this.load.audio('escritura', 'assets/music/escritura.wav');
        this.load.audio('texto', 'assets/music/texto.wav');
        this.load.audio('extraLife', 'assets/music/extraLife.wav');
        this.load.audio('puñetazo', 'assets/music/puñetazo.wav');
        this.load.audio('puñoaire', 'assets/music/puñoaire.wav');
        this.load.audio('pulsaBoton', 'assets/music/boton-efecto-de-sonido.wav');
        this.load.audio('combinacionIncorrecta', 'assets/music/incorrectaCombinacion.wav');
        this.load.audio('abrirPuertaPared', 'assets/music/abrirPuertaPared.wav');
        this.load.audio('sonidoDiana', 'assets/music/sonidoDeFlecha.wav');
        this.load.audio('deathSound', 'assets/music/deathMusic.wav');
        this.load.audio('flechaEnemigo', 'assets/music/flechaEnemigo.mp3');

        this.load.image('nota', 'assets/sprites/nota.png')
        this.load.image('notaText', 'assets/tilesets/notaText.png');
    
        this.load.image('congratulations', 'assets/sprites/congratulations.png');
        this.load.image('hasPerdido', 'assets/sprites/hasPerdido.png');
        this.load.image('background', 'assets/sprites/background.png');
        this.load.image('pausa', 'assets/sprites/pausa.png');
        this.load.spritesheet('soundButton', 'assets/sprites/sonidoButton.png', {frameWidth: 75, frameHeight: 75});
        this.load.spritesheet('soundButtonOff', 'assets/sprites/sonidoOff.png', {frameWidth: 75, frameHeight: 75});
        this.load.spritesheet('continueButton', 'assets/sprites/continueButton.png', {frameWidth: 520, frameHeight: 340});
        this.load.spritesheet('restartButton', 'assets/sprites/restartButton.png', {frameWidth: 480, frameHeight: 170});
        this.load.spritesheet('mapsButton', 'assets/sprites/mapsButton.png', {frameWidth: 480, frameHeight: 170});
        this.load.image('preparado', 'assets/sprites/preparado.png');
    
        this.load.image('columna', 'assets/sprites/columna.png')

    }

    

    create() {
    
        this.mapa = 'Map2';
        
        this.input.keyboard.on('keydown-' + 'F', function (event){
            console.log("full");
                if (this.scene.game.scale.isFullscreen)
                    this.scene.game.scale.stopFullscreen();
                else
                    this.scene.game.scale.startFullscreen();
        })
        
        const map = this.make.tilemap({ key: 'map2' });
        const tilesetTemplo = map.addTilesetImage('Templo', 'templo');
        const tilesetObjetos = map.addTilesetImage('objetos', 'objetos');
        const fondo = map.createLayer('Fondo', tilesetTemplo, 0, 0);
        const efectoSuelo = map.createLayer('EfectoSuelo', tilesetObjetos, 0, 0);
        const decoracion = map.createLayer('Decoracion', tilesetObjetos, 0, 0);
        const suelo = map.createLayer('Suelo', tilesetTemplo, 0, 0);
        const objetosUtiles = map.createLayer('ObjetosUtiles', tilesetObjetos, 0, 0);

        //const pinchos = map.createFromObjects('Pinchos', tilesetObjetos)

        //Configuracion mundo
        this.physics.world.setBounds(0, 0, 18000, 3000);
        suelo.setCollisionByExclusion(-1, true);

        //var piedra = map.createFromObjects('PiedraObject', {gid: })

        this.enemies = this.add.group();
        this.escaleras = this.add.group();
        this.dialogos = this.add.group();
        this.physics.add.collider(this.enemies, suelo);
        this.dianas = this.add.group();
        this.botones = this.add.group();
        this.botonesSuelo = this.add.group();
        this.puertasPared = this.add.group();
        this.piedras = this.add.group();

        this.add.image(150, 1065, "columna").setScale(0.8, 0.8).setDepth(0);


        //this.bandera = new Bandera(this, 6750, 455);
        
        this.puerta = new Puerta(this, 15100, 1570);
        this.inv = new Invisible(this, 15160, 1570, 10, 100);

        this.dianas.add(new Diana(this, 9870, 1085, 'puerta'));   
        this.dianas.add(new Diana(this, 2632, 1087, 'puente'));      
        
        this.botones.add(new BotonMecanismo(this, 12180, 1650, 'B1', 3, 'puente', false));
        this.botones.add(new BotonMecanismo(this, 12180, 1730, 'B2', 3, 'puente', false));
        this.botones.add(new BotonMecanismo(this, 12180, 1810, 'B3', 3, 'puente', false));

        //this.cartel = this.physics.add.image(9000, 700, 'cartel'); 

        this.antorchas = this.add.group();
        this.antorchasApagadas1 = this.add.group();
        this.antorchasApagadas2 = this.add.group();
        this.antorchasApagadas3 = this.add.group();
        this.antorchasApagadas4 = this.add.group();

        this.antorchas.add(new Antorcha(this, 500, 1150));
        this.antorchas.add(new Antorcha(this, 1200, 1150));
        this.antorchas.add(new Antorcha(this, 1700, 1020));
        this.antorchas.add(new Antorcha(this, 2630, 1020));
        
        this.antorchasApagadas1.add(this.ant11 = new Antorcha(this, 3100, 1150));
        this.ant11.apagar();
        this.antorchasApagadas1.add(this.ant12 = new Antorcha(this, 3160, 1150));
        this.ant12.apagar();
        this.antorchasApagadas1.add(this.ant13 = new Antorcha(this, 3220, 1150));
        this.ant13.apagar();
        this.antorchasApagadas1.add(this.ant14 = new Antorcha(this, 3280, 1150));
        this.ant14.apagar();
        this.antorchasApagadas1.add(this.ant15 = new Antorcha(this, 3340, 1150));
        this.ant15.apagar();

        this.antorchas.add(new Antorcha(this, 3600, 1150));
        this.antorchas.add(new Antorcha(this, 4150, 1100));
        this.antorchas.add(new Antorcha(this, 4400, 1020));
        this.antorchas.add(new Antorcha(this, 4630, 970));
        this.antorchas.add(new Antorcha(this, 5100, 850));

        this.antorchasApagadas2.add(this.ant21 = new Antorcha(this, 6300, 1200));
        this.ant21.apagar();
        this.antorchasApagadas2.add(this.ant22 = new Antorcha(this, 6400, 1200));
        this.ant22.apagar();
        this.antorchasApagadas2.add(this.ant23 = new Antorcha(this, 6500, 1200));
        this.ant23.apagar();
        this.antorchasApagadas2.add(this.ant24 = new Antorcha(this, 6600, 1200));
        this.ant24.apagar();
        this.antorchasApagadas2.add(this.ant25 = new Antorcha(this, 6700, 1200));
        this.ant25.apagar();
        this.antorchasApagadas2.add(this.ant26 = new Antorcha(this, 6800, 1200));
        this.ant26.apagar();

        this.antorchas.add(new Antorcha(this, 7800, 1250));
        this.antorchas.add(new Antorcha(this, 7000, 1650));
        this.antorchas.add(new Antorcha(this, 7300, 1650));
        this.antorchas.add(new Antorcha(this, 8600, 1500));

        this.antorchasApagadas3.add(this.ant31 = new Antorcha(this, 9700, 1370));
        this.ant31.apagar();
        this.antorchasApagadas3.add(this.ant32 = new Antorcha(this, 9800, 1370));
        this.ant32.apagar();
        this.antorchasApagadas3.add(this.ant33 = new Antorcha(this, 9900, 1370));
        this.ant33.apagar();
        this.antorchasApagadas3.add(this.ant34 = new Antorcha(this, 10000, 1370));
        this.ant34.apagar();
        this.antorchasApagadas3.add(this.ant35 = new Antorcha(this, 10100, 1370));
        this.ant35.apagar();

        this.antorchas.add(new Antorcha(this, 12000, 1450));
        this.antorchas.add(new Antorcha(this, 12550, 1730));

        this.antorchasApagadas4.add(this.ant41 = new Antorcha(this, 13000, 1730));
        this.ant41.apagar();
        this.antorchasApagadas4.add(this.ant42 = new Antorcha(this, 13100, 1730));
        this.ant42.apagar();
        this.antorchasApagadas4.add(this.ant43 = new Antorcha(this, 13200, 1730));
        this.ant43.apagar();

        this.antorchas.add(new Antorcha(this, 14450, 1500));
        this.antorchas.add(new Antorcha(this, 14700, 1500));
        this.antorchas.add(new Antorcha(this, 14950, 1500));



        this.player = new Player(this, 0, 1000);        
        this.golpear = new PunchZone(this, 200, 1100);
        //this.player = new Player(this, 12951, 485);

        this.enemies.add(new Esqueleto(this, 700, 1000, true));
        this.enemies.add(new Esqueleto(this, 6870, 1550, false));
        //this.esqu = new Esqueleto(this, 700, 1000);

        this.enemies.add(new Enemy(this, 7000, 1700));

        this.enemies.add(new Momia(this, 6950, 1700));

        //this.piedra1 = new PiedraMovil(this, 5000, 900);
        this.piedras.add(new PiedraMovil(this, 5200, 900, 75, 75));
        this.piedras.add(new PiedraMovil(this, 700, 1100, 80, 80));
        this.piedras.add(new PiedraMovil(this, 13500, 1100, 80, 80));
        this.piedras.add(new PiedraMovil(this, 14000, 1100, 160, 160));
        //this.physics.add.collider(this.piedra3, this.piedra4);

        this.botonesSuelo.add(new BotonSuelo(this, 5825, 1365, 'B4', 1, 'puerta', false));
        
        //this.botones.add(this.boton4);

        this.nota = new Nota(this, 6870, 1780);

        this.llave = new Llave(this, 6920, 1780);




        this.physics.add.collider(this.player, suelo);
        
       /* this.dialogos.add(new TextEvent(this, 175, 682, 25, 25, ["Con este ídolo dorado por fin podré llegar a fin de mes.\n", "¿Por qué decidí vivir en el centro de Madrid?\n", "Bueno, ahora toca salir de aquí pero... Ehm... ¿Cómo se \nsaltaba? ", "Si esto fuese un videojuego seguro que con [W]."]));
        this.dialogos.add(new TextEvent(this, 900, 500, 100, 300, ["¡Una araña! Iugh que asco. ", "Me gustaría que desapareciese.\n", "Si alguien me estuviese controlando seguro que pulsando\n la tecla [Espacio] conseguiría que soltase un puñetazo."]));
        this.dialogos.add(new TextEvent(this, 2478, 453, 100, 300, ["¿¡Y ahora pinchos!? ", "Venga sí, ¿Y qué más? ¿Momias?.\n", "Bueno, mejor intento no caerme mientras salto a esas... \n¿Plataformas flotantes? Creo que no he fumado nada \ndesde aquella vez que me desperté desnudo en una \nfiesta para niños"]));
        this.dialogos.add(new TextEvent(this, 4076, 517, 100, 300, ["¿Y ahora estoy en un instituto estadounidense?\n", "Nunca hubiese imaginado que subir por una cuerda fuese a \nservir realmente para algo...\n", "En fin, la vida es una lenteja, vamos a ello."]));
        this.dialogos.add(new TextEvent(this, 4683, 389, 100, 300, ["¿Eso es un Fresisuis? ", "Que bien entraba uno despues \nde hacer un poco de ejercicio, la verdad. ", "Seguro que es... \nREVITALIZANTE"]));
        this.dialogos.add(new TextEvent(this, 5965, 389, 100, 300, ["No, en serio, ¿dónde se sujeta esa cuerda?"]));
        this.dialogos.add(new TextEvent(this, 6650, 165, 100, 300, ["Quien me mandaría entrar a un templo azteca perdido de la\n mano de Dios... ", "No tenía suficiente con una cuerda que \nahora encima son 3 y tengo que saltar de una a otra.\n", "Y espera... ¿Cuando he entrado al templo?"]));
        this.dialogos.add(new TextEvent(this, 7340, 220, 100, 300, ["Anda mira, la momia de la que hablaba antes, que ilusión...\n", "Al menos parece tonta."]));
        this.dialogos.add(new TextEvent(this, 8665, 581, 100, 300, ["Un cartel sospechoso cuanto menos.\n", "Seguro que el que diseñó este templo era un despistado y \nno se acordaba de dónde tenía que dejar las llaves."]));
        this.dialogos.add(new TextEvent(this, 13051, 485, 100, 300, ["Oye, amigo que está en mi cabeza, ¿no estaré siendo \nmuy pesado no? ", "Voy a intentar estar más callado a partir \nde ahora ¿Vale?"]));
        this.dialogos.add(new TextEvent(this, 14514, 901, 100, 300, ["Podrías responder de vez en cuando..."]));
        this.dialogos.add(new TextEvent(this, 15500, 1100, 200, 200, ["Anda una diana, a lo mejor apuntando y haciendo clic \npuedo romperla de una pedrada."]));
        */

        this.escalera1 = new Escalera(this, 2064, 1005, 10, 485); //x = 4530
        this.escalera2 = new Escalera(this, 5492, 1007, 10, 460);
        this.escalera3 = new Escalera(this, 7410, 1560, 10, 250);
        this.escalera4 = new Escalera(this, 10965, 1685, 10, 140);
    
        this.puertaPared1 = new PuertaPared(this, 6190, 1220, "puerta1");
        this.puertaPared2 = new PuertaPared(this, 9583, 1375, "puerta2");

        this.puente1 = new Puente(this, 12920, 1863, "puente2");
        this.puente1.setRotation(3*Math.PI/2);

        this.puente2 = new Puente(this, 3070, 1285, "puente1");
        this.puente2.setRotation(3*Math.PI/2); 
        
        

       /* this.piedraMovil = new PiedraMovil(this, this.player, 500, 500);
        this.physics.add.collider(this.player, this.piedraMovil); */

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
        

        //this.physics.add.collider(this.cartel, suelo);

        //this.physics.add.collider(this.piedraMovil, suelo);
        
        //this.physics.add.collider(this.enemy3, suelo);
        //this.physics.add.collider(this.enemy4, suelo);
        //this.physics.add.collider(this.enemy5, suelo);

        //this.physics.add.collider(this.piedraMovil, suelo);


        //this.physics.add.collider(this.bandera, suelo);

        //this.physics.add.collider(this.batido, suelo);


        //Config Camara
        this.cameras.main.setBounds(0, 0, 16000, 3000); //Y = 250
        this.cameras.main.zoom = 1;
        this.cameras.main.startFollow(this.player, false, 0.05, 0.5);
        this.cameras.main.fadeIn(1000);
        
        //Particulas curacion
        this.cargaParticulas();

        //Colisiones
        this.physics.add.collider(this.enemies, suelo);
        this.physics.add.collider(this.player, suelo);
        this.physics.add.collider(this.piedras, suelo);

        var allPiedras = this.piedras.getChildren();
        for (var i = 0; i < this.piedras.getLength(); i++){
            for (var j = i+1; j < this.piedras.getLength(); j++){
                this.physics.add.collider(allPiedras[i], allPiedras[j])
            }
            
        }
        this.cargaColisiones();
        
        //Musica
        this.musica = this.sound.add('musicaFondo',{volume: 0.2});
        this.musica.loop = true;
        this.musica.play();

    }

    cargaParticulas(){
        var jugador = this.player; //Necesario para los efectos

        this.particles = this.add.particles('heal');
        this.particles = this.add.particles('white');
        this.playerSource = {
            getRandomPoint: function (vec)
            {
                var x = Phaser.Math.Between(0, jugador.body.width - 1);
                var y = Phaser.Math.Between(0, jugador.body.height - 1);
                return vec.setTo(x + jugador.body.x, y + jugador.body.y);
            }
        };
        this.cura = this.particles.createEmitter({
            frame: 'healparticle',
            lifespan: 500,
            gravityY: 0,
            scale: { start: 0, end: 1, ease: 'Quad.easeOut' },
            alpha: { start: 1, end: 0, ease: 'Quad.easeIn' },
            on:false,
            emitZone: { type: 'random', source: this.playerSource }
        });
        this.cambio = this.particles.createEmitter({
            frame: 'white',
            follow:this.player,
            lifespan: 100,
            gravityY: 0,
            scale: { start: 0.2, end: 0.3, ease: 'Quad.easeOut' },
            angle: { start: 0, end: 360, steps: 64 },
            on:false,
            speed: 600,
            quantity: 64,
            frequency: 32
        });
        /*
        this.centro = this.particles.createEmitter({
            frame: 'healparticle',
            lifespan: 500,
            gravityY: 0,
            alpha: { start: 1, end: 0, ease: 'Quad.easeIn' },
            on:false,
            follow: this.player
        });
        this.centro.start();
        */
    }
    
    cargaColisiones(){
        this.physics.add.overlap(this.player, this.enemies, (player, enemigo) => {
            enemigo.attack();
        });

        this.physics.add.overlap(this.player, this.escaleras, (player, escalera) => {
            escalera.checkLadder();
        });

        this.physics.add.overlap(this.player, this.dialogos, (player, dialogo) => {
            dialogo.mostrar();
        });
        
        this.physics.add.overlap(this.player, this.consumibles, (player, consumible) => {
            consumible.curar();
            player.healing();
        });
    }

    win() {
        this.scene.start('menu', "Has ganado, ¡Enhorabuena! Pulsa cualquier tecla para volver a jugar");
        this.musica.stop();
    }

    death() {
        this.scene.start('lose');
        this.scene.sta
        this.musica.stop();
    }
    
    getCombinationPuente(){
        return 'B1B3B2'; //combinacion para el mecanismo de botones
    }

    getCombinationSuelo(){
        return 'B4'; //combinacion para el mecanismo de botones
    }
    
    apagarAntorchas(){
        var allAntorchasApagadas = this.antorchasApagadas.getChildren();
        for(let i = 0; i < allAntorchasApagadas.length; i++){
            allAntorchasApagadas[i].apagar();
        }
    }

}

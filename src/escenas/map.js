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
import PunchZone from '../jugador/punchZone.js';
import BotonMecanismo from '../objetos/botonMecansimo.js';
import Esqueleto from '../enemigos/esqueleto.js';
import Antorcha from '../objetos/antorcha.js';
import Sombrero from '../objetos/sombrero.js';
//import PiedraMovil from './piedraMovil.js';

/**
 * @extends Phaser.Scene
 */

export default class MyMap extends Phaser.Scene {


    constructor() {
        super({ key: 'Map1' });
    }


    preload() {
        this.load.tilemapTiledJSON('map', 'assets/maps/Lvl1.json');

        this.load.image('textBox', 'assets/tilesets/TextBox.png');
        this.load.image('bgtextBox', 'assets/tilesets/BGTextBox.png');
        this.load.image('MCtextBox', 'assets/tilesets/MCTextBox.png');
        this.load.image('bandera','assets/sprites/Bandera.png');
        this.load.image('llave', 'assets/sprites/Llave.png' );
        this.load.image('escalera', 'assets/sprites/escalera.png');
        this.load.image('bullet', 'assets/sprites/roca.png');
        this.load.image('arrow', 'assets/sprites/Flecha.png');
        this.load.image('cartel', 'assets/sprites/Cartel.png');

        this.load.spritesheet('templo', 'assets/tilesets/tile_temple.png', { frameWidth: 544, frameHeight: 256 });
        this.load.spritesheet('objetos', 'assets/tilesets/objetos.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('enemy', 'assets/sprites/araña.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('vida', 'assets/sprites/health.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('batido', 'assets/sprites/Batido.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('gorroHelices', 'assets/sprites/GorroHelices.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('puerta', 'assets/sprites/Puerta Abierta y Cerrada.png', {frameWidth: 104, frameHeight: 127});
        this.load.spritesheet('mediaPuerta', 'assets/sprites/mediaPuerta.png', {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('momia', 'assets/sprites/momiaSpritesheet.png', {frameWidth: 32, frameHeight: 32});

        this.load.spritesheet('player', 'assets/sprites/MC.png',{ frameWidth: 370, frameHeight: 600 }) //{ frameWidth: 370, frameHeight: 600 }
        this.load.spritesheet('player-hit', 'assets/sprites/MC-Pegando.png', { frameWidth: 370, frameHeight: 600 }) //{ frameWidth: 370, frameHeight: 600 }
        this.load.spritesheet('player-dead', 'assets/sprites/MC-Muerte.png', { frameWidth: 600, frameHeight: 600 })
        this.load.spritesheet('punch', 'assets/sprites/punch.png', { frameWidth: 230, frameHeight: 600 })
        this.load.spritesheet('antorcha', 'assets/sprites/antorcha.png', {frameWidth: 32, frameHeight: 32});

        this.load.spritesheet('esqueleto', 'assets/sprites/esqueleto.png', {frameWidth: 90, frameHeight: 90});

        this.load.spritesheet('idolo', 'assets/sprites/Idolo.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('botonMecanismo', 'assets/sprites/Boton.png', {frameWidth: 50, frameHeight: 50});

        this.load.atlas('heal', 'assets/sprites/heal.png','assets/sprites/heal.json');
        
        this.load.audio('musicaFondo', 'assets/music/8bit Dungeon Level.mp3');
        this.load.audio('jump', 'assets/music/jump.wav');
        this.load.audio('daño', 'assets/music/daño.wav');
        this.load.audio('escritura', 'assets/music/escritura.wav');
        this.load.audio('texto', 'assets/music/texto.wav');
        this.load.audio('extraLife', 'assets/music/extraLife.wav');
        this.load.audio('puñetazo', 'assets/music/puñetazo.wav');
        this.load.audio('puñoaire', 'assets/music/puñoaire.wav');
        this.load.audio('deathSound', 'assets/music/deathMusic.wav');


        this.load.image('congratulations', 'assets/sprites/congratulations.png');
        this.load.image('hasPerdido', 'assets/sprites/hasPerdido.png');
        this.load.image('background', 'assets/sprites/background.png');
        this.load.image('pausa', 'assets/sprites/pausa.png');
        this.load.spritesheet('soundButton', 'assets/sprites/sonidoButton.png', {frameWidth: 75, frameHeight: 75});
        this.load.spritesheet('soundButtonOff', 'assets/sprites/sonidoOff.png', {frameWidth: 75, frameHeight: 75});        
        this.load.spritesheet('reiniciarButton', 'assets/sprites/reiniciarButton.png', {frameWidth: 670, frameHeight: 130});
        this.load.spritesheet('exitButton', 'assets/sprites/salirButton.png', {frameWidth: 480, frameHeight: 170});
        this.load.image('preparado', 'assets/sprites/preparado.png');
        this.load.spritesheet('optionsButton', 'assets/sprites/opcionesButton.png', {frameWidth: 75, frameHeight: 75});
        this.load.spritesheet('backButton', 'assets/sprites/atrasButton.png', {frameWidth: 100, frameHeight: 100});


    }

    create() {
        this.mapa = 'Map1';

        const map = this.make.tilemap({ key: 'map' });
        const tilesetTemplo = map.addTilesetImage('Templo', 'templo');
        const tilesetObjetos = map.addTilesetImage('Objetos', 'objetos');
        const fondo = map.createLayer('Fondo', tilesetTemplo, 0, 0);
        const efectoSuelo = map.createLayer('EfectoSuelo', tilesetObjetos, 0, 0);
        const decoracion = map.createLayer('Decoracion', tilesetObjetos, 0, 0);
        const suelo = map.createLayer('Suelo', tilesetTemplo, 0, 0);
        const objetosUtiles = map.createLayer('ObjetosUtiles', tilesetObjetos, 0, 0);

        this.input.keyboard.on('keydown-' + 'F', function (event){
            console.log("full");
                if (this.scene.game.scale.isFullscreen)
                    this.scene.game.scale.stopFullscreen();
                else
                    this.scene.game.scale.startFullscreen();
        })
        
        //Configuracion mundo
        this.physics.world.setBounds(0, 0, 16000, 3000);
        suelo.setCollisionByExclusion(-1, true);

        //Creacion jugador
        this.puerta = new Puerta(this, 15820, 1150);

        this.cargarAntorchas();

        this.cartel = this.physics.add.image(9000, 700, 'cartel'); //No he conseguido que se coloque detrás si lo pongo despues
        //this.player = new Player(this, 0, 400);
        
        this.player = new Player(this, 0, 400);
        this.muro = new Invisible(this, 175, 550)
        
        //Creacion grupos
        this.enemies = this.add.group();
        this.escaleras = this.add.group();
        this.dialogos = this.add.group();
        this.consumibles = this.add.group();

        //Creacion de objetos relevantes

        
        //this.enemies.add(new Esqueleto(this, 100, 675));
        this.enemies.add(new Enemy(this, 1200, 700));
        this.enemies.add(new Enemy(this, 4200, 700));
        this.enemies.add(new Enemy(this, 10250, 920));
        this.enemies.add(new Enemy(this, 10500, 920));
        this.enemies.add(new Enemy(this, 10900, 920));
        this.enemies.add(new Enemy(this, 11200, 920));
        this.enemies.add(new Enemy(this, 9200, 1300));

        this.enemies.add(new Momia(this, 8200, 500));
        this.enemies.add(new Momia(this, 9000, 1250));

        this.spikes1 = new Spike(this, this.player, 3025, 720, 950, 30);      
        this.spikes2 = new Spike(this, this.player, 7100, 500, 900, 30);

        this.escalera1 = new Escalera(this, 4530, 500, 10, 500); //x = 4530
        this.escalera2 = new Escalera(this, 6160, 375, 10, 170);
        this.escalera3 = new Escalera(this, 6865, 225, 10, 310);
        this.escalera4 = new Escalera(this, 7120, 225, 10, 310);
        this.escalera5 = new Escalera(this, 7375, 225, 10, 310);
        this.escalera6 = new Escalera(this, 9170, 850, 10, 750);

        this.consumibles.add(new Batido(this, 5025, 235));
        this.consumibles.add(new Batido(this, 9375, 1300));

        //Creacion de dialogos
        this.dialogos.add(new TextEvent(this, 175, 682, 25, 25, ["Con este ídolo dorado por fin podré llegar a fin de mes.\n", "¿Por qué decidí vivir en el centro de Madrid?\n", "Bueno, ahora toca salir de aquí pero... Ehm... ¿Cómo se \nsaltaba? ", "Si esto fuese un videojuego seguro que con [W]."], true));
        this.dialogos.add(new TextEvent(this, 900, 500, 100, 300, ["¡Una araña! Iugh que asco. ", "Me gustaría que desapareciese.\n", "Si alguien me estuviese controlando seguro que pulsando\n la tecla [Espacio] conseguiría que soltase un puñetazo."], true));
        this.dialogos.add(new TextEvent(this, 2478, 453, 100, 300, ["¿¡Y ahora pinchos!? ", "Venga sí, ¿Y qué más? ¿Momias?.\n", "Bueno, mejor intento no caerme mientras salto a esas... \n¿Plataformas flotantes? Creo que no he fumado nada \ndesde aquella vez que me desperté desnudo en una \nfiesta para niños"], true));
        this.dialogos.add(new TextEvent(this, 4076, 517, 100, 300, ["¿Y ahora estoy en un instituto estadounidense?\n", "Nunca hubiese imaginado que subir por una cuerda fuese a \nservir realmente para algo...\n", "En fin, la vida es una lenteja, vamos a ello."], true));
        this.dialogos.add(new TextEvent(this, 4900, 389, 100, 300, ["¿Eso es un Fresisuis? ", "Que bien entraba uno despues \nde hacer un poco de ejercicio, la verdad. ", "Seguro que es... \nREVITALIZANTE"], true));
        this.dialogos.add(new TextEvent(this, 5600, 359, 100, 300, ["¿Dónde se sujeta esa cuerda?"]));
        this.dialogos.add(new TextEvent(this, 6700, 165, 100, 300, ["Quien me mandaría entrar a un templo azteca perdido de la\nmano de Dios... ", "No tenía suficiente con una cuerda que \nahora encima son 3 y tengo que saltar de una a otra.\n", "Y espera... ¿Cuando he entrado al templo?"], true));
        this.dialogos.add(new TextEvent(this, 7450, 220, 100, 300, ["Anda mira, la momia de la que hablaba antes, que ilusión...\n", "Al menos parece tonta."], true));
        this.dialogos.add(new TextEvent(this, 8665, 581, 100, 300, ["Un cartel sospechoso cuanto menos.\n", "Seguro que el que diseñó este templo era un despistado y \nno se acordaba de dónde tenía que dejar las llaves."]));
        this.dialogos.add(new TextEvent(this, 13051, 485, 100, 300, ["Oye, amigo que está en mi cabeza, ¿no estaré siendo \nmuy pesado no? ", "Voy a intentar estar más callado a partir \nde ahora ¿Vale?"]));
        this.dialogos.add(new TextEvent(this, 15700, 1150, 25, 25, ["¿Qué hace un niño aquí? Anda ven conmigo que este no \nes un buen lugar, yo te saco, que tengo la llave."], true));
        
        this.llave = new Llave(this, 8965, 1300);
        this.sombrero = new Sombrero(this, 15700,1150,25,25);
        this.inv = new Invisible(this, 15880, 1150, 10, 150);

        this.idolo = new Idolo(this, 174, 682);

        this.physics.add.collider(this.cartel, suelo);


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
        this.cargaColisiones();

        //Musica
        this.musica = this.sound.add('musicaFondo', {volume: 0.2});
        this.musica.loop = true;
        this.musica.play();

    }

    cargaParticulas(){
        var jugador = this.player; //Necesario para los efectos

        this.particles = this.add.particles('heal');
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
            x: this.player.x, y: this.player.y,
            lifespan: 500,
            gravityY: 0,
            angle: { start: 0, end: 360, steps: 64 },
            on:false,
            speed: 200,
            quantity: 64,
            frequency: 32
        });
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
        this.physics.add.overlap(this.player, this.sombrero, (player, sombrero) => {
            sombrero.destroy();
        });
    }

    win() {
        // this.scene.start('menu', "Has ganado, ¡Enhorabuena! Pulsa cualquier tecla para volver a jugar");
        this.musica.stop();
        this.scene.start('Map2');
    }

    death() {
        this.scene.launch('lose', this.mapa);
        this.musica.stop();
    }

    cargarAntorchas(){
        this.antorchas = this.add.group();

        this.antorchas.add(new Antorcha(this, 112, 555));
        this.antorchas.add(new Antorcha(this, 176, 555));
        this.antorchas.add(new Antorcha(this, 240, 555));
        this.antorchas.add(new Antorcha(this, 500, 600));
        this.antorchas.add(new Antorcha(this, 900, 500));
        this.antorchas.add(new Antorcha(this, 1200, 600));
        this.antorchas.add(new Antorcha(this, 1500, 600));
        this.antorchas.add(new Antorcha(this, 1900, 500));
        this.antorchas.add(new Antorcha(this, 2300, 400));
        this.antorchas.add(new Antorcha(this, 2700, 300));
        this.antorchas.add(new Antorcha(this, 2900, 260));
        this.antorchas.add(new Antorcha(this, 3100, 230));
        this.antorchas.add(new Antorcha(this, 3280, 335));
        this.antorchas.add(new Antorcha(this, 3800, 450));
        this.antorchas.add(new Antorcha(this, 4300, 600));
        this.antorchas.add(new Antorcha(this, 4850, 320));
        this.antorchas.add(new Antorcha(this, 5070, 160));
        this.antorchas.add(new Antorcha(this, 5500, 220));
        this.antorchas.add(new Antorcha(this, 6050, 132));
        this.antorchas.add(new Antorcha(this, 6600, 100));
        this.antorchas.add(new Antorcha(this, 8000, 500));
        this.antorchas.add(new Antorcha(this, 8500, 500));
        this.antorchas.add(new Antorcha(this, 9300, 1200));
        this.antorchas.add(new Antorcha(this, 9070, 1200));
        this.antorchas.add(new Antorcha(this, 9700, 600));
        this.antorchas.add(new Antorcha(this, 11700, 670));
        this.antorchas.add(new Antorcha(this, 12700, 400));
        this.antorchas.add(new Antorcha(this, 15060, 1000));

        this.antorchas.add(new Antorcha(this, 15330, 1080));
        this.antorchas.add(new Antorcha(this, 15400, 1080));
        this.antorchas.add(new Antorcha(this, 15470, 1080));
        this.antorchas.add(new Antorcha(this, 15540, 1080));
        this.antorchas.add(new Antorcha(this, 15610, 1080));
        this.antorchas.add(new Antorcha(this, 15680, 1080));
        this.antorchas.add(new Antorcha(this, 15750, 1080));

    
    }

}

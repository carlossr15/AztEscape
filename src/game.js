import Boot from './boot.js';
import End from './escenas/end.js';
import Map1 from './escenas/map.js';
import Map2 from './escenas/map2.js';
import menu from './escenas/menu.js';
import winMenu from './escenas/winMenu.js';
import loseMenu from './escenas/loseMenu.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    scale: {
        // mode: Phaser.Scale.FIT,      
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, menu, Map1, Map2, winMenu, loseMenu, End],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: true
        }
    }
};


new Phaser.Game(config);

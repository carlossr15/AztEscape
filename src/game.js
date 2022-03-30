import Boot from './boot.js';
import End from './end.js';
import Level from './level.js';
import MyMap from './map.js';
import menu from './menu.js';
import winMenu from './winMenu.js';
import loseMenu from './loseMenu.js';

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
    scene: [Boot, menu, MyMap, winMenu, loseMenu, End],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: false
        }
    }
};


new Phaser.Game(config);

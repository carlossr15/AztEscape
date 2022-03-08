import Boot from './boot.js';
import End from './end.js';
import Level from './level.js';
import MyMap from './map.js';
import menu from './menu.js';
import winMenu from './winMenu.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.CANVAS,
    width: 1000,
    height: 400,
    scale: {
        // mode: Phaser.Scale.FIT,      
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, menu, MyMap, winMenu, End],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: true
        }
    }
};

new Phaser.Game(config);

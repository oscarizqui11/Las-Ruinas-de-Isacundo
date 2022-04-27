import Phaser from 'phaser'

import Preloader from './Preloader.js'

const config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 720,
    physiscs: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [Preloader, Scene2]
};

var game = new Phaser.Game(config);
//var time = 0;

export default new Phaser.Game(config)

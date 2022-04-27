class Preloader extends Phaser.Scene{

    constructor(){
        super("preloader");
    }

    create(){
        this.add.text(20, 20, "Loading game...");
        this.scene.start("playGame");
    }
}
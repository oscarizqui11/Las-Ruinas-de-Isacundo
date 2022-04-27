class Scene2 extends Phaser.Scene{

    constructor(){
        super("playGame");
    }

    preload() {

        /* this.load.image('ground', 'assets/background-1.png');
        this.load.svg('player-car', 'assets/simple-travel-car-top_view.svg');
        this.load.image('player-gun', 'assets/Firing2__000.png');
        this.load.image('enemy', 'assets/Enemy3.png');
        this.load.image('plasma', 'assets/Plasma.png'); */
    
        //this.load.tilemap('basement', 'assets/Basement-1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/PC Computer - The Binding of Isaac Rebirth - Basement.png');
        this.load.tilemapTiledJSON('basement', 'assets/Basement-1.json');
    
    }

    create(){

        this.add.image(0,0, 'tiles');

        //const map = this.make.tilemap({ key: "basement", tileWidth: 52, tileHeight: 52 });
        //this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});
    }
}
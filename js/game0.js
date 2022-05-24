var config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var time = 0;


function preload() {

    /* this.load.image('ground', 'assets/background-1.png');
    this.load.svg('player-car', 'assets/simple-travel-car-top_view.svg');
    this.load.image('player-gun', 'assets/Firing2__000.png');
    this.load.image('enemy', 'assets/Enemy3.png');
    this.load.image('plasma', 'assets/Plasma.png'); */

    this.load.image('tiles', 'assets/PC Computer - The Binding of Isaac Rebirth - Basement.png');
    this.load.tilemapTiledJSON('basement', 'assets/Basement-18.json');
    animat = this.load.spritesheet('Isaac', './assets/IsaacHead.png', { frameWidth: 28, frameHeigth: 28 });

    console.log(animat);

}

function create() {

    /* enemyList = this.add.group();
    shotsList = this.add.group();

    CreateBackground.call(this);
    CreateCar.call(this);
    GenerateEnemy.call(this);*/
    //this.input.on('pointerdown', treatClick);
    
    
    SetKeys.call(this);

    // CREACION DE LA SALA

    const map = this.make.tilemap({ key: "basement", tileWidth: 52, tileHeight: 52 });
    const tileset = map.addTilesetImage('Basement-18', 'tiles');
    
    layerGround = map.createLayer('Ground', tileset);
    layerWalls = map.createLayer('Walls', tileset);
    
    layerGround.scaleX = 2;
    layerWalls.scaleX = 2;
    layerGround.scaleY = 2;
    layerWalls.scaleY = 2;

    layerWalls.setCollisionByExclusion(-1, true);

    this.physics.add.collider(
        layerWalls,
        this.player
    );

    //CREACION DEL ISAAC

    console.log(this.physics);

    player = this.physics.add.sprite(300, 450, 'Isaac');

    player.speed = 160;
    
    player.scaleX = 2;
    player.scaleY = 2;
    
    this.anims.create({
        key: 'down-shot',
        frames: this.anims.generateFrameNumbers('Isaac', { start: 0, end: 1 }),
        frameRate: 2,
        repeat: -1
    });
    this.anims.create({
        key: 'right-shot',
        frames: this.anims.generateFrameNumbers('Isaac', { start: 2, end: 3 }),
        frameRate: 2,
        repeat: -1
    });
    this.anims.create({
        key: 'up-shot',
        frames: this.anims.generateFrameNumbers('Isaac', { start: 4, end: 5 }),
        frameRate: 2,
        repeat: -1
    });
    this.anims.create({
        key: 'left-shot',
        frames: this.anims.generateFrameNumbers('Isaac', { start: 6, end: 7 }),
        frameRate: 2,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'Isaac', frame: 1 }],
        frameRate: 2
    });
    player.anims.play('left-shot');
    
}

function update() {
    
    this.physics.collide(player, layerWalls);

    if (keyW.isDown) {
        player.anims.play('up-shot');
        player.setVelocityY(-player.speed);
        //UpdatePlayerGun.call(this);
    }
    if (keyA.isDown) {
        player.anims.play('left-shot');
        player.setVelocityX(-player.speed);
        //UpdatePlayerGun.call(this);
    }
    if (keyS.isDown) {
        player.anims.play('down-shot');
        player.setVelocityY(player.speed);
        //UpdatePlayerGun.call(this);
    }
    if (keyD.isDown) {
        player.anims.play('right-shot');
        player.setVelocityX(player.speed);
        //UpdatePlayerGun.call(this);
    }
    if(keyW.isUp && keyS.isUp)
    {
        player.setVelocityY(0);
    }
    if(keyA.isUp && keyD.isUp)
    {
        player.setVelocityX(0);
    }
    if (keySpace.isDown) {
        //Shoot.call(this);
    }

    /* if (time >= 60) {
        time = 0;
    } */

    //MoveEnemies.call(this);
    //MoveShots.call(this);

}

function SetKeys() {
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}
/*
function treatClick(pointer) {
    playerCar.x = pointer.x;
    playerCar.y = pointer.y;
    playerGun.x = pointer.x;
    playerGun.y = pointer.y;
}

function CreateBackground() {
    background = this.add.sprite(0, 0, 'ground');
    background.setOrigin(0, 0);
}

function CreateCar() {
    playerCar = this.add.image(config.width / 2, config.height / 2, 'player-car');
    playerCar.setScale(0.15);
    playerGun = this.add.image(playerCar.x, playerCar.y, 'player-gun');
    playerGun.setScale(0.6);

    playerCar.angle = 270;
    playerGun.angle = 270;
}

function UpdatePlayerGun() {
    playerGun.angle = playerCar.angle;
}

function GenerateEnemy() {
    //enemyCar = this.add.image(0, 0, 'enemy');
    enemyCar = enemyList.create(0, 0, 'enemy');
    enemyCar.angle = 270;
    enemyCar.x = Phaser.Math.Between(enemyCar.height * enemyCar.scale / 2, config.width - enemyCar.height * enemyCar.scale / 2);
    enemyCar.y = config.height + enemyCar.width * enemyCar.scale / 2;
    enemyCar.velocity = Phaser.Math.Between(5, 8);
}

function MoveEnemy(enemy) {
    enemy.y -= enemy.velocity;
}

function MoveEnemies() {
    Phaser.Actions.Call(enemyList.getChildren(), MoveEnemy);
}

function Shoot() {
    plasmaShot = shotsList.create(0, 0, 'plasma');
    plasmaShot.setScale(0.6);
    plasmaShot.setOrigin(0.48, 1.5);
    plasmaShot.angle = playerCar.angle - 270;
    plasmaShot.x = playerGun.x;
    plasmaShot.y = playerGun.y;
    plasmaShot.velocity = 10;
    plasmaShot.direccion = new Phaser.Math.Vector2(Math.cos(degsToRads(playerGun.angle)), Math.sin(degsToRads(playerGun.angle)));
    plasmaShot.direccion.normalize();
}

function MoveShot(shot) {
    console.log(shot);
    shot.x += shot.velocity * shot.direccion.x;
    shot.y += shot.velocity * shot.direccion.y;
}

function MoveShots() {
    Phaser.Actions.Call(shotsList.getChildren(), MoveShot);
}
 */
const degsToRads = deg => (deg * Math.PI) / 180.0;

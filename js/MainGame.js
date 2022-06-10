

class IsaacState {

    static IDLE = new IsaacState("idle");
    static UP = new IsaacState("up");
    static DOWN = new IsaacState("down");
    static LEFT = new IsaacState("left");
    static RIGHT = new IsaacState("right");

    constructor(name) {
        this.name = name;
    }
}

var time = 0;
var bodyState = IsaacState.IDLE;
var headState = IsaacState.IDLE;

var prevShotUp = false;
var prevShotDown = false;
var prevShotLeft = false;
var prevShotRight = false;

var layerGround;
var layerWalls;
var tearsList;
var player;

var CacaList;
var layerRocas;
var enemyTearsList;
var hitEnemy;
var hitPlayer;
var caca;
var timer;
var delay;

class OscarScene extends Phaser.Scene {
    
    preload() {
        
        /* this.load.image('ground', 'assets/background-1.png');
        this.load.svg('player-car', 'assets/simple-travel-car-top_view.svg');
        this.load.image('player-gun', 'assets/Firing2__000.png');
        this.load.image('enemy', 'assets/Enemy3.png');
        this.load.image('plasma', 'assets/Plasma.png'); */
        
        this.load.image('tiles', 'assets/PC Computer - The Binding of Isaac Rebirth - Basement.png');
        this.load.tilemapTiledJSON('basement', 'assets/Basement-18-2.json');
        this.load.spritesheet('IsaacHead', './assets/IsaacHead.png', { frameWidth: 28, frameHeigth: 28 });
        this.load.spritesheet('IsaacBodyVer', './assets/IsaacBodyVer.png', { frameWidth: 18, frameHeigth: 18 });
        this.load.spritesheet('IsaacBodyHor', './assets/IsaacBodyHor.png', { frameWidth: 18, frameHeigth: 18 });
        this.load.image('Tear', './assets/tear.png');
    }
    
    create() {

        this.input.once('pointerdown', function () {
        
            console.log("cambio de escena")
            this.scene.add('alberto-scene', AlbertoScene, true, { x: 400, y: 300 });

        }, this);
        
        /* enemyList = this.add.group();
        shotsList = this.add.group();
        
        CreateBackground.call(this);
        CreateCar.call(this);
        GenerateEnemy.call(this);*/
        //this.input.on('pointerdown', treatClick);
        
        
        SetKeys.call(this);

        // CREACION DE LA SALA
        
        const map = this.make.tilemap({ key: "basement", tileWidth: 52, tileHeight: 52 });
        const tileset = map.addTilesetImage('PC Computer - The Binding of Isaac Rebirth - Basement', 'tiles');
        
        layerGround = map.createLayer('Ground', tileset);
        layerWalls = map.createLayer('Walls', tileset);
        
        layerGround.scaleX = 2;
        layerWalls.scaleX = 2;
        layerGround.scaleY = 2;
        layerWalls.scaleY = 2;
        
        layerWalls.setCollisionByProperty({ collides: true });
        tearsList = this.physics.add.group();
        
        this.physics.add.collider(
            layerWalls,
            this.player
            );
            
            this.physics.add.overlap(tearsList, layerWalls, bulletCollide, null, this);
            
            //CREACION DEL ISAAC
            
            
            console.log(this.physics.add);
            
            player = this.physics.add;
            
            
            player = this.physics.add.sprite(300, 450, 'IsaacBodyVer');
            player.body.setSize(18, 14);
            player.body.offset.y = -1;
            
            player.head = player.scene.add.sprite(player.x, player.y - 30, 'IsaacHead');
            console.log(player.head);
            
            player.speed = 180;
            
            player.scaleX = 2;
            player.scaleY = 2;
        player.head.scaleX = player.scaleX;
        player.head.scaleY = player.scaleY;
        
        this.anims.create({
            key: 'ver-walk',
            frames: this.anims.generateFrameNumbers('IsaacBodyVer', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hor-walk',
            frames: this.anims.generateFrameNumbers('IsaacBodyHor', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'down-shot',
            frames: this.anims.generateFrameNumbers('IsaacHead', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'right-shot',
            frames: this.anims.generateFrameNumbers('IsaacHead', { start: 2, end: 3 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'up-shot',
            frames: this.anims.generateFrameNumbers('IsaacHead', { start: 4, end: 5 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'left-shot',
            frames: this.anims.generateFrameNumbers('IsaacHead', { start: 6, end: 7 }),
            frameRate: 2,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'IsaacHead', frame: 1 }],
            frameRate: 2
        });
        
        resetIsaacAnims();
        
    }
    
    update() {

        this.physics.collide(player, layerWalls);

        UpdatePlayerMovement();
        UpdatePrevShotInputs();
        UpdatePlayerShooting();
        
        MoveShots.call(this);

        //console.log(bodyState);
        
        if (keySpace.isDown) {
            //Shoot.call(this);
        }
        
        player.head.x = player.x;
        player.head.y = player.y - 30;
        
        /* if (time >= 60) {
            time = 0;
        } */
        
        //MoveEnemies.call(this);
        //MoveShots.call(this);
        
    }
}

class AlbertoScene extends Phaser.Scene {
    preload() {

        /* this.load.image('ground', 'assets/background-1.png');
        this.load.svg('player-car', 'assets/simple-travel-car-top_view.svg');
        this.load.image('player-gun', 'assets/Firing2__000.png');
        this.load.image('enemy', 'assets/Enemy3.png');
        this.load.image('plasma', 'assets/Plasma.png'); */
    
        this.load.image('tiles-cuevas', 'assets/caves.png');
        this.load.image('Caca', 'assets/caca.png');
        this.load.image('Boss', 'assets/cacaBoss.png');
        this.load.tilemapTiledJSON('cuevas', 'assets/Caves.json');
        this.load.spritesheet('IsaacHead', './assets/IsaacHead.png', { frameWidth: 28, frameHeigth: 28 });
        this.load.spritesheet('IsaacBodyVer', './assets/IsaacBodyVer.png', { frameWidth: 18, frameHeigth: 18 });
        this.load.spritesheet('IsaacBodyHor', './assets/IsaacBodyHor.png', { frameWidth: 18, frameHeigth: 18 });
        this.load.image('Tear', './assets/tear.png');
        
    }
    
    create() {
    
        /* enemyList = this.add.group();
        shotsList = this.add.group();
    
        CreateBackground.call(this);
        CreateCar.call(this);
        GenerateEnemy.call(this);*/
        //this.input.on('pointerdown', treatClick);
    
        CacaList = this.add.group();
        
        SetKeys.call(this);
    
        // CREACION DE LA SALA
    
        const map = this.make.tilemap({ key: "cuevas", tileWidth: 52, tileHeight: 52 });
        const tileset = map.addTilesetImage('146181', 'tiles-cuevas');
        
    
        layerGround = map.createLayer('Ground', tileset);
        layerWalls = map.createLayer('Walls', tileset);
        layerRocas = map.createLayer('Rocas', tileset);
    
        layerGround.scaleX = 2;
        layerWalls.scaleX = 2;
        layerGround.scaleY = 2;
        layerWalls.scaleY = 2;
    
        layerWalls.setCollisionByProperty({collides: true});
        layerRocas.setCollisionByProperty({collides: true});
        tearsList = this.physics.add.group();
        enemyTearsList = this.physics.add.group();
    
        this.physics.add.collider(
            layerWalls,
            layerRocas,
            this.player
        );
    
        this.physics.add.overlap(tearsList, layerWalls, bulletCollide, null, this);
        this.physics.add.overlap(tearsList, layerRocas, bulletCollide, null, this);
        this.physics.add.overlap(tearsList, CacaList, hitEnemy, null, this);
        
    
        
        
        
        
    
        //CREACION DEL ISAAC
    
    
        
    
        player = this.physics.add;
    
    
        player = this.physics.add.sprite(300, 450, 'IsaacBodyVer');
        
        player.body.setSize(18, 14);
        player.body.offset.y = -1;
        player.hp=3
        player.head = player.scene.add.sprite(player.x, player.y - 30, 'IsaacHead');
       
        this.physics.add.overlap(enemyTearsList, player, hitPlayer, null, this);
        player.speed = 200;
    
        player.scaleX = 2;
        player.scaleY = 2;
        player.head.scaleX = player.scaleX;
        player.head.scaleY = player.scaleY;
        
        this.physics.add.overlap(enemyTearsList, player, hitEnemy, null, this);
    
        this.anims.create({
            key: 'ver-walk',
            frames: this.anims.generateFrameNumbers('IsaacBodyVer', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'hor-walk',
            frames: this.anims.generateFrameNumbers('IsaacBodyHor', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'down-shot',
            frames: this.anims.generateFrameNumbers('IsaacHead', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'right-shot',
            frames: this.anims.generateFrameNumbers('IsaacHead', { start: 2, end: 3 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'up-shot',
            frames: this.anims.generateFrameNumbers('IsaacHead', { start: 4, end: 5 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'left-shot',
            frames: this.anims.generateFrameNumbers('IsaacHead', { start: 6, end: 7 }),
            frameRate: 2,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'IsaacHead', frame: 1 }],
            frameRate: 2
        });
    
        resetIsaacAnims();
    
        function CreateEnemy(positionX, positionY,objective, physics)
        {
       
            caca = physics.add.sprite(0,0, 'Caca');
            caca.setOrigin(0.5,0.5);
            caca.vel = 150;
            caca.delay=1
            caca.timer=0;
            caca.objective = objective;
            caca.x=positionX;
            caca.y=positionY;
            caca.hp=3
            
            caca.caca=caca
            CacaList.add(caca);
        }
    
        function CreateBoss(positionX, positionY,objective, physics)
        {
       
            caca = physics.add.sprite(0,0, 'Boss');
            caca.setOrigin(0.5,0.5);
            caca.vel = 150;
            caca.delay=1
            caca.timer=0;
            caca.objective = objective;
            caca.x=positionX;
            caca.y=positionY;
            caca.hp=10
            
            caca.caca=caca
            CacaList.add(caca);
        }
    
        CreateEnemy(100,200,player, this.physics);
        CreateEnemy(300,200,player, this.physics);
        CreateEnemy(400,200,player, this.physics);
        CreateBoss(500,100,player,this.physics);
        //CreateEnemy(200,500,player, this.physics);
        //CreateEnemy(400,100,player, this.physics);
    
    }
    
    
    
    update(time,delta) {
    
    
        timer += (1*delta)/1000;
        
    
        this.physics.collide(player, layerWalls);
        this.physics.collide(player, layerRocas);
    
        UpdatePlayerMovement();
        UpdatePrevShotInputs();
        UpdatePlayerShooting();
        
        for( var i=0; i<CacaList.getChildren().length; i++){
           
            CacaList.getChildren()[i].caca.timer+=(1*delta)/1000;
            
        }
    
        MoveShots.call(this);
        MoveEnemies.call(this);
        ShootEnemies.call(this)
    
        //console.log(bodyState);
    
        if (keySpace.isDown) {
            //Shoot.call(this);
        }
    
        player.head.x = player.x;
        player.head.y = player.y - 30;
    
        /* if (time >= 60) {
            time = 0;
        } */
    
        //MoveEnemies.call(this);
        //MoveShots.call(this);
       
    
        if (keyUp.isDown || keyDown.isDown || keyRight.isDown || keyLeft.isDown)
        {
            this.time = this.time + delay / 1000.0;
            if (this.time >= delay)
            {
                this.time = 0;
                if (keyUp.isDown)
                {
                    return this.tearshoot(1);
                }
                else if (keyDown.isDown)
                {
                    return Shoot(player.head, new Phaser.Math.Vector2(0, 1), 400);
                }
                else if (keyRight.isDown)
                {
                    return this.tearshoot(3);
                }
                else if (keyLeft.isDown)
                {
                    return this.tearshoot(4);
                }
            }
        }
        return undefined;
    
    }
}

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
    scene: OscarScene
};

var game = new Phaser.Game(config);


function SetKeys() {
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function resetIsaacAnims() {
    if (headState == IsaacState.IDLE) {
        player.head.anims.play('down-shot');
        player.head.anims.pause(player.head.anims.currentAnim.frames[0]);
    }
    player.anims.play('ver-walk');
    player.anims.pause(player.anims.currentAnim.frames[0]);
}

function UpdatePlayerMovement() {

    switch (bodyState) {

        case IsaacState.IDLE:
            if (keyW.isDown && !keyS.isDown) {
                bodyState = IsaacState.UP;
            }
            else if (keyS.isDown && !keyW.isDown) {
                bodyState = IsaacState.DOWN;
            }
            else if (keyA.isDown && !keyD.isDown) {
                bodyState = IsaacState.LEFT;
            }
            else if (keyD.isDown && !keyA.isDown) {
                bodyState = IsaacState.RIGHT;
            }
            resetIsaacAnims();
            player.setVelocityY(0);
            player.setVelocityX(0);
            break;

        case IsaacState.UP:
            if (keyW.isUp) {
                bodyState = IsaacState.IDLE;
            }
            else if (keyS.isDown) {
                bodyState = IsaacState.IDLE;
            }
            if (keyA.isDown) {
                player.setVelocityX(-player.speed);
            }
            else if (keyD.isDown) {
                player.setVelocityX(player.speed);
            }
            if (keyA.isUp && keyD.isUp || keyA.isDown && keyD.isDown) {
                player.setVelocityX(0);
            }
            if (player.anims.currentAnim.key != 'ver-walk' || !player.anims.isPlaying) {
                player.anims.play('ver-walk');
                if (!prevShotDown && !prevShotLeft && !prevShotRight && !prevShotUp) {
                    player.head.anims.play('up-shot');
                    player.head.anims.pause(player.head.anims.currentAnim.frames[0]);
                }
            }
            player.setVelocityY(-player.speed);
            break;

        case IsaacState.DOWN:
            if (keyS.isUp) {
                bodyState = IsaacState.IDLE;
            }
            else if (keyW.isDown) {
                bodyState = IsaacState.IDLE;
            }
            if (keyA.isDown) {
                player.setVelocityX(-player.speed);
            }
            else if (keyD.isDown) {
                player.setVelocityX(player.speed);
            }
            if (keyA.isUp && keyD.isUp || keyA.isDown && keyD.isDown) {
                player.setVelocityX(0);
            }
            if (player.anims.currentAnim.key != 'ver-walk' || !player.anims.isPlaying) {
                player.anims.play('ver-walk');
                if (!prevShotDown && !prevShotLeft && !prevShotRight && !prevShotUp) {
                    player.head.anims.play('down-shot');
                    player.head.anims.pause(player.head.anims.currentAnim.frames[0]);
                }
            }
            player.setVelocityY(player.speed);
            break;

        case IsaacState.LEFT:
            if (keyA.isUp) {
                bodyState = IsaacState.IDLE;
            }
            else if (keyW.isDown && keyS.isUp) {
                bodyState = IsaacState.UP;
            }
            else if (keyS.isDown && keyW.isUp) {
                bodyState = IsaacState.DOWN;
            }
            else if (keyD.isDown) {
                bodyState = IsaacState.IDLE;
            }
            if (player.anims.currentAnim.key != 'hor-walk') {
                player.anims.play('hor-walk');
                player.flipX = true;
                if (!prevShotDown && !prevShotLeft && !prevShotRight && !prevShotUp) {
                    player.head.anims.play('left-shot');
                    player.head.anims.pause(player.head.anims.currentAnim.frames[0]);
                }
            }
            player.setVelocityX(-player.speed);
            break;

        case IsaacState.RIGHT:
            if (keyD.isUp) {
                bodyState = IsaacState.IDLE;
            }
            else if (keyW.isDown && keyS.isUp) {
                bodyState = IsaacState.UP;
            }
            else if (keyS.isDown && keyW.isUp) {
                bodyState = IsaacState.DOWN;
            }
            else if (keyA.isDown) {
                bodyState = IsaacState.IDLE;
            }
            if (player.anims.currentAnim.key != 'hor-walk') {
                player.anims.play('hor-walk');
                player.flipX = false;
                if (!prevShotDown && !prevShotLeft && !prevShotRight && !prevShotUp) {
                    player.head.anims.play('right-shot');
                    player.head.anims.pause(player.head.anims.currentAnim.frames[0]);
                }
            }
            player.setVelocityX(player.speed);
            break;

        default:
            bodyState = IsaacState.IDLE;
    }
}

function UpdatePlayerShooting() {

    switch (headState) {

        case IsaacState.IDLE:
            if (keyUp.isDown) {
                headState = IsaacState.UP;
            }
            else if (keyDown.isDown) {
                headState = IsaacState.DOWN;
            }
            else if (keyLeft.isDown) {
                headState = IsaacState.LEFT;
            }
            else if (keyRight.isDown) {
                headState = IsaacState.RIGHT;
            }
            if (bodyState == IsaacState.IDLE || bodyState == IsaacState.DOWN) {
                player.head.anims.play('down-shot');
                player.head.anims.pause(player.head.anims.currentAnim.frames[0]);
            }
            else if (bodyState == IsaacState.UP) {
                player.head.anims.play('up-shot');
                player.head.anims.pause(player.head.anims.currentAnim.frames[0]);
            }
            else if (bodyState == IsaacState.LEFT) {
                player.head.anims.play('left-shot');
                player.head.anims.pause(player.head.anims.currentAnim.frames[0]);
            }
            else if (bodyState == IsaacState.RIGHT) {
                player.head.anims.play('right-shot');
                player.head.anims.pause(player.head.anims.currentAnim.frames[0]);
            }
            break;

        case IsaacState.UP:
            if (keyUp.isUp) {
                headState = IsaacState.IDLE;
            }
            else if (keyDown.isDown && !prevShotDown) {
                headState = IsaacState.DOWN;
            }
            else if (keyLeft.isDown && !prevShotLeft) {
                headState = IsaacState.LEFT;
            }
            else if (keyRight.isDown && !prevShotRight) {
                headState = IsaacState.RIGHT;
            }
            if (player.head.anims.currentAnim.key != 'up-shot' || !player.head.anims.isPlaying) {
                player.head.anims.play('up-shot');
                prevShootUp = true;
            }
            console.log(this.physics);
            //tear = this.physics.add.image(player.head.x, player.head.y, 'Tear');
            //this.tearsList.add(tear);
            Shoot(player.head, new Phaser.Math.Vector2(0, -1), 400);
            break;

        case IsaacState.DOWN:
            if (keyUp.isDown && !prevShotUp) {
                headState = IsaacState.UP;
            }
            else if (keyDown.isUp) {
                headState = IsaacState.IDLE;
            }
            else if (keyLeft.isDown && !prevShotLeft) {
                headState = IsaacState.LEFT;
            }
            else if (keyRight.isDown && !prevShotRight) {
                headState = IsaacState.RIGHT;
            }
            if (player.head.anims.currentAnim.key != 'down-shot' || !player.head.anims.isPlaying) {
                player.head.anims.play('down-shot');
                prevShotDown = true;
            }
            Shoot(player.head, new Phaser.Math.Vector2(0, 1), 400);
            break;

        case IsaacState.LEFT:
            if (keyUp.isDown && !prevShotUp) {
                headState = IsaacState.UP;
            }
            else if (keyDown.isDown && !prevShotDown) {
                headState = IsaacState.DOWN;
            }
            else if (keyLeft.isUp) {
                headState = IsaacState.IDLE;
            }
            else if (keyRight.isDown && !prevShotRight) {
                headState = IsaacState.RIGHT;
            }
            if (player.head.anims.currentAnim.key != 'left-shot' || !player.head.anims.isPlaying) {
                player.head.anims.play('left-shot');
                prevShotLeft = true;
            }
            Shoot(player.head, new Phaser.Math.Vector2(-1, 0), 400);
            break;

        case IsaacState.RIGHT:
            if (keyUp.isDown && !prevShotUp) {
                headState = IsaacState.UP;
            }
            else if (keyDown.isDown && !prevShotDown) {
                headState = IsaacState.DOWN;
            }
            else if (keyLeft.isDown && !prevShotLeft) {
                headState = IsaacState.LEFT;
            }
            else if (keyRight.isUp) {
                headState = IsaacState.IDLE;
            }
            if (player.head.anims.currentAnim.key != 'right-shot' || !player.head.anims.isPlaying) {
                player.head.anims.play('right-shot');
                prevShotRight = true;
            }
            Shoot(player.head, new Phaser.Math.Vector2(1, 0), 400);
            break;

        default:
            bodyState = IsaacState.IDLE;
    }
}

function UpdatePrevShotInputs() {

    if (prevShotUp) {
        if (keyUp.isUp) {
            prevShotUp = false;
        }
    }
    if (prevShotDown) {
        if (keyDown.isDown) {
            prevShotDown = false;
        }
    }
    if (prevShotLeft) {
        if (keyLeft.isLeft) {
            prevShotLeft = false;
        }
    }
    if (prevShotRight) {
        if (keyRight.isRight) {
            prevShotRight = false;
        }
    }
}

function Shoot(shooter, dir, vel) {
    lloro = tearsList.create(shooter.x, shooter.y, 'Tear');
    console.log(lloro)
    lloro.dir = dir;
    lloro.vel = vel;
    lloro.dmg=1
    //timer = game.time.create(1000, false);timer.add(3000);timer.onEvent.add(doSomething, this);timer.start();
}

function EnemyShoot(shooter, dir, vel) {
    
    lloro = enemyTearsList.create(shooter.x, shooter.y, 'Tear');
    console.log(lloro)
    lloro.dir = dir;
    lloro.vel = vel;
    lloro.dmg=1
    //timer = game.time.create(1000, false);timer.add(3000);timer.onEvent.add(doSomething, this);timer.start();
}

function MoveShots() {
    Phaser.Actions.Call(tearsList.getChildren(), MoveShot);
    //Phaser.Actions.Call(enemyTearsList.getChildren(), MoveShot);
}

function MoveShot(shot) {
    shot.body.setVelocityX(shot.dir.x * shot.vel);
    shot.body.setVelocityY(shot.dir.y * shot.vel);    
}

function MoveEnemies() {
    Phaser.Actions.Call(CacaList.getChildren(), MoveEnemy)
}

function MoveEnemy(enemy) {


   
    var dir = new Phaser.Math.Vector2(0,0)
    dir.x=enemy.caca.objective.x - enemy.caca.x;
    dir.y=enemy.caca.objective.y -enemy.caca.y;
    dir.normalize()
    enemy.body.setVelocityX((dir.x) * enemy.caca.vel);
    enemy.body.setVelocityY((dir.y ) * enemy.caca.vel);    
}
function ShootEnemies() {
    Phaser.Actions.Call(CacaList.getChildren(), ShootEnemy)
}

function ShootEnemy(enemy) {

    if(enemy.caca.timer>enemy.caca.delay){
        
        enemy.caca.timer=0;
        var dir = new Phaser.Math.Vector2(0,0)
        dir.x=enemy.caca.objective.x - enemy.caca.x;
        dir.y=enemy.caca.objective.y -enemy.caca.y;
        dir.normalize()
        EnemyShoot(enemy.caca, dir, 400)    
    }
    
}

function bulletCollide(bullet, wall)
{
    if(bullet.scene == this && wall.collides)
    {
        tearsList.remove(bullet);
        bullet.destroy();
    }
}
function hitEnemy(enemy, bullet)
{
    if(bullet.scene == this)
    {
  
        enemy.caca.hp-=bullet.dmg
        if(enemy.caca.hp<=0){
            CacaList.remove(enemy)
            enemy.destroy()
        }
        tearsList.remove(bullet);
        bullet.destroy();
    }
}

function hitPlayer(player, bullet)
{
    if(bullet.scene == this)
    {
        player.hp-=bullet.dmg
        if(player.hp<=0){
            this.scene.restart()
        }
        enemyTearsList.remove(bullet);
        bullet.destroy();
    }
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

import EnemyMove from './EnemyMove.js'
export default class Enemy
{
	constructor(scene,x , y, d, speed)
	{
		this.scene = scene;
		this.speed = speed;
		this.damage = d;
		this.direction;
		
		this.timeDirection = 1;
		this.timer1 = this.timeDirection;
	

		this.collision = scene.physics.add.sprite(x, y, 'AtlasPoop', 'Poop1').setSize(15, 15).setOffset(9,9);

		this.collision.move = new EnemyMove(this.scene, this.speed, this.direction, this.collision);
		
		const anims = scene.anims;

		anims.create({
	    	key: 'PoopMove',
	    	frames: anims.generateFrameNames('AtlasPoop',{
	    		prefix: 'Poop',
	    		start: 1,
	    		end: 5,
	    		zeroPad: 0,
	    	}),
	    	frameRate:7,
	    	repeat: -1,
	    });
	}

	update(time, delta)
	{
		if(!this.collision.life.isDead)
		{
			this.timer1 = this.timer1 + delta / 1000;

			if (this.timer1 > this.timeDirection)
			{
				this.timer1 = 0;
				this.dir = new Phaser.Math.Vector2(Phaser.Math.Between(-10, 10), Phaser.Math.Between(-10, 10));
				this.dir.normalize();
			}
			this.collision.move.MoveDir(this.dir);
			this.timer2 = 0;
			this.collision.anims.play('PoopMove', true);
		}
	}
}
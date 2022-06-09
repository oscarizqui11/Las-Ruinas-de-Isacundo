export default class EnemyMove
{
    constructor(scene, speed, dir, object)
    {
        this.scene = scene;
        this.speed = speed;
        this.direction = dir;
        this.object = object;
    }

    MoveDir(direction)
    {
        this.object.body.setVelocityX(direction.x*this.speed);
        this.object.body.setVelocityY(direction.y*this.speed);
    }

    Move()
    {
        this.object.body.setVelocityX(this.direction.x*this.speed);
        this.object.body.setVelocityY(this.direction.y*this.speed);
    }

    SetDirection(direction)
    {
        this.direction = direction;
    }

    SetPosition(pX, pY)
    {
        this.x = pX;
        this.y = pY;
    }
}
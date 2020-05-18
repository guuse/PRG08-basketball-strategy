class Main {
    private balls: Ball[] = [];
    private basketBall: Ball;
    private fullScreen: number = window.innerWidth;
    private halfScreen: number = window.innerWidth / 2;

    constructor() {
        this.balls.push(new Ball(0, this.halfScreen, new Bouncing()));
        this.balls.push(new Ball(this.halfScreen, this.fullScreen, new Space()));
        this.basketBall = new Ball(0, this.fullScreen, new Space(), true);
        this.gameLoop()
    }

    gameLoop() {
        for (const ball of this.balls) {
            ball.update();
        }

        if (this.basketBall.x < this.halfScreen) {
            this.basketBall.setBehavior(new Bouncing());
        }
        else {
            this.basketBall.setBehavior(new Space());
        }

        this.basketBall.update();

        requestAnimationFrame(() => this.gameLoop());
    }
}

window.addEventListener("load", () => new Main());

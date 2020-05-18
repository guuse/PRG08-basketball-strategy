"use strict";
class Ball extends HTMLElement {
    constructor(minWidth, maxWidth, behavior, isBasketBall = false) {
        super();
        this.gravity = 0.1;
        this.friction = 0.9;
        this._x = 0;
        this._y = 0;
        this._speedX = 5;
        this._speedY = -3;
        this._minWidth = 0;
        this._maxWidth = 0;
        this._maxHeight = 0;
        if (isBasketBall) {
            this.classList.add("basketball");
        }
        this.ballBehavior = behavior;
        let content = document.getElementsByTagName("content")[0];
        content.appendChild(this);
        maxWidth -= this.clientWidth;
        this.x = (Math.random() * (maxWidth - minWidth)) + minWidth;
        this.y = 100;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.maxHeight = window.innerHeight - this.clientHeight;
    }
    get x() { return this._x; }
    set x(value) { this._x = value; }
    get y() { return this._y; }
    set y(value) { this._y = value; }
    get speedX() { return this._speedX; }
    set speedX(value) { this._speedX = value; }
    get speedY() { return this._speedY; }
    set speedY(value) { this._speedY = value; }
    get minWidth() { return this._minWidth; }
    set minWidth(value) { this._minWidth = value; }
    get maxWidth() { return this._maxWidth; }
    set maxWidth(value) { this._maxWidth = value; }
    get maxHeight() { return this._maxHeight; }
    set maxHeight(value) { this._maxHeight = value; }
    setBehavior(behavior) {
        this.ballBehavior = behavior;
    }
    update() {
        this.ballBehavior.performUpdate(this);
    }
    draw() {
        this.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
}
window.customElements.define("ball-component", Ball);
class Bouncing {
    performUpdate(ball) {
        if (ball.x < ball.minWidth) {
            ball.x = ball.minWidth;
            ball.speedX *= -1;
            ball.speedX *= ball.friction;
        }
        if (ball.x > ball.maxWidth) {
            ball.x = ball.maxWidth;
            ball.speedX *= -1;
            ball.speedX *= ball.friction;
        }
        if (ball.y + ball.speedY > ball.maxHeight) {
            ball.y = ball.maxHeight;
            ball.speedY *= -1;
            ball.speedY *= ball.friction;
            ball.speedX *= ball.friction;
        }
        else {
            ball.speedY += ball.gravity;
        }
        ball.x += ball.speedX;
        ball.y += ball.speedY;
        ball.draw();
    }
}
class Main {
    constructor() {
        this.balls = [];
        this.fullScreen = window.innerWidth;
        this.halfScreen = window.innerWidth / 2;
        this.balls.push(new Ball(0, this.halfScreen, new Bouncing()));
        this.balls.push(new Ball(this.halfScreen, this.fullScreen, new Space()));
        this.basketBall = new Ball(0, this.fullScreen, new Space(), true);
        this.gameLoop();
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
class Space {
    performUpdate(ball) {
        ball.x += ball.speedX;
        ball.y += ball.speedY;
        if (ball.x < ball.minWidth || ball.x > ball.maxWidth) {
            ball.speedX *= -1;
        }
        if (ball.y < 0 || ball.y > ball.maxHeight) {
            ball.speedY *= -1;
        }
        ball.draw();
    }
}
//# sourceMappingURL=main.js.map
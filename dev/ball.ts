class Ball extends HTMLElement {
    readonly gravity: number = 0.1;
    readonly friction: number = 0.9;

    private _x: number = 0;
    private _y: number = 0;
    private _speedX: number = 5;
    private _speedY: number = -3;
    private _minWidth: number = 0;
    private _maxWidth: number = 0;
    private _maxHeight: number = 0;

    public get x(): number {return this._x;}
    public set x(value: number) {this._x = value;}
    public get y(): number {return this._y;}
    public set y(value: number) {this._y = value;}
    public get speedX(): number {return this._speedX;}
    public set speedX(value: number) {this._speedX = value;}
    public get speedY(): number {return this._speedY;}
    public set speedY(value: number) {this._speedY = value;}
    public get minWidth(): number {return this._minWidth;}
    public set minWidth(value: number) {this._minWidth = value;}
    public get maxWidth(): number {return this._maxWidth;}
    public set maxWidth(value: number) {this._maxWidth = value;}
    public get maxHeight(): number {return this._maxHeight;}
    public set maxHeight(value: number) {this._maxHeight = value;}

    private ballBehavior: ballBehaviour;

    public setBehavior(behavior: ballBehaviour) {
        this.ballBehavior = behavior;
    }

    constructor(minWidth: number, maxWidth: number, behavior: ballBehaviour, isBasketBall: boolean = false) {
        super();

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

    public update(): void {
        this.ballBehavior.performUpdate(this);
    }

    public draw() {
        this.style.transform = "translate(" + this.x + "px, " + this.y + "px)"
    }
}

window.customElements.define("ball-component", Ball as any);

//IMPORT
import * as PIXI from "pixi.js";

import background from "./images/forest.png"
import levelOne from "./images/levelshow1.png"

export class Levels {

    public pixi: PIXI.Application;
    public loader: PIXI.Loader;

    public background: PIXI.Sprite;
    public levelOne: PIXI.Sprite;

    constructor() {

        //PIXI CANVAS
        this.pixi = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            forceCanvas: true
        });
        document.body.appendChild(this.pixi.view);

        //LOADER
        this.loader = new PIXI.Loader();
        this.loader
            .add("bgTexture", background)
            .add("levelOneTexture", levelOne)

        this.loader.load(() => this.loadCompleted());

    }

    loadCompleted() {

        //ADDING THE BACKGROUND
        this.background = new PIXI.Sprite(this.loader.resources["bgTexture"].texture!);
        this.background.scale.set(
            window.innerWidth / this.background.getBounds().width,
            window.innerHeight / this.background.getBounds().height
        );
        this.pixi.stage.addChild(this.background);

        //LEVEL ONE
        this.levelOne = new PIXI.Sprite(this.loader.resources["levelOneTexture"].texture!)
        this.levelOne.scale.set(0.7, 0.7)
        this.levelOne.x = 50
        this.levelOne.y = 100
        this.levelOne.interactive = true
        this.levelOne.buttonMode = true
        this.levelOne.on('pointerdown', () => this.onClick())

        this.pixi.stage.addChild(this.levelOne);

    }

    onClick() {
        console.log("klik")
        window.location.href = "level1index.html"
    }

}
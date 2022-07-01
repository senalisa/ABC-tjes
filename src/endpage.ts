//IMPORT
import * as PIXI from "pixi.js";

//IMPORT PHOTOS
import background from "./images/endpage.jpg"
import crown from "./images/crown.png"
import hero from "./images/superhero.png"

export class End {

    public pixi: PIXI.Application;
    public loader: PIXI.Loader;

    public background: PIXI.Sprite;
    public crown: PIXI.Sprite;
    public hero: PIXI.Sprite;

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
            .add("crownTexture", crown)
            .add("heroTexture", hero)

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
        this.crown = new PIXI.Sprite(this.loader.resources["crownTexture"].texture!)
        this.crown.scale.set(0.7, 0.7)
        this.crown.x = 50
        this.crown.y = 100
        this.pixi.stage.addChild(this.crown);

        //LEVEL TWO
        this.hero = new PIXI.Sprite(this.loader.resources["levelTwoTexture"].texture!)
        this.hero.scale.set(0.7, 0.7)
        this.hero.x = 760
        this.hero.y = 100
        this.pixi.stage.addChild(this.hero);
    }
}


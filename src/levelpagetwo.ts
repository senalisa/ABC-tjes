//IMPORT
import * as PIXI from "pixi.js";

import background from "./images/forest.png"
import levelOne from "./images/levelshow1.png"
import levelTwo from "./images/levelshow2.png"

//IMPORT SOUND
import LevelSound from "url:./sound/startschermsound.mp3";
import LevelvoiceSound2 from "url:./sound/voicelevel2.mp3";


export class Levels {

    public pixi: PIXI.Application;
    public loader: PIXI.Loader;

    public background!: PIXI.Sprite;
    public levelOne!: PIXI.Sprite;
    public levelTwo!: PIXI.Sprite;

    public LevelSound!: HTMLAudioElement
    public LevelvoiceSound2!: HTMLAudioElement


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
            .add("levelTwoTexture", levelTwo)

            .add("LevelSound", LevelSound)
            .add("LevelvoiceSound2", LevelvoiceSound2)

        this.loader.load(() => this.loadCompleted());

        //  MOUSE CURSOR TRACKER
        document.addEventListener("mousemove", (e: MouseEvent) => this.mouseMoveHandler(e));

    }

    loadCompleted() {

        //ADDING THE BACKGROUND
        this.background = new PIXI.Sprite(this.loader.resources["bgTexture"].texture!);
        this.background.scale.set(
            window.innerWidth / this.background.getBounds().width,
            window.innerHeight / this.background.getBounds().height
        );
        this.pixi.stage.addChild(this.background);



        //SOUND
        this.LevelSound = this.loader.resources["LevelSound"].data!
        this.LevelSound.volume = 0.5
        this.LevelvoiceSound2 = this.loader.resources["LevelvoiceSound2"].data!

        //PLAY SOUND
        this.LevelSound.play();
        this.LevelvoiceSound2.play();

        //LEVEL ONE
        this.levelOne = new PIXI.Sprite(this.loader.resources["levelOneTexture"].texture!)
        this.levelOne.scale.set(0.7, 0.7)
        this.levelOne.x = 50
        this.levelOne.y = 100
        //this.levelOne.interactive = true
        //this.levelOne.buttonMode = true
        //this.levelOne.on('pointerdown', () => this.onClick())

        this.pixi.stage.addChild(this.levelOne);

        //LEVEL TWO
        this.levelTwo = new PIXI.Sprite(this.loader.resources["levelTwoTexture"].texture!)
        this.levelTwo.scale.set(0.7, 0.7)
        this.levelTwo.x = 760
        this.levelTwo.y = 100
        this.levelTwo.interactive = true
        this.levelTwo.buttonMode = true
        this.levelTwo.on('pointerdown', () => this.onClick2())

        this.pixi.stage.addChild(this.levelTwo);


    }

    // MOUSE CURSOR
    mouseMoveHandler(e: MouseEvent) {
        var relativeY = e.clientY - this.pixi.screen.top

        if (relativeY > 0 && relativeY < this.pixi.screen.height) {
            this.LevelSound.play()
            this.LevelvoiceSound2.play()


        }
    }

    // onClick() {
    //     console.log("klik")
    //     window.location.href = "level1index.html"
    // }

    onClick2() {
        console.log("klik")
        window.location.href = "level2index.html"
    }

}
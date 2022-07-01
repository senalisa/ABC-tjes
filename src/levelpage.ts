//IMPORT
import * as PIXI from "pixi.js";

//IMPORT PHOTOS
import background from "./images/forest.png"
import levelOne from "./images/levelshow1.png"
import levelTwo from "./images/levelshow2.png"
import keyLock from "./images/lock.png"

//IMPORT SOUND
import levelSound from "url:./sound/startschermsound.mp3";
import levelVoiceSound from "url:./sound/voicelevel1.mp3";

export class Levels {

    public pixi: PIXI.Application;
    public loader: PIXI.Loader;

    public background: PIXI.Sprite;
    public levelOne: PIXI.Sprite;
    public levelTwo: PIXI.Sprite;
    public keyLock: PIXI.Sprite;

    public levelSound: HTMLAudioElement
    public levelVoiceSound: HTMLAudioElement

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
            .add("keyLockTexture", keyLock)

            .add("levelSound", levelSound)
            .add("levelVoiceSound", levelVoiceSound)

        this.loader.load(() => this.loadCompleted());

        //  MOUSE CURSOR 
        document.addEventListener("mousemove", (e: MouseEvent) => this.addLevelSound(e));
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
        this.levelSound = this.loader.resources["levelSound"].data!
        this.levelSound.volume = 0.5
        this.levelVoiceSound = this.loader.resources["levelVoiceSound"].data!

        //PLAY SOUND
        this.levelSound.play();
        this.levelVoiceSound.play();

        //LEVEL ONE
        this.levelOne = new PIXI.Sprite(this.loader.resources["levelOneTexture"].texture!)
        this.levelOne.scale.set(0.7, 0.7)
        this.levelOne.x = 50
        this.levelOne.y = 100
        this.levelOne.interactive = true
        this.levelOne.buttonMode = true
        this.levelOne.on('pointerdown', () => this.onClick())

        this.pixi.stage.addChild(this.levelOne);

        //LEVEL TWO
        this.levelTwo = new PIXI.Sprite(this.loader.resources["levelTwoTexture"].texture!)
        this.levelTwo.scale.set(0.7, 0.7)
        this.levelTwo.x = 760
        this.levelTwo.y = 100
        // this.levelTwo.interactive = true
        // this.levelTwo.buttonMode = true
        // this.levelTwo.on('pointerdown', () => this.onClick2())

        this.pixi.stage.addChild(this.levelTwo);

        //LEVEL TWO LOCK
        this.keyLock = new PIXI.Sprite(this.loader.resources["keyLockTexture"].texture!)
        this.keyLock.scale.set(0.4, 0.4)
        this.keyLock.x = 1030
        this.keyLock.y = 340


        this.pixi.stage.addChild(this.keyLock);

    }

    onClick() {
        console.log("klik")
        window.location.href = "level1index.html"
    }

    // MOUSE CURSOR
    addLevelSound(e: MouseEvent) {
        var relativeY = e.clientY - this.pixi.screen.top

        if (relativeY > 0 && relativeY < this.pixi.screen.height) {
            this.levelSound.play()
            this.levelVoiceSound.play()
        }
    }

}
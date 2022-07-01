//IMPORT
import * as PIXI from "pixi.js";

//IMPORT PHOTOS
import background from "./images/endpage.jpg"
import crown from "./images/crown.png"
import hero from "./images/superhero.png"
import playerImage from "./images/player.png";

//IMPORT SOUND
import endSound from "url:./sound/startschermsound.mp3";
import endvoiceSound from "url:./endsoundvoice.mp3";

export class End {

    public pixi: PIXI.Application;
    public loader: PIXI.Loader;

    public background: PIXI.Sprite;
    public crown: PIXI.Sprite;
    public hero: PIXI.Sprite;
    public player!: PIXI.Sprite;

    public endSound: HTMLAudioElement
    public endvoiceSound: HTMLAudioElement

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
            .add("playerTexture", playerImage)

            .add("endSound", endSound)
            .add("endvoiceSound", endvoiceSound)

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

        //SOUND
        this.endSound = this.loader.resources["sendSound"].data!
        this.endSound.volume = 0.5
        this.endvoiceSound = this.loader.resources["endvoiceSound"].data!

        //PLAY SOUND
        this.endSound.play();
        this.endvoiceSound.play();

        //CROWN
        this.crown = new PIXI.Sprite(this.loader.resources["crownTexture"].texture!)
        this.crown.scale.set(0.7, 0.7)
        this.crown.x = 50
        this.crown.y = 100
        this.pixi.stage.addChild(this.crown);

        //POPPETJE SENA
        this.hero = new PIXI.Sprite(this.loader.resources["levelTwoTexture"].texture!)
        this.hero.scale.set(0.7, 0.7)
        this.hero.x = 760
        this.hero.y = 100
        this.pixi.stage.addChild(this.hero);

        //POPPETJE RAIESA
        let player = new PIXI.Sprite(this.loader.resources["playerTexture"].texture!);
        player.scale.set(0.6, 0.6)
        player.x = 250
        player.y = 450
        this.pixi.stage.addChild(player)
    }

    // MOUSE CURSOR
  mouseMoveHandler(e: MouseEvent) {
    var relativeY = e.clientY - this.pixi.screen.top

    if (relativeY > 0 && relativeY < this.pixi.screen.height) {
      this.endSound.play()
      this.endvoiceSound.play()

    }

  }
}


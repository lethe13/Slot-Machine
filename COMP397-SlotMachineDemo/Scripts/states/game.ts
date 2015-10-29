module states {
    var credits = 1000;
    var jackpot = 500;
    var bet = 0;
    var winnings = 0;
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES

        // UI OBJECTS ++++++++++++++++++++++++++++++++++++++
        private _slotMachine: createjs.Container;
        private _background: createjs.Bitmap;
        private _bet1Button: objects.SpriteButton;
        private _bet10Button: objects.SpriteButton;
        private _bet100Button: objects.SpriteButton;
        private _betMaxButton: objects.SpriteButton;
        private _spinButton: objects.SpriteButton;
      

        private _tile1: objects.GameObject;
        private _tile2: objects.GameObject;
        private _tile3: objects.GameObject;

        private _betLine: objects.GameObject;

        // GAME VARIABLES
        
        private _spinResult: string[];
        
        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
         
        public start(): void {
           
            this._slotMachine = new createjs.Container();
            this._slotMachine.x = 132.5;
            
            this._background = new createjs.Bitmap(assets.getResult("background"));
            this._slotMachine.addChild(this._background); // add background image

            this._bet1Button = new objects.SpriteButton("bet1Button", 23, 386);
            this._slotMachine.addChild(this._bet1Button);


            this._bet10Button = new objects.SpriteButton("bet10Button", 88, 386);
            this._slotMachine.addChild(this._bet10Button);

            this._bet100Button = new objects.SpriteButton("bet100Button", 153, 386);
            this._slotMachine.addChild(this._bet100Button);

            this._betMaxButton = new objects.SpriteButton("betMaxButton", 218, 386);
            this._slotMachine.addChild(this._betMaxButton);

            this._spinButton = new objects.SpriteButton("spinButton", 289, 386);
            this._slotMachine.addChild(this._spinButton);

            this._tile1 = new objects.GameObject("blank", 74, 192);
            this._slotMachine.addChild(this._tile1);

            this._tile2 = new objects.GameObject("blank", 152, 192);
            this._slotMachine.addChild(this._tile2);

            this._tile3 = new objects.GameObject("blank", 230, 192);
            this._slotMachine.addChild(this._tile3);

            this._betLine = new objects.GameObject("bet_line", 61, 225);
            this._slotMachine.addChild(this._betLine);

            this.addChild(this._slotMachine);
            stage.addChild(this);

            // add event listeners
            this._bet1Button.on("click", this._clickBet1Button, this);
            this._bet10Button.on("click", this._clickBet10Button, this);
            this._bet100Button.on("click", this._clickBet100Button, this);
            this._spinButton.on("click", this._spinButtonClick, this);
  
        }


        public update(): void {
        }
        
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Back Button Click
        private _clickBet1Button(event: createjs.MouseEvent): void {
            console.log("bet 1");
            if (credits >= 1) {
                credits--
                bet++
            }
            else if (credits < 1)
            { window.alert("You cannot bet more than your credits");}
        }
        private _clickBet10Button(event: createjs.MouseEvent): void {
            console.log("bet 10");
            if (credits >= 10) {
                credits = credits - 10;
                bet = bet + 10;
            }
            else if (credits < 10)
            { window.alert("You cannot bet more than your credits"); }
        }
        private _clickBet100Button(event: createjs.MouseEvent): void {
            console.log("bet 100");
            if (credits >= 100) {
                credits = credits - 100;
                bet = bet + 100
            }
            else if (credits < 100)
            { window.alert("You cannot bet more than your credits"); }
            
        }
        private _clickBetMaxButton(event: createjs.MouseEvent): void {
            console.log("bet ", credits);
            if (credits > 1) {
                bet = bet + credits;
                credits = credits - credits;
            }
            else if (credits = 0)
            { window.alert("You have no credits");}
            
            
        }

        /* Utility function to check if a value falls within a range of bounds */
        private _checkRange(value:number, lowerBounds:number, upperBounds:number):number {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        }

        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        private _reels(): string[] {
        var betLine: string[] = [" ", " ", " "];
        var outCome: number[] = [0, 0, 0];

        for (var reel = 0; reel < 3; reel++) {
            outCome[reel] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[reel]) {
                case this._checkRange(outCome[reel], 1, 27):  // 41.5% probability
                    betLine[reel] = "blank";
                    //blanks++;
                    break;
                case this._checkRange(outCome[reel], 28, 37): // 15.4% probability
                    betLine[reel] = "grapes";
                    //grapes++;
                    break;
                case this._checkRange(outCome[reel], 38, 46): // 13.8% probability
                    betLine[reel] = "banana";
                   // bananas++;
                    break;
                case this._checkRange(outCome[reel], 47, 54): // 12.3% probability
                    betLine[reel] = "orange";
                    //oranges++;
                    break;
                case this._checkRange(outCome[reel], 55, 59): //  7.7% probability
                    betLine[reel] = "cherry";
                    //cherries++;
                    break;
                case this._checkRange(outCome[reel], 60, 62): //  4.6% probability
                    betLine[reel] = "bar";
                    //bars++;
                    break;
                case this._checkRange(outCome[reel], 63, 64): //  3.1% probability
                    betLine[reel] = "bell";
                    //bells++;
                    break;
                case this._checkRange(outCome[reel], 65, 65): //  1.5% probability
                    betLine[reel] = "seven";
                    //sevens++;
                    break;
            }
        }
        return betLine;
    }



        //WORKHORSE OF THE GAME
        private _spinButtonClick(event: createjs.MouseEvent): void {
            this._spinResult = this._reels();

            this._tile1.gotoAndStop(this._spinResult[0]);
            this._tile2.gotoAndStop(this._spinResult[1]);
            this._tile3.gotoAndStop(this._spinResult[2]);


            console.log(this._spinResult[0] + " - " + this._spinResult[1] + " - " + this._spinResult[2]);

            afterpull(this._spinResult[0], this._spinResult[1], this._spinResult[2]);

            function afterpull(a, b, c) {

                if (a == b && a == c) {
    
                    switch (a)
                    {
                        case "blank":
                            credits = bet;
                            winnings = bet;
                            bet = 0;
                            console.log("credits X 1");
                            break;
                        case "grapes":
                            credits = credits + (bet * 2);
                            winnings = winnings + (bet * 2);
                            bet = 0;
                            console.log("bet X 2");
                            break;
                        case "bannana":
                            credits = credits + (bet * 3);
                            winnings = winnings + (bet *3);
                            bet = 0;
                            console.log("bet X 3");
                            break;
                        case "orange":
                            credits = credits + (bet * 4);
                            winnings = winnings + (bet * 4);
                            bet = 0;
                            console.log("bet X 4");
                            break;
                        case "cherry":
                            credits = credits + (bet * 5);
                            winnings = winnings + (bet * 5);
                            bet = 0;
                            console.log("bet X 5");
                            break;
                        case "bar":
                            credits = credits + (bet * 6);
                            winnings = winnings + (bet * 6);
                            bet = 0;
                            console.log("bet X 6");
                            break;
                        case "bell":
                            credits = credits + (bet * 7);
                            winnings = winnings + (bet * 7);
                            bet = 0;
                            console.log("bet X 7");
                            break;
                        case "seven":
                            credits = credits + jackpot + (bet * 7);
                            winnings = winnings + jackpot + (bet * 7);
                            jackpot = 500;
                            bet = 0;
                            console.log("bet X 7 + jackpot");
                            break;
                    }
                }
               

                else
                {
                    jackpot = jackpot + bet;
                    bet = 0;
                }

            }
        }


    }


} 
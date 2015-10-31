var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    var credits = 1000;
    var jackpot = 500;
    var bet = 0;
    var winnings = 0;
    // GAME CLASS
    var Game = (function (_super) {
        __extends(Game, _super);
        // CONSTRUCTOR
        function Game() {
            _super.call(this);
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
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
            //gui labels
            this._credits = new objects.Label(credits.toString(), "30px Consolas", "#f00", 225, 340, true);
            stage.addChild(this._credits);
            this._jackpot = new objects.Label(jackpot.toString(), "30px Consolas", "#f00", 310, 60, true);
            stage.addChild(this._jackpot);
            this._bet = new objects.Label(bet.toString(), "30px Consolas", "#f00", 310, 340, true);
            stage.addChild(this._bet);
            this._winnings = new objects.Label(winnings.toString(), "30px Consolas", "#f00", 410, 340, true);
            stage.addChild(this._winnings);
            // add event listeners
            this._bet1Button.on("click", this._clickBet1Button, this);
            this._bet10Button.on("click", this._clickBet10Button, this);
            this._bet100Button.on("click", this._clickBet100Button, this);
            this._betMaxButton.on("click", this._clickbetMaxButton, this);
            this._spinButton.on("click", this._spinButtonClick, this);
        };
        Game.prototype.update = function () {
            this._credits.text = credits.toString();
            this._jackpot.text = jackpot.toString();
            this._bet.text = bet.toString();
            this._winnings.text = winnings.toString();
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Back Button Click
        Game.prototype._clickBet1Button = function (event) {
            console.log("bet 1");
            if (credits >= 1) {
                credits--;
                bet++;
            }
            else if (credits < 1) {
                window.alert("You cannot bet more than your credits");
            }
        };
        Game.prototype._clickBet10Button = function (event) {
            console.log("bet 10");
            if (credits >= 10) {
                credits = credits - 10;
                bet = bet + 10;
            }
            else if (credits < 10) {
                window.alert("You cannot bet more than your credits");
            }
        };
        Game.prototype._clickBet100Button = function (event) {
            console.log("bet 100");
            if (credits >= 100) {
                credits = credits - 100;
                bet = bet + 100;
            }
            else if (credits < 100) {
                window.alert("You cannot bet more than your credits");
            }
        };
        Game.prototype._clickbetMaxButton = function (event) {
            console.log("bet ", credits);
            if (credits >= 1) {
                bet = bet + credits;
                credits = 0;
            }
            else if (credits = 0) {
                window.alert("You have no credits");
            }
        };
        /* Utility function to check if a value falls within a range of bounds */
        Game.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        Game.prototype._reels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            for (var reel = 0; reel < 3; reel++) {
                outCome[reel] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[reel]) {
                    case this._checkRange(outCome[reel], 1, 27):
                        betLine[reel] = "grapes";
                        //blanks++;
                        break;
                    case this._checkRange(outCome[reel], 28, 37):
                        betLine[reel] = "cherry";
                        //grapes++;
                        break;
                    case this._checkRange(outCome[reel], 38, 46):
                        betLine[reel] = "banana";
                        // bananas++;
                        break;
                    case this._checkRange(outCome[reel], 47, 54):
                        betLine[reel] = "orange";
                        //oranges++;
                        break;
                    case this._checkRange(outCome[reel], 55, 59):
                        betLine[reel] = "bar";
                        //cherries++;
                        break;
                    case this._checkRange(outCome[reel], 60, 62):
                        betLine[reel] = "bell";
                        //bars++;
                        break;
                    case this._checkRange(outCome[reel], 63, 65):
                        betLine[reel] = "seven";
                        //bells++;
                        break;
                }
            }
            return betLine;
        };
        //WORKHORSE OF THE GAME
        Game.prototype._spinButtonClick = function (event) {
            this._spinResult = this._reels();
            if (bet > 0) {
                this._tile1.gotoAndStop(this._spinResult[0]);
                this._tile2.gotoAndStop(this._spinResult[1]);
                this._tile3.gotoAndStop(this._spinResult[2]);
                console.log(this._spinResult[0] + " - " + this._spinResult[1] + " - " + this._spinResult[2]);
                afterpull(this._spinResult[0], this._spinResult[1], this._spinResult[2]);
            }
            else {
                alert("Please enter a bet");
            }
            //Winning functionality
            function afterpull(a, b, c) {
                if (a == b && a == c) {
                    switch (a) {
                        case "blank":
                            credits = bet;
                            winnings = bet;
                            bet = 0;
                            console.log("credits X 0");
                            break;
                        case "grapes":
                            credits = credits + (bet * 2);
                            winnings = winnings + (bet * 2);
                            bet = 0;
                            console.log("bet X 1");
                            break;
                        case "bannana":
                            credits = credits + (bet * 3);
                            winnings = winnings + (bet * 3);
                            bet = 0;
                            console.log("bet X 2");
                            break;
                        case "orange":
                            credits = credits + (bet * 4);
                            winnings = winnings + (bet * 4);
                            bet = 0;
                            console.log("bet X 3");
                            break;
                        case "cherry":
                            credits = credits + (bet * 5);
                            winnings = winnings + (bet * 5);
                            bet = 0;
                            console.log("bet X 4");
                            break;
                        case "bar":
                            credits = credits + (bet * 6);
                            winnings = winnings + (bet * 6);
                            bet = 0;
                            console.log("bet X 5");
                            break;
                        case "bell":
                            credits = credits + (bet * 7);
                            winnings = winnings + (bet * 7);
                            bet = 0;
                            console.log("bet X 6");
                            break;
                        case "seven":
                            credits = credits + jackpot + (bet * 7);
                            winnings = winnings + jackpot + (bet * 7);
                            jackpot = 500;
                            bet = 0;
                            alert("JACKPOT");
                            console.log("bet X 7 + jackpot");
                            break;
                    }
                    if (credits == 0) {
                        alert("YOU LOSE");
                    }
                }
                else {
                    jackpot = jackpot + bet;
                    bet = 0;
                }
            }
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map
const GAME_SPEED = 300;
const BLOCK_SIZE = 20;
const COLS_COUNT = 10;
const ROWS_COUNT = 20;
const SCREEN_WIDTH = COLS_COUNT * BLOCK_SIZE;
const SCREEN_HEIGHT = ROWS_COUNT * BLOCK_SIZE;
const NEXT_AREA_SIZE = BLOCK_SIZE * 5;
const BLOCK_SOURCES = [
    "images/block-0.png",
    "images/block-1.png",
    "images/block-2.png",
    "images/block-3.png",
    "images/block-4.png",
    "images/block-5.png",
    "images/block-6.png"
]

const state = document.getElementById("state");
var block , line , score;

window.onload = function ()
{
    Asset.init();
    let game = new Game();
    //const pause_btn = "pause-btn";
    document.getElementById("start-btn").onclick = function()
    {
        state.innerHTML = "Playing";
        game.start();
        this.blur(); // ボタンのフォーカスを外す
    };
}

// 素材を管理するクラス
// ゲーム開始前に初期化する
class Asset {
    // ブロック用Imageの配列
    static blockImages = []

    // 初期化処理
    // callback には、init完了後に行う処理を渡す
    static init(callback) {
        score = 0, line = 0, block = 0;
        let loadCnt = 0;
        for (let i = 0; i <= 6; i++) {
            let img = new Image();
            img.src = BLOCK_SOURCES[i];
            img.onload = function () {
                loadCnt++;
                Asset.blockImages.push(img);

                // 全ての画像読み込みが終われば、callback実行
                if (loadCnt >= BLOCK_SOURCES.length && callback) { callback(); }
            }
        }
    }
}

class Game {
    constructor() {
        this.initMainCanvas();
        this.initNextCanvas();
        this.pause = false;
    }

    // メインキャンバスの初期化
    initMainCanvas() {
        this.mainCanvas = document.getElementById("main-canvas");
        this.mainCtx = this.mainCanvas.getContext("2d");
        this.mainCanvas.width = SCREEN_WIDTH;
        this.mainCanvas.height = SCREEN_HEIGHT;
        this.mainCanvas.style.border = "4px solid #555";
    }

    // ネクストキャンバスの初期化
    initNextCanvas() {
        this.nextCanvas = document.getElementById("next-canvas");
        this.nextCtx = this.nextCanvas.getContext("2d");
        this.nextCanvas.width = NEXT_AREA_SIZE
        this.nextCanvas.height = NEXT_AREA_SIZE;
        this.nextCanvas.style.border = "4px solid #555";
    }

    // ゲームの開始処理（STARTボタンクリック時）
    start() {
        block = line = score = 0;
        // フィールドとミノの初期化
        this.field = new Field();

        // 最初のミノを読み込み
        this.popMino();

        // 初回描画
        this.drawAll();

        // 落下処理
        clearInterval(this.timer);
        this.timer = setInterval(() => this.dropMino(), GAME_SPEED);

        // キーボードイベントの登録
        this.setKeyEvent();
    }

    // 新しいミノを読み込む
    popMino() {
        block++;
        this.mino = this.nextMino ?? new Mino()
        this.mino.spawn()
        this.nextMino = new Mino()

        // ゲームオーバー判定
        if (!this.valid(0, 1)) {
            this.drawAll();
            clearInterval(this.timer);
            alert("ゲームオーバー\n 落ちたブロックの数 : " + block + "\n 消したラインのスコア : " + line + "\n 総合スコア : " + score)
        }
    }

    drawScore(id , num) { document.querySelector("#" + id).innerHTML = num; }

    // 画面の描画
    drawAll() {
        // 表示クリア
        this.mainCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        this.nextCtx.clearRect(0, 0, NEXT_AREA_SIZE, NEXT_AREA_SIZE);

        // 落下済みのミノを描画
        this.field.drawFixedBlocks(this.mainCtx);

        // 再描画
        this.nextMino.drawNext(this.nextCtx);
        this.mino.draw(this.mainCtx);

        //スコア
        this.drawScore("block" , block);
        this.drawScore("line" , line);
        this.drawScore("score" , score = block + (line * 100));
    }

    // ミノの落下処理
    dropMino() {
        if (this.valid(0, 1)) { this.mino.y++; }
        else {
            // Minoを固定する（座標変換してFieldに渡す）
            this.mino.blocks.forEach(e => {
                e.x += this.mino.x
                e.y += this.mino.y
            })
            this.field.blocks = this.field.blocks.concat(this.mino.blocks);
            this.field.checkLine();
            if(this.field.count == 1) { this.drawScore("span" , "Single!"); }
            else if(this.field.count == 2) { this.drawScore("span" , "Double!"); }
            else if(this.field.count == 3) { this.drawScore("span" , "Triple!"); }
            else if(this.field.count == 4) { this.drawScore("span" , "Tetris!"); }
            this.popMino();
        }
        this.drawAll();
    }

    // 次の移動が可能かチェック
    valid(moveX, moveY, rot = 0) {
        let newBlocks = this.mino.getNewBlocks(moveX, moveY, rot)
        return newBlocks.every(block => {
            return (
                block.x >= 0 &&
                block.y >= -1 &&
                block.x < COLS_COUNT &&
                block.y < ROWS_COUNT &&
                !this.field.has(block.x, block.y)
            )
        });
    }

    // キーボードイベント
    setKeyEvent() {
        document.onkeydown = function (e) {
            let key = function(e){ return e.keyCode >= 48 && e.keyCode <= 90 };
            if(!this.pause)
            {
                switch (e.keyCode)
                {
                    case 37: // 左
                        if (this.valid(-1, 0)) this.mino.x--;
                        break;
                    case 39: // 右
                        if (this.valid(1, 0)) this.mino.x++;
                        break;
                    case 40: // 下
                        if (this.valid(0, 1)) this.mino.y++;
                        break;
                    case 32: // スペース
                        if (this.valid(0, 0, 1)) this.mino.rotate();
                        break;
                    default :
                        if(key(e))
                        {
                            clearInterval(this.timer);
                            state.innerHTML = "Pause";
                            this.pause = true;
                        }
                        break;
                }
                this.drawAll();
            }
            else if(key(e))
            {
                state.innerHTML = "Playing";
                this.timer = setInterval(() => this.dropMino(), GAME_SPEED);
                this.pause = false;
            }
        }.bind(this)
    }
}

class Block {
    // 基準地点からの座標
    // 移動中 ⇒ Minoの左上
    // 配置後 ⇒ Fieldの左上
    constructor(x, y, type) {
        this.x = x
        this.y = y

        // 描画しないときはタイプを指定しない
        if (t

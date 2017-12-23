
const magik = magikcraft.io;
const { bar, color, style } = require('magikcraft-lore-ui-bar');
const finalsize = 5;
const blocksPerSecond = 5;

const STATE = {
    PROGRESS: 'border.game.progress',
    RUNNING: 'border.game.mutex',
    BAR: 'border.game.persistence.bar',
    LISTENER: 'border.game.progress.listener'
};

const TEXT = {
    INITIAL: 'RUN 4 YR LYFE!!!',
    HALFWAY: 'HURRY!!',
    URGENT: 'HURRY!!!!!!!',
    GAMEOVER: 'GAME OVER!'
};

function border(size = 200) {

    if (size == 'reset') {
        // Use this to halt a game
        gameOver();
        return;
    }

    if (size == 'clear') {
        // Use this when the UI bar has disappeared
        magik.playerMap.remove(STATE.BAR);
        magik.playerMap.remove(STATE.LISTENER);
        return;
    }

    magik.dixit('Setting up...');

    function getBar() {
        if (magik.playerMap.containsKey(STATE.BAR)) {
            // Return a reference to the existing UI Bar
            return magik.playerMap.get(STATE.BAR);
        } else {
            // Or create a new UI bar
            magik.dixit('Creating UI bar...');
            const _b = bar();
            // Stash a reference to it
            magik.playerMap.put(STATE.BAR, _b);
            return _b;
        }
    }

    const b = getBar()
        .text(TEXT.INITIAL)
        .color(color.GREEN)
        .style(style.NOTCHED_20)
        .progress(100)
        .show();

    function getBorder() {
        return magik.getSender().getWorld().getWorldBorder();
    }

    function initialiseBorder() {
        const border = getBorder();

        const here = magik.hic();
        const zDelta = Math.random() * 100 - 50;
        const xDelta = Math.random() * 100 - 50;

        here.setZ(here.getZ() + zDelta);
        here.setX(here.getX() + xDelta);

        border.setCenter(here);
        border.setSize(size);
        return border;
    }

    function shrink(border) {
        const newSize = border.getSize() - blocksPerSecond;
        if (newSize === finalsize) {
            magik.clearInterval(loop);
        }
        const barProgress = ((newSize - finalsize) / size) * 100;
        eventbus.publish(STATE.PROGRESS, barProgress);
        border.setSize(newSize);
        return newSize;
    }

    function endGame(countdown) {
        if (countdown < 0) {
            magik.setTimeout(() => endGame(countdown + 1), 1000);
            eventbus.publish(STATE.PROGRESS, countdown);
        } else {
            gameOver();
        }
    }

    function gameOver() {
        magik.dixit('Game Over!');
        getBorder().setSize(600000);
        magik.globalMap.put(STATE.RUNNING, false);
        eventbus.publish(STATE.PROGRESS, false);
        getBar().text(TEXT.GAMEOVER).progress(0);
    }


    function listenProgress(msg) {
        const barProgress = msg.data;
        // magik.getSender().sendMessage(msg);
        const b = magik.playerMap.get(STATE.BAR);
        if (barProgress == 0) {
            endGame(-10);
            return;
        }
        if (barProgress < 0) {
            // Final countdown
            b.color(color.PURPLE)
                .progress(-barProgress * 10)
                .text(`Safe in ${-barProgress}s`);
            return;
        }
        if (barProgress > 50) {
            b.color(color.GREEN)
                .progress(barProgress)
                .text(TEXT.INITIAL);
            return;
        }

        if (barProgress < 50) {
            b.color(color.YELLOW)
                .progress(barProgress)
                .text(TEXT.HALFWAY);
            return;
        }
        if (barProgress < 25) {
            b.color(color.RED)
                .progress(barProgress)
                .text(TEXT.URGENT);
            return;
        }
    }

    function isRunning() {
        if (magik.globalMap.containsKey(STATE.RUNNING)) {
            return magik.globalMap.get(STATE.RUNNING);
        } else {
            return false;
        }
    }

    function startGame() {
        joinGameTopic();
        if (isRunning()) {
            magik.dixit('Game running, I\'ved joined!');
            return;
        }
        const border = initialiseBorder();
        magik.globalMap.put(STATE.RUNNING, true);
        magik.dixit('Let the game begin!');
        return magik.setInterval(() => shrink(border), 1000);
    }

    function joinGameTopic() {
        if (magik.playerMap.containsKey(STATE.LISTENER)) {
            return magik.playerMap.get(STATE.LISTENER);
        } else {
            const listener = eventbus.subscribe(STATE.PROGRESS, listenProgress);
            magik.playerMap.put(STATE.LISTENER, listener);
            return listener;
        }
    }

    // Start a game if one isn't running
    const loop = startGame();
}
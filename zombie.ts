const magik = magikcraft.io;

function fz() {

    function run(cmd) {
        var sudo = magik.getPlugin().getServer().getConsoleSender();
        magik.getPlugin().getServer().dispatchCommand(sudo, cmd);
    }
    const flyingZombieCmd = 'summon minecraft:zombie ~ ~ ~ {ArmorItems:[{},{},{id:"minecraft:elytra",Count:1b},{}]}';

    run(flyingZombieCmd);


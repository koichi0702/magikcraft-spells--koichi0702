const magik = magikcraft.io;

function zombie2(name, mob = 'zombie') {
    const run = (cmd) => {
        const plugin = magik.getPlugin();
        const sender = magik.getSender();
        plugin.getServer().dispatchCommand(sender, cmd);
    }

    const sender = magik.getSender();
    const name = name || sender.name;

      run(`execute ${name} ~ ~ ~ summon ${mob} ~14 ~3 ~-10`);
     run(`execute ${name} ~ ~ ~ summon ${mob} ~5 ~3 ~-15`);
     run(`execute ${name} ~ ~ ~ summon ${mob} ~-6 ~1 ~-20`);
     run(`execute ${name} ~ ~ ~ summon ${mob} ~114 ~3 ~10`);
     run(`execute ${name} ~ ~ ~ summon ${mob} ~15 ~3 ~15`);
     run(`execute ${name} ~ ~ ~ summon ${mob} ~6 ~1 ~20`);
    magik.dixit('rsummon! 2');
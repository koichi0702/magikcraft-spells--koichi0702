const magik = magikcraft.io;

function arrow(repeats = 200, delay = 300) {
    magik.dixit('Arrow!');
    const sender = magik.getSender();
    const arrow = magik.type("entity.poisonArrow").class;
    
    const hurl = (thing) => () => sender.launchProjectile(thing)

    const volley = () => magik.doNTimes(hurl(arrow), repeats, delay, null);

    magik.doNTimes(volley, repeats, delay*10, null);
}

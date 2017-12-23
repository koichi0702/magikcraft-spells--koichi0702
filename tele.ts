const magik = magikcraft.io;

function tele(name) {
    const there =	magik.memento.getItem(name);
    if (there){
        magik.ianuae(there);
    } else {
        const here = magik.hic();
        magik.memento(here);
    }
}
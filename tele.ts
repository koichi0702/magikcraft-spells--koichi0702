const magik = magikcraft.io;

function tele() {
    const there =	magik.memento.getItem();
    if (there){
        magik.ianuae(there);
    } else {
        const here = magik.hic();
        magik.memento(here);
    }
}
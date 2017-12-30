const magik = magikcraft.io;

function arrow2() {

    function shoot() {
        const Arrow = Java.type("org.bukkit.entity.Arrow");
        const p = magik.getSender();
        p.launchProjectile(Arrow.class);
    }

    magik.doNTimes(shoot, 30, 2000000);
}    
const magik = magikcraft.io;

function zombie(){

    const sender = magik.getSender();
    const EntityType = magik.type('entity.EntityType');
    const SKELTON = EntityType['SKELTON'];

    for (var i =0; i < 1000; i++){
        var arrow = sender.getWorld().spawnEntity(magik.aspecto(),SKELTON);
    }
}
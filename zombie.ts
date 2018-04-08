const magik = magikcraft.io;

function zombie{

    const sender = magik.getSender();
    const EntityType = magik.type('entity.EntityType');
    const zombie = EntityType['Zombie'];

    for (var i =0; i < 1000; i++){
        var arrow = sender.getWorld().spawnEntity(magik.aspecto(),zombie);
    }
}
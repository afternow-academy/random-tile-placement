namespace SpriteKind {
    export const bomb = SpriteKind.create()
    export const ray = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    bob,
    assets.animation`anim_up`,
    200,
    true
    )
})
sprites.onDestroyed(SpriteKind.bomb, function (sprite) {
    explode_ray = sprites.create(assets.image`bomb_ray`, SpriteKind.ray)
    explode_ray.setPosition(big_bomb.x, big_bomb.y)
    timer.after(500, function () {
        explode_ray.destroy(effects.fire, 100)
    })
    active_bomb = false
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(active_bomb)) {
        active_bomb = true
        big_bomb = sprites.create(assets.image`bomb`, SpriteKind.bomb)
        big_bomb.setPosition(bob.x, bob.y)
        info.startCountdown(2)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    bob,
    assets.animation`anim_left`,
    200,
    true
    )
})
info.onCountdownEnd(function () {
    big_bomb.destroy(effects.ashes, 100)
    scene.cameraShake(4, 200)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    bob,
    assets.animation`anim_right`,
    200,
    true
    )
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    game.over(false, effects.melt)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    bob,
    assets.animation`anim_down`,
    200,
    true
    )
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.ray, function (sprite, otherSprite) {
    sprite.destroy(effects.ashes, 100)
})
function make_map () {
    scene.setTile(2, assets.tile`tile_0`, true)
    scene.setTile(5, assets.tile`tile_1`, false)
    scene.setTile(9, assets.tile`tile_2`, false)
    scene.setTile(1, assets.tile`fire_hole`, false)
}
let spooks: Sprite = null
let big_bomb: Sprite = null
let explode_ray: Sprite = null
let active_bomb = false
let bob: Sprite = null
scene.setBackgroundImage(assets.image`base_bg`)
bob = sprites.create(assets.image`player_1`, SpriteKind.Player)
controller.moveSprite(bob, 100, 100)
scene.cameraFollowSprite(bob)
scene.setTileMap(assets.image`level_0`, TileScale.Sixteen)
let tile_list = scene.getTilesByType(2)
for (let value of tile_list) {
    scene.setTileAt(tile_list._pickRandom(), 5)
    scene.setTileAt(tile_list._pickRandom(), 9)
}
scene.placeOnRandomTile(bob, 9)
make_map()
active_bomb = false
game.onUpdate(function () {
    if (!(controller.up.isPressed() || controller.right.isPressed() || (controller.down.isPressed() || controller.left.isPressed()))) {
        bob.setImage(assets.image`player_1`)
    }
    spooks.follow(bob, 10)
})
game.onUpdateInterval(5000, function () {
    spooks = sprites.create(assets.image`spook`, SpriteKind.Enemy)
    scene.placeOnRandomTile(spooks, 1)
})

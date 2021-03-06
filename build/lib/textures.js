/* global noa */
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Matrix, Color3 } from '@babylonjs/core/Maths/math';

const mcData = require("minecraft-data")("1.12.2");

// From https://github.com/andyhall/noa-lt/blob/1a0da899c971ca104df27edaf0df4234937e04f9/src/lib/worldgen.js#L228
// helper function to make a billboard plane mesh showing a given sprite texture
function makeFlowerSpriteMesh(scene, url, name) {
  var matname = name || 'sprite-mat'
  var tex = new Texture(url, scene, true, true,
    Texture.NEAREST_SAMPLINGMODE)
  tex.hasAlpha = true
  var mesh = Mesh.CreatePlane('sprite-' + matname, 1, scene)
  var mat = new StandardMaterial('sprite-mat-' + matname, scene)
  mat.specularColor = new Color3(0, 0, 0)
  mat.emissiveColor = new Color3(1, 1, 1)
  mat.backFaceCulling = false
  mat.diffuseTexture = tex
  mesh.material = mat

  var offset = Matrix.Translation(0, 0.5, 0)
  mesh.bakeTransformIntoVertices(offset)
  var clone = mesh.clone()
  clone.rotation.y += 0.7

  return Mesh.MergeMeshes([mesh, clone], true)
}

export function registerTextures(noa) {
  /* noa.registry.registerMaterial(
    "dirt",
    [Math.random(), Math.random(), Math.random()],
    "https://mineweb-dev.glitch.me/textures/dirt.png"
  ); // Random colours */

  noa.registry.registerMaterial(
    "grass_top",
    [Math.random(), Math.random(), Math.random()],
    "https://raw.githubusercontent.com/MinewebMC/mineweb-assets/master/data/1.12/blocks/grass_top.png"
  ); // Random colours

  noa.registry.registerMaterial(
    "grass_side",
    [Math.random(), Math.random(), Math.random()],
    "https://raw.githubusercontent.com/MinewebMC/mineweb-assets/master/data/1.12/blocks/grass_side.png"
  ); // Random colours

  noa.registry.registerMaterial(
    "log_side",
    [Math.random(), Math.random(), Math.random()],
    "https://raw.githubusercontent.com/MinewebMC/mineweb-assets/master/data/1.12/blocks/log_oak.png"
  );
  noa.registry.registerMaterial(
    "log_top",
    [Math.random(), Math.random(), Math.random()],
    "https://raw.githubusercontent.com/MinewebMC/mineweb-assets/master/data/1.12/blocks/log_oak_top.png"
  ); // Random colours
  
  noa.registry.registerMaterial( "9",      [0.20, 0.35, 0.95, 0.5], null ); // https://github.com/andyhall/noa-testbed/blob/9275bacca5c308fa83cb41fe814eaf871a3bf8b8/lib/worldgen.js#L42

  /* noa.registry.registerMaterial(
    "leaves",
    [Math.random(), Math.random(), Math.random()],
    "https://mineweb-dev.glitch.me/textures/leaves.png"
  ); // Random colours */

  for (var i = 1; i < 256; i++) {
    try {
      var textureURL = data.filter(function(block) {
        return block.name == mcData.blocks[i].name;
      })[0].texture; // replace that with a filename to specify textures
    } catch (err) {
      var textureURL = null;
    }
    // console.log("TexURL:", textureURL);
    /* if (i == 3) {
      // Dirt
      noa.registry.registerBlock(i, { material: "dirt" });
    } else */ if (i == 2) {
      // Grass (TODO: SNOW GRASS)
      noa.registry.registerBlock(i, {
        material: ["grass_top", "dirt", "grass_side"]
      });
    } else if (i === 17) {
      // Log (TODO: Different logs support) (TODO: Calculate sides too)
      noa.registry.registerBlock(i, {
        material: ["log_top", "log_top", "log_side"]
      });
    } else if (i === 9) { // Water 
      /* noa.registry.registerMaterial(
        i.toString(),
        [Math.random(), Math.random(), Math.random()],
        // "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.12.2/assets/minecraft/textures/" +
        "https://raw.githubusercontent.com/MinewebMC/mineweb-assets/master/data/1.12/" +
          textureURL +
          ".png"
      ); // Random colours */
      // noa.registry.registerBlock(i, { material: i.toString() });
      noa.registry.registerBlock(i, { fluidDensity: 1.0, viscosity: 0.5, material: "9", solid: false, opaque: false, fluid: true });
    } else if (i === 31) { // Tall grass
      var scene = noa.rendering.getScene();
      var flowerMesh = makeFlowerSpriteMesh(scene, 'https://raw.githubusercontent.com/MinewebMC/mineweb-assets/master/data/1.12/blocks/tallgrass.png', 'flower');
      noa.registry.registerMaterial('flowerMat', [1, 1, 1], null);
      noa.registry.registerBlock(i, {
        solid: false,
        opaque: false,
        blockMesh: flowerMesh,
        material: 'flowerMat',
        onCustomMeshCreate: function (mesh) {
          mesh.rotation.y = Math.random() * Math.PI * 2
        }
      })
    } else {
      noa.registry.registerMaterial(
        i.toString(),
        [Math.random(), Math.random(), Math.random()],
        // "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.12.2/assets/minecraft/textures/" +
        "https://raw.githubusercontent.com/MinewebMC/mineweb-assets/master/data/1.12/" +
          textureURL +
          ".png"
      ); // Random colours
      noa.registry.registerBlock(i, { material: i.toString() });
    }

    // } else {
    //  noa.registry.registerMaterial(i.toString(), [Math.random(), Math.random(), Math.random()], ["https://classic.modded.repl.co/assets/textures/grass.png", "https://classic.modded.repl.co/assets/textures/dirt.png", "https://classic.modded.repl.co/assets/textures/grass_dirt.png"]) // Random colours
    // }
    // mcData.blocks[0].name
    // var textureURL = null // replace that with a filename to specify textures
    // noa.registry.registerMaterial(i.toString(), [Math.random(), Math.random(), Math.random()], textureURL) // Random colours
  }
  // block types and their material names
  // var grassID = noa.registry.registerBlock(2, { material: 'grass' })
}

const data = [
  {
    name: "air",
    blockState: "air",
    model: null,
    texture: null
  },
  {
    name: "stone",
    blockState: "stone",
    model: "stone",
    texture: "blocks/stone"
  },
  {
    name: "grass",
    blockState: "grass",
    model: "grass_normal",
    texture: "blocks/dirt"
  },
  {
    name: "dirt",
    blockState: "dirt",
    model: "dirt",
    texture: "blocks/dirt"
  },
  {
    name: "cobblestone",
    blockState: "cobblestone",
    model: "cobblestone",
    texture: "blocks/cobblestone"
  },
  {
    name: "planks",
    blockState: "oak_planks",
    model: "oak_planks",
    texture: "blocks/planks_oak"
  },
  {
    name: "sapling",
    blockState: "oak_sapling",
    model: "oak_sapling",
    texture: "blocks/sapling_oak"
  },
  {
    name: "bedrock",
    blockState: "bedrock",
    model: "bedrock",
    texture: "blocks/bedrock"
  },
  {
    name: "flowing_water",
    blockState: "flowing_water",
    model: null,
    texture: null
  },
  {
    name: "water",
    blockState: "water",
    model: null,
    texture: null
  },
  {
    name: "flowing_lava",
    blockState: "flowing_lava",
    model: null,
    texture: null
  },
  {
    name: "lava",
    blockState: "lava",
    model: null,
    texture: null
  },
  {
    name: "sand",
    blockState: "sand",
    model: "sand",
    texture: "blocks/sand"
  },
  {
    name: "gravel",
    blockState: "gravel",
    model: "gravel",
    texture: "blocks/gravel"
  },
  {
    name: "gold_ore",
    blockState: "gold_ore",
    model: "gold_ore",
    texture: "blocks/gold_ore"
  },
  {
    name: "iron_ore",
    blockState: "iron_ore",
    model: "iron_ore",
    texture: "blocks/iron_ore"
  },
  {
    name: "coal_ore",
    blockState: "coal_ore",
    model: "coal_ore",
    texture: "blocks/coal_ore"
  },
  {
    name: "log",
    blockState: "oak_log",
    model: "oak_log",
    texture: "blocks/log_oak_top"
  },
  {
    name: "leaves",
    blockState: "oak_leaves",
    model: "oak_leaves",
    texture: "blocks/leaves_oak"
  },
  {
    name: "sponge",
    blockState: "sponge",
    model: "sponge",
    texture: "blocks/sponge"
  },
  {
    name: "glass",
    blockState: "glass",
    model: "glass",
    texture: "blocks/glass"
  },
  {
    name: "lapis_ore",
    blockState: "lapis_ore",
    model: "lapis_ore",
    texture: "blocks/lapis_ore"
  },
  {
    name: "lapis_block",
    blockState: "lapis_block",
    model: "lapis_block",
    texture: "blocks/lapis_block"
  },
  {
    name: "dispenser",
    blockState: "dispenser",
    model: "dispenser_vertical",
    texture: "blocks/dispenser_front_vertical"
  },
  {
    name: "sandstone",
    blockState: "sandstone",
    model: "sandstone_normal",
    texture: "blocks/sandstone_bottom"
  },
  {
    name: "noteblock",
    blockState: "noteblock",
    model: "noteblock",
    texture: "blocks/noteblock"
  },
  {
    name: "bed",
    blockState: "bed",
    model: null,
    texture: null
  },
  {
    name: "golden_rail",
    blockState: "golden_rail",
    model: "golden_rail_flat",
    texture: "blocks/rail_golden"
  },
  {
    name: "detector_rail",
    blockState: "detector_rail",
    model: "detector_rail_flat",
    texture: "blocks/rail_detector"
  },
  {
    name: "sticky_piston",
    blockState: "sticky_piston",
    model: "sticky_piston",
    texture: "blocks/piston_bottom"
  },
  {
    name: "web",
    blockState: "web",
    model: "web",
    texture: "blocks/web"
  },
  {
    name: "tallgrass",
    blockState: "tall_grass",
    model: "tall_grass",
    texture: "blocks/tallgrass"
  },
  {
    name: "deadbush",
    blockState: "dead_bush",
    model: "dead_bush",
    texture: "blocks/deadbush"
  },
  {
    name: "piston",
    blockState: "piston",
    model: "piston_normal",
    texture: "blocks/piston_bottom"
  },
  {
    name: "piston_head",
    blockState: "piston_head",
    model: "piston_head_normal",
    texture: "blocks/piston_top_normal"
  },
  {
    name: "wool",
    blockState: "white_wool",
    model: "white_wool",
    texture: "blocks/wool_colored_white"
  },
  {
    name: "piston_extension",
    blockState: "piston",
    model: "piston_normal",
    texture: "blocks/piston_bottom"
  },
  {
    name: "yellow_flower",
    blockState: "dandelion",
    model: "dandelion",
    texture: "blocks/flower_dandelion"
  },
  {
    name: "red_flower",
    blockState: "poppy",
    model: "poppy",
    texture: "blocks/flower_rose"
  },
  {
    name: "brown_mushroom",
    blockState: "brown_mushroom",
    model: "brown_mushroom",
    texture: "blocks/mushroom_brown"
  },
  {
    name: "red_mushroom",
    blockState: "red_mushroom",
    model: "red_mushroom",
    texture: "blocks/mushroom_red"
  },
  {
    name: "gold_block",
    blockState: "gold_block",
    model: "gold_block",
    texture: "blocks/gold_block"
  },
  {
    name: "iron_block",
    blockState: "iron_block",
    model: "iron_block",
    texture: "blocks/iron_block"
  },
  {
    name: "double_stone_slab",
    blockState: "stone_double_slab",
    model: "double_stone",
    texture: "blocks/stone_slab_top"
  },
  {
    name: "stone_slab",
    blockState: "stone_slab",
    model: "half_slab_stone",
    texture: "blocks/stone_slab_top"
  },
  {
    name: "brick_block",
    blockState: "brick_block",
    model: "brick",
    texture: "blocks/brick"
  },
  {
    name: "tnt",
    blockState: "tnt",
    model: "tnt",
    texture: "blocks/tnt_bottom"
  },
  {
    name: "bookshelf",
    blockState: "bookshelf",
    model: "bookshelf",
    texture: "blocks/planks_oak"
  },
  {
    name: "mossy_cobblestone",
    blockState: "mossy_cobblestone",
    model: "mossy_cobblestone",
    texture: "blocks/cobblestone_mossy"
  },
  {
    name: "obsidian",
    blockState: "obsidian",
    model: "obsidian",
    texture: "blocks/obsidian"
  },
  {
    name: "torch",
    blockState: "torch",
    model: "normal_torch",
    texture: "blocks/torch_on"
  },
  {
    name: "fire",
    blockState: "fire",
    model: null,
    texture: null
  },
  {
    name: "mob_spawner",
    blockState: "mob_spawner",
    model: "mob_spawner_cage",
    texture: "blocks/mob_spawner"
  },
  {
    name: "oak_stairs",
    blockState: "oak_stairs",
    model: "oak_stairs",
    texture: "blocks/planks_oak"
  },
  {
    name: "chest",
    blockState: "chest",
    model: null,
    texture: null
  },
  {
    name: "redstone_wire",
    blockState: "redstone_wire",
    model: null,
    texture: null
  },
  {
    name: "diamond_ore",
    blockState: "diamond_ore",
    model: "diamond_ore",
    texture: "blocks/diamond_ore"
  },
  {
    name: "diamond_block",
    blockState: "diamond_block",
    model: "diamond_block",
    texture: "blocks/diamond_block"
  },
  {
    name: "crafting_table",
    blockState: "crafting_table",
    model: "crafting_table",
    texture: "blocks/crafting_table_front"
  },
  {
    name: "wheat",
    blockState: "wheat",
    model: "wheat_stage0",
    texture: "blocks/wheat_stage_0"
  },
  {
    name: "farmland",
    blockState: "farmland",
    model: "farmland_dry",
    texture: "blocks/dirt"
  },
  {
    name: "furnace",
    blockState: "furnace",
    model: "furnace",
    texture: "blocks/furnace_top"
  },
  {
    name: "lit_furnace",
    blockState: "lit_furnace",
    model: "lit_furnace",
    texture: "blocks/furnace_top"
  },
  {
    name: "standing_sign",
    blockState: "standing_sign",
    model: null,
    texture: null
  },
  {
    name: "wooden_door",
    blockState: "wooden_door",
    model: "wooden_door_bottom",
    texture: "blocks/door_wood_lower"
  },
  {
    name: "ladder",
    blockState: "ladder",
    model: "ladder",
    texture: "blocks/ladder"
  },
  {
    name: "rail",
    blockState: "rail",
    model: "normal_rail_flat",
    texture: "blocks/rail_normal"
  },
  {
    name: "stone_stairs",
    blockState: "stone_stairs",
    model: "stone_stairs",
    texture: "blocks/cobblestone"
  },
  {
    name: "wall_sign",
    blockState: "wall_sign",
    model: null,
    texture: null
  },
  {
    name: "lever",
    blockState: "lever",
    model: "lever_off",
    texture: "blocks/cobblestone"
  },
  {
    name: "stone_pressure_plate",
    blockState: "stone_pressure_plate",
    model: "stone_pressure_plate_up",
    texture: "blocks/stone"
  },
  {
    name: "iron_door",
    blockState: "iron_door",
    model: "iron_door_bottom",
    texture: "blocks/door_iron_lower"
  },
  {
    name: "wooden_pressure_plate",
    blockState: "wooden_pressure_plate",
    model: "wooden_pressure_plate_up",
    texture: "blocks/planks_oak"
  },
  {
    name: "redstone_ore",
    blockState: "redstone_ore",
    model: "redstone_ore",
    texture: "blocks/redstone_ore"
  },
  {
    name: "lit_redstone_ore",
    blockState: "lit_redstone_ore",
    model: "lit_redstone_ore",
    texture: "blocks/redstone_ore"
  },
  {
    name: "unlit_redstone_torch",
    blockState: "unlit_redstone_torch",
    model: "unlit_redstone_torch",
    texture: "blocks/redstone_torch_off"
  },
  {
    name: "redstone_torch",
    blockState: "redstone_torch",
    model: "lit_redstone_torch",
    texture: "blocks/redstone_torch_on"
  },
  {
    name: "stone_button",
    blockState: "stone_button",
    model: "stone_button",
    texture: "blocks/stone"
  },
  {
    name: "snow_layer",
    blockState: "snow_layer",
    model: "snow_height2",
    texture: "blocks/snow"
  },
  {
    name: "ice",
    blockState: "ice",
    model: "ice",
    texture: "blocks/ice"
  },
  {
    name: "snow",
    blockState: "snow",
    model: "snow",
    texture: "blocks/snow"
  },
  {
    name: "cactus",
    blockState: "cactus",
    model: "cactus",
    texture: "blocks/cactus_side"
  },
  {
    name: "clay",
    blockState: "clay",
    model: "clay",
    texture: "blocks/clay"
  },
  {
    name: "reeds",
    blockState: "reeds",
    model: "reeds",
    texture: "blocks/reeds"
  },
  {
    name: "jukebox",
    blockState: "jukebox",
    model: "jukebox",
    texture: "blocks/jukebox_top"
  },
  {
    name: "fence",
    blockState: "fence",
    model: null,
    texture: null
  },
  {
    name: "pumpkin",
    blockState: "pumpkin",
    model: "pumpkin",
    texture: "blocks/pumpkin_top"
  },
  {
    name: "netherrack",
    blockState: "netherrack",
    model: "netherrack",
    texture: "blocks/netherrack"
  },
  {
    name: "soul_sand",
    blockState: "soul_sand",
    model: "soul_sand",
    texture: "blocks/soul_sand"
  },
  {
    name: "glowstone",
    blockState: "glowstone",
    model: "glowstone",
    texture: "blocks/glowstone"
  },
  {
    name: "portal",
    blockState: "portal",
    model: "portal_ew",
    texture: "blocks/portal"
  },
  {
    name: "lit_pumpkin",
    blockState: "lit_pumpkin",
    model: "lit_pumpkin",
    texture: "blocks/pumpkin_top"
  },
  {
    name: "cake",
    blockState: "cake",
    model: "cake_uneaten",
    texture: "blocks/cake_side"
  },
  {
    name: "unpowered_repeater",
    blockState: "unpowered_repeater",
    model: "repeater_1tick",
    texture: "blocks/repeater_off"
  },
  {
    name: "powered_repeater",
    blockState: "powered_repeater",
    model: "repeater_on_1tick",
    texture: "blocks/repeater_on"
  },
  {
    name: "stained_glass",
    blockState: "white_stained_glass",
    model: "glass_white",
    texture: "blocks/glass_white"
  },
  {
    name: "trapdoor",
    blockState: "trapdoor",
    model: "wooden_trapdoor_bottom",
    texture: "blocks/trapdoor"
  },
  {
    name: "monster_egg",
    blockState: "monster_egg",
    model: null,
    texture: null
  },
  {
    name: "stonebrick",
    blockState: "stonebrick",
    model: "stonebrick_normal",
    texture: "blocks/stonebrick"
  },
  {
    name: "brown_mushroom_block",
    blockState: "brown_mushroom_block",
    model: "brown_mushroom_block_nw",
    texture: "blocks/mushroom_block_inside"
  },
  {
    name: "red_mushroom_block",
    blockState: "red_mushroom_block",
    model: "red_mushroom_block_nw",
    texture: "blocks/mushroom_block_inside"
  },
  {
    name: "iron_bars",
    blockState: "iron_bars",
    model: null,
    texture: null
  },
  {
    name: "glass_pane",
    blockState: "glass_pane",
    model: null,
    texture: null
  },
  {
    name: "melon_block",
    blockState: "melon_block",
    model: "melon",
    texture: "blocks/melon_top"
  },
  {
    name: "pumpkin_stem",
    blockState: "pumpkin_stem",
    model: "pumpkin_stem_growth0",
    texture: "blocks/pumpkin_stem_disconnected"
  },
  {
    name: "melon_stem",
    blockState: "melon_stem",
    model: "melon_stem_growth0",
    texture: "blocks/melon_stem_disconnected"
  },
  {
    name: "vine",
    blockState: "vine",
    model: "vine_1",
    texture: "blocks/vine"
  },
  {
    name: "fence_gate",
    blockState: "fence_gate",
    model: "oak_fence_gate_closed",
    texture: "blocks/planks_oak"
  },
  {
    name: "brick_stairs",
    blockState: "brick_stairs",
    model: "brick_stairs",
    texture: "blocks/brick"
  },
  {
    name: "stone_brick_stairs",
    blockState: "stone_brick_stairs",
    model: "stone_brick_stairs",
    texture: "blocks/stonebrick"
  },
  {
    name: "mycelium",
    blockState: "mycelium",
    model: "mycelium",
    texture: "blocks/dirt"
  },
  {
    name: "waterlily",
    blockState: "waterlily",
    model: "waterlily",
    texture: "blocks/waterlily"
  },
  {
    name: "nether_brick",
    blockState: "nether_brick",
    model: "nether_brick",
    texture: "blocks/nether_brick"
  },
  {
    name: "nether_brick_fence",
    blockState: "nether_brick_fence",
    model: null,
    texture: null
  },
  {
    name: "nether_brick_stairs",
    blockState: "nether_brick_stairs",
    model: "nether_brick_stairs",
    texture: "blocks/nether_brick"
  },
  {
    name: "nether_wart",
    blockState: "nether_wart",
    model: "nether_wart_stage0",
    texture: "blocks/nether_wart_stage_0"
  },
  {
    name: "enchanting_table",
    blockState: "enchanting_table",
    model: "enchanting_table_base",
    texture: "blocks/enchanting_table_bottom"
  },
  {
    name: "brewing_stand",
    blockState: "brewing_stand",
    model: null,
    texture: null
  },
  {
    name: "cauldron",
    blockState: "cauldron",
    model: "cauldron_empty",
    texture: "blocks/cauldron_side"
  },
  {
    name: "end_portal",
    blockState: "end_portal",
    model: null,
    texture: null
  },
  {
    name: "end_portal_frame",
    blockState: "end_portal_frame",
    model: "end_portal_frame_empty",
    texture: "blocks/endframe_side"
  },
  {
    name: "end_stone",
    blockState: "end_stone",
    model: "end_stone",
    texture: "blocks/end_stone"
  },
  {
    name: "dragon_egg",
    blockState: "dragon_egg",
    model: "dragon_egg",
    texture: "blocks/dragon_egg"
  },
  {
    name: "redstone_lamp",
    blockState: "redstone_lamp",
    model: "unlit_redstone_lamp",
    texture: "blocks/redstone_lamp_off"
  },
  {
    name: "lit_redstone_lamp",
    blockState: "lit_redstone_lamp",
    model: "lit_redstone_lamp",
    texture: "blocks/redstone_lamp_on"
  },
  {
    name: "double_wooden_slab",
    blockState: "oak_double_slab",
    model: "oak_planks",
    texture: "blocks/planks_oak"
  },
  {
    name: "wooden_slab",
    blockState: "oak_slab",
    model: "half_slab_oak",
    texture: "blocks/planks_oak"
  },
  {
    name: "cocoa",
    blockState: "cocoa",
    model: "cocoa_age0_s",
    texture: "blocks/cocoa_stage_0"
  },
  {
    name: "sandstone_stairs",
    blockState: "sandstone_stairs",
    model: "sandstone_stairs",
    texture: "blocks/sandstone_bottom"
  },
  {
    name: "emerald_ore",
    blockState: "emerald_ore",
    model: "emerald_ore",
    texture: "blocks/emerald_ore"
  },
  {
    name: "ender_chest",
    blockState: "ender_chest",
    model: null,
    texture: null
  },
  {
    name: "tripwire_hook",
    blockState: "tripwire_hook",
    model: "tripwire_hook",
    texture: "blocks/planks_oak"
  },
  {
    name: "tripwire",
    blockState: "tripwire",
    model: "tripwire_ns",
    texture: "blocks/trip_wire"
  },
  {
    name: "emerald_block",
    blockState: "emerald_block",
    model: "emerald_block",
    texture: "blocks/emerald_block"
  },
  {
    name: "spruce_stairs",
    blockState: "spruce_stairs",
    model: "spruce_stairs",
    texture: "blocks/planks_spruce"
  },
  {
    name: "birch_stairs",
    blockState: "birch_stairs",
    model: "birch_stairs",
    texture: "blocks/planks_birch"
  },
  {
    name: "jungle_stairs",
    blockState: "jungle_stairs",
    model: "jungle_stairs",
    texture: "blocks/planks_jungle"
  },
  {
    name: "command_block",
    blockState: "command_block",
    model: "command_block",
    texture: "blocks/command_block_back"
  },
  {
    name: "beacon",
    blockState: "beacon",
    model: "beacon",
    texture: "blocks/glass"
  },
  {
    name: "cobblestone_wall",
    blockState: "cobblestone_wall",
    model: null,
    texture: null
  },
  {
    name: "flower_pot",
    blockState: "flower_pot",
    model: "flower_pot",
    texture: "blocks/flower_pot"
  },
  {
    name: "carrots",
    blockState: "carrots",
    model: "carrots_stage0",
    texture: "blocks/carrots_stage_0"
  },
  {
    name: "potatoes",
    blockState: "potatoes",
    model: "potatoes_stage0",
    texture: "blocks/potatoes_stage_0"
  },
  {
    name: "wooden_button",
    blockState: "wooden_button",
    model: "wooden_button",
    texture: "blocks/planks_oak"
  },
  {
    name: "skull",
    blockState: "skull",
    model: null,
    texture: null
  },
  {
    name: "anvil",
    blockState: "anvil",
    model: "anvil_undamaged",
    texture: "blocks/anvil_base"
  },
  {
    name: "trapped_chest",
    blockState: "trapped_chest",
    model: null,
    texture: null
  },
  {
    name: "light_weighted_pressure_plate",
    blockState: "light_weighted_pressure_plate",
    model: "light_pressure_plate_up",
    texture: "blocks/gold_block"
  },
  {
    name: "heavy_weighted_pressure_plate",
    blockState: "heavy_weighted_pressure_plate",
    model: "heavy_pressure_plate_up",
    texture: "blocks/iron_block"
  },
  {
    name: "unpowered_comparator",
    blockState: "unpowered_comparator",
    model: "comparator_unlit",
    texture: "blocks/comparator_off"
  },
  {
    name: "powered_comparator",
    blockState: "powered_comparator",
    model: "comparator_unlit",
    texture: "blocks/comparator_off"
  },
  {
    name: "daylight_detector",
    blockState: "daylight_detector",
    model: "daylight_detector",
    texture: "blocks/daylight_detector_top"
  },
  {
    name: "redstone_block",
    blockState: "redstone_block",
    model: "redstone_block",
    texture: "blocks/redstone_block"
  },
  {
    name: "quartz_ore",
    blockState: "quartz_ore",
    model: "quartz_ore",
    texture: "blocks/quartz_ore"
  },
  {
    name: "hopper",
    blockState: "hopper",
    model: "hopper_down",
    texture: "blocks/hopper_outside"
  },
  {
    name: "quartz_block",
    blockState: "quartz_block",
    model: "quartz_normal",
    texture: "blocks/quartz_block_bottom"
  },
  {
    name: "quartz_stairs",
    blockState: "quartz_stairs",
    model: "quartz_stairs",
    texture: "blocks/quartz_block_bottom"
  },
  {
    name: "activator_rail",
    blockState: "activator_rail",
    model: "activator_rail_flat",
    texture: "blocks/rail_activator"
  },
  {
    name: "dropper",
    blockState: "dropper",
    model: "dropper_vertical",
    texture: "blocks/dropper_front_vertical"
  },
  {
    name: "stained_hardened_clay",
    blockState: "white_stained_hardened_clay",
    model: "hardened_clay_white",
    texture: "blocks/hardened_clay_stained_white"
  },
  {
    name: "stained_glass_pane",
    blockState: "white_stained_glass_pane",
    model: null,
    texture: null
  },
  {
    name: "leaves2",
    blockState: "acacia_leaves",
    model: "acacia_leaves",
    texture: "blocks/leaves_acacia"
  },
  {
    name: "log2",
    blockState: "acacia_log",
    model: "acacia_log",
    texture: "blocks/log_acacia_top"
  },
  {
    name: "acacia_stairs",
    blockState: "acacia_stairs",
    model: "acacia_stairs",
    texture: "blocks/planks_acacia"
  },
  {
    name: "dark_oak_stairs",
    blockState: "dark_oak_stairs",
    model: "dark_oak_stairs",
    texture: "blocks/planks_big_oak"
  },
  {
    name: "slime",
    blockState: "slime",
    model: "slime",
    texture: "blocks/slime"
  },
  {
    name: "barrier",
    blockState: "barrier",
    model: null,
    texture: null
  },
  {
    name: "iron_trapdoor",
    blockState: "iron_trapdoor",
    model: "iron_trapdoor_bottom",
    texture: "blocks/iron_trapdoor"
  },
  {
    name: "prismarine",
    blockState: "prismarine",
    model: "prismarine_rough",
    texture: "blocks/prismarine_rough"
  },
  {
    name: "sea_lantern",
    blockState: "sea_lantern",
    model: "sea_lantern",
    texture: "blocks/sea_lantern"
  },
  {
    name: "hay_block",
    blockState: "hay_block",
    model: "hay",
    texture: "blocks/hay_block_top"
  },
  {
    name: "carpet",
    blockState: "white_carpet",
    model: "carpet_white",
    texture: "blocks/wool_colored_white"
  },
  {
    name: "hardened_clay",
    blockState: "hardened_clay",
    model: "hardened_clay",
    texture: "blocks/hardened_clay"
  },
  {
    name: "coal_block",
    blockState: "coal_block",
    model: "coal_block",
    texture: "blocks/coal_block"
  },
  {
    name: "packed_ice",
    blockState: "packed_ice",
    model: "packed_ice",
    texture: "blocks/ice_packed"
  },
  {
    name: "double_plant",
    blockState: "sunflower",
    model: "double_sunflower_bottom",
    texture: "blocks/double_plant_sunflower_bottom"
  },
  {
    name: "standing_banner",
    blockState: "standing_banner",
    model: null,
    texture: null
  },
  {
    name: "wall_banner",
    blockState: "wall_banner",
    model: null,
    texture: null
  },
  {
    name: "daylight_detector_inverted",
    blockState: "daylight_detector_inverted",
    model: "daylight_detector_inverted",
    texture: "blocks/daylight_detector_inverted_top"
  },
  {
    name: "red_sandstone",
    blockState: "red_sandstone",
    model: "red_sandstone_normal",
    texture: "blocks/red_sandstone_bottom"
  },
  {
    name: "red_sandstone_stairs",
    blockState: "red_sandstone_stairs",
    model: "red_sandstone_stairs",
    texture: "blocks/red_sandstone_bottom"
  },
  {
    name: "double_stone_slab2",
    blockState: "red_sandstone_double_slab",
    model: "red_sandstone_normal",
    texture: "blocks/red_sandstone_bottom"
  },
  {
    name: "stone_slab2",
    blockState: "red_sandstone_slab",
    model: "half_slab_red_sandstone",
    texture: "blocks/red_sandstone_bottom"
  },
  {
    name: "spruce_fence_gate",
    blockState: "spruce_fence_gate",
    model: "spruce_fence_gate_closed",
    texture: "blocks/planks_spruce"
  },
  {
    name: "birch_fence_gate",
    blockState: "birch_fence_gate",
    model: "birch_fence_gate_closed",
    texture: "blocks/planks_birch"
  },
  {
    name: "jungle_fence_gate",
    blockState: "jungle_fence_gate",
    model: "jungle_fence_gate_closed",
    texture: "blocks/planks_jungle"
  },
  {
    name: "dark_oak_fence_gate",
    blockState: "dark_oak_fence_gate",
    model: "dark_oak_fence_gate_closed",
    texture: "blocks/planks_big_oak"
  },
  {
    name: "acacia_fence_gate",
    blockState: "acacia_fence_gate",
    model: "acacia_fence_gate_closed",
    texture: "blocks/planks_acacia"
  },
  {
    name: "spruce_fence",
    blockState: "spruce_fence",
    model: null,
    texture: null
  },
  {
    name: "birch_fence",
    blockState: "birch_fence",
    model: null,
    texture: null
  },
  {
    name: "jungle_fence",
    blockState: "jungle_fence",
    model: null,
    texture: null
  },
  {
    name: "dark_oak_fence",
    blockState: "dark_oak_fence",
    model: null,
    texture: null
  },
  {
    name: "acacia_fence",
    blockState: "acacia_fence",
    model: null,
    texture: null
  },
  {
    name: "spruce_door",
    blockState: "spruce_door",
    model: "spruce_door_bottom",
    texture: "blocks/door_spruce_lower"
  },
  {
    name: "birch_door",
    blockState: "birch_door",
    model: "birch_door_bottom",
    texture: "blocks/door_birch_lower"
  },
  {
    name: "jungle_door",
    blockState: "jungle_door",
    model: "jungle_door_bottom",
    texture: "blocks/door_jungle_lower"
  },
  {
    name: "acacia_door",
    blockState: "acacia_door",
    model: "acacia_door_bottom",
    texture: "blocks/door_acacia_lower"
  },
  {
    name: "dark_oak_door",
    blockState: "dark_oak_door",
    model: "dark_oak_door_bottom",
    texture: "blocks/door_dark_oak_lower"
  },
  {
    name: "end_rod",
    blockState: "end_rod",
    model: "end_rod",
    texture: "blocks/end_rod"
  },
  {
    name: "chorus_plant",
    blockState: "chorus_plant",
    model: null,
    texture: null
  },
  {
    name: "chorus_flower",
    blockState: "chorus_flower",
    model: "chorus_flower",
    texture: "blocks/chorus_flower"
  },
  {
    name: "purpur_block",
    blockState: "purpur_block",
    model: "purpur_block",
    texture: "blocks/purpur_block"
  },
  {
    name: "purpur_pillar",
    blockState: "purpur_pillar",
    model: "purpur_pillar_top",
    texture: "blocks/purpur_pillar_top"
  },
  {
    name: "purpur_stairs",
    blockState: "purpur_stairs",
    model: "purpur_stairs",
    texture: "blocks/purpur_block"
  },
  {
    name: "purpur_double_slab",
    blockState: "purpur_double_slab",
    model: "purpur_block",
    texture: "blocks/purpur_block"
  },
  {
    name: "purpur_slab",
    blockState: "purpur_slab",
    model: "half_slab_purpur",
    texture: "blocks/purpur_block"
  },
  {
    name: "end_bricks",
    blockState: "end_bricks",
    model: "end_bricks",
    texture: "blocks/end_bricks"
  },
  {
    name: "beetroots",
    blockState: "beetroots",
    model: "beetroots_stage0",
    texture: "blocks/beetroots_stage_0"
  },
  {
    name: "grass_path",
    blockState: "grass_path",
    model: "grass_path",
    texture: "blocks/dirt"
  },
  {
    name: "end_gateway",
    blockState: "end_gateway",
    model: null,
    texture: null
  },
  {
    name: "repeating_command_block",
    blockState: "repeating_command_block",
    model: "repeating_command_block",
    texture: "blocks/repeating_command_block_back"
  },
  {
    name: "chain_command_block",
    blockState: "chain_command_block",
    model: "chain_command_block",
    texture: "blocks/chain_command_block_back"
  },
  {
    name: "frosted_ice",
    blockState: "frosted_ice",
    model: "frosted_ice_0",
    texture: "blocks/frosted_ice_0"
  },
  {
    name: "magma",
    blockState: "magma",
    model: "magma",
    texture: "blocks/magma"
  },
  {
    name: "nether_wart_block",
    blockState: "nether_wart_block",
    model: "nether_wart_block",
    texture: "blocks/nether_wart_block"
  },
  {
    name: "red_nether_brick",
    blockState: "red_nether_brick",
    model: "red_nether_brick",
    texture: "blocks/red_nether_brick"
  },
  {
    name: "bone_block",
    blockState: "bone_block",
    model: "bone_block",
    texture: "blocks/bone_block_top"
  },
  {
    name: "structure_void",
    blockState: "structure_void",
    model: null,
    texture: null
  },
  {
    name: "observer",
    blockState: "observer",
    model: "observer",
    texture: "blocks/observer_back"
  },
  {
    name: "white_shulker_box",
    blockState: "white_shulker_box",
    model: null,
    texture: null
  },
  {
    name: "orange_shulker_box",
    blockState: "orange_shulker_box",
    model: null,
    texture: null
  },
  {
    name: "magenta_shulker_box",
    blockState: "magenta_shulker_box",
    model: null,
    texture: null
  },
  {
    name: "light_blue_shulker_box",
    blockState: "light_blue_shulker_box",
    model: null,
    texture: null
  },
  {
    name: "yellow_shulker_box",
    blockState: "yellow_shulker_box",
    model: null,
    texture: null
  },
  {
    name: "lime_shulker_box",
    blockState: "lime_shulker_box",
    model: null,
    texture: null
  },
  {
    name: "pink_shulker_box",
    blockState: "pink_shulker_box",
    model: null,
    texture: null
  },
  {
    name: "gray_shulker_box",
    blockState: "gray_shulker_box",
    model: null,
    texture: null
  },
  {
    name: "light_gray_shulker_box",
    blockState: "light_gray_shulker_box",
    model: null,
    texture: null
  },
  {
    name: "cyan_shulker_box",
    blockState: "cyan_shulker_box",
    model: null,
    texture: null
  },
  {
    name: "purple_shulker_box",
    blockState: "purple_shulker_box",
    model: null,
    texture: null
  },
  {
    name: "blue_shulker_box",
    blockState: "blue_shulker_box",
    model: null,
    texture: null
  },
  {
    name: "brown_shulker_box",
    blockState: "brown_shulker_box",
    model: null,
    texture: null
  },
  {
    name: "green_shulker_box",
    blockState: "green_shulker_box",
    model: null,
    texture: null
  },
  {
    name: "red_shulker_box",
    blockState: "red_shulker_box",
    model: null,
    texture: null
  },
  {
    name: "black_shulker_box",
    blockState: "black_shulker_box",
    model: null,
    texture: null
  },
  {
    name: "white_glazed_terracotta",
    blockState: "white_glazed_terracotta",
    model: "white_glazed_terracotta",
    texture: "blocks/glazed_terracotta_white"
  },
  {
    name: "orange_glazed_terracotta",
    blockState: "orange_glazed_terracotta",
    model: "orange_glazed_terracotta",
    texture: "blocks/glazed_terracotta_orange"
  },
  {
    name: "magenta_glazed_terracotta",
    blockState: "magenta_glazed_terracotta",
    model: "magenta_glazed_terracotta",
    texture: "blocks/glazed_terracotta_magenta"
  },
  {
    name: "light_blue_glazed_terracotta",
    blockState: "light_blue_glazed_terracotta",
    model: "light_blue_glazed_terracotta",
    texture: "blocks/glazed_terracotta_light_blue"
  },
  {
    name: "yellow_glazed_terracotta",
    blockState: "yellow_glazed_terracotta",
    model: "yellow_glazed_terracotta",
    texture: "blocks/glazed_terracotta_yellow"
  },
  {
    name: "lime_glazed_terracotta",
    blockState: "lime_glazed_terracotta",
    model: "lime_glazed_terracotta",
    texture: "blocks/glazed_terracotta_lime"
  },
  {
    name: "pink_glazed_terracotta",
    blockState: "pink_glazed_terracotta",
    model: "pink_glazed_terracotta",
    texture: "blocks/glazed_terracotta_pink"
  },
  {
    name: "gray_glazed_terracotta",
    blockState: "gray_glazed_terracotta",
    model: "gray_glazed_terracotta",
    texture: "blocks/glazed_terracotta_gray"
  },
  {
    name: "light_gray_glazed_terracotta",
    blockState: "light_gray_glazed_terracotta",
    model: null,
    texture: null
  },
  {
    name: "cyan_glazed_terracotta",
    blockState: "cyan_glazed_terracotta",
    model: "cyan_glazed_terracotta",
    texture: "blocks/glazed_terracotta_cyan"
  },
  {
    name: "purple_glazed_terracotta",
    blockState: "purple_glazed_terracotta",
    model: "purple_glazed_terracotta",
    texture: "blocks/glazed_terracotta_purple"
  },
  {
    name: "blue_glazed_terracotta",
    blockState: "blue_glazed_terracotta",
    model: "blue_glazed_terracotta",
    texture: "blocks/glazed_terracotta_blue"
  },
  {
    name: "brown_glazed_terracotta",
    blockState: "brown_glazed_terracotta",
    model: "brown_glazed_terracotta",
    texture: "blocks/glazed_terracotta_brown"
  },
  {
    name: "green_glazed_terracotta",
    blockState: "green_glazed_terracotta",
    model: "green_glazed_terracotta",
    texture: "blocks/glazed_terracotta_green"
  },
  {
    name: "red_glazed_terracotta",
    blockState: "red_glazed_terracotta",
    model: "red_glazed_terracotta",
    texture: "blocks/glazed_terracotta_red"
  },
  {
    name: "black_glazed_terracotta",
    blockState: "black_glazed_terracotta",
    model: "black_glazed_terracotta",
    texture: "blocks/glazed_terracotta_black"
  },
  {
    name: "concrete",
    blockState: "concrete",
    model: null,
    texture: null
  },
  {
    name: "concrete_powder",
    blockState: "concrete_powder",
    model: null,
    texture: null
  },
  {
    name: "structure_block",
    blockState: "structure_block",
    model: "structure_block_save",
    texture: "blocks/structure_block_save"
  }
];

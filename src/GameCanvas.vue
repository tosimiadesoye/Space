<template>
  <div ref="container" class="xr-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Game } from "./game";
import {spaceEffect} from './components/stars'
import {loadAnimatedModel} from './components/fbx'

// Element to output visuals to.
 const container = ref<HTMLElement>();
// WebGL Logic.
const webgl = ref<Game>();
   
// When the component has mounted, we create a new Game, which lives
// outside the Vue lifecycle.
onMounted(() => {
  if (!container.value) return;
  webgl.value = new Game(container.value);

spaceEffect()

let astronaut = loadAnimatedModel(
      "/resources/FBX/astronaut.fbx",
      "/resources/FBX/floating.fbx",
      7,
      -10
    );

    let alien = loadAnimatedModel(
      "/resources/FBX/alien.fbx",
      "/resources/FBX/swimmingToEdge.fbx",
      -5,
      0
    );
let game = new Game(container.value)
game.animate()
});
</script>
<style scoped>
.xr-container {
  position: relative;
  overflow: hidden;
}
</style>

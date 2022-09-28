<template>
  <div ref="container" class="xr-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Game, scene } from "./game";
import { spaceEffect } from "./components/stars";

import Planet from "./lib/planet";
import Rotation from "./lib/rotation";
import {
  MeshBasicMaterial,
  SphereGeometry,
  TextureLoader,
  Mesh,
  Group,
} from "three";
import sun from "./assets/image/sun.jpeg";
import earthPic from "./assets/image/earth.jpeg";
// Element to output visuals to.
const container = ref<HTMLElement>();
// WebGL Logic.
const webgl = ref<Game>();

// When the component has mounted, we create a new Game, which lives
// outside the Vue lifecycle.
onMounted(async () => {
  if (!container.value) return;
  webgl.value = new Game(container.value);
  console.log(container.value);

  await spaceEffect();

  const sunGeometry = new SphereGeometry(8);
  const sunTexture = new TextureLoader().load(sun);
  const sunMaterial = new MeshBasicMaterial({ map: sunTexture });
  const sunMesh = new Mesh(sunGeometry, sunMaterial);
  const solarSystem = new Group();
  solarSystem.add(sunMesh);
  scene.add(solarSystem);
  console.log("nothing is displaying");

  const earth = new Planet(3, 32, earthPic);
  const earthMesh = earth.getMesh();
  let earthsSystem = new Group();
  earthsSystem.add(earthMesh);

  solarSystem.add(earthsSystem);

  const earthRotation = new Rotation(earthMesh);
  const earthRotationMesh = earthRotation.getMesh();
  earthsSystem.add(earthRotationMesh);

  let game = new Game(container.value);
  await game.animate();
});
</script>
<style scoped>
.xr-container {
  position: relative;
  overflow: hidden;
}
</style>

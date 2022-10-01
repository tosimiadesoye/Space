<template>
  <div ref="container" class="xr-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from "vue";
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
  console.log(container);

   await spaceEffect();


});

  const sunGeometry = new SphereGeometry(60);
  const sunTexture = new TextureLoader().load(sun);
  const sunMaterial = new MeshBasicMaterial({ map: sunTexture });
  const sunMesh = new Mesh(sunGeometry, sunMaterial);
  sunMesh.position.set(-180, 0, 0,)
  const solarSystem = new Group();
  solarSystem.add(sunMesh);
  scene.add(solarSystem);

  const earth = new Planet(50, 20, earthPic);
  const earthMesh = earth.getMesh();
  let earthSystem = new Group();
  earthSystem.add(earthMesh);

  solarSystem.add(earthSystem);

  const earthRotation = new Rotation(earthMesh);
  const earthRotationMesh = earthRotation.getMesh();
  earthSystem.add(earthRotationMesh);


</script>
<style scoped>
.xr-container {
  position: relative;
  overflow: hidden;
}
</style>

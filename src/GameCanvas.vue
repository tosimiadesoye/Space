<template>
  <div ref="container" class="xr-container"> 
    <div>
      <button class="song" :click="audio()">play</button>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Game, scene } from "./game";
import {Planet, Rotation, spaceEffect, audio} from "./lib";

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
   await spaceEffect();


});

  const sunGeometry = new SphereGeometry(40);
  const sunTexture = new TextureLoader().load(sun);
  const sunMaterial = new MeshBasicMaterial({ map: sunTexture });
  const sunMesh = new Mesh(sunGeometry, sunMaterial);
  sunMesh.position.set(-80, 0, 0,)
  const solarSystem = new Group();
  solarSystem.add(sunMesh);
  scene.add(solarSystem);

  const earth = new Planet(20, 20, earthPic);
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
.song{
  background-color: rgb(255, 172, 127);
  border: 2px solid rgba(131, 19, 19, 0.101);
  border-radius: 5px;
  padding: 20px;
  z-index: 10000;
   margin: 50px 0;
}
</style>

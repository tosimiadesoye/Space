import { useEffect } from "react";

import {
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  TextureLoader,
  Texture,
} from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import SceneInit from "./lib/sceneInit";
export let sphere: Mesh;
//create a sun
// const circle = (edit:any, x:number, y:number, z = 0) =>{
//   const textureLoader = new TextureLoader();
//   // map: textureLoader.load("/images/earth2.jpg"),
//   // const sphereGeometry = new SphereGeometry(6, 32, 32);
//   const sphereGeometry = new SphereGeometry(x, y, z);
//   const sphereMaterial = new MeshPhongMaterial({
//     map: textureLoader.load("/images/earth2.jpg"),
//     transparent: true,
//   });
//   sphere = new Mesh(sphereGeometry, sphereMaterial);
//   // sphere.position.set(-20, 10,0)
//   sphere.position.set(x, y, z)
// }
function App() {
  useEffect(() => {
    const canvasScene = new SceneInit("canvas");
    canvasScene.initialize();

    let astronaut = canvasScene.loadAnimatedModel(
      "/resources/FBX/astronaut.fbx",
      "/resources/FBX/floating.fbx",
      7,
      -10
    );
    let alien = canvasScene.loadAnimatedModel(
      "/resources/FBX/alien.fbx",
      "/resources/FBX/swimmingToEdge.fbx",
      -5,
      0
    );

    const textureLoader = new TextureLoader();

    const sphereGeometry = new SphereGeometry(6, 32, 32);
    const sphereMaterial = new MeshPhongMaterial({
      map: textureLoader.load("/images/earth2.jpg"),
      transparent: true,
    });
    sphere = new Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-20, 10, 0);
    canvasScene.scene?.add(sphere);

    textureLoader.load("/images/stars.jpg", function (texture) {
      canvasScene.scene.background = texture;
    });

    canvasScene.animate();
  }, []);
  return (
    <div>
      <canvas id="canvas"></canvas>
    </div>
  );
}

export default App;

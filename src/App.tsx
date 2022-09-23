import { useEffect } from "react";

import {
  SphereGeometry,
  MeshPhongMaterial,
  Mesh,
  TextureLoader,
  MeshStandardMaterial,
  ImageUtils,
} from "three";

import SceneInit from "./lib/sceneInit";
function App() {
  useEffect(() => {
    const canvasScene = new SceneInit("canvas");
    canvasScene.initialize();
    canvasScene.animate();

    const textureLoader = new TextureLoader();

    const sphereGeometry = new SphereGeometry(6, 32, 32);
     const sphereMaterial = new MeshPhongMaterial({map: textureLoader.load('/images/earth1')});
    // const sphereMaterial = new MeshStandardMaterial({map: textureLoader.load('/images/earth2')});
    const sphere = new Mesh(sphereGeometry, sphereMaterial);
    canvasScene.scene?.add(sphere);


    

    textureLoader.load("/images/stars.jpg", function (texture) {
      canvasScene.scene.backgroud = texture;
    });
  }, []);
  return (
    <div>
      <canvas id="canvas" />
    </div>
  );
}

export default App;

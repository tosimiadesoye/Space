import { useEffect } from "react";

import { SphereGeometry, MeshPhongMaterial, Mesh, TextureLoader } from "three";

import SceneInit from "./lib/sceneInit";
function App() {
  useEffect(() => {
    const canvasScene = new SceneInit("canvas");
    canvasScene.initialize();
    canvasScene.animate();

    const textureLoader = new TextureLoader();

    const sphereGeometry = new SphereGeometry(6, 32, 32);
    const sphereMaterial = new MeshPhongMaterial({
      map: textureLoader.load("/images/earth2.jpg"),
      transparent: true,
    });
    const sphere = new Mesh(sphereGeometry, sphereMaterial);
    canvasScene.scene?.add(sphere);

    textureLoader.load("/images/space.jpg", function (texture) {
      canvasScene.scene.background = texture;
    });
  }, []);
  return (
    <div>
      <canvas id="canvas"></canvas>
    </div>
  );
}

export default App;

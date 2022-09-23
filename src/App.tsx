import React, { useEffect, useRef } from "react";
import {
  WebGL1Renderer,
  PerspectiveCamera,
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
  AudioListener,
  Audio,
  AudioLoader,
} from "three";

function App() {
  let cube = useRef<Mesh>();

  const renderer = new WebGL1Renderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const camera = new PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const scene = new Scene();

  const audio = () => {
    const listener = new AudioListener();
    camera.add(listener);

    // create a global audio source
    const sound = new Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new AudioLoader();
    audioLoader.load("sounds/larry.mp3", function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.4);
      sound.play();
    });
    console.log(audioLoader);
  };
  audio();

  const background = () => {
    const loader = new TextureLoader();
    loader.load("/images/stars.jpg", function (texture) {
      scene.background = texture;
    });
  };
  background();

  const box = () => {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0xffffff });
    cube.current = new Mesh(geometry, material);
    scene.add(cube.current);

    camera.position.z = 5;
  };
  box();
  function animate(time: number) {
    cube.current!.rotation.x = time / 1000;
    cube.current!.rotation.y = time / 1000;

    renderer.render(scene, camera);
  }

  useEffect(() => {
    renderer.setAnimationLoop(animate);
  }, []);
  return <></>;
}

export default App;

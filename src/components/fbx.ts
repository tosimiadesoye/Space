import {
    AnimationMixer
  } from 'three'
  import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
  import { scene } from "../game";

  export const loadAnimatedModel = async (
    character: string,
    animaion: string,
    x: number,
    y: number,
    z = 0
  ) => {
    const loader = new FBXLoader();

    loader.load(character, (object) => {
      object.position.set(x, y, z);
      object.scale.setScalar(0.1);
      object.traverse((c) => {
        c.castShadow = true;
      });

      const float = new FBXLoader();

      float.load(animaion, (anim) => {
        const mixer = new AnimationMixer(object);
        const idle = mixer.clipAction(anim.animations[0]);
        idle.play();
      });
      scene.add(object);
    });
  }
import {
  WebGL1Renderer,
  PerspectiveCamera,
  Scene,
  Renderer,
  AmbientLight,
  DirectionalLight,
  AnimationMixer,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default class SceneInit {
  scene: any | Scene;
  camera: any;
  renderer?: Renderer;

  fov: number;
  nearPlane: number;
  farPlane: number;

  controls?: OrbitControls;

  ambientLight?: AmbientLight;
  directionalLight?: DirectionalLight;
  canvasId: string;

  mixer?: AnimationMixer;

  constructor(canvasId: string) {
    this.scene = this.scene;
    this.camera = this.camera;
    this.renderer = this.renderer;

    /**
     * camera param;
     */
    this.fov = 45;
    this.nearPlane = 0.1;
    this.farPlane = 1000;
    this.canvasId = canvasId;

    this.controls = this.controls;

    // NOTE: Lighting is basically required.
    this.ambientLight = this.ambientLight;
    this.directionalLight = this.directionalLight;
  }

  initialize() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      this.nearPlane,
      this.farPlane
    );
    this.camera.position.z = 48;
    this.camera.rotation.x = Math.PI/2

    const canvas = document.getElementById(this.canvasId);

    this.renderer = new WebGL1Renderer({
      alpha: true,
      canvas,
      amtialias: true,
    });

    /**
     * to control the size of the orbit
     */
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // ambient light which is for the whole scene
    this.ambientLight = new AmbientLight(0xffffff, 0.5);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // directional light - parallel sun rays
    this.directionalLight = new DirectionalLight(0xffffff, 1);
    // this.directionalLight.castShadow = true;
    this.directionalLight.position.set(0, 32, 64);
    this.scene.add(this.directionalLight);

    // if window resizes
    window.addEventListener("resize", () => this.onWindowResize(), false);
  }
  //will eventual create a character control when the animaion works
  loadAnimatedModel(
    character: string,
    animaion: string,
    x: number,
    y: number,
    z = 0
  ) {
    const loader = new FBXLoader();
    // loader.setPath("src/resources/FBX/");
    loader.load(character, (object) => {
      object.position.set(x, y, z);
      object.scale.setScalar(0.1);
      object.traverse((c) => {
        c.castShadow = true;
      });

      const float = new FBXLoader();
      // float.setPath("src/resources/FBX/");
      float.load(animaion, (anim) => {
        this.mixer = new AnimationMixer(object);
        const idle = this.mixer.clipAction(anim.animations[0]);
        idle.play();
      });
      this.scene.add(object);
    });
  }
  animate() {
    // make earth rotate
    // sphere.rotation.x = 0.5/1000
    // sphere.rotation.y = 0.5/1000

    window.requestAnimationFrame(this.animate.bind(this));
    this.render();

    this.controls?.update();
  }

  render() {
    this.renderer?.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer?.setSize(window.innerWidth, window.innerHeight);
  }
}

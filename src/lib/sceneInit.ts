import {
  WebGL1Renderer,
  PerspectiveCamera,
  Scene,
  Clock,
  Renderer,
  AmbientLight,
  DirectionalLight,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class SceneInit {
  scene: any;
  camera: any;
  renderer?: Renderer;

  fov: number;
  nearPlane: number;
  farPlane: number;

  clock?: Clock;
  
  controls?: OrbitControls;

  ambientLight?: AmbientLight;
  directionalLight?: DirectionalLight;
  canvasId: string;

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

    this.clock = this.clock;
  
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
  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
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

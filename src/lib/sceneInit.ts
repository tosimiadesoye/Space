import {
  WebGL1Renderer,
  PerspectiveCamera,
  Scene,
  Renderer,
  AmbientLight,
  DirectionalLight,
  AnimationMixer,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Color,
  Spherical,
  AxesHelper,
  InstancedMesh,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Space from "./space";

const randomArbitrary = (min: number, max: number) => {
  return Math.random() * (min - max) + min;
};
export default class SceneInit {
  readonly scene: any | Scene = new Scene();
  camera: any;
  renderer?: Renderer;

  //camera param;
  readonly fov: number = 45;
  readonly nearPlane: number = 0.1;
  readonly farPlane: number = 1000;

  controls?: OrbitControls;

  ambientLight?: AmbientLight;
  directionalLight?: DirectionalLight;
  canvasId: string;

  mixer?: AnimationMixer;
  sphereGeometry?: SphereGeometry;

  constructor(canvasId: string) {
    this.scene = this.scene;
    this.camera = this.camera;
    this.renderer = this.renderer;

    this.canvasId = canvasId;

    this.controls = this.controls;

    // NOTE: Lighting is basically required.
    this.ambientLight = this.ambientLight;
    this.directionalLight = this.directionalLight;
  }

  initialize() {
    this.camera = new PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      this.nearPlane,
      this.farPlane
    );
    this.camera.position.z = 48;
    this.camera.rotation.x = Math.PI / 2;

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

    loader.load(character, (object) => {
      object.position.set(x, y, z);
      object.scale.setScalar(0.1);
      object.traverse((c) => {
        c.castShadow = true;
      });

      const float = new FBXLoader();

      float.load(animaion, (anim) => {
        this.mixer = new AnimationMixer(object);
        const idle = this.mixer.clipAction(anim.animations[0]);
        idle.play();
      });
      this.scene.add(object);
    });
  }

  star() {
    const spheres = [];
    for (let i = 0; i < 300; i++) {
      this.sphereGeometry = new SphereGeometry(
        0.05,
        0.2 * randomArbitrary(0.5, 1),
        6,
        6
      );
      let material = new MeshBasicMaterial({
        color: 0xaaaaaa,
      });

      let sphere = new Mesh(this.sphereGeometry, material);

      this.scene.add(sphere);
      spheres.push(sphere);
      sphere.position.setFromSpherical(
        new Spherical(
          Math.random() * 600 - 200,
          Math.random() * 600 - 200,
          Math.random() * 600 - 200
        )
      );
    }
  }
  animate() {
    // make earth rotate in the future

    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    //rotate scene
    // this.scene.rotation.y += 0.001;
    // this.scene.rotation.z -= 0.001;
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

import {
  WebGL1Renderer,
  PerspectiveCamera,
  Scene,
  Renderer,
  AmbientLight,
  DirectionalLight,
  AnimationMixer,
  SphereGeometry,
  FogExp2,
  BufferGeometry,
  TextureLoader,
  Float32BufferAttribute,
  PointsMaterial,
  Points,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";


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

  material?: PointsMaterial;

  // pointer
  pointerX = 0;
  pointerY = 0;

  //window
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  // stats
  stats?: Stats;

  //gui
  gui?: GUI;
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
    this.camera.position.z = 45;
    this.camera.rotation.x = Math.PI / 2;

    this.scene.fog = new FogExp2(0x000000, 0.001);

    const canvas = document.getElementById(this.canvasId);

    this.renderer = new WebGL1Renderer({
      alpha: true,
      canvas,
      amtialias: true,
    });
    // this.renderer.setPixelRatio(window.devicePixelRatio);
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.document.body.appendChild(this.renderer.domElement);
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

  spaceEffect() {
    const geometry = new BufferGeometry();
    const vertices = [];

    const sprite = new TextureLoader().load("images/disc.png");
    for (let i = 0; i < 1000; i++) {
      const x = 2000 * Math.random() - 1000;
      const y = 2000 * Math.random() - 1000;
      const z = 2000 * Math.random() - 1000;
      vertices.push(x, y, z);
    }
    geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    this.material = new PointsMaterial({
      size: 20,
      sizeAttenuation: true,
      map: sprite,
      alphaTest: 0.5,
      transparent: true,
    });
    this.material.color.setHSL(1.0, 0.3, 0.7);
    const particles = new Points(geometry, this.material);
    this.scene.add(particles);

    // stats
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    //GUI
    this.gui = new GUI();
    this.gui.add(this.material, "sizeAttenuation").onChange(() => {
      this.material.needsUpdate = true;
    });
    this.gui.open();

    //pointer
    document.body.style.touchAction = "none";
    document.body.addEventListener("pointermove", this.onPointerMove);

    window.addEventListener("resize", this.onWindowResize);
  }
  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();

    //rotate scene
    //  this.scene.rotation.y += 0.001;
    //  this.scene.rotation.z -= 0.001;

    this.controls?.update();
    this.stats?.update();
  }

  render() {
    const time = Date.now() * 0.00005;

    this.camera.position.x += (this.pointerX - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.pointerY - this.camera.position.y) * 0.05;

    this.camera.lookAt(this.scene.position);

    const h = ((360 * (1.0 + time)) % 360) / 360;
    this.material?.color.setHSL(h, 0.5, 0.5);

    this.renderer?.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer?.setSize(window.innerWidth, window.innerHeight);
  }

  onPointerMove(e: PointerEvent) {
    if (e.isPrimary === false) return;

    this.pointerX = e.x - this.windowHalfX;
    this.pointerY = e.y - this.windowHalfY;
  }
}

import {
  PerspectiveCamera,
  WebGL1Renderer,
  Renderer,
  Camera,
  Scene,
  FogExp2,
} from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const scene = new Scene();

export class Game {
  [x: string]: any;
  camera?: any | Camera;
  renderer?: Renderer;
  stats?: Stats;

  pointerX = 0;
  pointerY = 0;

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  constructor(readonly container: HTMLElement) {
    this.camera = this.camera;
    this.renderer = this.renderer;

    this.initialise();
    this.render();
    this.animate();
  }
  initialise = async () => {
    this.camera = new PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      2,
      2000
    );
    this.camera.position.z = 1000;

    scene.fog = new FogExp2(0x000000, 0.001);

    this.renderer = new WebGL1Renderer();
    // this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

     const controls = new OrbitControls(this.camera, this.renderer.domElement);
     controls.autoRotate = true
     controls.autoRotateSpeed = 4
     controls.maxDistance = 350
     controls.minDistance = 150 
     controls.enablePan = false
     controls.update();

    //pointer
     document.body.style.touchAction = "none";
     document.body.addEventListener("pointermove", this.onPointerMove);

    //
    window.addEventListener("resize", this.onWindowResize);
  };

  onWindowResize = async () => {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer?.setSize(window.innerWidth, window.innerHeight);
  };
  onPointerMove = async (e: PointerEvent) => {
    if (e.isPrimary === false) return;

    this.pointerX = e.x - this.windowHalfX;
    this.pointerY = e.y - this.windowHalfY;
  };

  //

  animate = async () => {
    window.requestAnimationFrame(this.animate.bind(this));

    this.render();
    this.stats?.update();
  };

  render = async () => {
    const time = Date.now() * 0.00005;

    this.camera.position.x += (this.pointerX - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.pointerY - this.camera.position.y) * 0.05;

    this.camera.lookAt(scene.position);

    const h = ((360 * (1.0 + time)) % 360) / 360;
     this.material?.color.setHSL(h, 0.5, 0.5);

    this.renderer?.render(scene, this.camera);
  };
}

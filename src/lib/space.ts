import {
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Color,
  Spherical,
  AxesHelper,
} from "three";
import SceneInit from "./sceneInit";

const randomArbitrary = (min: number, max: number) => {
  return Math.random() * (min - max) + min;
};
let canvas = new SceneInit("canvas");
export default class Space {
  sphereGeometry?: SphereGeometry;

  star() {
    const spheres = [];
    for (let i = 0; i < 6000; i++) {
      this.sphereGeometry = new SphereGeometry(
        0,
        0.2 * randomArbitrary(0.5, 1),
        6,
        6
      );
      let material = new MeshBasicMaterial({
        color: new Color(
          1,
          randomArbitrary(190, 220) / 255,
          Math.round(Math.random())
        ),
      });

      let sphere = new Mesh(this.sphereGeometry, material);

      canvas.scene?.add(sphere);
      spheres.push(sphere);
      sphere.position.setFromSpherical(
        new Spherical(
          5 + 5 * Math.random(),
          2 * Math.PI * Math.random(),
          2 * Math.PI * Math.random()
        )
      );
    }
    // canvas.scene!.rotation.x = 0.2;
    // canvas.scene!.rotation.y = 0.6;
    // canvas.scene!.rotation.z = 5;
    let axesHelper = new AxesHelper(3);
    canvas.scene?.add(axesHelper);
  }
}

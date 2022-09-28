import {
    BufferGeometry,
    TextureLoader,
    Float32BufferAttribute,
    PointsMaterial,
    Points,
  } from "three";
  
  import { GUI } from "dat.gui";
  import { scene } from "../game";
  import star from '../assets/image/disc.png'

  let material: PointsMaterial 
  let gui: GUI 
 
 
export const spaceEffect = async () => {
    const geometry = new BufferGeometry();
    const vertices = [];

    const sprite = new TextureLoader().load(star);
    for (let i = 0; i < 1000; i++) {
      const x = 2000 * Math.random() - 1000;
      const y = 2000 * Math.random() - 1000;
      const z = 2000 * Math.random() - 1000;
      vertices.push(x, y, z);
    }
    geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    material = new PointsMaterial({
      size: 20,
      sizeAttenuation: true,
      map: sprite,
      alphaTest: 0.5,
      transparent: true,
    });
    material.color.setHSL(1.0, 0.3, 0.7);
    const particles = new Points(geometry, material);
    scene.add(particles);
console.log(star)
   
    //GUI
    gui = new GUI();
    gui.add(material, "sizeAttenuation").onChange(() => {
      material.needsUpdate = true;
    });
    gui.open();

  }
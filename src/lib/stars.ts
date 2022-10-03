import {
  BufferGeometry,
  TextureLoader,
  Float32BufferAttribute,
  PointsMaterial,
  Points,
  AdditiveBlending,
} from "three";

import { GUI } from "dat.gui";
import { scene } from "../game";
import textureStar from "../assets/image/disc.png";

let starMaterial: PointsMaterial;
let gui: GUI;

export const spaceEffect = async () => {
  const StarGeometry = new BufferGeometry();
  const vertices = [];

  const sprite = new TextureLoader().load(textureStar);
  for (let i = 0; i < 1000; i++) {
    const x = 2000 * Math.random() - 1000;
    const y = 2000 * Math.random() - 1000;
    const z = 2000 * Math.random() - 1000;
    vertices.push(x, y, z);
    
  }
  StarGeometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  starMaterial = new PointsMaterial({
    size: 8,
    sizeAttenuation: true,
    map: sprite,
    alphaTest: 0.5,
    transparent: true,
    opacity:0.8,
    blending: AdditiveBlending
  });
  starMaterial.depthWrite = false;
  const stars = new Points(StarGeometry, starMaterial);
  scene.add(stars);

  //GUI
  gui = new GUI();
  gui.add(starMaterial, "sizeAttenuation").onChange(() => {
    starMaterial.needsUpdate = true;
  });
  gui.open();


  function animate(){
      // Rotate and change saturation lightness of each star
     stars.rotation.x += 0.005
     stars.rotation.y += 0.005
    requestAnimationFrame(animate)
  
  }
  animate()
};



"use client";

import { useRef, useEffect } from "react";
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { cn } from "../utils";

export default function CSA_SCC_Room({ isRoomOpen, className }: { isRoomOpen: boolean, className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const attachedRef = useRef<boolean>(false);

    const getCanvasDimensions = () => {
        const element = containerRef.current;
        if (!element) return { width: 0, height: 0, aspect: 0 };
        const boundingClientRect = element.getBoundingClientRect();
        const width = boundingClientRect.width;
        const height = boundingClientRect.height;
        return {
            width,
            height,
            aspect: width / height,
        }
    }

    useEffect(() => {
        if (!containerRef.current || attachedRef.current) return;
        const canvasDimensions = getCanvasDimensions();
        const canvasWidth = canvasDimensions.width;
        const canvasHeight = canvasDimensions.height;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1e293b)

        const camera = new THREE.PerspectiveCamera(75, canvasDimensions.aspect, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(canvasWidth, canvasHeight);
        containerRef.current.appendChild(renderer.domElement);
        attachedRef.current = true;

        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
        scene.add(hemisphereLight);

        const indoorLightFar = new THREE.PointLight(0xffffff, 2);
        indoorLightFar.position.add(new THREE.Vector3(-0.5, 1.749, 0.5));
        scene.add(indoorLightFar);

        const indoorLightClose = new THREE.PointLight(0xffffff, 2);
        indoorLightClose.position.add(new THREE.Vector3(0.7, 1.749, -0.7));
        scene.add(indoorLightClose);

        const controls = new OrbitControls(camera, renderer.domElement);
        camera.position.set(3.0501035415905093, 1.2620784614055514, 1.1849161754458413);
        camera.lookAt(0, 2.5, 0);
        controls.update();

        const loader = new GLTFLoader();
        const doorGroup = new THREE.Group();

        loader.load('CSA_SCC_Room.glb', function (gltf) {
            const targetOpacity = isRoomOpen ? 0.35 : 0.95;
            const targetColor = 0xdddddd;
            gltf.scene.children.forEach((child) => {
                if (child.name.startsWith('Window')) {
                    if (!("material" in child)) return;
                    let material = new THREE.MeshStandardMaterial({ color: targetColor });
                    material.transparent = true;
                    material.opacity = targetOpacity;
                    child.material = material;
                } else if (child.name === 'Door') {
                    child.children.forEach((mesh) => {
                        // Cube001_1 is the window on the door
                        if (mesh.name === "Cube001_1" && "material" in mesh) {
                            let material = new THREE.MeshStandardMaterial({ color: targetColor });
                            material.transparent = true;
                            material.opacity = targetOpacity;
                            mesh.material = material;
                        }
                    });
                }
            });

            gltf.scene.children.filter((child) => child.name.startsWith('Door')).forEach((door) => {
                doorGroup.add(door);
            });

            if (isRoomOpen) {
                doorGroup.rotateY(-Math.PI / 3);
                doorGroup.position.add(new THREE.Vector3(-0.755, 0, -2.05));
            }
            scene.add(doorGroup);
            scene.add(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });

        const animate = () => {
            requestAnimationFrame(animate);
            const rotateSpeed = 0.0005;
            const distanceSpeed = 3.25;
            // camera.position.x = Math.sin(Date.now() * rotateSpeed) * distanceSpeed;
            // camera.position.y = 1;
            // camera.position.z = Math.cos(Date.now() * rotateSpeed) * distanceSpeed;

            const ySpeed = 0.001;
            // camera.position.y = Math.sin(Date.now() * ySpeed) * 0.025 + 0.9;

            // camera.lookAt(0, 1, 0.25);

            controls.update();
            renderer.render(scene, camera);
        };

        onWindowResize();

        function onWindowResize() {
            const canvasResizeDimensions = getCanvasDimensions();
            camera.aspect = canvasResizeDimensions.aspect;
            camera.updateProjectionMatrix();
            renderer.setSize(canvasResizeDimensions.width, canvasResizeDimensions.height);
            animate();
        }

        window.addEventListener("resize", onWindowResize);

        setTimeout(() => {
            onWindowResize();
        }, 1000);

        return () => {
            window.removeEventListener("resize", onWindowResize);
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn(`w-full h-full`, className)}
            id="CSA_SCC_Room"
        />
    );
}
"use client";

import { useRef, useEffect, useState } from "react";
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { cn } from "../utils";

export default function CSA_SCC_Room({ isRoomOpen, className }: { isRoomOpen: boolean, className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const attachedRef = useRef<boolean>(false);

    const threeSceneRef = useRef<THREE.Scene | null>(null);
    const threeControlsRef = useRef<OrbitControls | null>(null);

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
        threeSceneRef.current = new THREE.Scene();
        threeSceneRef.current.background = new THREE.Color(0x1e293b)

        const camera = new THREE.PerspectiveCamera(75, canvasDimensions.aspect, 0.1, 1000);
        camera.position.set(2.9, 1.1, 1.05);


        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(canvasDimensions.aspect);
        renderer.setSize(canvasWidth, canvasHeight);
        renderer.setAnimationLoop(animate);
        containerRef.current.appendChild(renderer.domElement);
        attachedRef.current = true;

        // Add all lighting
        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
        threeSceneRef.current.add(hemisphereLight);

        const indoorLightFar = new THREE.PointLight(0xffffff, 2);
        indoorLightFar.position.add(new THREE.Vector3(-0.5, 1.749, 0.5));
        threeSceneRef.current.add(indoorLightFar);

        const indoorLightClose = new THREE.PointLight(0xffffff, 2);
        indoorLightClose.position.add(new THREE.Vector3(0.7, 1.749, -0.7));
        threeSceneRef.current.add(indoorLightClose);

        // Add controls
        threeControlsRef.current = new OrbitControls(camera, renderer.domElement);
        const controls = threeControlsRef.current;
        controls.listenToKeyEvents(window);
        controls.target.set(0, 0.75, 0);
        controls.maxZoom = 5;
        controls.autoRotate = true;
        controls.autoRotateSpeed = -3;
        controls.minDistance = 0.25;
        controls.maxDistance = 4;
        controls.update();

        const loader = new GLTFLoader();
        const doorGroup = new THREE.Group();

        loader.load('CSA_SCC_Room.glb', function (gltf) {
            const windowOpacity = 0.75;
            const targetOpacity = isRoomOpen ? 0 : 0.95;
            const targetColor = 0xdddddd;
            gltf.scene.children.forEach((child) => {
                if (child.name.startsWith('WindowBlind')) {
                    if (!("material" in child)) return;
                    let material = new THREE.MeshStandardMaterial({ color: targetColor });
                    material.transparent = true;
                    material.opacity = targetOpacity;
                    child.material = material;
                } else if (child.name.startsWith('Window')) {
                    if (!("material" in child)) return;
                    let material = new THREE.MeshStandardMaterial({ color: targetColor });
                    material.transparent = true;
                    material.opacity = windowOpacity;
                    child.material = material;
                } else if (child.name === 'Door') {
                    child.children.forEach((mesh) => {
                        // Cube001_1 is the window on the door. When updating the model, the last name may change.
                        // e.g. Cube001_1 -> Cube001
                        if (mesh.name === "Cube001_1" && "material" in mesh) {
                            let material = new THREE.MeshStandardMaterial({ color: targetColor });
                            material.transparent = true;
                            material.opacity = windowOpacity;
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
                doorGroup.position.add(new THREE.Vector3(-0.715, 0, -2.075));
            }
            threeSceneRef.current?.add(doorGroup);
            threeSceneRef.current?.add(gltf.scene);
        }, undefined, function (error) {
            console.error(error);
        });

        function animate() {
            if (!threeSceneRef.current) return;
            controls.update();
            renderer.render(threeSceneRef.current, camera);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn(`w-full h-full`, className)}
            id="CSA_SCC_Room"
        />
    );
}
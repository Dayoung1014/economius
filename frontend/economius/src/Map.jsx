import { Suspense, useState, useEffect, useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { useRecoilState, useRecoilValue } from 'recoil';
import { MapAnimationIndexState, NowPlayerPositionState, MoveDistState, IsModalOpenState, MonthlyModalOpenState } from '/src/recoil/animation/atom';
import { PlayerToRollState, PlayerIdState } from '/src/recoil/game/atom';

// ['0', '1', ... , '30', '31']
const animationNames = Array.from({ length: 32 }, (_, index) => `${index}`);

function Map() {
    const mapPath = 'final-map.gltf';
    const map = useLoader(GLTFLoader, mapPath);
    const mapRef = useRef();
    const position = [1.3, -2, 4.3]; // 오른대각, 위아래, 왼대각
    const scale = [0.5, 0.5, 0.5];
    const [mapAniIdx, setMapAniIdx] = useRecoilState(MapAnimationIndexState); // 맵 애니메이션 칸
    const [nowPlayerPosition, setNowPlayerPosition] = useRecoilState(NowPlayerPositionState); // 플레이어 최종 위치
    const [moveDist, setMoveDist] = useRecoilState(MoveDistState); // 플레이어 이동 거리
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState); // 자산 모달 여부
    const [monthlyModalOpen, setMonthlyModalOpen] = useRecoilState(MonthlyModalOpenState); // 월말정산 모달 여부
    const playerToRoll = useRecoilValue(PlayerToRollState);
    const playerId = useRecoilValue(PlayerIdState);

    let mixer;
    mixer = new THREE.AnimationMixer(map.scene); // 모델에 적용된 애니메이션을 제어하는 변수
    useEffect(() => {
        // map.animations 배열에서 mapAniIdx에 해당하는 애니메이션을 찾음
        const animation = map.animations.find(anim => anim.name === animationNames[mapAniIdx]);
        if (animation) {
            const clip = mixer.clipAction(animation);
            clip.setLoop(THREE.LoopOnce); // 한 번만 재생
            clip.play();
            clip.clampWhenFinished = true; // 클립이 재생을 완료하면 mixer에서 제거
        }
        if (mapAniIdx === nowPlayerPosition) {
            if (playerToRoll === playerId) {
                // 월말정산 모달 오픈
                if (nowPlayerPosition < moveDist) {
                    setMonthlyModalOpen(true);
                }
            }
            // 0.5초 후 자산 모달 오픈
            setTimeout(() => {
                setIsModalOpen(true);
            }, 500);
        }
    }, [mapAniIdx]);

    // "ChanceAction"과 "ChanceAction.001" 애니메이션에 대한 Mixer와 ClipAction 초기화
    const chanceActionMixer = new THREE.AnimationMixer(map.scene);
    const chanceAction001Mixer = new THREE.AnimationMixer(map.scene);
    const chanceAction003Mixer = new THREE.AnimationMixer(map.scene);
    const chanceAnimation = map.animations.find(anim => anim.name === 'ChanceAction');
    const chanceAnimation001 = map.animations.find(anim => anim.name === 'ChanceAction.001');
    const chanceAnimation003 = map.animations.find(anim => anim.name === '28.001Action.003');
    if (chanceAnimation) {
        const chanceActionClip = chanceActionMixer.clipAction(chanceAnimation);
        chanceActionClip.setLoop(THREE.LoopRepeat); // 무한 반복
        chanceActionClip.play();
    }
    if (chanceAnimation001) {
        const chanceActionClip001 = chanceAction001Mixer.clipAction(chanceAnimation001);
        chanceActionClip001.setLoop(THREE.LoopRepeat); // 무한 반복
        chanceActionClip001.play();
    }
    if (chanceAnimation003) {
        const chanceActionClip003 = chanceAction003Mixer.clipAction(chanceAnimation003);
        chanceActionClip003.setLoop(THREE.LoopRepeat); // 무한 반복
        chanceActionClip003.play();
    }

    useFrame((_, delta) => {
        mixer?.update(delta);
        chanceActionMixer?.update(delta);
        chanceAction001Mixer?.update(delta);
        chanceAction003Mixer?.update(delta);
    });

    //   map.scene.traverse((child) => {
    //     if (child.isMesh) {
    //       child.castShadow = true;
    //       child.receiveShadow = true;
    //       child.material.side = THREE.FrontSide;
    //     }
    //   });
    map.scene.traverse(child => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            // 기존 색상 유지하면서 매끈한 표면 설정
            if (child.material) {
                const material = child.material.clone(); // 기존 머티리얼을 복제
                // roughnessMap: mapRoughness,

                material.roughness = 0; // 값이 작을수록 표면이 매끈해집니다.
                material.metalness = 0.2; // 값이 작을수록 금속적인 느낌이 강해집니다.

                child.material = material; // 새로운 머티리얼 적용
            }
        }
    });

    return (
        <Suspense fallback={null}>
            {/* 3D 객체 렌더링 */}
            <primitive object={map.scene} scale={scale} position={position} ref={mapRef} />
        </Suspense>
    );
}

export default Map;

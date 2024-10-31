import { useProgress } from "@react-three/drei";
import { useState, useEffect } from "react";

import Loader from "./CustomLoader";

import "../../styles/gameMenu.css";

import { useStore } from "../../state/useStore";

const Overlay = () => {
    const [shown, setShown] = useState(true);
    const [opaque, setOpaque] = useState(true);
    const [hasLoaded, setHasLoaded] = useState(false);
    const { active, progress } = useProgress();

    const gameStarted = useStore((s) => s.gameStarted);
    const gameOver = useStore((s) => s.gameOver);
    const setGameStarted = useStore((s) => s.setGameStarted);
    const setHasInteracted = useStore((s) => s.setHasInteracted);

    useEffect(() => {
        if (gameStarted || gameOver) {
            setShown(false);
        } else if (!gameStarted) {
            setShown(true);
        }
    }, [gameStarted, active, gameOver]);

    useEffect(() => {
        let t;
        if (hasLoaded === opaque)
            t = setTimeout(() => setOpaque(!hasLoaded), 300);
        return () => clearTimeout(t);
    }, [hasLoaded, opaque]);

    useEffect(() => {
        if (progress >= 100) {
            setHasLoaded(true);
        }
    }, [progress]);

    const handleStart = () => {
        setGameStarted(true);
    };

    return shown ? (
        <div
            onClick={() => setHasInteracted()}
            className={`game__container`}
            style={{
                opacity: shown ? 1 : 0,
                background: opaque ? "#141622FF" : "#141622CC",
            }}
        >
            <div className="game__menu">
                <img
                    className="game__logo"
                    src="spaceship-logo.png"
                    alt="SpaceShip Logo"
                />
                <div className="game__subcontainer">
                    {!hasLoaded ? (
                        <Loader active={active} progress={progress} />
                    ) : (
                        <>
                            <button
                                onClick={handleStart}
                                className="game__menu-button"
                            >
                                {"STA>RT"}
                            </button>
                            <div className="game__menu-options">
                                <span className="game__menu-controls">
                                    <p>Controls</p>← / →
                                </span>
                                <span className="game__menu-warning">
                                    Photosensitivity warning - Game contains
                                    flashing lights
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    ) : null;
};

export default Overlay;

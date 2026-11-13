import React from 'react'
import GhostFibers from './GhostFibers'
import './SecondaryBackground.css'

function SecondaryBackground({ className = '' }) {
  return (
    <div
      className={`secondary-interface-background ${className}`}
      aria-hidden="true"
    >
      <GhostFibers
        className="secondary-interface-fibers"
        glowColor="#52f45d"
        secondaryColor="#10b981"
        lineColor="#effff3"
        layers={3}
        threads={48}
        density={0.55}
        thickness={0.9}
        speed={0.08}
        flow={0.02}
        waves={1.05}
        twist={1.25}
        spread={1.05}
        perspective={0.68}
        depthOfField={0.92}
        particles={0.24}
        sparkle={0.32}
        glow={0.42}
        brightness={0.68}
        vignette={0.34}
        grain={0.025}
        mouseInteraction
        hoverEffect="focus"
        mouseStrength={0.8}
        pulseOnClick
        intro
      />
      <span className="secondary-interface-grid" />
      <span className="secondary-interface-vignette" />
      <span className="secondary-interface-noise" />
    </div>
  )
}

export default SecondaryBackground

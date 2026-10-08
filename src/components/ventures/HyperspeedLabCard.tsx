'use client';

import React, { useState, useMemo } from 'react';
import {
  Hyperspeed,
  ZENITH_PRESET,
  DEFAULT_EFFECT_OPTIONS,
  STEALTH_PRESET,
  HyperspeedEffectOptions,
  DistortionPreset,
} from '@/components/ui/Hyperspeed';
import { StatusTag } from '@/components/ui/StatusTag';
import { Tag } from '@/components/ui/Tag';
import { Zap, Gauge, Layers, Activity } from 'lucide-react';

type PresetType = 'zenith' | 'cyber' | 'stealth';

export function HyperspeedLabCard() {
  const [preset, setPreset] = useState<PresetType>('zenith');
  const [distortion, setDistortion] = useState<DistortionPreset>('turbulentDistortion');
  const [isAccelerating, setIsAccelerating] = useState<boolean>(false);

  const effectOptions: HyperspeedEffectOptions = useMemo(() => {
    let base = ZENITH_PRESET;
    if (preset === 'cyber') base = DEFAULT_EFFECT_OPTIONS;
    if (preset === 'stealth') base = STEALTH_PRESET;

    return {
      ...base,
      distortion,
      onSpeedUp: () => setIsAccelerating(true),
      onSlowDown: () => setIsAccelerating(false),
    };
  }, [preset, distortion]);

  return (
    <div className="border border-[var(--border-color)] bg-[var(--surface-elevated)] p-6 sm:p-8 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 hairline-border-b">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono-tag text-xs font-semibold px-2 py-0.5 border border-[var(--border-color)] text-[var(--signal)]">
              LAB-06
            </span>
            <span className="font-mono-tag text-[10px] text-[var(--stone)] uppercase">
              R&amp;D EXPERIMENT // THREE.JS + POSTPROCESSING
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-medium text-[var(--text-primary)]">
            CAD Hyperspeed Accelerator
          </h3>
          <p className="text-xs sm:text-sm text-[var(--muted-text)] mt-1">
            Real-time WebGL tube geometry instancing, GLSL procedural distortion, and post-processing warp tunnel.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <StatusTag status="Exploring" size="sm" />
          <span className="font-mono-tag text-xs px-2 py-0.5 border border-[var(--signal)] text-[var(--signal)] bg-[var(--signal)]/10">
            INTERACTIVE
          </span>
        </div>
      </div>

      {/* Control Bar: Presets & Distortion Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-[var(--surface)] border border-[var(--border-color)]">
        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono-tag text-[10px] text-[var(--stone)] flex items-center gap-1">
            <Layers className="w-3 h-3 text-[var(--signal)]" />
            PALETTE:
          </span>
          <div className="flex items-center gap-1">
            {(
              [
                { id: 'zenith', label: 'ZENITH (BLUEPRINT)' },
                { id: 'cyber', label: 'CYBER WARP' },
                { id: 'stealth', label: 'STEALTH MONO' },
              ] as const
            ).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPreset(p.id)}
                className={`px-2.5 py-1 font-mono-tag text-[11px] border transition-colors ${
                  preset === p.id
                    ? 'border-[var(--signal)] bg-[var(--signal)]/10 text-[var(--signal)] font-medium'
                    : 'border-[var(--border-color)] text-[var(--stone)] hover:text-[var(--text-primary)]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Distortion Mode */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono-tag text-[10px] text-[var(--stone)] flex items-center gap-1">
            <Activity className="w-3 h-3 text-[var(--signal)]" />
            DISTORTION:
          </span>
          <select
            value={distortion}
            onChange={(e) => setDistortion(e.target.value as DistortionPreset)}
            className="px-2 py-1 text-xs font-mono-tag bg-[var(--surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--signal)]"
          >
            <option value="turbulentDistortion">TURBULENT CURVE</option>
            <option value="mountainDistortion">MOUNTAIN PEAKS</option>
            <option value="LongRaceDistortion">LONG RACE TRACK</option>
            <option value="deepDistortion">DEEP GRAVITY WARP</option>
          </select>
        </div>

        {/* Acceleration Status Indicator */}
        <div className="flex items-center gap-2">
          <span
            className={`font-mono-tag text-[11px] px-2.5 py-1 border flex items-center gap-1.5 transition-colors ${
              isAccelerating
                ? 'border-[var(--signal)] text-[var(--signal)] bg-[var(--signal)]/10 animate-pulse font-medium'
                : 'border-[var(--border-color)] text-[var(--stone)]'
            }`}
          >
            <Zap className={`w-3 h-3 ${isAccelerating ? 'text-[var(--signal)]' : 'text-[var(--stone)]'}`} />
            {isAccelerating ? 'WARP ACCELERATION (FOV 140°)' : 'IDLE CRUISE (CLICK / HOLD CANVAS)'}
          </span>
        </div>
      </div>

      {/* Interactive 3D WebGL Hyperspeed Viewport */}
      <div className="relative w-full h-[380px] sm:h-[460px] border border-[var(--border-color)] bg-[#050507] overflow-hidden select-none">
        {/* Hyperspeed WebGL Component */}
        <Hyperspeed effectOptions={effectOptions} />

        {/* Architectural HUD Overlay */}
        <div className="absolute top-3 left-3 pointer-events-none z-10 flex flex-col gap-1 font-mono-tag text-[10px] text-white/70 bg-black/50 p-2 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3882F6] animate-pulse" />
            <span>RENDERER: WEBGL2 INSTANCED ARRAYS</span>
          </div>
          <span>PIPELINE: POSTPROCESSING (BLOOM + SMAA)</span>
        </div>

        <div className="absolute bottom-3 right-3 pointer-events-none z-10 font-mono-tag text-[10px] text-white/70 bg-black/50 px-2.5 py-1.5 backdrop-blur-sm border border-white/10 flex items-center gap-2">
          <Gauge className="w-3 h-3 text-[#3882F6]" />
          <span>HOLD CLICK / TOUCH TO ENGAGE SPEED BOOST</span>
        </div>
      </div>

      {/* Technical Spec & Hypothesis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 hairline-border-t text-xs">
        <div className="p-3 border border-[var(--border-color)] bg-[var(--surface)] space-y-1">
          <span className="font-mono-tag text-[10px] text-[var(--signal)] block uppercase">
            RESEARCH HYPOTHESIS
          </span>
          <p className="text-[var(--muted-text)] leading-relaxed">
            GPU-instanced vertex displacement algorithms can deliver high-fidelity spatial motion cues with zero main-thread CPU overhead.
          </p>
        </div>

        <div className="p-3 border border-[var(--border-color)] bg-[var(--surface)] space-y-1">
          <span className="font-mono-tag text-[10px] text-[var(--signal)] block uppercase">
            SHADER ARCHITECTURE
          </span>
          <p className="text-[var(--muted-text)] leading-relaxed">
            Procedural vertex distortion with multi-frequency sinusoidal noise, combined with smooth-step alpha fade and linear fog attenuation.
          </p>
        </div>

        <div className="p-3 border border-[var(--border-color)] bg-[var(--surface)] space-y-1">
          <span className="font-mono-tag text-[10px] text-[var(--signal)] block uppercase">
            CAPABILITIES &amp; STACK
          </span>
          <div className="flex flex-wrap gap-1 mt-1">
            <Tag size="sm">THREE.JS</Tag>
            <Tag size="sm">POSTPROCESSING</Tag>
            <Tag size="sm">GLSL SHADERS</Tag>
            <Tag size="sm">WEBGL2</Tag>
          </div>
        </div>
      </div>
    </div>
  );
}

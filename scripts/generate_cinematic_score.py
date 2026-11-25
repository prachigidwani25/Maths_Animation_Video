#!/usr/bin/env python3
"""
PROJECT GAUSS — ORIGINAL CINEMATIC BACKGROUND SCORE GENERATOR
Bespoke Minimalist Documentary Soundtrack
Key: D Dorian / F Major (Calm, Intelligent, Curious, Inspiring)
Sample Rate: 44100 Hz, 16-bit Stereo PCM
Total Duration: 236.50 seconds
"""

import math
import struct
import wave
import sys
import os

SAMPLE_RATE = 44100
TOTAL_DURATION = 236.50
TOTAL_SAMPLES = int(SAMPLE_RATE * TOTAL_DURATION)

# Frequencies for notes in Hz
NOTE_FREQS = {
    'D2': 73.42, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'Bb2': 116.54, 'C3': 130.81,
    'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'Bb3': 233.08, 'C4': 261.63,
    'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'Bb4': 466.16, 'C5': 523.25,
    'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'C6': 1046.50,
}

# Scene Boundaries (in seconds)
# Scene 01: 0.00 - 28.20s  (The Hook)
# Scene 02: 28.20 - 57.00s (Augmented Matrix)
# Scene 03: 57.00 - 100.60s (Row Operations)
# Scene 04: 100.60 - 179.00s (Gaussian Elimination)
# Scene 05: 179.00 - 207.00s (Back-Substitution)
# Scene 06: 207.00 - 236.50s (Synthesis & Outro)

def midi_to_freq(midi_note):
    return 440.0 * (2.0 ** ((midi_note - 69) / 12.0))

# Synthesis helper functions
def generate_pad_voice(freq, t, detune=0.003):
    """Warm analog synth pad with dual detuned soft waveforms and gentle LFO filter."""
    f1 = freq * (1.0 + detune)
    f2 = freq * (1.0 - detune)
    # LFO for subtle tremolo/filter sweep (0.2 Hz)
    lfo = 0.85 + 0.15 * math.sin(2 * math.pi * 0.22 * t)
    
    # Fundamental + warm 2nd and 3rd harmonics with soft clipping
    wave1 = math.sin(2 * math.pi * f1 * t) + 0.45 * math.sin(4 * math.pi * f1 * t) + 0.15 * math.sin(6 * math.pi * f1 * t)
    wave2 = math.sin(2 * math.pi * f2 * t) + 0.45 * math.sin(4 * math.pi * f2 * t) + 0.15 * math.sin(6 * math.pi * f2 * t)
    return (wave1 + wave2) * 0.5 * lfo

def piano_note(freq, t_note, duration=3.0, velocity=1.0):
    """Gentle acoustic felt-piano tone with exponential harmonic decay."""
    if t_note < 0 or t_note > duration:
        return 0.0
    
    # Quick soft attack (15ms)
    attack = min(1.0, t_note / 0.018)
    # Natural exponential decay
    decay = math.exp(-t_note * 1.8)
    
    # Harmonics: fundamental decays slower than upper harmonics
    h1 = math.sin(2 * math.pi * freq * t_note) * math.exp(-t_note * 1.2)
    h2 = 0.45 * math.sin(4 * math.pi * freq * t_note) * math.exp(-t_note * 2.5)
    h3 = 0.20 * math.sin(6 * math.pi * freq * t_note) * math.exp(-t_note * 3.8)
    h4 = 0.08 * math.sin(8 * math.pi * freq * t_note) * math.exp(-t_note * 5.5)
    
    return attack * decay * (h1 + h2 + h3 + h4) * velocity

def bell_chime(freq, t_note, duration=2.5, velocity=0.8):
    """Subtle metallic / celesta chime for mathematical discovery moments."""
    if t_note < 0 or t_note > duration:
        return 0.0
    attack = min(1.0, t_note / 0.005)
    decay = math.exp(-t_note * 2.8)
    # Inharmonic metallic partials
    s = (math.sin(2 * math.pi * freq * t_note) +
         0.35 * math.sin(2 * math.pi * freq * 2.76 * t_note) +
         0.18 * math.sin(2 * math.pi * freq * 5.4 * t_note))
    return attack * decay * s * velocity

def organic_pulse(t, bpm=68.0):
    """Subtle, muted rhythmic tick/pulse for precision feel."""
    beat_dur = 60.0 / bpm
    t_in_beat = t % beat_dur
    if t_in_beat > 0.12:
        return 0.0
    # Soft wooden tap: high frequencies rolled off, pure mid warmth
    env = math.exp(-t_in_beat * 45.0)
    tap = math.sin(2 * math.pi * 140.0 * t_in_beat) + 0.3 * math.sin(2 * math.pi * 280.0 * t_in_beat)
    return env * tap * 0.18

def main():
    print(f"Generating Project GAUSS original cinematic score...")
    print(f"Duration: {TOTAL_DURATION}s ({TOTAL_SAMPLES} samples at {SAMPLE_RATE} Hz)")

    # Define chord progressions across the 6 movements
    # Format: (start_t, end_t, chord_root_notes)
    chord_timeline = [
        # SCENE 01: THE HOOK (0 - 28.2s) - Inquisitive Dm9 / Fmaj7
        (0.0, 7.5, ['D2', 'F3', 'A3', 'C4', 'E4']),
        (7.5, 14.5, ['Bb2', 'D3', 'F3', 'A3', 'D4']),
        (14.5, 21.5, ['F2', 'C3', 'F3', 'A3', 'C4', 'E4']),
        (21.5, 28.2, ['A2', 'E3', 'G3', 'C#4', 'E4']),

        # SCENE 02: AUGMENTED MATRIX (28.2 - 57.0s) - Clear Fmaj9 / Dm
        (28.2, 35.5, ['F2', 'C3', 'A3', 'C4', 'E4', 'G4']),
        (35.5, 43.0, ['C3', 'G3', 'C4', 'E4', 'G4']),
        (43.0, 50.0, ['D2', 'A2', 'F3', 'A3', 'C4', 'F4']),
        (50.0, 57.0, ['Bb2', 'F3', 'Bb3', 'D4', 'F4']),

        # SCENE 03: ROW OPERATIONS (57.0 - 100.6s) - Rhythmic Structure Dm / Bb / F / C
        (57.0, 68.0, ['D2', 'A2', 'F3', 'A3', 'D4', 'F4']),
        (68.0, 79.0, ['Bb2', 'F3', 'Bb3', 'D4', 'F4']),
        (79.0, 90.0, ['F2', 'C3', 'F3', 'A3', 'C4', 'E4']),
        (90.0, 100.6, ['C3', 'G3', 'C4', 'E4', 'G4']),

        # SCENE 04: GAUSSIAN ELIMINATION (100.6 - 179.0s) - Systematic Momentum
        (100.6, 114.0, ['F2', 'C3', 'A3', 'C4', 'F4']),
        (114.0, 127.0, ['D2', 'A2', 'F3', 'A3', 'C4', 'E4']),
        (127.0, 140.0, ['Bb2', 'F3', 'Bb3', 'D4', 'F4']),
        (140.0, 153.0, ['C3', 'G3', 'C4', 'E4', 'G4']),
        (153.0, 166.0, ['D2', 'A2', 'F3', 'A3', 'D4', 'F4']),
        (166.0, 179.0, ['F2', 'C3', 'A3', 'C4', 'E4', 'A4']),

        # SCENE 05: BACK-SUBSTITUTION (179.0 - 207.0s) - Resolving Payoff
        (179.0, 186.0, ['Bb2', 'F3', 'D4', 'F4', 'A4']),
        (186.0, 193.0, ['C3', 'G3', 'E4', 'G4', 'C5']),
        (193.0, 200.0, ['D2', 'A2', 'F4', 'A4', 'D5']),
        (200.0, 207.0, ['F2', 'C3', 'A4', 'C5', 'F5']),

        # SCENE 06: SYNTHESIS & OUTRO (207.0 - 236.5s) - Serene Mastery
        (207.0, 217.0, ['F2', 'C3', 'A3', 'C4', 'E4', 'G4']),
        (217.0, 226.0, ['Bb2', 'F3', 'D4', 'F4', 'A4']),
        (226.0, 236.5, ['F2', 'C3', 'F3', 'A3', 'C4', 'F4']),
    ]

    # Melodic events (piano and chimes)
    # Format: (timestamp, note, duration, velocity, pan)
    melody_events = [
        # Scene 01 Intro motif
        (1.8, 'A4', 3.2, 0.45, -0.2),
        (3.8, 'E4', 3.0, 0.40, 0.2),
        (5.5, 'F4', 3.5, 0.50, 0.0),
        (9.0, 'D4', 3.0, 0.42, -0.3),
        (11.2, 'F4', 2.8, 0.45, 0.1),
        (13.0, 'A4', 3.5, 0.48, 0.3),
        (16.5, 'C5', 3.2, 0.50, 0.0),
        (19.0, 'A4', 3.0, 0.45, -0.2),
        (23.0, 'E4', 3.5, 0.42, 0.2),
        (25.5, 'F4', 4.0, 0.50, 0.0),

        # Scene 02 Matrix transformation motif
        (30.0, 'C4', 2.8, 0.45, -0.2),
        (32.5, 'E4', 2.8, 0.45, 0.2),
        (34.8, 'G4', 3.0, 0.50, 0.0),
        (37.5, 'A4', 2.8, 0.48, -0.2),
        (40.0, 'G4', 3.0, 0.46, 0.2),
        (44.5, 'F4', 3.2, 0.50, 0.0),
        (47.8, 'D4', 3.0, 0.45, -0.3),
        (52.0, 'F4', 3.5, 0.52, 0.1),
        (54.5, 'A4', 4.0, 0.55, 0.0),

        # Scene 03 Operations: delicate ostinato
        (59.0, 'D4', 2.2, 0.45, -0.25),
        (61.5, 'F4', 2.2, 0.48, 0.25),
        (63.8, 'A4', 2.5, 0.52, 0.0),
        (66.5, 'F4', 2.2, 0.45, -0.2),
        (70.2, 'D4', 2.2, 0.48, 0.2),
        (73.5, 'Bb4', 2.8, 0.52, -0.1),
        (76.0, 'A4', 2.5, 0.48, 0.2),
        (81.0, 'C5', 3.0, 0.54, 0.0),
        (84.5, 'A4', 2.5, 0.48, -0.2),
        (87.8, 'F4', 2.5, 0.46, 0.2),
        (92.0, 'G4', 3.0, 0.50, 0.0),
        (95.5, 'E4', 3.2, 0.48, -0.2),
        (98.5, 'F4', 3.8, 0.52, 0.0),

        # Scene 04 Forward Elimination: intellectual momentum
        (103.0, 'A4', 2.5, 0.48, -0.2),
        (106.0, 'C5', 2.5, 0.52, 0.2),
        (109.0, 'F4', 2.8, 0.48, 0.0),
        (112.5, 'D4', 2.5, 0.45, -0.3),
        (116.0, 'A4', 2.8, 0.50, 0.1),
        (120.0, 'F4', 2.5, 0.46, -0.2),
        # First zero discovery chime!
        (135.0, 'A5', 3.5, 0.60, 0.15),
        (137.5, 'F5', 3.2, 0.55, -0.15),
        (142.0, 'D4', 2.5, 0.46, 0.2),
        (146.0, 'F4', 2.5, 0.48, -0.2),
        (150.0, 'A4', 2.8, 0.52, 0.0),
        # Second zero discovery chime!
        (156.0, 'C6', 3.5, 0.62, 0.2),
        (158.5, 'A5', 3.2, 0.58, -0.2),
        (162.0, 'D5', 2.8, 0.50, 0.0),
        (166.0, 'F4', 2.5, 0.48, -0.2),
        # Third zero & Echelon Form triumph!
        (171.0, 'E5', 3.5, 0.60, 0.2),
        (173.5, 'F5', 4.0, 0.65, 0.0),
        (176.0, 'A5', 4.2, 0.62, 0.2),

        # Scene 05 Back-Substitution: Resolving payoff
        (182.0, 'D4', 2.2, 0.48, -0.25),
        (184.5, 'F4', 2.2, 0.50, 0.25),
        # Solve z = 3
        (191.0, 'A5', 3.5, 0.62, 0.1),
        (193.0, 'F5', 3.0, 0.58, -0.1),
        # Solve y = 2
        (196.5, 'G5', 3.5, 0.62, 0.2),
        # Solve x = 1 & Final (1, 2, 3) Payoff!
        (200.5, 'C5', 3.0, 0.55, -0.2),
        (202.5, 'E5', 3.5, 0.60, 0.2),
        (204.5, 'F5', 4.5, 0.68, 0.0),

        # Scene 06 Synthesis & Outro
        (209.0, 'A4', 3.5, 0.50, -0.15),
        (212.5, 'F4', 3.5, 0.48, 0.15),
        (216.0, 'C5', 3.8, 0.52, 0.0),
        (220.0, 'D4', 4.0, 0.48, -0.2),
        (224.5, 'A4', 4.5, 0.54, 0.2),
        (229.0, 'F4', 5.0, 0.56, 0.0),
        # Final warm chime
        (232.0, 'C5', 5.0, 0.45, 0.1),
    ]

    # Precompute sample buffer in chunks
    chunk_size = 88200 # 2 seconds per batch
    n_chunks = math.ceil(TOTAL_SAMPLES / chunk_size)

    out_file = 'public/cinematic_score_raw.wav'
    os.makedirs('public', exist_ok=True)
    
    with wave.open(out_file, 'wb') as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)

        sample_idx = 0
        for chunk_idx in range(n_chunks):
            start_s = chunk_idx * chunk_size
            end_s = min(TOTAL_SAMPLES, start_s + chunk_size)
            chunk_len = end_s - start_s
            raw_chunk = bytearray(chunk_len * 4)

            for i in range(chunk_len):
                curr_s = start_s + i
                t = curr_s / SAMPLE_RATE

                # Master Fade-in and Fade-out envelopes
                fade_in = min(1.0, t / 2.5)
                fade_out = 1.0 if t < (TOTAL_DURATION - 4.5) else max(0.0, (TOTAL_DURATION - t) / 4.5)
                global_env = fade_in * fade_out

                # 1. Background Analog Chord Pad
                pad_left = 0.0
                pad_right = 0.0
                for start_t, end_t, notes in chord_timeline:
                    if start_t - 1.5 <= t <= end_t + 1.5:
                        # Crossfade between chords
                        chord_fade = 1.0
                        if t < start_t + 1.0:
                            chord_fade = max(0.0, (t - (start_t - 1.0)) / 2.0)
                        elif t > end_t - 1.0:
                            chord_fade = max(0.0, ((end_t + 1.0) - t) / 2.0)
                        chord_fade = min(1.0, max(0.0, chord_fade))

                        for n_idx, note_name in enumerate(notes):
                            f = NOTE_FREQS.get(note_name, 220.0)
                            v = generate_pad_voice(f, t, detune=0.0025 + 0.001 * (n_idx % 3))
                            # Stereo spread: lower notes center, higher notes pan gently
                            pan = -0.3 + (0.6 * (n_idx / max(1, len(notes) - 1)))
                            left_gain = math.cos((pan + 1.0) * math.pi / 4.0)
                            right_gain = math.sin((pan + 1.0) * math.pi / 4.0)
                            pad_left += v * left_gain * chord_fade * 0.12
                            pad_right += v * right_gain * chord_fade * 0.12

                # 2. Gentle Rhythmic Pulse (Scenes 02, 03, 04, 05)
                pulse_vol = 0.0
                if 28.2 <= t < 207.0:
                    if t < 57.0:
                        pulse_vol = 0.35 # Subtle tick in Scene 02
                    elif t < 100.6:
                        pulse_vol = 0.50 # Moderate pulse in Scene 03
                    elif t < 179.0:
                        pulse_vol = 0.55 # Steady progression pulse in Scene 04
                    else:
                        pulse_vol = 0.40 # Soft heartbeat in Scene 05
                pulse = organic_pulse(t, bpm=68.0) * pulse_vol

                # 3. Piano Melodic Elements & Discovery Chimes
                piano_left = 0.0
                piano_right = 0.0
                for ev_t, note_name, dur, vel, pan in melody_events:
                    if ev_t <= t <= ev_t + dur:
                        f = NOTE_FREQS.get(note_name, 440.0)
                        t_rel = t - ev_t
                        p_val = piano_note(f, t_rel, duration=dur, velocity=vel)
                        left_gain = math.cos((pan + 1.0) * math.pi / 4.0)
                        right_gain = math.sin((pan + 1.0) * math.pi / 4.0)
                        piano_left += p_val * left_gain * 0.28
                        piano_right += p_val * right_gain * 0.28

                        # Add bell chime sparkle on high notes
                        if note_name in ['A5', 'C6', 'F5']:
                            c_val = bell_chime(f, t_rel, duration=dur, velocity=vel * 0.7)
                            piano_left += c_val * left_gain * 0.15
                            piano_right += c_val * right_gain * 0.15

                # Sum all channels with global master headroom
                mix_l = (pad_left + piano_left + pulse * 0.8) * global_env * 0.75
                mix_r = (pad_right + piano_right + pulse * 0.8) * global_env * 0.75

                # Soft saturation / analog limiter to avoid any harsh clipping
                mix_l = math.tanh(mix_l)
                mix_r = math.tanh(mix_r)

                val_l = int(mix_l * 32767 * 0.85)
                val_r = int(mix_r * 32767 * 0.85)
                # Clamp within int16 bounds
                val_l = max(-32768, min(32767, val_l))
                val_r = max(-32768, min(32767, val_r))

                struct.pack_into('<hh', raw_chunk, i * 4, val_l, val_r)

            wf.writeframes(raw_chunk)
            if chunk_idx % 10 == 0 or chunk_idx == n_chunks - 1:
                print(f"Synthesized: {min(TOTAL_DURATION, end_s / SAMPLE_RATE):.1f}s / {TOTAL_DURATION}s ({(end_s/TOTAL_SAMPLES)*100:.1f}%)")

    print(f"Raw score synthesis complete: {out_file}")

if __name__ == '__main__':
    main()

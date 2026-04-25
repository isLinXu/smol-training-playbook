---
title: Training Marathon
description: From pre-training to long-context extension
---

# Training Marathon

Training a language model at scale is a marathon, not a sprint. This chapter covers the practical aspects of running training reliably.

## Pre-Training Checklist

### Infrastructure Readiness

- ✅ Slurm reservation with fixed nodes
- ✅ GPU stress testing (found 2 throttled GPUs!)
- ✅ Avoid storage bloat

### Software Readiness

- ✅ Automated evaluation pipeline
- ✅ Checkpoint auto-recovery
- ✅ Complete metric logging

## Troubleshooting: Unexpected Issues

### Puzzle #1: Throughput Vanishing

**Symptom**: Throughput drops cliff-like after a few hours

**Root Cause**: FSx (Weka) storage capacity insufficient, frequent data shard eviction

**Fix**: Migrate to local /scratch storage + backup node strategy

### Puzzle #2: Continuous Throughput Decline

**Symptom**: Throughput decreases steadily with step count

**Root Cause**: Nanosets dataloader builds giant index growing with steps, consuming shared memory

**Fix**: Introduce TokenizedBytes dataloader

### Puzzle #3: Loss Noise

**Root Cause**: Dataloader reads sequentially, short sequences in batch dominated by low-quality long files

**Fix**: Offline pre-shuffling + different seed per epoch

### Puzzle #4: Performance Issues

**Symptom**: 3B model performs worse than 1.7B model at same stage

**Root Cause**: **TP each rank uses same random seed** (should be seed + tp_rank)

**Fix**: Set different seed for each TP rank

## Loss Curve Types

### Good Curves

- ✅ Smooth decrease

### Recoverable Spikes

- ⚠️ Fast/slow recovery

### Unrecoverable Issues

- ❌ Divergence or stuck at worse plateau

## Recovery Strategies

- **Skip problematic batches** (Falcon skipped 1B tokens)
- **Tighten gradient clipping**
- **Introduce QK-norm** (Marin team approach)

## Long Context Extension

### Extension Strategy

```
4k → 32k (RoPE θ: 2M) → 64k (RoPE θ: 5M) → 128k (YaRN extrapolation)
```

### Key Findings

- Staged extension优于 directly jumping to 128k
- 50B tokens per stage + new LR schedule works better
- Base mix already contains ~10% long documents, no extra upsampling needed

## Optimizer Configuration

### AdamW (Industry Standard)

```yaml
β₁ = 0.9, β₂ = 0.95
weight_decay = 0.1
gradient_clipping = 1.0
```

### Muon (Second-order Optimizer)

- Matrix-level perspective updates (captures row/column structure)
- Achieves isotropy through orthogonalization
- More tolerant of large batches
- Used by Kimi K2, GLM-4.5

**SmolLM3 chose AdamW** (stable, mature debugging)

## Learning Rate Schedule

### Schedule Comparison

| Schedule | Characteristic | Used by SmolLM3 |
|----------|---------------|------------------|
| Cosine Decay | Fixed period, tied to training duration | — |
| WSD | Stable → sharp decay, flexible extendable | ✅ |
| Multi-Step | Discrete drops (used by DeepSeek) | — |

**Finding**: WSD 10% decay window performs comparably to Cosine with higher flexibility

## Training Cost Summary

| Phase | GPUs | Days | GPU Hours |
|-------|------|------|-----------|
| Main pretraining | varies | 302 | ~276,480 |
| Ablations | 192 | 156 | 69,120 |
| Debugging | varies | ~7 | 46,080 |
| **Total** | — | — | **~437,760** |

---

*Next: [Post-training →](/en/07-posttraining)*

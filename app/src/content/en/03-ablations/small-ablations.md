---
title: Small Ablations
description: The foundation of reliable LLM training - run small experiments first
---

# Small Ablations

> "Every big model starts with a small ablation."

Ablation studies are the cornerstone of reliable language model training. They allow you to validate ideas cheaply before committing to expensive production runs.

## Why Ablations Matter

Machine learning is an **experimental science**, not pure mathematics. Our intuitions often fail:

- High-quality data from arXiv might **hurt** small model performance
- Architectural changes that seem beneficial may not scale
- Hyperparameters optimal at small scale may not transfer

## Two Key Properties

Every ablation study must balance:

| Property | Description | Goal |
|----------|-------------|------|
| **Speed** | How fast can you iterate? | Run experiments frequently |
| **Reliability** | Can you trust the results? | Low noise, strong signal |

## The Ablation Pyramid

```
        ▲
       /│\        Large Scale (expensive)
      / │ \       Full production runs
     /  │  \
    /───┼──-\      Medium Scale
    │   │   │
    │   │   │      Small Scale (cheap)
    │   │   │
    └────────┘     Tiny Scale (quick)
```

**Always start at the bottom and work your way up.**

## Choosing a Baseline

### Good Reference Architectures Have:

- ✅ Compatible with deployment requirements
- ✅ Validated at scale (trillions of tokens)
- ✅ Well documented
- ✅ Good framework support

### Popular Architectures (2025)

| Architecture | Model Series | Parameters |
|-------------|--------------|------------|
| Dense | Llama 3.1/3.2 | 8B, 70B / 1B, 3B |
| Dense | Qwen3 | 0.6B-32B |
| MoE | Qwen3 MoE | 30B-A3B, 235B-A22B |
| MoE | Kimi K2 | 1T-A32B |
| Hybrid | Falcon-H1 | 0.5B-34B |

## De-risking Your Baseline

> **Rule**: Never change anything unless testing proves it helps.

### How to De-risk:

1. **Test changes one at a time**
2. **Integrate successful changes into new baseline**
3. **Avoid exhaustive grid searches**

### Example Ablation Configuration (1B Transformer):

```yaml
# Architecture: Llama3.2 1B config
layers: 16
hidden_size: 2048

# Data Mix
- FineWeb-Edu: 70%
- Stack-Edu-Python: 20%
- FineMath: 10%

# Optimizer
optimizer: AdamW
peak_lr: 5e-4
scheduler: cosine

# Scale
gpus: 8
tokens: 30B
```

## Evaluation: Getting Reliable Signals

### Four Principles of Reliable Evals

| Principle | Description |
|-----------|-------------|
| **Monotonicity** | Score improves steadily with training |
| **Low Noise** | Stable across random seeds |
| **Above Random** | Don't use tasks that only show signal late |
| **Rank Correlation** | Early winner should stay winner |

### Task Format Comparison

| Format | Description | Best For |
|--------|-------------|----------|
| Multiple Choice (MCF) | Include A/B/C/D in prompt | Main runs |
| Cloze Format (CF) | Compare likelihoods, no prompt needed | Early ablations |
| Free Generation (FG) | Greedy decoding accuracy | Post-training |

### Standard Evaluation Suite

```
MMLU      - Knowledge
ARC       - Reasoning
HellaSwag - Common sense
GSM8K     - Math
HumanEval - Code
RULER     - Long context
```

## Cost Analysis

| Phase | GPUs | Days | GPU Hours |
|-------|------|------|-----------|
| Main pretraining | 384 | 302 | 276,480 |
| Ablations | 192 | 156 | 69,120 |
| Debugging/recovery | 384/192 | 3/4 | 46,080 |
| **Total** | — | — | **437,760** |

> ⚠️ Ablations cost **37%** of total compute — budget for them!

## Key Takeaways

1. **Validate before scaling** — never run large experiments first
2. **Test one change at a time** — integration testing beats grid search
3. **Measure everything** — you can't improve what you can't measure
4. **Budget for ablations** — they're not optional

---

*Next: [Model Architecture →](/en/04-architecture)*

---
title: Post-training
description: From base model to production assistant - SFT, DPO, and alignment
---

# Post-training

Post-training transforms a base language model into a helpful, aligned assistant. This chapter covers the key techniques.

## Why Post-training?

Base models are trained to predict the next token — they're not naturally helpful assistants.

### The Gap

| Capability | Base Model | Post-trained |
|------------|------------|--------------|
| Following instructions | ❌ | ✅ |
| Safety alignment | ❌ | ✅ |
| Conversational | ❌ | ✅ |
| Task completion | ❌ | ✅ |

## Supervised Fine-Tuning (SFT)

### What is SFT?

Fine-tuning a pre-trained model on high-quality demonstration data.

### Data Requirements

| Quality Aspect | Description |
|---------------|-------------|
| **Response quality** | Demonstrates desired behavior |
| **Format consistency** | Follows conversation structure |
| **Diversity** | Covers various tasks |
| **Length** | Balanced, not too long/short |

### Training Configuration

```yaml
# SFT Configuration
learning_rate: 2e-5
batch_size: 8-32
epochs: 1-3
max_seq_length: 4096
warmup_ratio: 0.1
```

### Common Issues

- ⚠️ **Overfitting**: Too many epochs on small data
- ⚠️ **Underfitting**: Not enough training
- ⚠️ **Format regression**: Model forgets structure

## Direct Preference Optimization (DPO)

### What is DPO?

DPO optimizes a model directly on preference data without reward modeling.

### How DPO Works

```
Traditional RLHF:  Policy → Reward Model → RL Optimization
DPO:               Policy → Direct Preference Optimization
```

### DPO Loss

```
L_DPO = -log(σ(log π(y⁺|x) / π₀(y⁺|x) - log π(y⁻|x) / π₀(y⁻|x)))
```

### When to Use DPO

| Scenario | Recommendation |
|----------|---------------|
| Limited preference data | Use SFT first |
| Safety issues | DPO can help |
| Complex reasoning | SFT + DPO |
| Simple tasks | SFT sufficient |

## Reinforcement Learning from Human Feedback (RLHF)

### The Three-Step Process

1. **Reward Model Training**: Train model to predict human preferences
2. **RL Optimization**: Fine-tune policy to maximize reward
3. **PPO**: Proximal Policy Optimization with KL penalty

### Challenges

- ⚠️ Reward hacking
- ⚠️ KL divergence explosion
- ⚠️ Human preference inconsistency

## Model Merging

### What is Model Merging?

Combine weights from multiple models to leverage complementary strengths.

### Methods

| Method | Description |
|--------|-------------|
| **Weight averaging** | Simple mean of weights |
| **Task arithmetic** | Add/subtract task-specific weights |
| **Fisher merging** | Weighted by Fisher information |
| **Model Soup** | Interpolate between checkpoints |

### SmolLM3 Approach

> "Model merging allows us to combine models with complementary strengths without additional training."

## Key Takeaways

1. **SFT is foundational** — high-quality data is critical
2. **DPO is simpler** than full RLHF for preference learning
3. **Model merging** can combine best of multiple models
4. **Iterate on data quality** before algorithm changes

---

*Next: [Infrastructure →](/en/08-infrastructure)*

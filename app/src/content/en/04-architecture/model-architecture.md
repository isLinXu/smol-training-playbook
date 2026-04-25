---
title: Model Architecture
description: Key design decisions for transformer-based language models
---

# Model Architecture

Architecture decisions are fundamental to model performance. Let's explore the key choices based on empirical evidence from SmolLM3 training.

## Attention Mechanisms

### Comparison of KV-Cache Approaches

| Mechanism | KV-Cache Parameters/Token | Characteristics |
|-----------|---------------------------|-----------------|
| MHA (Multi-Head Attention) | 2×nheads×nlayers×dimhead | Full capacity, most memory |
| MQA (Multi-Query Attention) | 2×1×nlayers×dimhead | Shared KV, memory saving |
| GQA (Grouped-Query Attention) | 2×g×nlayers×dimhead | Balanced choice (recommended) |
| MLA (Multi-Latent Attention) | 4.5×nlayers×dimhead | Latent compression, DeepSeek |

### Key Finding

> GQA with ratio 2-8 is a reliable substitute for MHA, maintaining performance while significantly reducing KV-Cache.

**SmolLM3 uses GQA with ratio 4.**

## Intra-Document Masking

### The Problem

In packed sequences, tokens might attend to irrelevant documents.

### Solution

Modify attention masks to limit tokens to only attend to preceding tokens within the same document.

### Findings

- No significant impact for short-context tasks
- Critical when extending to long contexts
- **SmolLM3 uses it throughout training**

## Embedding Tying

### Core Mechanism

- Input and output embeddings share the same matrix
- Saves approximately **18%** of parameters

### Findings

- 1.2B shared embedding model ≈ 1.46B non-shared version
- Within same parameter budget, increasing depth outperforms removing embedding sharing
- **SmolLM3 keeps shared embeddings**

## Positional Encoding & Long Context

### Evolution of Position Encoding

```
Absolute (APE) → Relative → ALiBi → RoPE → NoPE
```

### RoPE Core Concept

- Encode position as rotation angles in high-dimensional space
- Dot products automatically encode relative distance
- Naturally supports extrapolation

### RoPE Frequency Adjustment Methods

| Method | Description |
|--------|-------------|
| **ABF** | Uniformly increase base frequency (e.g., 10K→1M) |
| **YaRN** | Different scaling per dimension, smoother |

### NoPE (No Position Encoding)

- Implicitly learn positions through causal masking
- Outperforms RoPE on length generalization
- Slightly weaker than RoPE for short contexts

### RNoPE Hybrid (Used by Llama4, SmolLM3)

- Alternate RoPE and NoPE across layers
- RoPE provides explicit position information
- NoPE improves long-range retrieval

## Attention Scope Limitation Methods

| Method | Description | Used By |
|--------|-------------|---------|
| Chunked Attention | Fixed block size with hard boundaries | Llama4 |
| Sliding Window | Continuous coverage of last N tokens | Mistral, Gemma3 |
| DCA (Dual Chunk Attention) | Cross-chunk information flow, no training | Qwen2.5 1M context |
| Attention Sinks | Initial tokens as aggregation point | Various |

## Stability Improvements

| Technique | Effect | Used by SmolLM3 |
|-----------|--------|-----------------|
| Z-loss | Prevents logits from becoming too large | ❌ (overhead) |
| No weight decay on embeddings | Prevents gradient amplification | ✅ |
| QK-norm | Normalize Q/K vectors | ❌ (hurts long context) |

## Mixture of Experts (MoE)

### Core Concept

Each token is routed to only a few experts.

### Key Design Parameters

| Parameter | Description | Finding |
|-----------|-------------|---------|
| **Sparsity** | Total experts / Active experts | Higher is better, but diminishing returns |
| **Granularity** | Smaller expert → more experts | Sweet spot exists |
| **Shared Expert** | Always-active expert | 1 shared expert usually optimal |

### Load Balancing

- **Problem**: Avoid routing collapse to few experts
- **Solutions**: Auxiliary loss OR lossless balancing (DeepSeek V3 bias adjustment)

## To MoE or Not To MoE

| Scenario | Recommended | Reason |
|----------|-------------|--------|
| Memory constrained / Beginner | Dense | Mature ecosystem, stable |
| Best compute efficiency | MoE | Training/inference efficiency |
| Very long context + reduce inference cost | Hybrid | SSM for long sequences |

**SmolLM3 chose Dense** (edge deployment, 3-month timeline, team experience)

## Tokenizer

### Key Metrics

| Metric | Definition | Lower is Better |
|--------|------------|-----------------|
| **Fertility** | Average tokens per word | ✅ |
| **Continuation ratio** | Proportion of split words | ✅ |

### Selection Principles

- English-only models: ~50k vocabulary
- Multilingual models: 100k+ (e.g., Llama3's 128k)
- Choose based on target language fertility

**SmolLM3 chose Llama3.2 tokenizer** (best multilingual efficiency tradeoff)

## SmolLM3 Final Architecture

| Parameter | Value |
|-----------|-------|
| Parameters | 3B |
| Architecture | Dense Llama-style |
| Attention | GQA (ratio 4) |
| Position Encoding | NoPE + Document Masking |
| Embeddings | Shared + No weight decay |
| Tokenizer | Llama3.2 |
| Max Context | 128k |

---

*Next: [Data Curation →](/en/05-data)*

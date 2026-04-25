---
title: Data Curation
description: The art of building high-quality training datasets
---

# Data Curation

> "Data curation is the single largest source of performance gains."

Data is the foundation of language model training. The quality and composition of your training data directly determines model capabilities.

## The Counter-intuitive Nature of Data Mixing

### Core Challenges

- Different domains compete for training budget
- Increasing weight of one source = decreasing others
- Reusing high-quality data excessively can be harmful

## Training Curriculum

### Evolution: Single Stage → Multi-Stage

- **Early training**: Higher weight for abundant data sources
- **Late training**: Introduce small-scale high-quality data

### Stage Partitioning Strategies

1. **Performance-driven interventions** (monitor benchmarks, adjust)
2. **Save high-quality data for annealing stage**

## SmolLM3 Data Mixing

### Three-Stage Training

| Stage | Tokens | Context | Data Composition |
|-------|--------|---------|------------------|
| Stage 1 | 8T | 4k | Web base mix (FineWeb-Edu + DCLM 50/50) + 10% code + 3% math |
| Stage 2 | 2T | 4k | Add Stack-Edu, FineMath4+, MegaMath |
| Stage 3 | 1.1T | 4k | Upsample high-quality data + OpenMathReasoning |

### Key Findings

- **12% multilingual web data**: Optimal balance without degrading English
- **Code ratio decreased from 25% to 10%**: To avoid English benchmark regression

## Data Quality Indicators

### What to Look For

| Indicator | Description |
|-----------|-------------|
| **Educational value** | Does the content teach something? |
| **Factual accuracy** | Is the information correct? |
| **Linguistic quality** | Is it well-written? |
| **Duplication** | Is the content repeated? |

### Filtering Strategies

```python
# Example: Quality filtering pipeline
def quality_filter(dataset):
    # Step 1: Remove duplicates
    dataset = remove_exact_duplicates(dataset)

    # Step 2: Language detection
    dataset = filter_by_language(dataset, target_langs)

    # Step 3: Quality scoring
    dataset = score_and_filter(dataset, min_quality=0.7)

    # Step 4: Remove personal info
    dataset = remove_pii(dataset)

    return dataset
```

## Data Mixing Ratios

### Balancing Act

| Domain | Weight | Rationale |
|--------|--------|-----------|
| Web text | 60-70% | Breadth, diversity |
| Code | 10-25% | Reasoning, structure |
| Math | 3-10% | Numerical reasoning |
| Multilingual | 10-15% | Cross-lingual transfer |

### Warning Signs

- ⚠️ Too much code → English regression
- ⚠️ Too much multilingual → English degradation
- ⚠️ Too little diversity → Overfitting to patterns

## FineWeb Dataset Lessons

### What Worked

- ✅ Quality filtering over quantity
- ✅ Educational content weighting
- ✅ Diverse sources for robustness

### What Didn't Work

- ❌ Pure high-quality academic text (hurts small models)
- ❌ Aggressive deduplication (loses rare patterns)
- ❌ Single-source dominance (creates biases)

## Key Takeaways

1. **Data curation is the largest performance lever**
2. **Multi-stage training lets you use data efficiently**
3. **Balance domains carefully — watch for regressions**
4. **Quality > Quantity for small models**

---

*Next: [Training Marathon →](/en/06-training)*

---
title: Conclusion
description: Lessons learned and future directions
---

# Conclusion

Training world-class compact language models is challenging but achievable. Let's summarize the key lessons.

## Key Principles

### 1. Start Small, Think Big

> "Every big model starts with a small ablation."

Always validate your hypotheses at small scale before committing to expensive production runs.

### 2. Data Quality > Quantity

For compact models especially, data quality is the single largest performance lever.

### 3. Iterate Rapidly

Speed of iteration is a competitive advantage. Build infrastructure that enables fast experimentation.

### 4. Measure Everything

You can't improve what you can't measure. Invest in evaluation and monitoring.

### 5. Plan for Failures

Infrastructure will fail. Checkpoints save lives. Automate recovery.

## Action Guidelines Summary

| Scenario | Guideline |
|----------|-----------|
| Architecture decisions | Use case determines choice; balance innovation and pragmatism |
| Ablation studies | Systematic beats intuition; test one variable at a time |
| Optimizer | Prioritize stability and flexibility (choose WSD over Cosine) |
| Data | Data curation is the biggest performance gain source |
| Training | Set exploration deadlines; done beats perfect |
| Debugging | Change one variable at a time, rapid isolation |

## The SmolLM3 Recipe

### Final Configuration

| Parameter | Value |
|-----------|-------|
| Parameters | 3B |
| Architecture | Dense Llama-style |
| Attention | GQA (ratio 4) |
| Position Encoding | NoPE + Document Masking |
| Embeddings | Shared + No weight decay |
| Tokenizer | Llama3.2 |
| Optimizer | AdamW |
| LR Schedule | WSD (10% decay) |
| Peak Learning Rate | 2e-4 |
| Global Batch | 2.36M tokens |
| Training Tokens | 11T |
| Max Context | 128k |

## What We Learned

### What Worked

- ✅ GQA for memory efficiency without performance loss
- ✅ NoPE + document masking for stable long-context
- ✅ Multi-stage training with quality upsampling
- ✅ Small ablation studies before production runs

### What Didn't Work

- ❌ Initial approach to data mixing (had to iterate)
- ❌ Storage configuration (had to migrate)
- ❌ Dataloader efficiency (had to optimize)

### Unexpected Discoveries

- 📌 RNoPE hybrid provided better length generalization
- 📌 12% multilingual ratio was optimal balance
- 📌 Document masking helped even for short contexts

## Future Directions

### Short-term

- Better evaluation metrics for real-world usage
- More efficient fine-tuning methods
- Improved data filtering techniques

### Long-term

- Scaling laws for compact models
- Better alignment techniques for small models
- Multi-modal integration

## Final Thoughts

> "Training a model is a journey of discovery, not just execution."

The Smol Training Playbook is not a recipe book — it's a guide to thinking about training systematically. Every project is unique, and you'll discover things that don't fit any template.

**Trust the process. Measure everything. Iterate rapidly.**

---

## Acknowledgments

This playbook was made possible by the entire Hugging Face team, especially:

- Loubna Ben Allal
- Lewis Tunstall
- Nouamane Tazi
- And all contributors to SmolLM3

---

*Thank you for reading!*

---
title: Introduction
description: Start your LLM training journey with the Smol Training Playbook
---

# Introduction

Welcome to **The Smol Training Playbook** – a comprehensive guide to training compact language models based on real-world experience from training SmolLM3.

## Why This Book?

Training a language model is one of the most complex undertakings in machine learning. It requires:

- **Data engineering** at scale
- **Infrastructure** management
- **Research** and experimentation
- **Iteration** based on empirical results

This playbook distills the lessons learned from training SmolLM3, a 3B parameter model trained on 11T tokens, into a practical guide for practitioners.

## What You'll Learn

| Topic | Description |
|-------|-------------|
| **Training Compass** | A systematic approach to training decisions |
| **Small Ablations** | How to validate ideas cheaply before scaling |
| **Model Architecture** | Design decisions that matter |
| **Data Curation** | Building high-quality training datasets |
| **Training** | Distributed training at scale |
| **Post-training** | Alignment techniques (SFT, DPO) |
| **Infrastructure** | Keeping training running smoothly |

## Our Philosophy

> "We don't just show you what worked – we show you what didn't work too."

Training is as much about **avoiding failures** as it is about finding successes. This playbook includes:

1. **Failures** we encountered and how we fixed them
2. **Trade-offs** we made and why
3. **Unexpected discoveries** that changed our approach

## Who Is This For?

This playbook is for:

- **ML Engineers** building or maintaining training pipelines
- **Researchers** studying language model training
- **Students** learning about modern LLM techniques
- **Organizations** training their own models

## How to Read This Book

You can read this playbook in any order, but we recommend:

1. **Start with the Training Compass** (Chapter 2) – it sets the methodological framework
2. **Dive into specific topics** based on your needs
3. **Return to the Reference** chapters as needed

## Getting Started

Let's begin your journey into language model training!

```bash
# Clone the repository
git clone https://github.com/HuggingFaceTB/smol-training-playbook

# Follow the setup instructions in each chapter
```

---

*Next: [Training Compass →](/en/02-compass)*

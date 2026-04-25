---
title: Infrastructure
description: The unsung hero - keeping training running smoothly
---

# Infrastructure

Infrastructure is the unsung hero of language model training. Without reliable infrastructure, even the best research ideas fail.

## Why Infrastructure Matters

> "We spent more time debugging infrastructure than research."

### The Reality

- GPU clusters are complex distributed systems
- Failures are inevitable at scale
- Every hour of downtime costs compute budget

## GPU Cluster Architecture

### Typical Setup

```
┌─────────────────────────────────────────────┐
│              Compute Nodes                   │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │ GPU 0-7 │  │ GPU 0-7 │  │ GPU 0-7 │    │
│  └────┬────┘  └────┬────┘  └────┬────┘    │
│       │            │            │           │
│  ─────┴────────────┴────────────┴──────     │
│              NVLink / InfiniBand             │
└─────────────────────────────────────────────┘
                    │
         ┌──────────┴──────────┐
         │    Storage (FSx)    │
         └─────────────────────┘
```

### Key Components

| Component | Purpose | Considerations |
|-----------|---------|----------------|
| **GPU Nodes** | Compute | NVLink for intra-node |
| **Network** | Inter-node | InfiniBand for bandwidth |
| **Storage** | Data access | Throughput, capacity |
| **Scheduler** | Job management | Slurm, etc. |

## Training Framework Comparison

| Framework | Strengths | Weaknesses | Models |
|-----------|-----------|------------|--------|
| **Megatron-LM** | 3D parallelism pioneer, mature | Steep learning curve | Kimi-K2 |
| **DeepSpeed** | ZeRO optimization pioneer | Large codebase | BLOOM, GLM |
| **TorchTitan** | Lightweight, modular | Newer, less validated | — |
| **Nanotron** | HF-native, deeply optimized | Needs parallelism knowledge | StarCoder, SmolLM |

## Common Infrastructure Issues

### Issue 1: GPU Failures

**Symptoms**: Training loss spikes, node failures

**Solutions**:
- ✅ Regular GPU stress testing
- ✅ Checkpointing frequently
- ✅ Automatic job restart

### Issue 2: Storage Bottlenecks

**Symptoms**: Throughput drops, I/O wait

**Solutions**:
- ✅ Local SSD for hot data
- ✅ Distributed filesystem for cold data
- ✅ Data prefetching

### Issue 3: Network Congestion

**Symptoms**: All-reduce slow, uneven gradients

**Solutions**:
- ✅ Proper network topology awareness
- ✅ Bucketing and pipelining
- ✅ InfiniBand tuning

## Monitoring & Observability

### What to Monitor

```yaml
# Key metrics
- GPU utilization (target: >80%)
- Memory bandwidth (target: >70%)
- Network bandwidth (target: >60%)
- Storage throughput (target: match compute)
- Loss curves (detect anomalies)
- Learning rate schedule
```

### Alerting

| Priority | Condition | Action |
|----------|-----------|--------|
| Critical | GPU node down | Immediate restart |
| High | Throughput < 50% baseline | Investigate |
| Medium | Loss spike | Monitor, don't restart |
| Low | Minor deviation | Log and continue |

## Checkpointing Strategy

### Best Practices

- ✅ **Frequency**: Every 1000-5000 steps
- ✅ **Storage**: Persistent + local backup
- ✅ **Validation**: Verify checkpoint integrity
- ✅ **Recovery**: Automatic on restart

```python
# Checkpoint manager pseudo-code
class CheckpointManager:
    def save(self, step, model_state):
        path = f"/checkpoint/step_{step}.pt"
        torch.save(model_state, path)
        # Upload to persistent storage async
        self.upload_async(path)

    def load_latest(self):
        # Find latest checkpoint
        # Validate integrity
        # Restore state
```

## Cost Optimization

### Key Levers

| Strategy | Impact | Risk |
|----------|--------|------|
| **GPU utilization** | High | Low |
| **Checkpoint efficiency** | Medium | Medium |
| **Network optimization** | Medium | Low |
| **Storage tiering** | Low | Low |

### SmolLM3 Cost Breakdown

| Category | Percentage |
|----------|-----------|
| GPU compute | ~70% |
| Infrastructure overhead | ~15% |
| Storage | ~10% |
| Networking | ~5% |

## Key Takeaways

1. **Infrastructure reliability enables research productivity**
2. **Monitor everything** — you can't fix what you can't see
3. **Checkpoint frequently** — failures will happen
4. **Automate recovery** — minimize manual intervention

---

*Next: [Conclusion →](/en/09-conclusion)*

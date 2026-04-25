/**
 * SmolLM3 Training Benchmark Data
 * 训练基准测试数据
 */

export const aimeBenchmarks = {
  title: "AIME 2025 Performance Comparison",
  description: "American Invitational Mathematics Examination results",
  models: [
    { name: "o3-mini (low)", score: 63.3, params: "7B" },
    { name: "o3-mini (high)", score: 87.3, params: "7B" },
    { name: "QwQ-32B", score: 50.0, params: "32B" },
    { name: "DeepSeek-R1", score: 79.8, params: "671B" },
    { name: "SmolLM3-3B ( Ours )", score: 53.3, params: "3B" },
    { name: "Qwen2.5-3B", score: 23.3, params: "3B" },
    { name: "Qwen2.5-1.5B", score: 16.7, params: "1.5B" },
    { name: "Phi-4-mini", score: 26.7, params: "3.8B" },
    { name: "Phi-4", score: 40.0, params: "14B" },
    { name: "Mistral-Small", score: 50.0, params: "22B" },
  ],
};

export const trainingScales = {
  title: "Training Scale Comparison",
  description: "Model size vs training tokens comparison",
  data: [
    { model: "SmolLM3-135M", params: 0.135, tokens: 11.2, label: "135M" },
    { model: "SmolLM3-360M", params: 0.36, tokens: 12.0, label: "360M" },
    { model: "SmolLM3-1.7B", params: 1.7, tokens: 9.0, label: "1.7B" },
    { model: "SmolLM3-3B", params: 3.0, tokens: 11.0, label: "3B" },
    { model: "Llama-3-8B", params: 8.0, tokens: 15.0, label: "8B" },
    { model: "Qwen2.5-7B", params: 7.0, tokens: 18.0, label: "7B" },
    { model: "Mistral-7B", params: 7.0, tokens: 8.0, label: "7B" },
  ],
};

export const attentionBenchmarks = {
  title: "Attention Mechanism Comparison",
  benchmarks: [
    { name: "MHA (Multi-Head)", latency: 1.0, memory: 1.0, quality: 1.0 },
    { name: "GQA (Grouped)", latency: 0.65, memory: 0.5, quality: 0.98 },
    { name: "MQA (Multi-Query)", latency: 0.5, memory: 0.35, quality: 0.95 },
    { name: "MLA (Multi-head Latent)", latency: 0.55, memory: 0.4, quality: 0.99 },
  ],
};

export const learningRates = {
  schedules: [
    { name: "Constant", description: "Fixed learning rate throughout" },
    { name: "Cosine Annealing", description: "Smooth decay following cosine curve" },
    { name: "Warmup + Cosine", description: "Linear warmup then cosine decay" },
    { name: "Polynomial Decay", description: "Polynomial decay schedule" },
  ],
};

export const dataComposition = {
  title: "Training Data Composition",
  categories: [
    { name: "Mathematics", percentage: 40, color: "#3B82F6" },
    { name: "Code", percentage: 30, color: "#10B981" },
    { name: "Science", percentage: 15, color: "#8B5CF6" },
    { name: "Web", percentage: 10, color: "#F59E0B" },
    { name: "Other", percentage: 5, color: "#6B7280" },
  ],
};

export const hardwareComparison = {
  title: "Hardware Configuration Comparison",
  setups: [
    { name: "SmolLM3 Training", gpus: "8x H100", memory: "640GB", efficiency: "High" },
    { name: "Standard 7B", gpus: "8x A100", memory: "640GB", efficiency: "Medium" },
    { name: "Budget Setup", gpus: "4x RTX 3090", memory: "96GB", efficiency: "Low" },
  ],
};

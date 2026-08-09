/**
 * 全站文案配置
 * 后续替换真实内容时，只改这一个文件
 */

import { asset } from './lib/asset'

export const site = {
  name: '何佩珍',
  nameEn: 'PEIZHEN HE',
  role: '28届同济大学交互 · AI 产品',
  tagline: '做有温度的',
  taglineAccent: 'AI 产品',
  intro:
    'Hi，我是佩珍！我是 ENFP，喜欢交流，也总会被新问题和大胆的想法吸引。我正在探索与实践 Agent Workflow、模型评测与 AI Native 交互，也对 AIGC 影视与视觉叙事很感兴趣～',
  email: '812610990@qq.com',
  aiFilms: 'https://zhenghohk-bot.github.io/my-ai-films',
  github: 'https://github.com/zhenghohk-bot',
  linkedin: 'https://www.linkedin.com/in/yourname',
}

export const marqueeItems = [
  '交互设计',
  'AI 产品策略',
  'Vibe Coding',
  '用户研究',
  '原型设计',
  'Prompt Engineering',
  '设计系统',
  '多模态体验',
]

export const about = {
  title: '关于我',
  intro: [
    '我目前是同济大学交互设计方向的硕士研究生，本科就读于华南理工大学建筑学专业。',
    '从建筑到交互，对我而言并非彻底转向，而是将关注的尺度从空间延伸到产品与智能系统。建筑训练让我习惯从系统与人的关系出发理解问题，交互设计则让我尝试将这些观察转化为具体的产品机制与体验。',
    '现在我也在尝试结合用户研究、产品策划、AI 原型与评测，希望做出既有想象力，也经得起验证的产品～',
  ],
  timeline: [
    {
      period: '2019.09—2024.06',
      title: '华南理工大学 · 建筑学',
      desc: '从空间、系统与人的行为关系出发，建立复杂问题拆解、视觉表达和跨尺度设计能力。',
    },
    {
      period: '2025.09—2028.03',
      title: '同济大学 · 交互设计硕士',
      desc: '将关注点从物理空间转向数字产品与人机关系，持续探索用户研究、AI 产品设计与 Human-AI Interaction。',
    },
    {
      period: '2026.01—2026.07',
      title: 'LLM Agent 认知对齐研究',
      desc: '参与面向专家认知特征的研究工具与数据采集流程设计，使用 AI Coding 搭建问卷平台，并参与标注体系、规范制定和样本校对；相关论文投稿中。',
    },
    {
      period: '2025—至今',
      title: 'AI 产品独立实践',
      desc: '围绕 Agent Workflow、模型评测、AIGC 创作与 AI Coding 持续搭建可运行原型，尝试把用户问题转化为清晰的产品机制和可验证的交互流程。',
    },
    {
      period: '2026.06—2026.07',
      title: '腾讯 AI 设计工作坊',
      desc: '负责产品定位、核心流程与 Skill 架构设计，搭建面向设计团队的 AI 共创工作坊，获得腾讯与同济 TT 设计学院全国二等奖。',
    },
  ],
}

/* ============ 重点项目（首页下一页） ============ */

export type ProjectLink = {
  label: string
  href: string
  kind: 'github' | 'demo' | 'video' | 'pdf'
  pending?: boolean // 链接待补（如部署中的 Demo）
}

/** 列表卡片只需要这些；其余信息都在详情页 */
export type FeaturedProject = {
  id: string
  title: string
  meta: string // 时间 · 项目性质
  tags: string[] // 最多两个
  cover: string
  github?: string
}

/* 展示顺序：腾讯比赛 → Muse Council → FramePrompt → DesignSpec-Bench */
export const featured: FeaturedProject[] = [
  {
    id: 'idea-salon',
    title: 'Tencent AI Design Workshop Skill',
    meta: '2026.06–07 · 团队项目',
    tags: ['AI Skill', '产品策划'],
    cover: asset('/works/feat-ideasalon.webp'),
  },
  {
    id: 'muse-council',
    title: 'Muse Council',
    meta: '2026.07–至今 · 个人项目',
    tags: ['AI Agent', 'AI Coding'],
    cover: asset('/works/mc-entry.webp'),
    github: 'https://github.com/zhenghohk-bot/muse-council',
  },
  {
    id: 'frameprompt',
    title: 'FramePrompt',
    meta: '2026.06–07 · 个人项目',
    tags: ['AIGC Prompt', '评测工具'],
    cover: asset('/works/feat-frameprompt.webp'),
    github: 'https://github.com/zhenghohk-bot/FramePrompt',
  },
  {
    id: 'designspec-bench',
    title: 'DesignSpec-Bench',
    meta: '2026.03–04 · 课程研究',
    tags: ['模型评测', 'Design Spec'],
    cover: asset('/works/feat-designspec.webp'),
    github: 'https://github.com/zhenghohk-bot/designspec-bench',
  },
]

/* ============ 项目详情页数据 ============ */

export type ProjectDetail = {
  id: string
  title: string
  enSub: string
  period: string
  kind: string // 个人项目 / 团体比赛 / 课程研究
  role: string
  award?: string
  intro: string // 一句话概述
  resumePoints: { title: string; desc: string }[] // 简历项目介绍
  readme?: { heading: string; points: string[] }[] // README 核心内容
  findings?: { heading: string; points: string[] }[] // 无 README 项目的研究结果
  gallery: { src: string; caption: string; cls?: string }[] // cls 控制单张图的错落/缩放
  galleryLayout?: 'flow' // flow = 单列从头到尾完整展示（如整份 PPT）
  galleryNote?: string // 画廊区的一句话说明
  video?: { url: string; title: string } // 嵌入演示视频（如 Bilibili 播放器）
  embed?: { url: string; title: string } // 用在线页面代替截图画廊
  links: ProjectLink[]
}

export const projectDetails: Record<string, ProjectDetail> = {
  'idea-salon': {
    id: 'idea-salon',
    title: 'Idea Salon 灵感不打烊',
    enSub: '腾讯 AI 设计工作坊 Skill',
    period: '2026.06-2026.07',
    kind: '团体比赛项目',
    role: '产品策划与 Skill 架构负责',
    award: '（腾讯+同济）TT 设计学院全国二等奖',
    intro:
      'Idea Salon 面向设计学生团队项目中 AI 难以持续推进流程、团队共识难沉淀的问题，负责产品定位、核心流程与 Skill 架构设计，搭建从调研到交付的 AI 共创工作坊。',
    resumePoints: [
      {
        title: '产品规划',
        desc: '基于 Double Diamond 拆解设计工作坊流程，定义"主 Skill 圆桌主持 + 5 个子 Skill + 19 位专家分身"的产品架构，明确各阶段输入、输出与专家介入节点。',
      },
      {
        title: 'Skill 架构',
        desc: '设计主 Skill 与子 Skill 的调用机制，主 Skill 负责识别当前阶段、注入项目上下文与专家人格，5 个子 Skill 分别承担方法论引导、洞察提炼、创意发散和设计评审，解决 AI 在长流程设计任务中职责混乱、阶段跳转不清的问题。',
      },
      {
        title: '协作验证',
        desc: '结合 LearnBuddy、Ardot 完成原型演示和流程测评，将 AI 候选、团队填写区、专家反馈和交付产出同步到共享看板，验证团队共识沉淀与接续协作路径。',
      },
    ],
    galleryLayout: 'flow',
    video: {
      url: '//player.bilibili.com/player.html?bvid=BV1jfu26QE1K&autoplay=0&muted=0',
      title: 'Idea Salon 演示视频',
    },
    gallery: [
      { src: asset('/works/is-p01.webp'), caption: '项目封面：面向设计工作坊的 AI 共创 Skill（Moderation · Roles · Flow）' },
      { src: asset('/works/is-p02.webp'), caption: '痛点洞察：学生的卡点分布在整个设计流程' },
      { src: asset('/works/is-p03.webp'), caption: '竞品分析：通用 AI 工具撑不起一场设计工作坊' },
      { src: asset('/works/is-p04.webp'), caption: '从竞品痛点转化为四个创新点' },
      { src: asset('/works/is-p05.webp'), caption: '核心机制：Skill 是引擎，专家是界面' },
      { src: asset('/works/is-p06.webp'), caption: '工作流：先独立思考，再团队收敛' },
      { src: asset('/works/is-p07.webp'), caption: '价值闭环：学生、团队、老师各取所需' },
      { src: asset('/works/is-p08.webp'), caption: '场景一 · 启动圆桌：匹配专家老师，生成项目 Brief' },
      { src: asset('/works/is-p09.webp'), caption: '场景二 · 方法论介入：专家分身一对一辅导调研' },
      { src: asset('/works/is-p10.webp'), caption: '场景三 · 洞察提炼：从洞察到 HMW，团队投票定方向' },
      { src: asset('/works/is-p11.webp'), caption: '场景四 · 概念发散：候选方向 + Moodboard，投票收敛' },
      { src: asset('/works/is-p12.webp'), caption: '场景五 · 团队接续：读取画板进度，无缝继续创作' },
      { src: asset('/works/is-p13.webp'), caption: '场景六 · 设计评审：六维评估，产出可交付设计稿' },
    ],
    links: [
      { label: 'Demo 视频', href: 'https://www.bilibili.com/video/BV1jfu26QE1K/', kind: 'video' },
      { label: '汇报 PDF', href: asset('/works/idea-salon.pdf'), kind: 'pdf' },
    ],
  },

  'muse-council': {
    id: 'muse-council',
    title: 'Muse Council',
    enSub: '多角色 AI 圆桌 Agent',
    period: '2026.07 至今',
    kind: '个人项目',
    role: '产品策划 / AI Coding 独立完成',
    intro:
      '面向用户在成长、职场与关系等复杂决策场景中，通用 AI 回答浅、缺少行动沉淀的问题，设计并搭建多角色 AI 圆桌 Agent，验证 AI 对话从单次回答走向可控引导流程的体验路径。',
    resumePoints: [
      {
        title: '产品定义',
        desc: '将需求拆为「问题分析→角色推荐→分阶段圆桌→行动卡+金句卡」主线；核心需求判断是"不替用户做决定，而是帮她看清问题、落到一个动作"，据此确定每阶段的输入、产出与安全边界，而非做成开放式聊天。',
      },
      {
        title: '分级安全需求',
        desc: '定义三档支持模式（原因未知 / 已命名情绪 / 有具体情境），按用户"实际说出多少"划分 AI 可承接与不可推测的边界，从产品层规避"假心理咨询"风险。',
      },
      {
        title: '可控编排架构',
        desc: '设计 Director / StageGenerator / OutputGuard 三层 Harness，用确定性规则控制阶段调度、承接关系与合规兜底，LLM 只在被框定阶段生成结构化内容，每次调用均有 fallback，并用 AI Coding 独立实现为可运行的 Next.js MVP。',
      },
      {
        title: '内建评测与迭代',
        desc: '为验证质量，设计九维加权 + 双层门槛的双模型评测（生成与裁判分离），配 8 场景固定题集（含用户纠错、追问、模糊情绪三类探针）；从基线运行定位系统性问题、逐条归因到具体模块修复，并以结构化证据（全场景零逐字复读、类型与契约检查通过）独立验证修复真实生效。',
      },
    ],
    readme: [
      {
        heading: '产品叙事',
        points: [
          '提问：写下一件难以开口的事，不必写得漂亮。',
          '问题分析：主持人先读懂困惑，命名主题、核心张力、被看见的情绪、真正的需要。',
          '角色推荐：系统按问题推荐 3 位先行者，可保留 3-5 位补足视角张力。',
          '分阶段圆桌：反映式开场 → 第一轮发言 → 温和交锋 + 收束 → 用户追问。',
          '收成：生成行动卡与赠言卡，赠言可匹配经核验的历史回声；可导出长图或拼贴海报。',
        ],
      },
      {
        heading: 'AI 架构：把 LLM 关进结构里',
        points: [
          'Director：问题分析、第一轮编排、阶段调度、交锋配对，由确定性逻辑收束。',
          'StageGenerator：逐阶段生成内容，JSON Schema 引导 + 字段校验 + 修复重试，附本地 fallback。',
          'SourceRetriever：按问题为每位先行者召回来源注释，喂给生成 prompt。',
          'OutputGuard：校验第一人称、长句、行动具体性、来源经历与跨角色语义重复。',
          'PioneerProfile / HistoricalEchoes：9 位古今女性的结构化角色卡 + 经核验的历史回声资料库。',
        ],
      },
      {
        heading: '为什么这样设计',
        points: [
          '可控性：阶段调度和安全边界用规则控制，而非寄望模型每次都听话。',
          '可靠降级：每次 LLM 调用都有 fallback，缺 API key 也能完整演示整条流程。',
          '对抗人物同质化：结构化角色卡 + 差异化 prompt，让武则天谈筹码、伍尔夫谈精神空间。',
          '行动主线可解释：行动卡必须说明为什么选这条路，并把交锋中的反对意见转成调整护栏。',
        ],
      },
    ],
    gallery: [
      { src: asset('/works/mc-entry.webp'), caption: '圆桌首页入口：与她们坐一桌，写下你在想的事' },
      { src: asset('/works/mc-pioneers.webp'), caption: '先行者邀请页：9 位古今女性角色卡' },
      { src: asset('/works/mc-roundtable.webp'), caption: '圆桌对话：六阶段流程（课题→入席→回应→讨论→收束→行动），分阶段发言与追问' },
      { src: asset('/works/mc-actioncard.webp'), caption: '收成页：行动卡 + 金句卡 + 我的一句' },
    ],
    links: [
      { label: '在线体验', href: '#', kind: 'demo', pending: true },
      { label: 'GitHub', href: 'https://github.com/zhenghohk-bot/muse-council', kind: 'github' },
    ],
  },

  frameprompt: {
    id: 'frameprompt',
    title: 'FramePrompt',
    enSub: 'AIGC Prompt 适配与预检工具',
    period: '2026.06-2026.07',
    kind: '个人项目',
    role: '产品策划 / AI Coding 独立完成',
    intro:
      '针对 AI 视频创作中同一 Prompt 在不同模型上表现差异大、反复抽卡成本高的问题，设计 FramePrompt 生成前工作台，将模型适配与风险预检串联为可解释、可验证的决策流程。',
    resumePoints: [
      {
        title: '产品规划',
        desc: '收敛"创建 / 诊断 Prompt"两条路径，MVP 聚焦 Seedance、可灵、Veo 3 款差异化模型。',
      },
      {
        title: 'Prompt Harness 设计',
        desc: '基于官方模型文档沉淀模型能力档案，构建"多模态解析 - Prompt 适配 - 生成前预检 - 独立复评"闭环，统一模型适配、风险预判与结果校验，输出适配差异、修改理由与可追溯来源，降低跨模型创作的不确定性。',
      },
      {
        title: '评估迭代',
        desc: '建立覆盖视觉、空间、运动、模型适配与风格控制的五维 Precheck；基于 12 条真实生成视频进行人工标注，并引入 AI 独立盲审交叉验证，标注一致率达 92%，低风险样本 6/6 成功；针对多动作、镜头冲突等 Badcase 迭代运动过载规则并复跑全量样本。',
      },
    ],
    readme: [
      {
        heading: '为什么做',
        points: [
          'AI 视频生成常需要反复抽卡，失败不仅消耗额度，也消耗等待与复盘时间。',
          'FramePrompt 不试图消灭创作迭代，而是优先拦截动作过载、镜头冲突、空间关系不清和模型表达不匹配等可提前发现的问题。',
        ],
      },
      {
        heading: '核心流程',
        points: [
          '创建 Prompt：参考图 → 多模态视觉解析 → 结构化画面与动态 Style Profile → 目标模型适配 → 五维 Precheck → Prompt Card → 结果回填。',
          '诊断已有 Prompt：原始 Prompt → 本地规则 Precheck → GLM 约束改写 → 改写后重新 Precheck → DeepSeek 独立 Judge。',
          '约束改写必须保留原始创意意图；Judge 不读取本地 Precheck 分数，避免把已有结论抄回评审结果。',
        ],
      },
      {
        heading: 'MVP 范围',
        points: [
          '目标视频模型：Seedance 2.0 Fast、可灵 3.0、Veo 3.1。',
          '评估维度：视觉完整度、空间清晰度、运动可执行性、模型适配度、风格可控性。',
          '依据层：版本化模型 Profile、词法检索、来源溯源。',
          '产品定位是生成前决策工作台，暂不包含真实视频生成。',
        ],
      },
    ],
    gallery: [
      { src: asset('/works/fp-workbench.webp'), caption: '创建 Prompt 工作台：画面拆解 + 适配与预检' },
      { src: asset('/works/fp-precheck.webp'), caption: '可解释的适配与预检：五维评分 + Baseline→Adapted 对照', cls: 'sm:w-[82%] sm:mx-auto' },
      { src: asset('/works/fp-cards.webp'), caption: 'Prompt Card 库与预检有效性验证' },
    ],
    links: [
      { label: '在线体验', href: '#', kind: 'demo', pending: true },
      { label: 'GitHub', href: 'https://github.com/zhenghohk-bot/FramePrompt', kind: 'github' },
    ],
  },

  'designspec-bench': {
    id: 'designspec-bench',
    title: 'DesignSpec-Bench',
    enSub: '多模态大模型设计冲突行为评测',
    period: '2026.03-2026.04',
    kind: '课程小组研究',
    role: '系统评测框架独立完成',
    intro:
      '针对设计场景中文字规范与视觉参考图冲突导致模型输出不稳定的问题，构建评测框架，分析主流模型在冲突指令下的模态偏好与行为差异。',
    resumePoints: [
      {
        title: '评测框架',
        desc: '将设计规范冲突归纳为 5 类场景，制定行为与模态偏好编码方案，形成可复现的评测体系。',
      },
      {
        title: '数据标注与结果分析',
        desc: '构建 100+ 条冲突测试样本，5 名标注者完成结果标注与一致性校验，Fleiss K=0.90，提升评测结论可信度。横向评测 Claude、Gemini、Qwen、Doubao 四款模型，分析其在设计冲突场景下的处理行为与模态偏好差异，识别文字优先、图像优先、折中处理与冲突回避等响应模式。',
      },
    ],
    findings: [
      {
        heading: '行为分布（RQ1）',
        points: [
          '将模型响应编码为三类行为：Silent Execution（静默执行）、Transparent Assumption（透明假设）、Clarify（主动澄清）。',
          '不同冲突类型下，四款模型的行为分布差异显著：数值冲突（NC）中最常出现主动澄清，而实体冲突（EC）几乎都是静默执行。',
        ],
      },
      {
        heading: '冲突处理画像（RQ3）',
        points: [
          '以 WCHS（加权冲突处理得分）刻画各模型的冲突敏感度：Claude 42.2%、Gemini 30.6%、Qwen 17.5%、Doubao 8.3%。',
          '雷达图显示同一模型在不同冲突类型上的敏感度差异远大于模型间的平均差异。',
        ],
      },
    ],
    gallery: [],
    embed: {
      url: 'https://zhenghohk-bot.github.io/designspec-bench/',
      title: '在线结果页：完整图表与交互数据',
    },
    links: [
      { label: '在线结果页', href: 'https://zhenghohk-bot.github.io/designspec-bench/', kind: 'demo' },
      { label: 'GitHub', href: 'https://github.com/zhenghohk-bot/designspec-bench', kind: 'github' },
    ],
  },
}

/* 左列宣言：VIBE / CODE / SHIP */
export const vibeCodeShip = [
  { word: 'VIBE', desc: '洞察用户需求与真实场景，定义产品方向' },
  { word: 'CODE', desc: '通过 Coding 把想法变成可运行、可验证的原型' },
  { word: 'SHIP', desc: '通过测试与迭代，推动产品从原型走向落地' },
]

/* ============ More Work（课程作业与其他实践） ============ */

export type MoreWork = {
  id: string
  title: string
  sub: string
  period: string
  cover: string
  ratio: 'landscape' | 'portrait' // portrait 用 object-cover 聚焦画面主体
  focus?: string // object-position，竖裁时对准主体
  linkLabel?: string
  link?: string
  video?: string // 演示视频，新标签页播放
  size?: 'lg' | 'md' | 'sm' // 自由排布时的相对尺寸
  rotate?: number // 轻微旋转角度
}

/* 按时间排序：2025 → 2026 */
export const moreWorks: MoreWork[] = [
  {
    id: 'yiqida',
    title: '艺起搭',
    sub: '华为小艺 AI 穿搭 Agent · 交互设计课程',
    period: '2025.09-11',
    cover: asset('/works/more-yiqida.webp'),
    ratio: 'landscape',
    link: asset('/works/yiqida.pdf'),
    linkLabel: '阅读完整 PDF',
    video: asset('/works/yiqida.mp4'),
    size: 'lg',
    rotate: -1.4,
  },
  {
    id: 'thyroid-service',
    title: '甲状腺癌 I-131 治疗服务优化',
    sub: '以患者为中心的服务设计 · Studio1 合作',
    period: '2025.11-2026.01',
    cover: asset('/works/more-studio1.webp'),
    ratio: 'landscape',
    link: asset('/works/studio1-thyroid.pdf'),
    linkLabel: '阅读完整 PDF',
    size: 'sm',
    rotate: 1.2,
  },
  {
    id: 'culture-game',
    title: '逐象而行',
    sub: '甲骨文意象微信小游戏 · 中华文化体验与设计',
    period: '2025.12',
    cover: asset('/works/more-culture.webp'),
    ratio: 'landscape',
    link: asset('/works/culture-game.pdf'),
    linkLabel: '阅读完整 PDF',
    size: 'sm',
    rotate: 1.6,
  },
  {
    id: 'blender-exoskeleton',
    title: 'Blender Exoskeleton',
    sub: 'Blender 任务导向生成式建模平台 · 课程项目',
    period: '2026.03-04',
    cover: asset('/works/more-blender.webp'),
    ratio: 'landscape',
    link: asset('/works/blender-exoskeleton.pdf'),
    linkLabel: '阅读完整 PDF',
    size: 'md',
    rotate: -1.2,
  },
  {
    id: 'muselens',
    title: 'MuseLens 灵感存取眼镜',
    sub: 'AR AI 创作灵感存取与迁移 · Studio2',
    period: '2026.05-06',
    cover: asset('/works/more-muselens.webp'),
    ratio: 'landscape',
    link: asset('/works/muselens.pdf'),
    linkLabel: '阅读完整 PDF',
    size: 'lg',
    rotate: 1,
  },
]


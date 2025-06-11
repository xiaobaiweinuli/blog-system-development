"use client"

export const locales = ["zh", "en", "es", "fr", "de", "ja", "ko", "ru"] as const
export type Locale = (typeof locales)[number]

// 设置默认语言为中文
export const defaultLocale: Locale = "zh"

export const localeNames: Record<Locale, string> = {
  zh: "中文",
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ja: "日本語",
  ko: "한국어",
  ru: "Русский",
}

export interface Translations {
  common: {
    loading: string
    error: string
    save: string
    cancel: string
    delete: string
    edit: string
    create: string
    search: string
    filter: string
    back: string
    next: string
    previous: string
    confirm: string
    actions: string
    settings: string
    upload: string
    download: string
    copy: string
    share: string
    preview: string
    details: string
    rename: string
    move: string
    select: string
    selectAll: string
    unselectAll: string
    noResults: string
    success: string
    failed: string
  }
  blog: {
    title: string
    description: string
    readMore: string
    readTime: string
    publishedOn: string
    tags: string
    author: string
    relatedPosts: string
    pinnedPosts: string
    latestPosts: string
    categories: string
    comments: string
    share: string
    tableOfContents: string
  }
  admin: {
    dashboard: string
    posts: string
    newPost: string
    editPost: string
    settings: string
    analytics: string
    users: string
    media: string
    tags: string
    comments: string
    seo: string
    ads: string
    permissions: string
    cloudflare: string
    github: string
    systemSettings: string
    logout: string
    contentManagement: string
    marketingTools: string
    systemIntegration: string
    viewBlog: string
    adminPanel: string
    manageContent: string
  }
  auth: {
    login: string
    logout: string
    signUp: string
    email: string
    password: string
    forgotPassword: string
    rememberMe: string
    loginWithGithub: string
    loginWithEmail: string
    welcomeBack: string
    signInToAccess: string
    enterCredentials: string
    onlyOwners: string
  }
  posts: {
    status: {
      draft: string
      published: string
      archived: string
      scheduled: string
      all: string
    }
    visibility: {
      public: string
      private: string
      loggedIn: string
      all: string
    }
    editor: {
      title: string
      content: string
      excerpt: string
      coverImage: string
      publishSettings: string
      seoSettings: string
      markdown: string
      richText: string
      preview: string
      publish: string
      saveDraft: string
      updatePost: string
      basicInfo: string
      advancedSettings: string
    }
    management: {
      allPosts: string
      drafts: string
      published: string
      archived: string
      scheduled: string
      searchPosts: string
      filterByStatus: string
      filterByVisibility: string
      sortBy: string
      sortOrder: string
      ascending: string
      descending: string
      bulkActions: string
      selectPosts: string
    }
  }
  media: {
    title: string
    description: string
    uploadFiles: string
    createFolder: string
    refresh: string
    move: string
    delete: string
    fileManager: string
    dragToUpload: string
    uploadingTo: string
    storageStats: {
      totalFiles: string
      totalSize: string
      publicFiles: string
      totalDownloads: string
    }
    filters: {
      searchFiles: string
      allFolders: string
      allTypes: string
      images: string
      videos: string
      audio: string
      documents: string
      archives: string
    }
    sorting: {
      sortBy: string
      name: string
      size: string
      date: string
      downloads: string
    }
    fileDetails: {
      name: string
      type: string
      size: string
      dimensions: string
      uploadTime: string
      lastModified: string
      folder: string
      downloadCount: string
      accessPermission: string
      public: string
      private: string
      etag: string
      tags: string
      noTags: string
      metadata: string
      url: string
    }
    actions: {
      preview: string
      details: string
      copyLink: string
      download: string
      share: string
      rename: string
      delete: string
      selectDestination: string
      createNewFolder: string
      folderName: string
      create: string
      cancel: string
      moveFiles: string
      noFilesFound: string
      uploadFirst: string
    }
    views: {
      grid: string
      list: string
      folders: string
      files: string
    }
  }
  cloudflare: {
    title: string
    description: string
    accountSettings: string
    r2Storage: string
    workers: string
    oauthProxy: string
    accountId: string
    apiToken: string
    testConnection: string
    connected: string
    checking: string
    error: string
    enableR2: string
    bucketName: string
    customDomain: string
    corsSettings: string
    enableWorkers: string
    workerName: string
    workerDomain: string
    workerFeatures: string
    oauthSettings: string
    githubClientId: string
    githubClientSecret: string
    autoConfig: string
    saveSettings: string
    configProgress: string
    verifyingPermissions: string
    creatingBucket: string
    configuringCors: string
    deployingWorker: string
    configuringDomain: string
    generatingKeys: string
    completingConfig: string
  }
  seo: {
    title: string
    description: string
    basicSettings: string
    socialMedia: string
    advancedSettings: string
    siteTitle: string
    siteDescription: string
    keywords: string
    ogImage: string
    verification: {
      google: string
      bing: string
      baidu: string
    }
    enableOpenGraph: string
    enableTwitterCards: string
    twitterHandle: string
    generateSitemap: string
    enableStructuredData: string
    enableCanonicalUrls: string
    robotsTxt: string
    generateNow: string
  }
  analytics: {
    title: string
    description: string
    timeRange: {
      last7Days: string
      last30Days: string
      last90Days: string
      last12Months: string
    }
    metrics: {
      pageViews: string
      visitors: string
      avgTimeOnSite: string
      bounceRate: string
    }
    charts: {
      visitorsTrend: string
      pageViewsTrend: string
    }
    tabs: {
      topPosts: string
      trafficSources: string
      countries: string
    }
    tables: {
      postTitle: string
      views: string
      visitors: string
      avgTimeOnPage: string
      source: string
      percentage: string
      country: string
    }
  }
  comments: {
    title: string
    description: string
    setup: {
      selectRepository: string
      createRepository: string
      enableDiscussions: string
      discussionsEnabled: string
      discussionsNotEnabled: string
      commentCategory: string
      createCommentCategory: string
      selectCategory: string
    }
    config: {
      title: string
      description: string
      pageMapping: string
      theme: string
      inputPosition: string
      loadingMethod: string
      enableReactions: string
      strictMode: string
      mappingOptions: {
        pathname: string
        url: string
        title: string
        ogTitle: string
      }
      themeOptions: {
        system: string
        light: string
        dark: string
        darkDimmed: string
      }
      positionOptions: {
        top: string
        bottom: string
      }
      loadingOptions: {
        lazy: string
        eager: string
      }
    }
    preview: {
      title: string
      description: string
      configInfo: string
      repository: string
      category: string
      mapping: string
      theme: string
      previewPlaceholder: string
      completeSetup: string
    }
  }
  setup: {
    title: string
    description: string
    steps: {
      welcome: string
      github: string
      cloudflare: string
      site: string
    }
    welcome: {
      title: string
      description: string
      githubIntegration: string
      cloudflareStorage: string
      siteConfig: string
    }
    github: {
      title: string
      description: string
      clientId: string
      clientSecret: string
      repoOwner: string
      repoName: string
      requestPermissions: string
      createGithubApp: string
      permissionsGranted: string
    }
    cloudflare: {
      title: string
      description: string
      accountId: string
      apiToken: string
      bucketName: string
      verifyPermissions: string
      autoConfigR2: string
      permissionsVerified: string
    }
    site: {
      title: string
      description: string
      siteTitle: string
      defaultLanguage: string
      siteDescription: string
      setupComplete: string
    }
    buttons: {
      next: string
      previous: string
      skip: string
      complete: string
    }
  }
}

// 中文翻译
const zhTranslations: Translations = {
  common: {
    loading: "加载中...",
    error: "错误",
    save: "保存",
    cancel: "取消",
    delete: "删除",
    edit: "编辑",
    create: "创建",
    search: "搜索",
    filter: "筛选",
    back: "返回",
    next: "下一步",
    previous: "上一步",
    confirm: "确认",
    actions: "操作",
    settings: "设置",
    upload: "上传",
    download: "下载",
    copy: "复制",
    share: "分享",
    preview: "预览",
    details: "详情",
    rename: "重命名",
    move: "移动",
    select: "选择",
    selectAll: "全选",
    unselectAll: "取消全选",
    noResults: "无结果",
    success: "成功",
    failed: "失败",
  },
  blog: {
    title: "博客",
    description: "最新文章和见解",
    readMore: "阅读更多",
    readTime: "分钟阅读",
    publishedOn: "发布于",
    tags: "标签",
    author: "作者",
    relatedPosts: "相关文章",
    pinnedPosts: "置顶文章",
    latestPosts: "最新文章",
    categories: "分类",
    comments: "评论",
    share: "分享",
    tableOfContents: "目录",
  },
  admin: {
    dashboard: "仪表盘",
    posts: "文章管理",
    newPost: "新建文章",
    editPost: "编辑文章",
    settings: "系统设置",
    analytics: "数据分析",
    users: "用户管理",
    media: "媒体管理",
    tags: "标签管理",
    comments: "评论管理",
    seo: "SEO 设置",
    ads: "广告管理",
    permissions: "权限管理",
    cloudflare: "Cloudflare 集成",
    github: "GitHub 设置",
    systemSettings: "系统设置",
    logout: "退出登录",
    contentManagement: "内容管理",
    marketingTools: "营销工具",
    systemIntegration: "系统集成",
    viewBlog: "查看博客",
    adminPanel: "管理面板",
    manageContent: "管理您的博客内容和设置",
  },
  auth: {
    login: "登录",
    logout: "退出登录",
    signUp: "注册",
    email: "邮箱",
    password: "密码",
    forgotPassword: "忘记密码？",
    rememberMe: "记住我",
    loginWithGithub: "使用 GitHub 登录",
    loginWithEmail: "使用邮箱登录",
    welcomeBack: "欢迎回来",
    signInToAccess: "登录以访问管理面板",
    enterCredentials: "输入您的凭据以访问管理仪表板",
    onlyOwners: "只有仓库所有者和协作者可以访问管理面板。",
  },
  posts: {
    status: {
      draft: "草稿",
      published: "已发布",
      archived: "已归档",
      scheduled: "已计划",
      all: "所有状态",
    },
    visibility: {
      public: "公开",
      private: "私有",
      loggedIn: "登录用户",
      all: "所有可见性",
    },
    editor: {
      title: "标题",
      content: "内容",
      excerpt: "摘要",
      coverImage: "封面图片",
      publishSettings: "发布设置",
      seoSettings: "SEO 设置",
      markdown: "Markdown",
      richText: "富文本",
      preview: "预览",
      publish: "发布",
      saveDraft: "保存草稿",
      updatePost: "更新文章",
      basicInfo: "基本信息",
      advancedSettings: "高级设置",
    },
    management: {
      allPosts: "所有文章",
      drafts: "草稿",
      published: "已发布",
      archived: "已归档",
      scheduled: "已计划",
      searchPosts: "搜索文章...",
      filterByStatus: "按状态筛选",
      filterByVisibility: "按可见性筛选",
      sortBy: "排序方式",
      sortOrder: "排序顺序",
      ascending: "升序",
      descending: "降序",
      bulkActions: "批量操作",
      selectPosts: "选择文章",
    },
  },
  media: {
    title: "媒体管理",
    description: "管理存储在 Cloudflare R2 中的所有媒体文件",
    uploadFiles: "上传文件",
    createFolder: "新建文件夹",
    refresh: "刷新",
    move: "移动",
    delete: "删除",
    fileManager: "文件管理器",
    dragToUpload: "拖拽文件到此区域快速上传",
    uploadingTo: "正在上传到 Cloudflare R2...",
    storageStats: {
      totalFiles: "总文件数",
      totalSize: "总存储大小",
      publicFiles: "公开文件",
      totalDownloads: "总下载次数",
    },
    filters: {
      searchFiles: "搜索文件名或标签...",
      allFolders: "所有文件夹",
      allTypes: "所有类型",
      images: "图片",
      videos: "视频",
      audio: "音频",
      documents: "文档",
      archives: "压缩包",
    },
    sorting: {
      sortBy: "排序",
      name: "名称",
      size: "大小",
      date: "日期",
      downloads: "下载量",
    },
    fileDetails: {
      name: "文件名",
      type: "类型",
      size: "大小",
      dimensions: "尺寸",
      uploadTime: "上传时间",
      lastModified: "最后修改",
      folder: "文件夹",
      downloadCount: "下载次数",
      accessPermission: "访问权限",
      public: "公开",
      private: "私有",
      etag: "ETag",
      tags: "标签",
      noTags: "暂无标签",
      metadata: "元数据",
      url: "文件 URL",
    },
    actions: {
      preview: "预览",
      details: "详情",
      copyLink: "复制链接",
      download: "下载",
      share: "分享",
      rename: "重命名",
      delete: "删除",
      selectDestination: "选择目标文件夹",
      createNewFolder: "创建新文件夹",
      folderName: "文件夹名称",
      create: "创建",
      cancel: "取消",
      moveFiles: "移动文件",
      noFilesFound: "没有找到文件",
      uploadFirst: "上传第一个文件",
    },
    views: {
      grid: "网格视图",
      list: "列表视图",
      folders: "文件夹",
      files: "文件",
    },
  },
  cloudflare: {
    title: "Cloudflare 集成",
    description: "配置 Cloudflare 服务以增强您的博客",
    accountSettings: "账户设置",
    r2Storage: "R2 存储",
    workers: "Workers",
    oauthProxy: "OAuth 代理",
    accountId: "Cloudflare 账户 ID",
    apiToken: "API 令牌",
    testConnection: "测试连接",
    connected: "已连接",
    checking: "检查中...",
    error: "连接错误",
    enableR2: "启用 R2 存储",
    bucketName: "R2 存储桶名称",
    customDomain: "自定义域名",
    corsSettings: "CORS 设置",
    enableWorkers: "启用 Cloudflare Workers",
    workerName: "Worker 名称",
    workerDomain: "Worker 域名",
    workerFeatures: "Worker 功能",
    oauthSettings: "OAuth 设置",
    githubClientId: "GitHub 客户端 ID",
    githubClientSecret: "GitHub 客户端密钥",
    autoConfig: "自动配置",
    saveSettings: "保存设置",
    configProgress: "配置进度",
    verifyingPermissions: "验证 Cloudflare 权限...",
    creatingBucket: "创建 R2 存储桶...",
    configuringCors: "配置 CORS 设置...",
    deployingWorker: "部署 OAuth Worker...",
    configuringDomain: "配置自定义域名...",
    generatingKeys: "生成访问密钥...",
    completingConfig: "完成配置...",
  },
  seo: {
    title: "SEO 设置",
    description: "优化您的博客以提高搜索引擎排名",
    basicSettings: "基本设置",
    socialMedia: "社交媒体",
    advancedSettings: "高级设置",
    siteTitle: "网站标题",
    siteDescription: "网站描述",
    keywords: "关键词",
    ogImage: "默认社交分享图片",
    verification: {
      google: "Google 站点验证",
      bing: "Bing 站点验证",
      baidu: "百度站点验证",
    },
    enableOpenGraph: "启用 Open Graph 标签",
    enableTwitterCards: "启用 Twitter Cards",
    twitterHandle: "Twitter 用户名",
    generateSitemap: "自动生成站点地图",
    enableStructuredData: "启用结构化数据",
    enableCanonicalUrls: "启用规范 URL",
    robotsTxt: "robots.txt 内容",
    generateNow: "立即生成",
  },
  analytics: {
    title: "分析统计",
    description: "查看您博客的访问数据和趋势",
    timeRange: {
      last7Days: "过去 7 天",
      last30Days: "过去 30 天",
      last90Days: "过去 90 天",
      last12Months: "过去 12 个月",
    },
    metrics: {
      pageViews: "页面浏览量",
      visitors: "访问者",
      avgTimeOnSite: "平均访问时长",
      bounceRate: "跳出率",
    },
    charts: {
      visitorsTrend: "访问者趋势",
      pageViewsTrend: "页面浏览量趋势",
    },
    tabs: {
      topPosts: "热门文章",
      trafficSources: "流量来源",
      countries: "访问国家/地区",
    },
    tables: {
      postTitle: "文章标题",
      views: "浏览量",
      visitors: "访问者",
      avgTimeOnPage: "平均访问时长",
      source: "来源",
      percentage: "百分比",
      country: "国家/地区",
    },
  },
  comments: {
    title: "评论系统管理",
    description: "配置基于 GitHub Discussions 的 Giscus 评论系统",
    setup: {
      selectRepository: "选择评论仓库",
      createRepository: "创建仓库",
      enableDiscussions: "启用 Discussions",
      discussionsEnabled: "Discussions 已启用",
      discussionsNotEnabled: "Discussions 未启用",
      commentCategory: "评论分类",
      createCommentCategory: "创建评论分类",
      selectCategory: "选择讨论分类",
    },
    config: {
      title: "Giscus 配置",
      description: "自定义评论系统的外观和行为",
      pageMapping: "页面映射方式",
      theme: "主题",
      inputPosition: "输入框位置",
      loadingMethod: "加载方式",
      enableReactions: "启用反应表情",
      strictMode: "严格模式",
      mappingOptions: {
        pathname: "路径名",
        url: "完整 URL",
        title: "页面标题",
        ogTitle: "OG 标题",
      },
      themeOptions: {
        system: "跟随系统",
        light: "浅色",
        dark: "深色",
        darkDimmed: "深色（柔和）",
      },
      positionOptions: {
        top: "顶部",
        bottom: "底部",
      },
      loadingOptions: {
        lazy: "懒加载",
        eager: "立即加载",
      },
    },
    preview: {
      title: "评论系统预览",
      description: "查看 Giscus 评论系统在您的博客中的显示效果",
      configInfo: "配置信息",
      repository: "仓库",
      category: "分类",
      mapping: "映射",
      theme: "主题",
      previewPlaceholder: "Giscus 评论组件将显示在这里",
      completeSetup: "请先完成仓库设置和配置，然后才能预览评论系统。",
    },
  },
  setup: {
    title: "博客系统设置向导",
    description: "让我们配置您的博客系统",
    steps: {
      welcome: "欢迎使用",
      github: "GitHub 配置",
      cloudflare: "Cloudflare 配置",
      site: "网站设置",
    },
    welcome: {
      title: "欢迎使用 GitHub 博客系统",
      description: "我们将引导您完成初始设置，包括 GitHub OAuth 认证、Cloudflare R2 存储配置等。",
      githubIntegration: "GitHub 集成",
      cloudflareStorage: "Cloudflare 存储",
      siteConfig: "网站配置",
    },
    github: {
      title: "GitHub 配置",
      description: "设置 GitHub OAuth 和仓库权限",
      clientId: "GitHub 客户端 ID",
      clientSecret: "GitHub 客户端密钥",
      repoOwner: "仓库所有者",
      repoName: "仓库名称",
      requestPermissions: "请求 GitHub 权限",
      createGithubApp: "创建 GitHub 应用",
      permissionsGranted: "GitHub 权限已成功获取！您现在可以继续下一步。",
    },
    cloudflare: {
      title: "Cloudflare 配置",
      description: "设置 Cloudflare R2 存储",
      accountId: "Cloudflare 账户 ID",
      apiToken: "API 令牌",
      bucketName: "R2 存储桶名称",
      verifyPermissions: "验证 Cloudflare 权限",
      autoConfigR2: "自动配置 R2 存储",
      permissionsVerified: "Cloudflare 权限验证成功！R2 存储已准备就绪。",
    },
    site: {
      title: "网站基本设置",
      description: "配置您的网站基本信息",
      siteTitle: "网站标题",
      defaultLanguage: "默认语言",
      siteDescription: "网站描述",
      setupComplete: "设置完成后，您将可以开始使用博客系统的所有功能。",
    },
    buttons: {
      next: "下一步",
      previous: "上一步",
      skip: "跳过设置",
      complete: "完成设置",
    },
  },
}

// 英文翻译
const enTranslations: Translations = {
  common: {
    loading: "Loading...",
    error: "Error",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    create: "Create",
    search: "Search",
    filter: "Filter",
    back: "Back",
    next: "Next",
    previous: "Previous",
    confirm: "Confirm",
    actions: "Actions",
    settings: "Settings",
    upload: "Upload",
    download: "Download",
    copy: "Copy",
    share: "Share",
    preview: "Preview",
    details: "Details",
    rename: "Rename",
    move: "Move",
    select: "Select",
    selectAll: "Select All",
    unselectAll: "Unselect All",
    noResults: "No Results",
    success: "Success",
    failed: "Failed",
  },
  blog: {
    title: "Blog",
    description: "Latest articles and insights",
    readMore: "Read more",
    readTime: "min read",
    publishedOn: "Published on",
    tags: "Tags",
    author: "Author",
    relatedPosts: "Related Posts",
    pinnedPosts: "Pinned Posts",
    latestPosts: "Latest Posts",
    categories: "Categories",
    comments: "Comments",
    share: "Share",
    tableOfContents: "Table of Contents",
  },
  admin: {
    dashboard: "Dashboard",
    posts: "Posts",
    newPost: "New Post",
    editPost: "Edit Post",
    settings: "Settings",
    analytics: "Analytics",
    users: "Users",
    media: "Media",
    tags: "Tags",
    comments: "Comments",
    seo: "SEO",
    ads: "Ads",
    permissions: "Permissions",
    cloudflare: "Cloudflare",
    github: "GitHub",
    systemSettings: "System Settings",
    logout: "Logout",
    contentManagement: "Content Management",
    marketingTools: "Marketing Tools",
    systemIntegration: "System Integration",
    viewBlog: "View Blog",
    adminPanel: "Admin Panel",
    manageContent: "Manage your blog content and settings",
  },
  auth: {
    login: "Login",
    logout: "Logout",
    signUp: "Sign Up",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot Password?",
    rememberMe: "Remember me",
    loginWithGithub: "Continue with GitHub",
    loginWithEmail: "Continue with email",
    welcomeBack: "Welcome Back",
    signInToAccess: "Sign in to access the admin panel",
    enterCredentials: "Enter your credentials to access the admin dashboard",
    onlyOwners: "Only repository owners and collaborators can access the admin panel.",
  },
  posts: {
    status: {
      draft: "Draft",
      published: "Published",
      archived: "Archived",
      scheduled: "Scheduled",
      all: "All Status",
    },
    visibility: {
      public: "Public",
      private: "Private",
      loggedIn: "Logged-in Users",
      all: "All Visibility",
    },
    editor: {
      title: "Title",
      content: "Content",
      excerpt: "Excerpt",
      coverImage: "Cover Image",
      publishSettings: "Publish Settings",
      seoSettings: "SEO Settings",
      markdown: "Markdown",
      richText: "Rich Text",
      preview: "Preview",
      publish: "Publish",
      saveDraft: "Save Draft",
      updatePost: "Update Post",
      basicInfo: "Basic Information",
      advancedSettings: "Advanced Settings",
    },
    management: {
      allPosts: "All Posts",
      drafts: "Drafts",
      published: "Published",
      archived: "Archived",
      scheduled: "Scheduled",
      searchPosts: "Search posts...",
      filterByStatus: "Filter by status",
      filterByVisibility: "Filter by visibility",
      sortBy: "Sort by",
      sortOrder: "Sort order",
      ascending: "Ascending",
      descending: "Descending",
      bulkActions: "Bulk Actions",
      selectPosts: "Select Posts",
    },
  },
  media: {
    title: "Media Management",
    description: "Manage all media files stored in Cloudflare R2",
    uploadFiles: "Upload Files",
    createFolder: "Create Folder",
    refresh: "Refresh",
    move: "Move",
    delete: "Delete",
    fileManager: "File Manager",
    dragToUpload: "Drag files here to upload",
    uploadingTo: "Uploading to Cloudflare R2...",
    storageStats: {
      totalFiles: "Total Files",
      totalSize: "Total Size",
      publicFiles: "Public Files",
      totalDownloads: "Total Downloads",
    },
    filters: {
      searchFiles: "Search files or tags...",
      allFolders: "All Folders",
      allTypes: "All Types",
      images: "Images",
      videos: "Videos",
      audio: "Audio",
      documents: "Documents",
      archives: "Archives",
    },
    sorting: {
      sortBy: "Sort by",
      name: "Name",
      size: "Size",
      date: "Date",
      downloads: "Downloads",
    },
    fileDetails: {
      name: "File Name",
      type: "Type",
      size: "Size",
      dimensions: "Dimensions",
      uploadTime: "Upload Time",
      lastModified: "Last Modified",
      folder: "Folder",
      downloadCount: "Download Count",
      accessPermission: "Access Permission",
      public: "Public",
      private: "Private",
      etag: "ETag",
      tags: "Tags",
      noTags: "No tags",
      metadata: "Metadata",
      url: "File URL",
    },
    actions: {
      preview: "Preview",
      details: "Details",
      copyLink: "Copy Link",
      download: "Download",
      share: "Share",
      rename: "Rename",
      delete: "Delete",
      selectDestination: "Select destination folder",
      createNewFolder: "Create New Folder",
      folderName: "Folder Name",
      create: "Create",
      cancel: "Cancel",
      moveFiles: "Move Files",
      noFilesFound: "No files found",
      uploadFirst: "Upload your first file",
    },
    views: {
      grid: "Grid View",
      list: "List View",
      folders: "Folders",
      files: "Files",
    },
  },
  cloudflare: {
    title: "Cloudflare Integration",
    description: "Configure Cloudflare services to enhance your blog",
    accountSettings: "Account Settings",
    r2Storage: "R2 Storage",
    workers: "Workers",
    oauthProxy: "OAuth Proxy",
    accountId: "Cloudflare Account ID",
    apiToken: "API Token",
    testConnection: "Test Connection",
    connected: "Connected",
    checking: "Checking...",
    error: "Connection Error",
    enableR2: "Enable R2 Storage",
    bucketName: "R2 Bucket Name",
    customDomain: "Custom Domain",
    corsSettings: "CORS Settings",
    enableWorkers: "Enable Cloudflare Workers",
    workerName: "Worker Name",
    workerDomain: "Worker Domain",
    workerFeatures: "Worker Features",
    oauthSettings: "OAuth Settings",
    githubClientId: "GitHub Client ID",
    githubClientSecret: "GitHub Client Secret",
    autoConfig: "Auto Configure",
    saveSettings: "Save Settings",
    configProgress: "Configuration Progress",
    verifyingPermissions: "Verifying Cloudflare permissions...",
    creatingBucket: "Creating R2 bucket...",
    configuringCors: "Configuring CORS settings...",
    deployingWorker: "Deploying OAuth Worker...",
    configuringDomain: "Configuring custom domain...",
    generatingKeys: "Generating access keys...",
    completingConfig: "Completing configuration...",
  },
  seo: {
    title: "SEO Settings",
    description: "Optimize your blog for search engines",
    basicSettings: "Basic Settings",
    socialMedia: "Social Media",
    advancedSettings: "Advanced Settings",
    siteTitle: "Site Title",
    siteDescription: "Site Description",
    keywords: "Keywords",
    ogImage: "Default Social Image",
    verification: {
      google: "Google Verification",
      bing: "Bing Verification",
      baidu: "Baidu Verification",
    },
    enableOpenGraph: "Enable Open Graph Tags",
    enableTwitterCards: "Enable Twitter Cards",
    twitterHandle: "Twitter Handle",
    generateSitemap: "Auto-generate Sitemap",
    enableStructuredData: "Enable Structured Data",
    enableCanonicalUrls: "Enable Canonical URLs",
    robotsTxt: "robots.txt Content",
    generateNow: "Generate Now",
  },
  analytics: {
    title: "Analytics",
    description: "View your blog's traffic data and trends",
    timeRange: {
      last7Days: "Last 7 Days",
      last30Days: "Last 30 Days",
      last90Days: "Last 90 Days",
      last12Months: "Last 12 Months",
    },
    metrics: {
      pageViews: "Page Views",
      visitors: "Visitors",
      avgTimeOnSite: "Avg. Time on Site",
      bounceRate: "Bounce Rate",
    },
    charts: {
      visitorsTrend: "Visitors Trend",
      pageViewsTrend: "Page Views Trend",
    },
    tabs: {
      topPosts: "Top Posts",
      trafficSources: "Traffic Sources",
      countries: "Countries",
    },
    tables: {
      postTitle: "Post Title",
      views: "Views",
      visitors: "Visitors",
      avgTimeOnPage: "Avg. Time on Page",
      source: "Source",
      percentage: "Percentage",
      country: "Country",
    },
  },
  comments: {
    title: "Comments Management",
    description: "Configure Giscus comment system based on GitHub Discussions",
    setup: {
      selectRepository: "Select Repository",
      createRepository: "Create Repository",
      enableDiscussions: "Enable Discussions",
      discussionsEnabled: "Discussions Enabled",
      discussionsNotEnabled: "Discussions Not Enabled",
      commentCategory: "Comment Category",
      createCommentCategory: "Create Comment Category",
      selectCategory: "Select Category",
    },
    config: {
      title: "Giscus Configuration",
      description: "Customize the appearance and behavior of the comment system",
      pageMapping: "Page Mapping",
      theme: "Theme",
      inputPosition: "Input Position",
      loadingMethod: "Loading Method",
      enableReactions: "Enable Reactions",
      strictMode: "Strict Mode",
      mappingOptions: {
        pathname: "Pathname",
        url: "URL",
        title: "Page Title",
        ogTitle: "OG Title",
      },
      themeOptions: {
        system: "System Preference",
        light: "Light",
        dark: "Dark",
        darkDimmed: "Dark Dimmed",
      },
      positionOptions: {
        top: "Top",
        bottom: "Bottom",
      },
      loadingOptions: {
        lazy: "Lazy",
        eager: "Eager",
      },
    },
    preview: {
      title: "Comment System Preview",
      description: "See how the Giscus comment system will appear in your blog",
      configInfo: "Configuration Info",
      repository: "Repository",
      category: "Category",
      mapping: "Mapping",
      theme: "Theme",
      previewPlaceholder: "Giscus comment component will appear here",
      completeSetup: "Please complete repository setup and configuration first to preview the comment system.",
    },
  },
  setup: {
    title: "Blog System Setup Wizard",
    description: "Let's configure your blog system",
    steps: {
      welcome: "Welcome",
      github: "GitHub Setup",
      cloudflare: "Cloudflare Setup",
      site: "Site Setup",
    },
    welcome: {
      title: "Welcome to GitHub Blog System",
      description:
        "We'll guide you through the initial setup, including GitHub OAuth authentication, Cloudflare R2 storage configuration, and more.",
      githubIntegration: "GitHub Integration",
      cloudflareStorage: "Cloudflare Storage",
      siteConfig: "Site Configuration",
    },
    github: {
      title: "GitHub Configuration",
      description: "Set up GitHub OAuth and repository permissions",
      clientId: "GitHub Client ID",
      clientSecret: "GitHub Client Secret",
      repoOwner: "Repository Owner",
      repoName: "Repository Name",
      requestPermissions: "Request GitHub Permissions",
      createGithubApp: "Create GitHub App",
      permissionsGranted: "GitHub permissions successfully granted! You can now proceed to the next step.",
    },
    cloudflare: {
      title: "Cloudflare Configuration",
      description: "Set up Cloudflare R2 storage",
      accountId: "Cloudflare Account ID",
      apiToken: "API Token",
      bucketName: "R2 Bucket Name",
      verifyPermissions: "Verify Cloudflare Permissions",
      autoConfigR2: "Auto-configure R2 Storage",
      permissionsVerified: "Cloudflare permissions verified successfully! R2 storage is ready.",
    },
    site: {
      title: "Site Settings",
      description: "Configure your site's basic information",
      siteTitle: "Site Title",
      defaultLanguage: "Default Language",
      siteDescription: "Site Description",
      setupComplete: "After setup is complete, you'll be able to use all features of the blog system.",
    },
    buttons: {
      next: "Next",
      previous: "Previous",
      skip: "Skip Setup",
      complete: "Complete Setup",
    },
  },
}

// 其他语言翻译（简化版，实际应用中应该有完整翻译）
const otherTranslations: Record<Exclude<Locale, "zh" | "en">, Partial<Translations>> = {
  es: {
    common: {
      loading: "Cargando...",
      error: "Error",
      save: "Guardar",
      cancel: "Cancelar",
    },
    blog: {
      title: "Blog",
      description: "Últimos artículos e ideas",
    },
    admin: {
      dashboard: "Panel",
      posts: "Artículos",
    },
  },
  fr: {
    common: {
      loading: "Chargement...",
      error: "Erreur",
      save: "Sauvegarder",
      cancel: "Annuler",
    },
    blog: {
      title: "Blog",
      description: "Derniers articles et insights",
    },
    admin: {
      dashboard: "Tableau de bord",
      posts: "Articles",
    },
  },
  de: {
    common: {
      loading: "Laden...",
      error: "Fehler",
      save: "Speichern",
      cancel: "Abbrechen",
    },
    blog: {
      title: "Blog",
      description: "Neueste Artikel und Einblicke",
    },
    admin: {
      dashboard: "Dashboard",
      posts: "Artikel",
    },
  },
  ja: {
    common: {
      loading: "読み込み中...",
      error: "エラー",
      save: "保存",
      cancel: "キャンセル",
    },
    blog: {
      title: "ブログ",
      description: "最新の記事とインサイト",
    },
    admin: {
      dashboard: "ダッシュボード",
      posts: "記事",
    },
  },
  ko: {
    common: {
      loading: "로딩 중...",
      error: "오류",
      save: "저장",
      cancel: "취소",
    },
    blog: {
      title: "블로그",
      description: "최신 기사 및 인사이트",
    },
    admin: {
      dashboard: "대시보드",
      posts: "게시물",
    },
  },
  ru: {
    common: {
      loading: "Загрузка...",
      error: "Ошибка",
      save: "Сохранить",
      cancel: "Отмена",
    },
    blog: {
      title: "Блог",
      description: "Последние статьи и идеи",
    },
    admin: {
      dashboard: "Панель управления",
      posts: "Статьи",
    },
  },
}

// 合并翻译
const translations: Record<Locale, Translations> = {
  zh: zhTranslations,
  en: enTranslations,
  es: { ...enTranslations, ...otherTranslations.es } as Translations,
  fr: { ...enTranslations, ...otherTranslations.fr } as Translations,
  de: { ...enTranslations, ...otherTranslations.de } as Translations,
  ja: { ...enTranslations, ...otherTranslations.ja } as Translations,
  ko: { ...enTranslations, ...otherTranslations.ko } as Translations,
  ru: { ...enTranslations, ...otherTranslations.ru } as Translations,
}

export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations[defaultLocale]
}

export function useTranslations(locale: Locale = defaultLocale) {
  return getTranslations(locale)
}

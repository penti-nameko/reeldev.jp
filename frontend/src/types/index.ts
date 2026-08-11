export interface QiitaArticle {
  id: string
  title: string
  url: string
  created_at: string
  updated_at: string
  tags: { name: string; versions: string[] }[]
  likes_count: number
  page_views_count: number | null
  body: string
}

export interface Career {
  id: string
  company: string
  role: string
  period: string
  description: string
  technologies: string[]
}

export interface Notice {
  id: string
  date: string
  category: 'info' | 'update' | 'release'
  title: string
  body?: string
  url?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  url?: string
  github?: string
  image?: string
}

export interface ApiResponse<T> {
  data: T
  cached_at?: string
}

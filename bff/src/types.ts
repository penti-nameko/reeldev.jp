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

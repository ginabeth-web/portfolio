/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  admin: {
    dashboard: typeof routes['admin.dashboard']
    profile: {
      update: typeof routes['admin.profile.update']
    }
    projects: {
      store: typeof routes['admin.projects.store']
      update: typeof routes['admin.projects.update']
      destroy: typeof routes['admin.projects.destroy']
    }
    skills: {
      store: typeof routes['admin.skills.store']
      destroy: typeof routes['admin.skills.destroy']
    }
  }
}

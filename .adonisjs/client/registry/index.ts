/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'admin.dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/admin',
    tokens: [{"old":"/admin","type":0,"val":"admin","end":""}],
    types: placeholder as Registry['admin.dashboard']['types'],
  },
  'admin.profile.update': {
    methods: ["PUT"],
    pattern: '/admin/profile',
    tokens: [{"old":"/admin/profile","type":0,"val":"admin","end":""},{"old":"/admin/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['admin.profile.update']['types'],
  },
  'admin.projects.store': {
    methods: ["POST"],
    pattern: '/admin/projects',
    tokens: [{"old":"/admin/projects","type":0,"val":"admin","end":""},{"old":"/admin/projects","type":0,"val":"projects","end":""}],
    types: placeholder as Registry['admin.projects.store']['types'],
  },
  'admin.projects.update': {
    methods: ["PUT"],
    pattern: '/admin/projects/:id',
    tokens: [{"old":"/admin/projects/:id","type":0,"val":"admin","end":""},{"old":"/admin/projects/:id","type":0,"val":"projects","end":""},{"old":"/admin/projects/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.projects.update']['types'],
  },
  'admin.projects.destroy': {
    methods: ["DELETE"],
    pattern: '/admin/projects/:id',
    tokens: [{"old":"/admin/projects/:id","type":0,"val":"admin","end":""},{"old":"/admin/projects/:id","type":0,"val":"projects","end":""},{"old":"/admin/projects/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.projects.destroy']['types'],
  },
  'admin.skills.store': {
    methods: ["POST"],
    pattern: '/admin/skills',
    tokens: [{"old":"/admin/skills","type":0,"val":"admin","end":""},{"old":"/admin/skills","type":0,"val":"skills","end":""}],
    types: placeholder as Registry['admin.skills.store']['types'],
  },
  'admin.skills.destroy': {
    methods: ["DELETE"],
    pattern: '/admin/skills/:id',
    tokens: [{"old":"/admin/skills/:id","type":0,"val":"admin","end":""},{"old":"/admin/skills/:id","type":0,"val":"skills","end":""},{"old":"/admin/skills/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.skills.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}

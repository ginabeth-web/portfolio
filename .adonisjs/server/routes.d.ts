import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.profile.update': { paramsTuple?: []; params?: {} }
    'admin.projects.store': { paramsTuple?: []; params?: {} }
    'admin.projects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.projects.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.skills.store': { paramsTuple?: []; params?: {} }
    'admin.skills.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'admin.profile.update': { paramsTuple?: []; params?: {} }
    'admin.projects.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'admin.projects.store': { paramsTuple?: []; params?: {} }
    'admin.skills.store': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'admin.projects.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.skills.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}
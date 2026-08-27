/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'
import Project from '#models/project'
import Skill from '#models/skill'
import Profile from '#models/profile'

router
  .get('/', async ({ inertia }) => {
    const profile = await Profile.query().first()
    const skills = await Skill.query().orderBy('category', 'asc')
    // A lone Lucid model is not auto-serialized by Inertia (only arrays are),
    // so call serialize() to get a plain object with camelCase keys.
    return inertia.render('home', { profile: profile?.serialize() ?? null, skills })
  })
  .as('home')

// NOTE: Login / signup / logout are disabled — the auth page components and the
// Session / NewAccount controllers have been removed. @adonisjs/auth, the User
// model, the users table, and the auth middleware are left in place (unused) so
// this can be re-enabled later. The /admin group below is still guarded by
// middleware.auth() and is therefore unreachable until auth is wired back up.
router
  .group(() => {
    // Admin Dashboard page
    router
      .get('admin', async ({ inertia }) => {
        const profile = await Profile.query().first()
        const projects = await Project.query().orderBy('createdAt', 'desc')
        const skills = await Skill.query().orderBy('category', 'asc')
        return inertia.render('admin/dashboard', {
          profile: profile?.serialize() ?? null,
          projects,
          skills,
        })
      })
      .as('admin.dashboard')

    // Profile Admin Routes
    router.put('admin/profile', [controllers.Profile, 'update']).as('admin.profile.update')

    // Projects Admin Routes
    router.post('admin/projects', [controllers.Projects, 'store']).as('admin.projects.store')
    router.put('admin/projects/:id', [controllers.Projects, 'update']).as('admin.projects.update')
    router
      .delete('admin/projects/:id', [controllers.Projects, 'destroy'])
      .as('admin.projects.destroy')

    // Skills Admin Routes
    router.post('admin/skills', [controllers.Skills, 'store']).as('admin.skills.store')
    router.delete('admin/skills/:id', [controllers.Skills, 'destroy']).as('admin.skills.destroy')
  })
  .use(middleware.auth())

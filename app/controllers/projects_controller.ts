import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import vine from '@vinejs/vine'

const projectValidator = vine.compile(
  vine.object({
    title: vine.string().maxLength(255),
    description: vine.string(),
    image: vine.string().nullable().optional(),
    githubUrl: vine.string().nullable().optional(),
    liveUrl: vine.string().nullable().optional(),
    technologies: vine.string().maxLength(255),
  })
)

export default class ProjectsController {
  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(projectValidator)
    await Project.create(payload)

    session.flash('success', 'Project created successfully!')
    return response.redirect().back()
  }

  async update({ params, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(projectValidator)
    const project = await Project.findOrFail(params.id)
    project.merge(payload)
    await project.save()

    session.flash('success', 'Project updated successfully!')
    return response.redirect().back()
  }

  async destroy({ params, response, session }: HttpContext) {
    const project = await Project.findOrFail(params.id)
    await project.delete()

    session.flash('success', 'Project deleted successfully!')
    return response.redirect().back()
  }
}

import type { HttpContext } from '@adonisjs/core/http'
import Skill from '#models/skill'
import vine from '@vinejs/vine'

const skillValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(255),
    category: vine.string().maxLength(255),
  })
)

export default class SkillsController {
  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(skillValidator)
    await Skill.create(payload)

    session.flash('success', 'Skill added successfully!')
    return response.redirect().back()
  }

  async destroy({ params, response, session }: HttpContext) {
    const skill = await Skill.findOrFail(params.id)
    await skill.delete()

    session.flash('success', 'Skill deleted successfully!')
    return response.redirect().back()
  }
}

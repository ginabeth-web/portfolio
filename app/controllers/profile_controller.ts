import type { HttpContext } from '@adonisjs/core/http'
import Profile from '#models/profile'
import vine from '@vinejs/vine'

const profileValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(255),
    title: vine.string().maxLength(255),
    about: vine.string().nullable(),
    profileImage: vine.string().nullable().optional(),
    resume: vine.string().nullable().optional(),
    email: vine.string().nullable().optional(),
    location: vine.string().nullable().optional(),
    github: vine.string().nullable().optional(),
    linkedin: vine.string().nullable().optional(),
  })
)

export default class ProfileController {
  async update({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(profileValidator)
    let profile = await Profile.query().first()
    if (!profile) {
      profile = new Profile()
    }
    profile.merge(payload)
    await profile.save()

    session.flash('success', 'Profile updated successfully!')
    return response.redirect().back()
  }
}

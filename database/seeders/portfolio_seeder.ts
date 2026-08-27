import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Profile from '#models/profile'
import Skill from '#models/skill'

export default class extends BaseSeeder {
  async run() {
    // 1. Default admin user (used to sign in to /admin and edit the portfolio).
    const adminEmail = 'gina@example.com'
    const existingUser = await User.findBy('email', adminEmail)
    if (!existingUser) {
      await User.create({
        fullName: 'Ginabeth Daroy',
        email: adminEmail,
        password: 'password123',
      })
    }

    // 2. Profile — real details from Ginabeth's résumé.
    const existingProfile = await Profile.query().first()
    if (!existingProfile) {
      await Profile.create({
        name: 'Ginabeth Daroy',
        title: 'Senior Software Developer',
        about:
          'Software developer with 10 years of experience building and maintaining web applications. My background runs from hands-on technical specialist work — coding, design, unit testing, and documentation — through to project leadership, owning timelines, code standards, and team output. These days I focus on PHP and Laravel, with Vue.js and Nuxt.js on the front end. I keep looking for roles where I can grow and learn alongside seasoned engineers.',
        profileImage: null,
        resume: null,
        email: 'nabethdaroy@gmail.com',
        location: 'Cabiangon, Pinamungajan, Cebu',
        github: null,
        linkedin: null,
      })
    }

    // 3. Skills grouped by how they show up in a project.
    const skillCount = await Skill.query().count('* as total')
    if (Number(skillCount[0].$extras.total) === 0) {
      await Skill.createMany([
        // Languages
        { name: 'PHP', category: 'Languages' },
        { name: 'SQL', category: 'Languages' },
        { name: 'JavaScript / jQuery', category: 'Languages' },
        { name: 'HTML5 & CSS3', category: 'Languages' },
        { name: 'Vue.js / Nuxt.js', category: 'Languages' },

        // Frameworks
        { name: 'Laravel', category: 'Frameworks' },
        { name: 'CodeIgniter 3', category: 'Frameworks' },
        { name: 'SugarCRM', category: 'Frameworks' },
        { name: 'AdminLTE', category: 'Frameworks' },

        // Tools
        { name: 'Git / GitLab', category: 'Tools' },
        { name: 'Sourcetree', category: 'Tools' },
        { name: 'Visual Studio', category: 'Tools' },
        { name: 'Eclipse', category: 'Tools' },
        { name: 'PHPUnit', category: 'Tools' },

        // AI
        { name: 'Claude', category: 'AI' },
        { name: 'Gemini', category: 'AI' },
        { name: 'GitHub Copilot', category: 'AI' },
      ])
    }

    // Projects are added by Ginabeth through the /admin dashboard.
  }
}

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Head } from '@inertiajs/vue3'
import { toast } from 'vue-sonner'
import { useScrollReveal } from '~/composables/use_scroll_reveal'

const props = defineProps<{
  profile: any
  skills: any[]
}>()

useScrollReveal()

const categoryOrder = ['Languages', 'Frameworks', 'Tools', 'AI', 'Other']

const categoryIcon: Record<string, string> = {
  Languages: '💻',
  Frameworks: '🧩',
  Tools: '🧰',
  AI: '🤖',
  Other: '✨',
}

const categoryRank = (category: string) => {
  const index = categoryOrder.indexOf(category)
  return index === -1 ? categoryOrder.length : index
}

const groupedSkills = computed(() => {
  const groups: Record<string, any[]> = {}
  props.skills.forEach((skill) => {
    const cat = skill.category || 'Other'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(skill)
  })
  return Object.fromEntries(
    Object.entries(groups).sort(([a], [b]) => categoryRank(a) - categoryRank(b))
  )
})

// Static résumé content — edit here (not stored in the database).
const phone = '09682002157'

const experience = [
  {
    period: '2024 — Present',
    role: 'Web Developer',
    company: 'HumEdit Philippines',
    description:
      'Build and maintain web applications in PHP and Laravel, delivering technical tasks scoped with the Technical Manager.',
  },
  {
    period: '2023 — 2024',
    role: 'Web Developer',
    company: 'Infinite Points Philippines',
    description:
      'Delivered PHP/Laravel web applications end to end — coding, design, PHPUnit testing, and documentation — and took part in code reviews to keep quality and best practices high.',
  },
  {
    period: '2016 — 2023',
    role: 'Technical Specialist → Senior Technical Specialist → Project Leader',
    company: 'Alliance Software Inc.',
    description:
      'Progressed from hands-on coding, design, and unit testing to coordinating technical functions, then leading projects — owning delivery timelines, code standards, spec and design adherence, and team productivity.',
  },
]

const projectExperience = [
  {
    category: 'Lending',
    title: 'Lending Application',
    context: 'Japan-based · Time & Material',
    role: 'Software Developer',
    tech: ['CodeIgniter', 'SugarCRM', 'MySQL', 'Bootstrap'],
    summary:
      'A lending platform where I built and refined the interface and kept the codebase healthy.',
    contributions: [
      'Developed and enhanced UI features against project requirements',
      'Performed testing and bug fixing to improve reliability',
      'Wrote and maintained technical and project documentation',
      'Took part in code reviews to uphold development standards',
    ],
  },
  {
    category: 'Transport & Logistics',
    title: 'Driver Job Search & Career Platform',
    context: 'Japan-based · Project-based',
    role: 'Software Developer',
    tech: ['Laravel', 'Laravel Blade', 'MySQL'],
    summary:
      'A job search and career development platform for professionals in transportation and logistics.',
    contributions: [
      'Migrated an existing WordPress application to Laravel',
      'Developed and enhanced user interface features',
      'Implemented improvements based on business requirements',
      'Tested and debugged to identify and resolve issues',
    ],
  },
  {
    category: 'Transport & Logistics',
    title: 'Waste Collection Bidding System',
    context: 'Japan-based · Project-based',
    role: 'Software Developer',
    tech: ['Laravel', 'Laravel Blade', 'MySQL'],
    summary:
      'A web system supporting the bidding and rebidding process for waste collection services.',
    contributions: [
      'Developed and implemented user interface features',
      'Fixed application bugs and technical issues',
      'Conducted testing to ensure functionality and reliability',
      'Helped implement enhancements from project requirements',
    ],
  },
  {
    category: 'Healthcare',
    title: 'NIPT Systems',
    context: 'In-house project',
    role: 'Software Developer',
    tech: ['Laravel', 'Vue.js', 'AngularJS', 'MySQL'],
    summary:
      'A healthcare testing platform spanning customer, clinic, and laboratory applications.',
    contributions: [
      'Developed and maintained REST APIs',
      'Implemented and enhanced user interface features',
      'Fixed bugs and resolved application issues',
      'Collaborated with the team on new requirements and improvements',
    ],
  },
  {
    category: 'Healthcare',
    title: 'NIPPT Systems',
    context: 'In-house project',
    role: 'Software Developer',
    tech: ['Laravel', 'Vue.js', 'MySQL'],
    summary: 'A platform supporting customer, clinic, and laboratory workflows.',
    contributions: [
      'Developed and maintained APIs for system integration',
      'Implemented user interface features and enhancements',
      'Investigated and resolved software defects',
      'Performed functional and technical testing',
    ],
  },
  {
    category: 'Business Systems',
    title: 'Centralized Appointment System',
    context: 'In-house project',
    role: 'Software Developer',
    tech: ['Laravel', 'Vue.js', 'MySQL'],
    summary: 'A centralized web application to manage and coordinate appointment processes.',
    contributions: [
      'Developed and maintained backend APIs',
      'Built frontend features in Vue.js',
      'Fixed bugs and investigated application issues',
      'Conducted testing for system functionality and reliability',
    ],
  },
  {
    category: 'Business Systems',
    title: 'Human Resources Interview System',
    context: 'In-house project · AI-assisted',
    role: 'Software Developer',
    tech: ['Laravel', 'Filament', 'Vue.js', 'MySQL', 'Google Gemini'],
    summary:
      'An interview platform supporting candidate evaluation, with AI-assisted functionality.',
    contributions: [
      'Developed and maintained APIs for the interview system',
      'Integrated AI-assisted functionality using Gemini',
      'Implemented UI features and workflow enhancements',
      'Performed application testing and troubleshooting',
    ],
  },
]

const credentials = [
  {
    icon: '🎓',
    title: 'BS in Information Technology',
    org: 'Cebu Institute of Technology – University',
    detail: '2012 – 2016 · DOST Scholar',
  },
  {
    icon: '📜',
    title: 'Java SE 8 — Oracle Certified Associate',
    org: 'Oracle',
    detail: 'Globally recognized certification in Java SE 8 programming',
  },
]

const stats = [
  { num: '10', label: 'Years in software development' },
  { num: `${projectExperience.length}`, label: 'Projects delivered' },
  { num: '3', label: 'Companies' },
  { num: 'OCA', label: 'Java SE 8 certified' },
]

// Contact form — composes an email in the visitor's mail client (no backend).
const formName = ref('')
const formEmail = ref('')
const formMessage = ref('')

const contactEmail = computed(() => props.profile?.email || 'nabethdaroy@gmail.com')

const handleContactSubmit = (e: Event) => {
  e.preventDefault()
  if (!formName.value || !formEmail.value || !formMessage.value) {
    toast.error('Please fill in all fields.')
    return
  }

  const subject = encodeURIComponent(`Portfolio enquiry from ${formName.value}`)
  const body = encodeURIComponent(`${formMessage.value}\n\n— ${formName.value}\n${formEmail.value}`)
  window.location.href = `mailto:${contactEmail.value}?subject=${subject}&body=${body}`
  toast.success('Opening your email app…')
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  toast.success('Copied to clipboard!')
}
</script>

<template>
  <Head :title="profile?.name ? `${profile.name} | ${profile.title}` : 'Ginabeth Daroy'" />

  <span id="top" />

  <!-- Hero -->
  <section class="hero">
    <span class="eyebrow">
      <span class="status-dot" />
      Open to new opportunities
    </span>

    <h1>
      Hi, I'm <span class="gradient-text">{{ profile?.name || 'Ginabeth Daroy' }}</span
      >.<br />
      I build and maintain web applications.
    </h1>

    <p class="hero-lead">
      {{ profile?.title || 'Senior Software Developer' }} with a decade of experience — from
      hands-on technical specialist work to leading projects. Focused on PHP, Laravel, and Vue.
    </p>

    <div class="hero-actions">
      <a href="#projects" class="btn btn-primary">See my work</a>
      <a href="#contact" class="btn btn-secondary">Get in touch</a>
    </div>

    <div class="hero-social">
      <span class="label">Reach me</span>
      <a v-if="profile?.email" :href="`mailto:${profile.email}`" class="badge">Email ↗</a>
      <a :href="`tel:${phone}`" class="badge">Call ↗</a>
      <a v-if="profile?.github" :href="profile.github" target="_blank" rel="noopener" class="badge">
        GitHub ↗
      </a>
      <a
        v-if="profile?.linkedin"
        :href="profile.linkedin"
        target="_blank"
        rel="noopener"
        class="badge"
      >
        LinkedIn ↗
      </a>
    </div>

    <div class="stats" data-reveal>
      <div v-for="stat in stats" :key="stat.label" class="stat">
        <span class="stat-num gradient-text">{{ stat.num }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>
  </section>

  <!-- About -->
  <section id="about" class="section">
    <div class="section-head" data-reveal>
      <span class="section-kicker">About</span>
      <h2 class="section-title">A bit about me</h2>
    </div>

    <div class="about-container" data-reveal>
      <div v-if="profile?.profileImage" class="about-image">
        <img :src="profile.profileImage" :alt="profile?.name || 'Profile picture'" />
      </div>
      <div class="about-info" :class="{ 'about-info--full': !profile?.profileImage }">
        <h3>{{ profile?.title || 'Senior Software Developer' }}</h3>
        <p class="about-bio">
          {{
            profile?.about ||
            'Software developer with 10 years of experience building and maintaining web applications. My background runs from hands-on technical specialist work — coding, design, unit testing, and documentation — through to project leadership, owning timelines, code standards, and team output. These days I focus on PHP and Laravel, with Vue.js and Nuxt.js on the front end.'
          }}
        </p>

        <div class="about-meta">
          <div v-if="profile?.location" class="meta-item">
            <span class="meta-label">Location</span>
            <span class="meta-value">{{ profile.location }}</span>
          </div>
          <div v-if="profile?.email" class="meta-item">
            <span class="meta-label">Email</span>
            <span
              class="meta-value copyable"
              title="Click to copy"
              @click="copyToClipboard(profile.email)"
            >
              {{ profile.email }} 📋
            </span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Availability</span>
            <span class="meta-value">Open to opportunities</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Experience -->
  <section id="experience" class="section">
    <div class="section-head" data-reveal>
      <span class="section-kicker">Experience</span>
      <h2 class="section-title">Where I've worked</h2>
      <p class="section-intro">A decade of software work, most recent first.</p>
    </div>

    <div class="timeline" data-reveal>
      <div v-for="item in experience" :key="item.company" class="timeline-item">
        <span class="timeline-period">{{ item.period }}</span>
        <h3 class="timeline-role">{{ item.role }}</h3>
        <span class="timeline-company">{{ item.company }}</span>
        <p class="timeline-desc">{{ item.description }}</p>
      </div>
    </div>
  </section>

  <!-- Project experience -->
  <section id="projects" class="section">
    <div class="section-head" data-reveal>
      <span class="section-kicker">Work</span>
      <h2 class="section-title">Project experience</h2>
      <p class="section-intro">
        Client and in-house projects I've contributed to as a software developer.
      </p>
    </div>

    <div class="xp-grid">
      <article
        v-for="project in projectExperience"
        :key="project.title"
        class="xp-card"
        data-reveal
      >
        <span class="xp-cat">{{ project.category }}</span>
        <h3>{{ project.title }}</h3>
        <p class="xp-context">{{ project.context }} · {{ project.role }}</p>
        <p class="xp-summary">{{ project.summary }}</p>

        <ul class="xp-contrib">
          <li v-for="point in project.contributions" :key="point">{{ point }}</li>
        </ul>

        <div class="xp-tech">
          <span v-for="t in project.tech" :key="t" class="xp-tag">{{ t }}</span>
        </div>
      </article>
    </div>

    <p class="xp-note" data-reveal>
      Project details have been generalized. Client and company names, proprietary system details,
      URLs, screenshots, and other confidential information have been omitted or modified to respect
      client confidentiality and company policies.
    </p>
  </section>

  <!-- Skills -->
  <section id="skills" class="section">
    <div class="section-head" data-reveal>
      <span class="section-kicker">Toolbox</span>
      <h2 class="section-title">Skills &amp; technologies</h2>
      <p class="section-intro">The stack I reach for, grouped by where it lives in a project.</p>
    </div>

    <div v-if="skills && skills.length > 0" class="grid-skills">
      <div
        v-for="(skillsList, category) in groupedSkills"
        :key="category"
        class="skills-category-card"
        data-reveal
      >
        <h3>
          <span>{{ categoryIcon[category] || categoryIcon.Other }}</span>
          {{ category }}
        </h3>
        <div class="skill-badges">
          <span v-for="skill in skillsList" :key="skill.id" class="badge">{{ skill.name }}</span>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">No skills listed yet.</div>
  </section>

  <!-- Education & Certifications -->
  <section id="credentials" class="section">
    <div class="section-head" data-reveal>
      <span class="section-kicker">Credentials</span>
      <h2 class="section-title">Education &amp; certifications</h2>
    </div>

    <div class="cred-grid" data-reveal>
      <div v-for="cred in credentials" :key="cred.title" class="cred-card">
        <span class="cred-icon">{{ cred.icon }}</span>
        <div>
          <h3>{{ cred.title }}</h3>
          <span class="cred-org">{{ cred.org }}</span>
          <p class="cred-detail">{{ cred.detail }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section id="contact" class="section" style="border-bottom: none">
    <div class="section-head center" data-reveal>
      <span class="section-kicker">Contact</span>
      <h2 class="section-title">Let's talk</h2>
      <p class="section-intro">Have a role or a project in mind? I read every message.</p>
    </div>

    <div class="contact-grid" data-reveal>
      <div class="contact-aside">
        <h3>Reach me directly</h3>
        <p>Email or a call is the fastest way to get a reply.</p>
        <div class="contact-methods">
          <a v-if="profile?.email" :href="`mailto:${profile.email}`" class="contact-method">
            <span class="icon">✉️</span>
            <span>
              <span class="m-label">Email</span><br />
              <span class="m-value">{{ profile.email }}</span>
            </span>
          </a>
          <a :href="`tel:${phone}`" class="contact-method">
            <span class="icon">📱</span>
            <span>
              <span class="m-label">Phone</span><br />
              <span class="m-value">{{ phone }}</span>
            </span>
          </a>
          <div v-if="profile?.location" class="contact-method">
            <span class="icon">📍</span>
            <span>
              <span class="m-label">Location</span><br />
              <span class="m-value">{{ profile.location }}</span>
            </span>
          </div>
        </div>
      </div>

      <div class="contact-container">
        <h3>Send a message</h3>
        <p>This opens a draft in your email app, pre-filled and ready to send.</p>

        <form @submit="handleContactSubmit">
          <div class="form-group">
            <label for="name">Name</label>
            <input id="name" v-model="formName" type="text" placeholder="Your name" required />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="formEmail"
              type="email"
              placeholder="you@email.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              v-model="formMessage"
              placeholder="Tell me a little about the role or project..."
              required
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 4px">
            Compose email
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

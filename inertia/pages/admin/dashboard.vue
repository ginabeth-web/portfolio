<script setup lang="ts">
import { ref } from 'vue'
import { Head, useForm, router } from '@inertiajs/vue3'
import { toast } from 'vue-sonner'

const props = defineProps<{
  profile: any
  projects: any[]
  skills: any[]
}>()

const activeTab = ref('profile')

// 1. Profile Form
const profileForm = useForm({
  name: props.profile?.name || '',
  title: props.profile?.title || '',
  about: props.profile?.about || '',
  profileImage: props.profile?.profileImage || '',
  resume: props.profile?.resume || '',
  email: props.profile?.email || '',
  location: props.profile?.location || '',
  github: props.profile?.github || '',
  linkedin: props.profile?.linkedin || '',
})

const submitProfile = () => {
  profileForm.put('/admin/profile', {
    onSuccess: () => {
      toast.success('Profile updated successfully!')
    },
    onError: () => {
      toast.error('Failed to update profile. Please check errors.')
    },
  })
}

// 2. Projects Form & List
const isProjectEditing = ref(false)
const showProjectForm = ref(false)
const projectForm = useForm({
  id: null as number | null,
  title: '',
  description: '',
  image: '',
  githubUrl: '',
  liveUrl: '',
  technologies: '',
})

const openAddProject = () => {
  isProjectEditing.value = false
  projectForm.reset()
  projectForm.id = null
  showProjectForm.value = true
}

const openEditProject = (project: any) => {
  isProjectEditing.value = true
  projectForm.id = project.id
  projectForm.title = project.title || ''
  projectForm.description = project.description || ''
  projectForm.image = project.image || ''
  projectForm.githubUrl = project.githubUrl || ''
  projectForm.liveUrl = project.liveUrl || ''
  projectForm.technologies = project.technologies || ''
  showProjectForm.value = true
}

const submitProject = () => {
  if (isProjectEditing.value && projectForm.id) {
    projectForm.put(`/admin/projects/${projectForm.id}`, {
      onSuccess: () => {
        toast.success('Project updated successfully!')
        showProjectForm.value = false
        projectForm.reset()
      },
      onError: () => {
        toast.error('Failed to update project.')
      },
    })
  } else {
    projectForm.post('/admin/projects', {
      onSuccess: () => {
        toast.success('Project created successfully!')
        showProjectForm.value = false
        projectForm.reset()
      },
      onError: () => {
        toast.error('Failed to create project.')
      },
    })
  }
}

const deleteProject = (id: number) => {
  if (confirm('Are you sure you want to delete this project?')) {
    router.delete(`/admin/projects/${id}`, {
      onSuccess: () => {
        toast.success('Project deleted successfully!')
      },
      onError: () => {
        toast.error('Failed to delete project.')
      },
    })
  }
}

// 3. Skills Form & List
const skillForm = useForm({
  name: '',
  category: 'Languages',
})

const submitSkill = () => {
  if (!skillForm.name) {
    toast.error('Please enter a skill name.')
    return
  }
  skillForm.post('/admin/skills', {
    onSuccess: () => {
      toast.success('Skill added successfully!')
      skillForm.reset('name')
    },
    onError: () => {
      toast.error('Failed to add skill.')
    },
  })
}

const deleteSkill = (id: number) => {
  if (confirm('Are you sure you want to delete this skill?')) {
    router.delete(`/admin/skills/${id}`, {
      onSuccess: () => {
        toast.success('Skill deleted successfully!')
      },
      onError: () => {
        toast.error('Failed to delete skill.')
      },
    })
  }
}
</script>

<template>
  <Head title="Admin Dashboard" />

  <div class="admin-header">
    <div>
      <h1
        style="
          font-size: 2.2rem;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
        "
      >
        Admin Workspace
      </h1>
      <p style="color: var(--text-secondary); margin-top: 4px">
        Manage your portfolio profile details, projects, and skills in real-time.
      </p>
    </div>
  </div>

  <!-- Navigation Tabs -->
  <div class="admin-tabs">
    <button
      class="tab-btn"
      :class="{ active: activeTab === 'profile' }"
      @click="activeTab = 'profile'"
    >
      👤 Profile Details
    </button>
    <button
      class="tab-btn"
      :class="{ active: activeTab === 'projects' }"
      @click="activeTab = 'projects'"
    >
      💼 Projects ({{ projects.length }})
    </button>
    <button
      class="tab-btn"
      :class="{ active: activeTab === 'skills' }"
      @click="activeTab = 'skills'"
    >
      ⚡ Skills ({{ skills.length }})
    </button>
  </div>

  <!-- PROFILE TAB -->
  <div v-if="activeTab === 'profile'" class="admin-card" style="animation: fadeIn 0.4s ease-out">
    <h2 class="admin-card-title">Edit Profile Information</h2>

    <form @submit.prevent="submitProfile">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input id="name" v-model="profileForm.name" type="text" required />
          <div v-if="profileForm.errors.name" class="error-message">
            {{ profileForm.errors.name }}
          </div>
        </div>

        <div class="form-group">
          <label for="title">Professional Title</label>
          <input id="title" v-model="profileForm.title" type="text" required />
          <div v-if="profileForm.errors.title" class="error-message">
            {{ profileForm.errors.title }}
          </div>
        </div>
      </div>

      <div class="form-group" style="margin-top: 16px">
        <label for="about">About / Biography</label>
        <textarea id="about" v-model="profileForm.about" style="min-height: 120px"></textarea>
        <div v-if="profileForm.errors.about" class="error-message">
          {{ profileForm.errors.about }}
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 16px">
        <div class="form-group">
          <label for="profileImage">Profile Image URL</label>
          <input
            id="profileImage"
            v-model="profileForm.profileImage"
            type="text"
            placeholder="https://unsplash.com/..."
          />
          <div v-if="profileForm.errors.profileImage" class="error-message">
            {{ profileForm.errors.profileImage }}
          </div>
        </div>

        <div class="form-group">
          <label for="resume">Resume PDF Link</label>
          <input
            id="resume"
            v-model="profileForm.resume"
            type="text"
            placeholder="https://example.com/cv.pdf"
          />
          <div v-if="profileForm.errors.resume" class="error-message">
            {{ profileForm.errors.resume }}
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 16px">
        <div class="form-group">
          <label for="email">Contact Email</label>
          <input id="email" v-model="profileForm.email" type="email" />
          <div v-if="profileForm.errors.email" class="error-message">
            {{ profileForm.errors.email }}
          </div>
        </div>

        <div class="form-group">
          <label for="location">Location</label>
          <input
            id="location"
            v-model="profileForm.location"
            type="text"
            placeholder="San Francisco, CA"
          />
          <div v-if="profileForm.errors.location" class="error-message">
            {{ profileForm.errors.location }}
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 16px">
        <div class="form-group">
          <label for="github">GitHub Profile URL</label>
          <input
            id="github"
            v-model="profileForm.github"
            type="text"
            placeholder="https://github.com/..."
          />
          <div v-if="profileForm.errors.github" class="error-message">
            {{ profileForm.errors.github }}
          </div>
        </div>

        <div class="form-group">
          <label for="linkedin">LinkedIn Profile URL</label>
          <input
            id="linkedin"
            v-model="profileForm.linkedin"
            type="text"
            placeholder="https://linkedin.com/in/..."
          />
          <div v-if="profileForm.errors.linkedin" class="error-message">
            {{ profileForm.errors.linkedin }}
          </div>
        </div>
      </div>

      <div style="margin-top: 32px; display: flex; justify-content: flex-end">
        <button type="submit" class="btn btn-primary" :disabled="profileForm.processing">
          {{ profileForm.processing ? 'Saving...' : '💾 Save Profile Details' }}
        </button>
      </div>
    </form>
  </div>

  <!-- PROJECTS TAB -->
  <div v-if="activeTab === 'projects'" class="admin-card" style="animation: fadeIn 0.4s ease-out">
    <div class="admin-card-title">
      <span>Manage Projects</span>
      <button
        v-if="!showProjectForm"
        class="btn btn-primary"
        style="padding: 8px 16px; font-size: 0.85rem"
        @click="openAddProject"
      >
        ➕ Add New Project
      </button>
    </div>

    <!-- Project Form Modal/Container -->
    <div
      v-if="showProjectForm"
      style="
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid var(--border-color);
        padding: 24px;
        border-radius: var(--radius-md);
        margin-bottom: 32px;
      "
    >
      <h3 style="margin-bottom: 20px; font-size: 1.2rem">
        {{ isProjectEditing ? '✏️ Edit Project' : '🚀 Add New Project' }}
      </h3>

      <form @submit.prevent="submitProject">
        <div class="form-group">
          <label for="p-title">Project Title</label>
          <input id="p-title" v-model="projectForm.title" type="text" required />
        </div>

        <div class="form-group" style="margin-top: 16px">
          <label for="p-desc">Description</label>
          <textarea id="p-desc" v-model="projectForm.description" required></textarea>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 16px">
          <div class="form-group">
            <label for="p-image">Screenshot Image URL</label>
            <input
              id="p-image"
              v-model="projectForm.image"
              type="text"
              placeholder="https://unsplash.com/..."
            />
          </div>

          <div class="form-group">
            <label for="p-tech">Technologies (Comma separated)</label>
            <input
              id="p-tech"
              v-model="projectForm.technologies"
              type="text"
              placeholder="Vue 3, TypeScript, AdonisJS"
              required
            />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 16px">
          <div class="form-group">
            <label for="p-git">GitHub URL</label>
            <input
              id="p-git"
              v-model="projectForm.githubUrl"
              type="text"
              placeholder="https://github.com/..."
            />
          </div>

          <div class="form-group">
            <label for="p-live">Live Demo URL</label>
            <input
              id="p-live"
              v-model="projectForm.liveUrl"
              type="text"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div style="margin-top: 24px; display: flex; gap: 12px; justify-content: flex-end">
          <button
            type="button"
            class="btn btn-secondary"
            style="padding: 8px 16px; font-size: 0.85rem"
            @click="showProjectForm = false"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            style="padding: 8px 16px; font-size: 0.85rem"
            :disabled="projectForm.processing"
          >
            {{ projectForm.processing ? 'Saving...' : 'Save Project' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Projects List -->
    <div v-if="projects.length > 0">
      <div v-for="project in projects" :key="project.id" class="admin-list-item">
        <div class="admin-list-info">
          <h4>{{ project.title }}</h4>
          <p>{{ project.technologies }}</p>
        </div>
        <div class="admin-list-actions">
          <button
            class="btn btn-secondary"
            style="padding: 6px 12px; font-size: 0.8rem"
            @click="openEditProject(project)"
          >
            ✏️ Edit
          </button>
          <button
            class="btn btn-danger"
            style="padding: 6px 12px; font-size: 0.8rem"
            @click="deleteProject(project.id)"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
    <div v-else style="text-align: center; padding: 40px; color: var(--text-muted)">
      No projects available. Click "Add New Project" to get started.
    </div>
  </div>

  <!-- SKILLS TAB -->
  <div v-if="activeTab === 'skills'" class="admin-card" style="animation: fadeIn 0.4s ease-out">
    <h2 class="admin-card-title">Manage Skills & Expertise</h2>

    <!-- Add Skill Form Inline -->
    <div
      style="
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid var(--border-color);
        padding: 20px;
        border-radius: var(--radius-md);
        margin-bottom: 32px;
      "
    >
      <h3 style="margin-bottom: 16px; font-size: 1.1rem">⚡ Add Skill Badge</h3>

      <form
        style="display: flex; gap: 16px; align-items: flex-end; flex-wrap: wrap"
        @submit.prevent="submitSkill"
      >
        <div class="form-group" style="flex: 2; min-width: 200px; margin-bottom: 0">
          <label for="sk-name">Skill Name</label>
          <input
            id="sk-name"
            v-model="skillForm.name"
            type="text"
            placeholder="e.g. Docker, GraphQL"
            required
          />
        </div>

        <div class="form-group" style="flex: 1; min-width: 150px; margin-bottom: 0">
          <label for="sk-cat">Category</label>
          <select id="sk-cat" v-model="skillForm.category">
            <option value="Languages">Languages</option>
            <option value="Frameworks">Frameworks</option>
            <option value="Tools">Tools</option>
            <option value="AI">AI</option>
          </select>
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          style="height: 46px; padding: 0 24px"
          :disabled="skillForm.processing"
        >
          {{ skillForm.processing ? 'Adding...' : 'Add Badge' }}
        </button>
      </form>
    </div>

    <!-- Skills List -->
    <div v-if="skills.length > 0">
      <div v-for="skill in skills" :key="skill.id" class="admin-list-item">
        <div class="admin-list-info" style="display: flex; align-items: center; gap: 16px">
          <span
            class="badge"
            style="border-color: var(--accent-purple); color: var(--text-primary)"
          >
            {{ skill.name }}
          </span>
          <span style="font-size: 0.85rem; color: var(--text-muted)">
            Category: {{ skill.category }}
          </span>
        </div>
        <div class="admin-list-actions">
          <button
            class="btn btn-danger"
            style="padding: 6px 12px; font-size: 0.8rem"
            @click="deleteSkill(skill.id)"
          >
            🗑️ Remove
          </button>
        </div>
      </div>
    </div>
    <div v-else style="text-align: center; padding: 40px; color: var(--text-muted)">
      No skills listed yet. Add some skills above.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { toast, Toaster } from 'vue-sonner'
import type { Data } from '@generated/data'
import { Link } from '@adonisjs/inertia/vue'

const page = usePage<Data.SharedProps>()

const menuOpen = ref(false)
const closeMenu = () => (menuOpen.value = false)

// `profile` is page data on the home route (for the footer links), not a shared prop.
const profile = computed<any>(() => (page.props as any).profile ?? null)

const sectionLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
]

watch(
  () => page.url,
  () => {
    toast.dismiss()
    closeMenu()
  }
)

watch(
  () => page.props.flash,
  (flashMessages: any) => {
    if (flashMessages?.error) {
      toast.error(flashMessages.error)
    }
    if (flashMessages?.success) {
      toast.success(flashMessages.success)
    }
  },
  { immediate: true }
)
</script>

<template>
  <header>
    <div>
      <Link route="home" class="brand" @click="closeMenu">
        <span class="gradient-text">GB.</span>
      </Link>

      <button
        class="nav-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? '✕' : '☰' }}
      </button>

      <nav :class="{ open: menuOpen }">
        <a v-for="link in sectionLinks" :key="link.href" :href="link.href" @click="closeMenu">{{
          link.label
        }}</a>
      </nav>
    </div>
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <div class="footer-inner">
      <p>
        &copy; {{ new Date().getFullYear() }} Ginabeth Daroy. Built with AdonisJS, Inertia &amp; Vue
        3.
      </p>
      <div class="footer-links">
        <a v-if="profile?.github" :href="profile.github" target="_blank" rel="noopener">GitHub</a>
        <a v-if="profile?.linkedin" :href="profile.linkedin" target="_blank" rel="noopener"
          >LinkedIn</a
        >
        <a href="/#top">Back to top</a>
      </div>
    </div>
  </footer>

  <Toaster position="bottom-right" theme="dark" rich-colors />
</template>

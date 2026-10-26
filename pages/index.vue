<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-[#030712] text-slate-100 pb-20">
    <!-- Navbar Dark -->
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-[#030712]/90 border-b border-blue-950/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-4">
        <!-- Logo Brand & Badge KraaDev -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div class="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:border-blue-400 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-lg font-black tracking-tight text-white">Mcpe<span class="text-blue-500">Leaks</span></span>
            <span class="text-[11px] font-medium text-blue-400/80 bg-blue-950/50 px-2 py-0.5 rounded border border-blue-800/40">
              by KraaDev
            </span>
          </div>
        </NuxtLink>

        <div class="flex items-center space-x-3">
          <div class="flex items-center space-x-2 text-[11px] font-medium text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 px-2.5 py-1 rounded-full">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Online</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      <!-- Hero (Hanya McpeLeaks & Search Bar) -->
      <section class="text-center max-w-2xl mx-auto mb-10">
        <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight mb-8">
          Mcpe<span class="text-blue-500">Leaks</span>
        </h1>

        <!-- Search Bar -->
        <div class="relative max-w-lg mx-auto">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Cari server atau keyword..." 
            class="w-full pl-11 pr-4 py-3 rounded-xl bg-[#090f21] border border-blue-950 focus:border-blue-500/50 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all shadow-inner"
          />
          <svg class="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </section>

      <!-- Category Filter -->
      <div class="flex items-center justify-center gap-2 mb-10">
        <button 
          v-for="cat in categories" 
          :key="cat"
          type="button"
          @click="selectedCategory = cat"
          class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
          :class="selectedCategory === cat 
            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
            : 'bg-[#090f21] text-slate-400 hover:text-slate-200 border border-blue-950/60'"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Leak Cards Grid -->
      <div v-if="filteredLeaks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="leak in filteredLeaks" 
          :key="leak.id"
          class="group relative bg-[#090f21] border border-blue-950/70 hover:border-blue-600/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/50 flex flex-col justify-between cursor-pointer"
          @click="goToDetail(leak.id)"
        >
          <div>
            <!-- Thumbnail Box -->
            <div class="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-[#030712] border border-blue-950/40 flex items-center justify-center">
              <img 
                :src="leak.thumbnail" 
                :alt="leak.title" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span class="absolute top-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white shadow">
                {{ leak.category }}
              </span>
            </div>

            <h2 class="text-base font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
              {{ leak.title }}
            </h2>
            <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
              {{ leak.shortDescription }}
            </p>
          </div>

          <!-- Bottom Action -->
          <div class="pt-4 border-t border-blue-950/60 flex items-center justify-between">
            <span class="text-[11px] text-blue-400 font-semibold group-hover:underline">
              Buka Detail &rarr;
            </span>

            <a 
              :href="leak.downloadUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              @click.stop
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-600/20 active:scale-95"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download</span>
            </a>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-16 bg-[#090f21] rounded-2xl border border-blue-950/50 max-w-md mx-auto">
        <p class="text-slate-400 text-sm">Tidak ada leak yang sesuai pencarian.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { leaksData } from '~/data/leaks'

const router = useRouter()
const searchQuery = ref('')
const selectedCategory = ref('Semua')
const categories = ['Semua', 'Server', 'Map', 'Add-on']

const goToDetail = (id) => {
  router.push(`/leak/${id}`)
}

const filteredLeaks = computed(() => {
  return leaksData.filter((leak) => {
    const q = searchQuery.value.toLowerCase().trim()
    const matchesSearch = 
      leak.title.toLowerCase().includes(q) ||
      leak.shortDescription.toLowerCase().includes(q)

    const matchesCategory = 
      selectedCategory.value === 'Semua' || leak.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})
</script>
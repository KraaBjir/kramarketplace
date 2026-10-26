<!-- pages/leak/[id].vue -->
<template>
  <div class="min-h-screen bg-[#060b17] text-slate-100 pb-24">
    <!-- Navbar Dark Minimalis -->
    <header class="bg-[#091024]/90 border-b border-blue-950/60 sticky top-0 z-50 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2">
          <span class="text-lg font-black tracking-tight text-white">Mcpe<span class="text-blue-500">Leaks</span></span>
          <span class="text-[11px] font-medium text-blue-400/80 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
            by KraaDev
          </span>
        </NuxtLink>

        <NuxtLink to="/" class="text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Beranda
        </NuxtLink>
      </div>
    </header>

    <main v-if="leak" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <!-- Breadcrumbs -->
      <nav class="flex items-center space-x-2 text-xs text-slate-400 mb-6">
        <NuxtLink to="/" class="hover:text-blue-400 transition-colors">Home</NuxtLink>
        <span>/</span>
        <NuxtLink to="/" class="hover:text-blue-400 transition-colors">Servers</NuxtLink>
        <span>/</span>
        <span class="text-slate-200 font-medium">{{ leak.title }}</span>
      </nav>

      <!-- SERVER HEADER BAR -->
      <div class="bg-[#0c152e] border border-blue-950/80 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <!-- Logo & Judul -->
          <div class="flex items-center gap-5">
            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#060b17] border border-blue-900/40 p-2 flex items-center justify-center shadow-lg overflow-hidden flex-shrink-0">
              <img 
                :src="leak.thumbnail" 
                :alt="leak.title" 
                class="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div>
              <h1 class="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1">
                {{ leak.title }}
              </h1>
              <p class="text-sm text-slate-400 font-medium">
                {{ leak.subtitle }}
              </p>
            </div>
          </div>

          <!-- Action Bar: Tombol Download & Share -->
          <div class="flex items-center gap-3">
            <a 
              :href="leak.downloadUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center px-7 py-2.5 rounded-xl text-base font-extrabold bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-lg shadow-green-600/20 hover:shadow-green-500/40 transition-all active:scale-95"
            >
              Download
            </a>

            <button 
              type="button"
              @click="copyShareLink"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-[#131f42] hover:bg-[#1a2b5c] text-slate-200 border border-blue-900/40 transition-all active:scale-95"
            >
              <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>{{ copied ? 'Tersalin!' : 'Share' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- TWO-COLUMN LAYOUT -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- KOLOM KIRI (ABOUT) -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-[#0c152e] border border-blue-950/80 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 class="text-xl font-bold text-white mb-3">
              About {{ leak.title }}
            </h2>
            <p class="text-slate-300 text-sm leading-relaxed mb-6">
              {{ leak.shortDescription }}
            </p>

            <!-- Tabel Informasi Metadata -->
            <div class="space-y-4 text-sm border-t border-blue-950/60 pt-6">
              <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 py-2">
                <span class="text-slate-400 font-medium">Edition</span>
                <span class="sm:col-span-3 text-slate-200">{{ leak.edition }}</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 py-2 items-center">
                <span class="text-slate-400 font-medium">Categories</span>
                <div class="sm:col-span-3 flex flex-wrap gap-2">
                  <span 
                    v-for="cat in leak.categories" 
                    :key="cat"
                    class="px-3 py-1 rounded-lg bg-[#060b17] border border-blue-900/50 text-blue-400 text-xs font-bold"
                  >
                    {{ cat }}
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 py-2">
                <span class="text-slate-400 font-medium">Owned by</span>
                <span class="sm:col-span-3 text-slate-200">{{ leak.ownedBy }}</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 py-2">
                <span class="text-slate-400 font-medium">Official site</span>
                <a 
                  :href="'https://' + leak.officialSite" 
                  target="_blank" 
                  rel="noopener"
                  class="sm:col-span-3 text-blue-400 hover:underline font-semibold"
                >
                  {{ leak.officialSite }}
                </a>
              </div>
            </div>
          </div>

          <!-- Detail Deskripsi & Mini-games -->
          <div class="bg-[#0c152e] border border-blue-950/80 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              Deskripsi & Fitur Server
            </h3>
            <p class="text-sm text-slate-300 leading-relaxed">
              {{ leak.overview }}
            </p>

            <div v-if="leak.guideList" class="bg-[#060b17] rounded-xl p-5 border border-blue-950">
              <h4 class="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">
                {{ leak.guideTitle }}
              </h4>
              <ul class="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li v-for="(step, idx) in leak.guideList" :key="idx" class="flex items-start gap-2">
                  <span class="text-blue-400 font-bold">[{{ idx + 1 }}/{{ leak.guideList.length }}]</span>
                  <span>{{ step }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- KOLOM KANAN (RELATED SERVERS) -->
        <div class="lg:col-span-1 space-y-4">
          <div class="bg-[#0c152e] border border-blue-950/80 rounded-2xl p-6 shadow-xl">
            <h3 class="text-base font-bold text-white mb-4">
              Related servers
            </h3>

            <div class="space-y-3">
              <NuxtLink 
                v-for="rel in relatedServers" 
                :key="rel.id"
                :to="`/leak/${rel.id}`"
                class="group flex items-center justify-between p-3 rounded-xl bg-[#060b17]/80 hover:bg-[#131f42] border border-blue-950/60 hover:border-blue-700/50 transition-all duration-200"
              >
                <!-- Logo + Info -->
                <div class="flex items-center gap-3">
                  <div class="w-11 h-11 rounded-lg bg-[#0c152e] p-0.5 border border-blue-900/40 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img :src="rel.thumbnail" :alt="rel.title" class="w-full h-full object-cover rounded" />
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                      {{ rel.title }}
                    </h4>
                    <p class="text-[11px] text-slate-400 line-clamp-1">
                      {{ rel.subtitle }}
                    </p>
                  </div>
                </div>

                <svg class="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- State jika ID tidak ditemukan -->
    <div v-else class="text-center py-24 text-slate-400">
      <p class="text-lg font-bold mb-2">Leak tidak ditemukan</p>
      <NuxtLink to="/" class="text-blue-400 text-sm hover:underline">Kembali ke Beranda</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { leaksData } from '~/data/leaks'

const route = useRoute()
const copied = ref(false)

const leak = computed(() => {
  return leaksData.find(item => item.id === route.params.id) || leaksData[0]
})

const relatedServers = computed(() => {
  return leaksData.filter(item => item.id !== leak.value?.id)
})

const copyShareLink = async () => {
  if (process.client) {
    try {
      await navigator.clipboard.writeText(window.location.href)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
<template>
  <div class="min-h-screen bg-[#060913] text-slate-100 font-sans pb-16 sm:pb-20 relative">
    
    <!-- Header Back -->
    <div class="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8">
      <NuxtLink to="/" class="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition mb-4 sm:mb-6">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        <span>Kembali ke Catalog</span>
      </NuxtLink>

      <div v-if="addon" class="bg-[#0f172a] border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl space-y-6">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
          
          <!-- Image Showcase -->
          <div class="lg:col-span-6">
            <div class="rounded-xl sm:rounded-2xl overflow-hidden border-2 border-blue-500/30 bg-slate-900 shadow-xl">
              <img :src="addon.image" :alt="addon.title" class="w-full h-auto object-cover max-h-80 sm:max-h-none" />
            </div>
          </div>

          <!-- Addon Details -->
          <div class="lg:col-span-6 space-y-3 sm:space-y-5">
            <div class="flex items-center space-x-2">
              <span class="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-blue-600/30 border border-blue-500/40 text-blue-300 text-[10px] sm:text-xs font-bold rounded-full uppercase">
                {{ addon.category }}
              </span>
              <span class="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-slate-800 text-slate-300 text-[10px] sm:text-xs font-semibold rounded-full">
                {{ addon.version || 'Bedrock Edition' }}
              </span>
            </div>

            <h1 class="text-2xl sm:text-4xl font-black text-white leading-tight">{{ addon.title }}</h1>
            
            <p class="text-xs sm:text-sm text-slate-400">
              Dibuat oleh <strong class="text-blue-400 font-semibold">{{ addon.creator }}</strong>
            </p>

            <div class="flex items-center space-x-4 text-xs sm:text-sm text-slate-300 py-2 border-y border-slate-800">
              <div class="flex items-center text-amber-400 font-bold space-x-1">
                <span>★ {{ addon.rating }}</span>
                <span class="text-slate-500 font-normal">({{ addon.reviewsCount }} ulasan)</span>
              </div>
            </div>

            <div class="space-y-1.5">
              <h3 class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Deskripsi Add-On</h3>
              <p class="text-slate-300 text-xs sm:text-base leading-relaxed">{{ addon.description }}</p>
            </div>

            <!-- Tags -->
            <div v-if="addon.tags" class="flex flex-wrap gap-1.5 pt-1">
              <span v-for="tag in addon.tags" :key="tag" class="px-2.5 py-0.5 bg-slate-800/80 text-slate-400 text-[10px] sm:text-xs rounded-md border border-slate-700/60">
                #{{ tag }}
              </span>
            </div>

            <!-- Download Button -->
            <div class="pt-3 sm:pt-4">
              <a 
                :href="addon.downloadLink" 
                target="_blank"
                class="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold rounded-xl flex items-center justify-center space-x-2 transition duration-300 shadow-xl shadow-blue-600/30 text-xs sm:text-base active:scale-95"
              >
                <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <span>Download</span>
              </a>
            </div>

          </div>

        </div>

      </div>

      <div v-else class="text-center py-20 text-slate-400 text-sm">
        Add-on tidak ditemukan.
      </div>
    </div>

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { addonsData } from '~/data/addons.js';

const route = useRoute();
const addon = addonsData.find(item => item.id === route.params.id);
</script>
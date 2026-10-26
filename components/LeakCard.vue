<template>
  <div class="group relative bg-[#0b1329]/80 backdrop-blur-md rounded-2xl border border-blue-500/20 hover:border-blue-500/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between overflow-hidden">
    <!-- Top Glow Effect on Hover -->
    <div class="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500 pointer-events-none"></div>

    <div>
      <!-- Thumbnail & Category Badge -->
      <div class="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-950">
        <img 
          :src="leak.thumbnail" 
          :alt="leak.title" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-transparent to-transparent opacity-80"></div>
        <span class="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-md bg-blue-600 text-white shadow-md">
          {{ leak.category }}
        </span>
        <span class="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-blue-200 border border-white/10">
          {{ leak.fileSize }}
        </span>
      </div>

      <!-- Title & Info -->
      <h3 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 mb-2">
        {{ leak.title }}
      </h3>
      <p class="text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">
        {{ leak.shortDescription }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5 mb-5">
        <span 
          v-for="tag in leak.tags" 
          :key="tag" 
          class="text-[11px] px-2 py-0.5 rounded-full bg-blue-950/60 text-blue-300 border border-blue-800/40"
        >
          #{{ tag }}
        </span>
      </div>
    </div>

    <!-- Actions Footer -->
    <div class="pt-4 border-t border-blue-900/40 flex items-center justify-between gap-3">
      <div class="text-xs text-slate-400">
        <span>Ver: <strong class="text-slate-200">{{ leak.version }}</strong></span>
      </div>
      
      <!-- Direct Download Button -->
      <a 
        :href="leak.downloadUrl" 
        target="_blank" 
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white shadow-md shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-300 active:scale-95"
      >
        <svg class="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>Download</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LeakItem } from '~/data/leaks'

defineProps<{
  leak: LeakItem
}>()
</script>
<template>
  <header class="sticky top-0 z-50 backdrop-blur-xl bg-[#060b17]/80 border-b border-blue-500/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <!-- Logo Brand -->
      <NuxtLink to="/" class="flex items-center space-x-3 group">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-105">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div>
          <span class="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
            Mcpe<span class="text-blue-400">Leaks</span>
          </span>
          <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            by KraaDev
          </span>
        </div>
      </NuxtLink>

      <!-- External Links / Quick Status -->
      <div class="flex items-center space-x-4">
        <div class="hidden sm:flex items-center space-x-2 text-xs font-medium text-blue-300 bg-blue-950/40 px-3 py-1.5 rounded-full border border-blue-800/40">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Online Archive</span>
        </div>
        <a 
          href="https://discord.com" 
          target="_blank" 
          rel="noopener"
          class="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 hover:border-blue-400 transition-all duration-200"
        >
          Join Discord
        </a>
      </div>
    </div>
  </header>
</template>
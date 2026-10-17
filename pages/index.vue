<template>
  <div class="min-h-screen bg-[#060913] text-slate-100 font-sans selection:bg-blue-500 selection:text-white pb-20 relative overflow-hidden">
    
    <!-- ANIMATED AMBIENT BACKGROUND GLOWS -->
    <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-72 sm:w-[32rem] h-72 sm:h-[32rem] bg-blue-600/20 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none animate-pulse-slow"></div>
    <div class="absolute top-1/3 -right-20 w-80 sm:w-[35rem] h-80 sm:h-[35rem] bg-cyan-500/15 rounded-full blur-[110px] sm:blur-[160px] pointer-events-none animate-glow-pulse"></div>

    <!-- Header / Navbar -->
    <header class="border-b border-slate-800/80 bg-[#0a0f1d]/90 backdrop-blur-xl sticky top-0 z-50 px-3 sm:px-6 lg:px-10 py-3 flex items-center justify-between shadow-2xl transition-all">
      <!-- Logo KraaDev -->
      <NuxtLink to="/" class="flex items-center space-x-2.5 group">
        <div class="relative">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
          <div class="relative w-8 h-8 sm:w-10 sm:h-10 bg-[#0d1527] border border-blue-500/40 rounded-lg sm:rounded-xl flex items-center justify-center font-black text-lg sm:text-xl text-white shadow-lg">
            K
          </div>
        </div>
        <div class="flex flex-col">
          <span class="text-lg sm:text-2xl font-black tracking-wider bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
            Kraa<span class="text-blue-500">Dev</span>
          </span>
          <span class="text-[9px] sm:text-[10px] text-blue-400/80 font-semibold tracking-widest uppercase -mt-1">Marketplace</span>
        </div>
      </NuxtLink>

      <!-- Search Bar Desktop & Mobile Integration -->
      <div class="relative flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-6 group">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Cari add-on..." 
          class="w-full bg-[#11192e] text-xs sm:text-sm text-slate-200 placeholder-slate-500 rounded-xl pl-9 pr-3 sm:px-11 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/80 border border-slate-700/60 transition-all duration-300"
        />
        <svg class="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-2.5 sm:top-3 text-slate-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>

      <!-- Right Action Badge -->
      <div class="hidden sm:flex items-center space-x-3">
        <span class="relative inline-flex overflow-hidden rounded-lg p-[1px]">
          <span class="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1d4ed8_0%,#38bdf8_50%,#1d4ed8_100%)]"></span>
          <span class="inline-flex items-center justify-center w-full px-3 py-1.5 text-xs font-semibold bg-[#0b1120] text-blue-300 rounded-lg backdrop-blur-3xl">
            100% Free
          </span>
        </span>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8">

      <!-- HERO BANNER SECTION (FEATURED ADD-ON) -->
      <section v-if="featuredAddon" class="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-700/60 bg-gradient-to-br from-[#0e1628] via-[#0b1222] to-[#070c18] p-4 sm:p-6 lg:p-10 mb-6 sm:mb-12 shadow-2xl shadow-blue-950/50 group">
        
        <!-- Shimmer Light Overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
          
          <!-- Banner Preview Image (Tampil di atas untuk layar HP) -->
          <div class="lg:col-span-5 order-1 lg:order-2 flex justify-center">
            <NuxtLink :to="`/addon/${featuredAddon.id}`" class="w-full relative group/img rounded-xl sm:rounded-2xl p-0.5 sm:p-1 bg-gradient-to-b from-blue-500/40 via-cyan-500/20 to-transparent shadow-xl cursor-pointer block">
              <div class="relative rounded-lg sm:rounded-xl overflow-hidden bg-slate-900 border border-slate-700 aspect-video sm:aspect-auto">
                <img 
                  :src="featuredAddon.image" 
                  :alt="featuredAddon.title"
                  class="w-full h-44 sm:h-64 lg:h-72 object-cover group-hover/img:scale-105 transition duration-500 ease-out"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <span class="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-slate-950/90 backdrop-blur border border-amber-500/40 text-amber-400 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg">
                  Bedrock Add-On
                </span>
              </div>
            </NuxtLink>
          </div>

          <!-- Banner Text Content -->
          <div class="lg:col-span-7 order-2 lg:order-1 space-y-3 sm:space-y-5">
            <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span class="px-2.5 py-0.5 sm:px-3.5 sm:py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider shadow-md shadow-blue-500/30">
                ★ Featured
              </span>
              <span v-if="featuredAddon.isTrending" class="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] sm:text-xs font-semibold rounded-full flex items-center space-x-1">
                <span>🔥 Populer</span>
              </span>
              <span class="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-slate-800/80 text-slate-300 text-[10px] sm:text-xs font-medium rounded-full border border-slate-700">
                {{ featuredAddon.version }}
              </span>
            </div>

            <!-- Title diklik langsung menuju detail -->
            <NuxtLink :to="`/addon/${featuredAddon.id}`" class="block group/title">
              <h1 class="text-xl sm:text-3xl lg:text-5xl font-black text-white tracking-tight leading-tight group-hover/title:text-cyan-300 transition duration-300">
                {{ featuredAddon.title }}
              </h1>
            </NuxtLink>

            <div class="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-300">
              <span class="flex items-center space-x-1">
                <span class="text-slate-400">By</span>
                <strong class="text-blue-400 font-semibold">{{ featuredAddon.creator }}</strong>
              </span>
              <span class="text-slate-600">•</span>
              <div class="flex items-center text-amber-400 font-bold space-x-1">
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                <span>{{ featuredAddon.rating }}</span>
                <span class="text-slate-400 font-normal">({{ featuredAddon.reviewsCount }})</span>
              </div>
            </div>

            <p class="text-slate-300 text-xs sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3">
              {{ featuredAddon.description }}
            </p>

            <!-- Action Button -->
            <div class="pt-1 sm:pt-3">
              <a 
                :href="featuredAddon.downloadLink" 
                target="_blank"
                class="w-full sm:w-auto text-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl flex items-center space-x-2 transition duration-300 shadow-lg shadow-blue-600/40 active:scale-95 text-xs sm:text-sm"
              >
                <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <span>Download</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      <!-- CATEGORY TABS FILTER -->
      <div class="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-3 sm:pb-4 scrollbar-none mb-4 sm:mb-8">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 border',
            selectedCategory === cat 
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 border-cyan-400 text-white shadow-md shadow-blue-600/40' 
              : 'bg-[#0f172a] border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <!-- MAIN CATALOG / ADDON GRID -->
      <section>
        <div class="flex items-center justify-between mb-4 sm:mb-6">
          <div class="flex items-center space-x-2 sm:space-x-3">
            <div class="w-2 h-5 sm:w-2.5 sm:h-7 bg-gradient-to-b from-blue-400 to-cyan-500 rounded-full"></div>
            <h2 class="text-lg sm:text-2xl font-black text-white tracking-wide">Katalog Add-On</h2>
          </div>
          <span class="text-[10px] sm:text-xs text-slate-400 font-medium">Total {{ filteredAddons.length }}</span>
        </div>

        <!-- Addon Grid Card Responsive (2 Kolom di Mobile, 4 Kolom di Desktop) -->
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          <div 
            v-for="item in filteredAddons" 
            :key="item.id"
            class="relative bg-[#0d1424] border border-slate-800 hover:border-blue-500/70 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between shadow-lg"
          >
            <!-- Area Card Diklik Langsung Ke Detail -->
            <NuxtLink :to="`/addon/${item.id}`" class="relative z-10 flex-1 flex flex-col justify-between cursor-pointer">
              <div>
                <!-- Image Preview Container -->
                <div class="relative aspect-video overflow-hidden bg-slate-900">
                  <img 
                    :src="item.image" 
                    :alt="item.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#0d1424] via-transparent to-transparent opacity-60"></div>
                  
                  <span class="absolute bottom-1.5 left-1.5 sm:bottom-2.5 sm:left-2.5 bg-slate-950/90 backdrop-blur text-[9px] sm:text-[11px] font-bold text-amber-400 px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded border border-amber-500/30">
                    {{ item.category }}
                  </span>
                </div>

                <!-- Card Details -->
                <div class="p-2.5 sm:p-4 space-y-1 sm:space-y-2">
                  <h3 class="font-bold text-white text-xs sm:text-base group-hover:text-cyan-300 transition duration-300 line-clamp-1">
                    {{ item.title }}
                  </h3>
                  <p class="text-[10px] sm:text-xs text-slate-400">
                    By <span class="text-slate-300 font-semibold">{{ item.creator }}</span>
                  </p>
                  <p class="hidden sm:block text-xs text-slate-400 line-clamp-2 leading-relaxed pt-1">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </NuxtLink>

            <!-- Card Footer -->
            <div class="relative z-20 p-2.5 sm:p-4 sm:pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto bg-slate-900/40">
              <div class="flex items-center text-[10px] sm:text-xs text-amber-400 font-bold space-x-1">
                <span>★ {{ item.rating }}</span>
                <span class="text-slate-500 font-normal hidden sm:inline">({{ item.reviewsCount }})</span>
              </div>

              <!-- Tombol Download Langsung -->
              <a 
                :href="item.downloadLink" 
                target="_blank"
                class="px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-[10px] sm:text-xs rounded-lg sm:rounded-xl transition shadow-md shadow-blue-600/30 active:scale-95 flex items-center space-x-1"
                title="Download Langsung"
              >
                <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <span>Download</span>
              </a>
            </div>

          </div>
        </div>

      </section>

      <!-- FEATURE HIGHLIGHTS FOOTER -->
      <section class="mt-12 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-10 border-t border-slate-800/80">
        <div class="bg-[#0b1120]/60 border border-slate-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl flex items-start space-x-3 sm:space-x-4">
          <div class="p-2.5 sm:p-3 bg-blue-600/20 text-blue-400 rounded-lg sm:rounded-xl border border-blue-500/30 text-sm sm:text-base">
            ⚡
          </div>
          <div>
            <h4 class="font-bold text-white text-sm sm:text-base">Akses Download Cepat</h4>
            <p class="text-[11px] sm:text-xs text-slate-400 mt-0.5">Langsung mengarah ke link download tanpa iklan berbelit.</p>
          </div>
        </div>

        <div class="bg-[#0b1120]/60 border border-slate-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl flex items-start space-x-3 sm:space-x-4">
          <div class="p-2.5 sm:p-3 bg-cyan-600/20 text-cyan-400 rounded-lg sm:rounded-xl border border-cyan-500/30 text-sm sm:text-base">
            🛡️
          </div>
          <div>
            <h4 class="font-bold text-white text-sm sm:text-base">100% Gratis</h4>
            <p class="text-[11px] sm:text-xs text-slate-400 mt-0.5">Semua add-on pilihan disajikan gratis untuk Anda.</p>
          </div>
        </div>

        <div class="bg-[#0b1120]/60 border border-slate-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl flex items-start space-x-3 sm:space-x-4">
          <div class="p-2.5 sm:p-3 bg-amber-600/20 text-amber-400 rounded-lg sm:rounded-xl border border-amber-500/30 text-sm sm:text-base">
            🎮
          </div>
          <div>
            <h4 class="font-bold text-white text-sm sm:text-base">Minecraft Bedrock</h4>
            <p class="text-[11px] sm:text-xs text-slate-400 mt-0.5">Diuji untuk Minecraft Bedrock/MCPE versi terbaru.</p>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { addonsData } from '~/data/addons.js';

const searchQuery = ref('');
const selectedCategory = ref('Semua');

const categories = ['Semua', 'Add-Ons', 'World', 'Texture Packs', 'Skin Packs', 'Mash-ups'];

const featuredAddon = computed(() => addonsData.find(item => item.isFeatured) || addonsData[0]);

const filteredAddons = computed(() => {
  return addonsData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          item.creator.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'Semua' || item.category === selectedCategory.value;
    
    return matchesSearch && matchesCategory;
  });
});
</script>
<template>
  <div class="min-h-screen bg-[#060913] text-slate-100 font-sans selection:bg-blue-500 selection:text-white pb-20 relative overflow-hidden">
    
    <!-- EFEK ANIMASI BACKGROUND GLOW -->
    <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-72 sm:w-[32rem] h-72 sm:h-[32rem] bg-blue-600/20 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none animate-pulse"></div>
    <div class="absolute top-1/3 -right-20 w-80 sm:w-[35rem] h-80 sm:h-[35rem] bg-cyan-500/15 rounded-full blur-[110px] sm:blur-[160px] pointer-events-none animate-pulse"></div>

    <!-- GERBANG LOGIN (Pengguna Wajib Login Sebelum Bisa Melihat Isi Web) -->
    <div v-if="!user" class="min-h-screen flex items-center justify-center px-4 relative z-50">
      <div class="max-w-md w-full bg-[#0f172a]/90 backdrop-blur-2xl border border-blue-500/30 rounded-3xl p-8 shadow-2xl shadow-blue-950/80 text-center space-y-6 transition-all duration-500">
        <div class="w-16 h-16 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center font-black text-3xl text-white shadow-lg shadow-blue-500/40 mx-auto animate-bounce">
          K
        </div>
        <div class="space-y-2">
          <h1 class="text-3xl font-black tracking-wider text-white">Kraa<span class="text-blue-500">Dev</span></h1>
          <p class="text-xs text-slate-400">Silakan login dengan akun Google kamu untuk mengakses marketplace add-on Minecraft gratis.</p>
        </div>

        <!-- Tombol Google Login -->
        <div class="pt-4 flex justify-center">
          <div id="google-login-gate-btn"></div>
        </div>
      </div>
    </div>

    <!-- TAMPILAN UTAMA MARKETPLACE (Tampil Setelah Pengguna Login) -->
    <div v-else class="transition-opacity duration-700">
      
      <!-- Header / Navbar -->
      <header class="border-b border-slate-800/80 bg-[#0a0f1d]/90 backdrop-blur-xl sticky top-0 z-50 px-3 sm:px-6 lg:px-10 py-3 flex items-center justify-between shadow-2xl">
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

        <!-- Search Bar -->
        <div class="relative flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-6 group">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Cari add-on..." 
            class="w-full bg-[#11192e] text-xs sm:text-sm text-slate-200 placeholder-slate-500 rounded-xl pl-9 pr-8 sm:px-11 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/80 border border-slate-700/60 transition-all duration-300"
          />
          <svg class="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-2.5 sm:top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>

        <!-- Profil Pengguna & Logout -->
        <div class="flex items-center space-x-3">
          <img :src="user.picture" :alt="user.name" class="w-8 h-8 rounded-full border border-blue-400 shadow-md" />
          <button @click="logout" class="text-xs text-red-400 hover:underline hidden sm:inline">Logout</button>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8">

        <!-- HERO BANNER -->
        <section v-if="featuredAddon && !isSearching" class="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-700/60 bg-gradient-to-br from-[#0e1628] via-[#0b1222] to-[#070c18] p-4 sm:p-6 lg:p-10 mb-6 sm:mb-12 shadow-2xl group transition-all duration-500">
          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
            
            <div class="lg:col-span-5 order-1 lg:order-2 flex justify-center">
              <NuxtLink :to="`/addon/${featuredAddon.id}`" class="w-full relative group/img rounded-xl sm:rounded-2xl p-0.5 bg-gradient-to-b from-blue-500/40 via-cyan-500/20 to-transparent shadow-xl block">
                <div class="relative rounded-lg sm:rounded-xl overflow-hidden bg-slate-900 border border-slate-700 aspect-video sm:aspect-auto">
                  <img 
                    :src="featuredAddon.image" 
                    :alt="featuredAddon.title"
                    class="w-full h-44 sm:h-64 lg:h-72 object-cover group-hover/img:scale-105 transition duration-500 ease-out"
                  />
                </div>
              </NuxtLink>
            </div>

            <div class="lg:col-span-7 order-2 lg:order-1 space-y-3 sm:space-y-5">
              <NuxtLink :to="`/addon/${featuredAddon.id}`" class="block group/title">
                <h1 class="text-xl sm:text-3xl lg:text-5xl font-black text-white tracking-tight leading-tight group-hover/title:text-cyan-300 transition duration-300">
                  {{ featuredAddon.title }}
                </h1>
              </NuxtLink>

              <p class="text-slate-300 text-xs sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3">
                {{ featuredAddon.description }}
              </p>

              <div class="pt-1 sm:pt-3">
                <a 
                  :href="featuredAddon.downloadLink" 
                  target="_blank"
                  class="w-full sm:w-auto text-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl flex items-center space-x-2 transition duration-300 shadow-lg shadow-blue-600/40 text-xs sm:text-sm"
                >
                  <span>Download</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        <!-- KATALOG ADD-ON GRID -->
        <section>
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            <div 
              v-for="item in filteredAddons" 
              :key="item.id"
              class="relative bg-[#0d1424] border border-slate-800 hover:border-blue-500/70 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between shadow-lg"
            >
              <NuxtLink :to="`/addon/${item.id}`" class="relative z-10 flex-1 flex flex-col justify-between cursor-pointer">
                <div>
                  <div class="relative aspect-video overflow-hidden bg-slate-900">
                    <img 
                      :src="item.image" 
                      :alt="item.title"
                      class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div class="p-2.5 sm:p-4 space-y-1 sm:space-y-2">
                    <h3 class="font-bold text-white text-xs sm:text-base group-hover:text-cyan-300 transition duration-300 line-clamp-1">
                      {{ item.title }}
                    </h3>
                    <p class="text-[10px] sm:text-xs text-slate-400">
                      By <span class="text-slate-300 font-semibold">{{ item.creator }}</span>
                    </p>
                  </div>
                </div>
              </NuxtLink>

              <div class="relative z-20 p-2.5 sm:p-4 sm:pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto bg-slate-900/40">
                <a 
                  :href="item.downloadLink" 
                  target="_blank"
                  class="w-full text-center py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-[10px] sm:text-xs rounded-lg transition"
                >
                  Download
                </a>
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { addonsData } from '~/data/addons.js';

const searchQuery = ref('');
const user = ref(null);

// GOOGLE CLIENT ID TERISI LANGSUNG
const GOOGLE_CLIENT_ID = "324096660255-rdo9ajg2fm1u05l9p3nj0sfdi8dgbh88.apps.googleusercontent.com";

const isSearching = computed(() => searchQuery.value.trim().length > 0);
const featuredAddon = computed(() => addonsData.find(item => item.isFeatured) || addonsData[0]);

const filteredAddons = computed(() => {
  return addonsData.filter(item => {
    return item.title.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

const decodeJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (e) {
    return null;
  }
};

const handleCredentialResponse = (response) => {
  const userData = decodeJwt(response.credential);
  if (userData) {
    user.value = {
      name: userData.name,
      email: userData.email,
      picture: userData.picture
    };
    if (process.client) {
      localStorage.setItem('kraadev_user', JSON.stringify(user.value));
    }
  }
};

const initGoogleLoginGate = () => {
  if (typeof window !== 'undefined' && window.google) {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    });

    nextTick(() => {
      const btnEl = document.getElementById('google-login-gate-btn');
      if (btnEl) {
        window.google.accounts.id.renderButton(btnEl, {
          theme: 'filled_blue',
          size: 'large',
          text: 'continue_with'
        });
      }
    });
  }
};

const logout = () => {
  user.value = null;
  if (process.client) {
    localStorage.removeItem('kraadev_user');
  }
  nextTick(() => {
    initGoogleLoginGate();
  });
};

onMounted(() => {
  if (process.client) {
    const savedUser = localStorage.getItem('kraadev_user');
    if (savedUser) {
      user.value = JSON.parse(savedUser);
    }
  }

  if (process.client && !window.google) {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (!user.value) initGoogleLoginGate();
    };
    document.head.appendChild(script);
  } else if (!user.value) {
    initGoogleLoginGate();
  }
});
</script>
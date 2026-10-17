<template>
  <div class="min-h-screen bg-[#060913] text-slate-100 font-sans selection:bg-blue-500 selection:text-white pb-20 relative overflow-hidden">
    
    <!-- BACKGROUND GLOW ANIMATIONS -->
    <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-72 sm:w-[32rem] h-72 sm:h-[32rem] bg-blue-600/20 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none animate-pulse"></div>
    <div class="absolute top-1/3 -right-20 w-80 sm:w-[35rem] h-80 sm:h-[35rem] bg-cyan-500/15 rounded-full blur-[110px] sm:blur-[160px] pointer-events-none animate-pulse"></div>

    <!-- GERBANG LOGIN -->
    <div v-if="!user" class="min-h-screen flex items-center justify-center px-4 relative z-50">
      <div class="max-w-md w-full bg-[#0f172a]/90 backdrop-blur-2xl border border-blue-500/30 rounded-3xl p-8 shadow-2xl shadow-blue-950/80 text-center space-y-6 transition-all duration-500">
        <div class="w-16 h-16 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center font-black text-3xl text-white shadow-lg shadow-blue-500/40 mx-auto animate-bounce">
          K
        </div>
        <div class="space-y-2">
          <h1 class="text-3xl font-black tracking-wider text-white">Kraa<span class="text-blue-500">Dev</span></h1>
          <p class="text-xs text-slate-400">Silakan login dengan akun Google kamu untuk mengakses marketplace add-on Minecraft gratis.</p>
        </div>

        <div class="pt-4 flex justify-center">
          <div id="google-login-gate-btn"></div>
        </div>
      </div>
    </div>

    <!-- TAMPILAN UTAMA MARKETPLACE -->
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
          <svg class="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-2.5 sm:top-3 text-slate-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-2.5 top-2.5 sm:top-3 text-slate-400 hover:text-white transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Profil & Ganti Akun -->
        <div class="flex items-center space-x-3">
          <button @click="showEditModal = true" class="flex items-center space-x-2 bg-[#0d1527] hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl transition shadow-md">
            <img :src="user.picture" :alt="user.name" class="w-7 h-7 rounded-full border border-blue-400 object-cover" />
            <span class="text-xs text-slate-200 font-semibold hidden sm:inline">{{ user.name }}</span>
          </button>
          
          <button @click="switchAccount" title="Ganti Akun Google" class="p-2 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded-xl transition border border-slate-700 text-xs flex items-center space-x-1 shadow">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
            <span class="hidden sm:inline">Ganti Akun</span>
          </button>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8">

        <!-- HERO BANNER KUSTOM -->
        <section v-if="featuredAddon && !isSearching" class="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-700/60 bg-gradient-to-br from-[#0e1628] via-[#0b1222] to-[#070c18] p-4 sm:p-6 lg:p-10 mb-6 sm:mb-12 shadow-2xl shadow-blue-950/50 group">
          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
            
            <div class="lg:col-span-5 order-1 lg:order-2 flex justify-center">
              <NuxtLink :to="`/addon/${featuredAddon.id}`" class="w-full relative group/img rounded-xl sm:rounded-2xl p-0.5 bg-gradient-to-b from-blue-500/40 via-cyan-500/20 to-transparent shadow-xl block">
                <div class="relative rounded-lg sm:rounded-xl overflow-hidden bg-slate-900 border border-slate-700 aspect-video sm:aspect-auto">
                  <img 
                    :src="featuredAddon.image" 
                    :alt="featuredAddon.title"
                    class="w-full h-44 sm:h-64 lg:h-72 object-cover group-hover/img:scale-105 transition duration-500 ease-out"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <span class="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-slate-950/90 backdrop-blur border border-cyan-500/40 text-cyan-400 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg">
                    Bedrock Add-On
                  </span>
                </div>
              </NuxtLink>
            </div>

            <div class="lg:col-span-7 order-2 lg:order-1 space-y-3 sm:space-y-5">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider shadow-md shadow-blue-500/30">
                  ★ Featured
                </span>
                <span class="px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] sm:text-xs font-semibold rounded-full flex items-center space-x-1">
                  <span>🔥 Populer</span>
                </span>
              </div>

              <NuxtLink :to="`/addon/${featuredAddon.id}`" class="block group/title">
                <h1 class="text-xl sm:text-3xl lg:text-5xl font-black text-white tracking-tight leading-tight group-hover/title:text-cyan-300 transition duration-300">
                  {{ featuredAddon.title }}
                </h1>
              </NuxtLink>

              <div class="flex items-center space-x-3 text-xs sm:text-sm text-slate-300">
                <span>By <strong class="text-blue-400 font-semibold">{{ featuredAddon.creator }}</strong></span>
                <span class="text-slate-600">•</span>
                
                <!-- TOMBOL LIKE REAL-TIME FEATURED -->
                <button 
                  @click="toggleLike(featuredAddon.id)" 
                  class="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold transition border"
                  :class="isLiked(featuredAddon.id) ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-rose-400'"
                >
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  <span>{{ getLikesCount(featuredAddon.id) }} Like</span>
                </button>
              </div>

              <p class="text-slate-300 text-xs sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3">
                {{ featuredAddon.description }}
              </p>

              <div class="pt-1 sm:pt-3">
                <a 
                  :href="featuredAddon.downloadLink" 
                  target="_blank"
                  @click="handleDownload(featuredAddon.id)"
                  class="w-full sm:w-auto text-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl flex items-center space-x-2 transition duration-300 shadow-lg shadow-blue-600/40 text-xs sm:text-sm active:scale-95"
                >
                  <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  <span>Download</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        <!-- KATEGORI TABS FILTER -->
        <div v-if="!isSearching" class="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-3 sm:pb-4 scrollbar-none mb-4 sm:mb-8">
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

        <!-- SEARCH RESULT HEADER -->
        <div v-if="isSearching" class="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
          <div>
            <h2 class="text-lg sm:text-xl font-bold text-white">
              Hasil Pencarian: <span class="text-blue-400">"{{ searchQuery }}"</span>
            </h2>
            <p class="text-xs text-slate-400 mt-1">Ditemukan {{ filteredAddons.length }} add-on</p>
          </div>
          <button @click="searchQuery = ''" class="text-xs font-semibold px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition border border-slate-700">
            Tampilkan Semua
          </button>
        </div>

        <!-- KATALOG ADD-ON GRID -->
        <section>
          <div v-if="!isSearching" class="flex items-center justify-between mb-4 sm:mb-6">
            <div class="flex items-center space-x-2 sm:space-x-3">
              <div class="w-2 h-5 sm:w-2.5 sm:h-7 bg-gradient-to-b from-blue-400 to-cyan-500 rounded-full"></div>
              <h2 class="text-lg sm:text-2xl font-black text-white tracking-wide">Katalog Add-On</h2>
            </div>
            <span class="text-[10px] sm:text-xs text-slate-400 font-medium">Total {{ filteredAddons.length }}</span>
          </div>

          <div v-if="filteredAddons.length > 0" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
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
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0d1424] via-transparent to-transparent opacity-60"></div>
                    <span class="absolute bottom-1.5 left-1.5 sm:bottom-2.5 sm:left-2.5 bg-slate-950/90 backdrop-blur text-[9px] sm:text-[11px] font-bold text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/30">
                      {{ item.category }}
                    </span>
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
                <!-- TOMBOL LIKE REAL-TIME KATALOG -->
                <button 
                  @click.stop="toggleLike(item.id)" 
                  class="flex items-center space-x-1 text-[11px] font-bold transition px-2 py-1 rounded-lg border"
                  :class="isLiked(item.id) ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' : 'bg-slate-800 border-slate-700/60 text-slate-400 hover:text-rose-400'"
                >
                  <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  <span>{{ getLikesCount(item.id) }}</span>
                </button>

                <a 
                  :href="item.downloadLink" 
                  target="_blank"
                  @click="handleDownload(item.id)"
                  class="px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-[10px] sm:text-xs rounded-lg sm:rounded-xl transition shadow-md shadow-blue-600/30 flex items-center space-x-1 active:scale-95"
                >
                  <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  <span>Download</span>
                </a>
              </div>

            </div>
          </div>

          <div v-else class="text-center py-16 bg-[#0d1424]/60 rounded-2xl border border-slate-800 my-4">
            <p class="text-slate-300 text-sm font-semibold">Tidak ada add-on yang cocok dengan kata kunci "{{ searchQuery }}"</p>
            <button @click="searchQuery = ''" class="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition">
              Lihat Semua Add-On
            </button>
          </div>
        </section>

      </main>

      <!-- MODAL EDIT PROFIL -->
      <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div class="bg-[#0f172a] border border-slate-700 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl relative">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 class="text-lg font-bold text-white">Edit Profil Saya</h3>
            <button @click="showEditModal = false" class="text-slate-400 hover:text-white">✕</button>
          </div>

          <div class="space-y-4">
            <div class="flex flex-col items-center space-y-3">
              <img :src="editPhoto || user.picture" class="w-20 h-20 rounded-full border-2 border-blue-500 object-cover shadow-lg" />
              <label class="cursor-pointer text-xs bg-blue-600/30 border border-blue-500 text-blue-300 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-xl transition">
                Ganti Foto Profil
                <input type="file" accept="image/*" class="hidden" @change="onPhotoSelected" />
              </label>
            </div>

            <div>
              <label class="text-xs text-slate-400 font-semibold block mb-1">Nama Tampilan</label>
              <input 
                v-model="editName" 
                type="text" 
                class="w-full bg-[#060913] text-sm text-slate-200 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-3 border-t border-slate-800">
            <button @click="showEditModal = false" class="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold">Batal</button>
            <button @click="saveProfile" class="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition">Simpan Perubahan</button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { createClient } from '@supabase/supabase-js';
import { addonsData } from '~/data/addons.js';

const searchQuery = ref('');
const selectedCategory = ref('Semua');
const user = ref(null);
const showEditModal = ref(false);
const editName = ref('');
const editPhoto = ref('');
const likesData = ref([]);

const categories = ['Semua', 'Add-Ons', 'World', 'Texture Packs', 'Skin Packs', 'Mash-ups'];

const GOOGLE_CLIENT_ID = "324096660255-rdo9ajg2fm1u05l9p3nj0sfdi8dgbh88.apps.googleusercontent.com";
const SUPABASE_URL = "https://lulqcbwyuhrwonnkxhzp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1bHFjYnd5dWhyd29ubmt4aHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxOTA1ODcsImV4cCI6MjA3NTc2NjU4N30.FjkYF7uqaEyQxwwIWPw6Sjw-mSxOd6vX9SoGjlSa2_I";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const isSearching = computed(() => searchQuery.value.trim().length > 0);
const featuredAddon = computed(() => addonsData.find(item => item.isFeatured) || addonsData[0]);

const filteredAddons = computed(() => {
  return addonsData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          item.creator.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'Semua' || item.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

const loadAllLikes = async () => {
  const { data } = await supabase.from('addon_likes').select('*');
  if (data) {
    likesData.value = data;
  }
};

const getLikesCount = (addonId) => {
  return likesData.value.filter(l => l.addon_id === addonId).length;
};

const isLiked = (addonId) => {
  if (!user.value) return false;
  return likesData.value.some(l => l.addon_id === addonId && l.user_email === user.value.email);
};

const toggleLike = async (addonId) => {
  if (!user.value) return;

  if (isLiked(addonId)) {
    await supabase
      .from('addon_likes')
      .delete()
      .eq('addon_id', addonId)
      .eq('user_email', user.value.email);
  } else {
    await supabase.from('addon_likes').insert([
      { addon_id: addonId, user_email: user.value.email }
    ]);
  }
  await loadAllLikes();
};

const decodeJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (e) {
    return null;
  }
};

const syncUserToSupabase = async (userData) => {
  const { data } = await supabase.from('users').select('*').eq('email', userData.email).single();
  if (data) {
    user.value = {
      name: data.name,
      email: data.email,
      picture: data.picture
    };
  } else {
    await supabase.from('users').insert([{
      email: userData.email,
      name: userData.name,
      picture: userData.picture
    }]);
    user.value = userData;
  }
  editName.value = user.value.name;
  editPhoto.value = user.value.picture;
  if (process.client) {
    localStorage.setItem('kraadev_user', JSON.stringify(user.value));
  }
};

const handleCredentialResponse = async (response) => {
  const userData = decodeJwt(response.credential);
  if (userData) {
    await syncUserToSupabase({
      name: userData.name,
      email: userData.email,
      picture: userData.picture
    });
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

const switchAccount = () => {
  if (typeof window !== 'undefined' && window.google) {
    window.google.accounts.id.disableAutoSelect();
  }
  user.value = null;
  if (process.client) {
    localStorage.removeItem('kraadev_user');
  }
  nextTick(() => {
    initGoogleLoginGate();
  });
};

const onPhotoSelected = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    editPhoto.value = event.target.result;
  };
  reader.readAsDataURL(file);
};

const saveProfile = async () => {
  if (!user.value) return;
  const updatedUser = {
    ...user.value,
    name: editName.value.trim(),
    picture: editPhoto.value
  };

  await supabase.from('users').upsert({
    email: updatedUser.email,
    name: updatedUser.name,
    picture: updatedUser.picture,
    updated_at: new Date().toISOString()
  });

  user.value = updatedUser;
  if (process.client) {
    localStorage.setItem('kraadev_user', JSON.stringify(updatedUser));
  }
  showEditModal.value = false;
};

const handleDownload = async (addonId) => {
  if (!user.value) return;
  await supabase.from('addon_downloads').insert([
    { addon_id: addonId, user_email: user.value.email }
  ]);
};

onMounted(() => {
  if (process.client) {
    const savedUser = localStorage.getItem('kraadev_user');
    if (savedUser) {
      user.value = JSON.parse(savedUser);
      editName.value = user.value.name;
      editPhoto.value = user.value.picture;
    }
  }

  loadAllLikes();

  // Real-time listener Supabase untuk Like
  supabase
    .channel('public:addon_likes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'addon_likes' }, () => {
      loadAllLikes();
    })
    .subscribe();

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
<template>
  <div class="min-h-screen bg-[#060913] text-slate-100 font-sans pb-20 relative">
    
    <!-- Header Back -->
    <div class="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8">
      <NuxtLink to="/" class="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition mb-4 sm:mb-6">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        <span>Kembali ke Catalog</span>
      </NuxtLink>

      <div v-if="addon" class="space-y-8">
        
        <!-- CARD DETAIL ADDON -->
        <div class="bg-[#0f172a] border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl">
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

        <!-- SECTION KOMENTAR ONLINE (REALTIME) -->
        <div class="bg-[#0f172a] border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl space-y-6">
          <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 class="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
              <span>💬 Komentar Komunitas</span>
              <span class="text-xs text-blue-400 font-normal">({{ comments.length }})</span>
            </h2>

            <!-- User Info / Logout Button -->
            <div v-if="user" class="flex items-center space-x-3">
              <img :src="user.picture" :alt="user.name" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-blue-400" />
              <span class="text-xs text-slate-200 font-semibold hidden sm:inline">{{ user.name }}</span>
              <button @click="logout" class="text-xs text-red-400 hover:underline">Logout</button>
            </div>
          </div>

          <!-- FORM INPUT KOMENTAR -->
          <div>
            <!-- Jika Pengguna Sudah Login -->
            <div v-if="user" class="space-y-3">
              <div class="flex items-center space-x-3">
                <img :src="user.picture" :alt="user.name" class="w-8 h-8 rounded-full border border-blue-400" />
                <span class="text-xs sm:text-sm font-semibold text-slate-200">Komentar sebagai <span class="text-blue-400">{{ user.name }}</span></span>
              </div>
              <textarea 
                v-model="newComment"
                rows="3"
                placeholder="Tulis pendapat atau pertanyaan kamu mengenai add-on ini..."
                class="w-full bg-[#060913] text-xs sm:text-sm text-slate-200 placeholder-slate-500 rounded-xl p-3 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <div class="flex justify-end">
                <button 
                  @click="addComment" 
                  :disabled="!newComment.trim() || isSubmitting"
                  class="px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md"
                >
                  {{ isSubmitting ? 'Mengirim...' : 'Kirim Komentar' }}
                </button>
              </div>
            </div>

            <!-- Jika Pengguna Belum Login -->
            <div v-else class="bg-[#060913] border border-blue-900/40 rounded-xl p-6 text-center space-y-4">
              <p class="text-xs sm:text-sm text-slate-300">
                Kamu harus login dengan Google terlebih dahulu untuk bisa berkomentar.
              </p>
              
              <div class="flex justify-center">
                <div id="google-login-btn"></div>
              </div>
            </div>
          </div>

          <!-- DAFTAR KOMENTAR DATABASE ONLINE -->
          <div class="space-y-4 pt-2">
            <div 
              v-for="(item, index) in comments" 
              :key="item.id || index"
              class="bg-[#060913]/70 border border-slate-800/80 rounded-xl p-3.5 sm:p-4 space-y-2"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2.5">
                  <img :src="item.user_photo" :alt="item.user_name" class="w-7 h-7 rounded-full border border-slate-700" />
                  <div>
                    <h4 class="text-xs sm:text-sm font-bold text-slate-200">{{ item.user_name }}</h4>
                    <span class="text-[10px] text-slate-500">{{ formatDate(item.created_at) }}</span>
                  </div>
                </div>
              </div>
              <p class="text-xs sm:text-sm text-slate-300 pl-9 leading-relaxed">{{ item.text }}</p>
            </div>

            <div v-if="comments.length === 0" class="text-center py-6 text-slate-500 text-xs">
              Belum ada komentar online. Jadilah yang pertama berkomentar!
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
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { createClient } from '@supabase/supabase-js';
import { addonsData } from '~/data/addons.js';

const route = useRoute();
const addon = addonsData.find(item => item.id === route.params.id);

const user = ref(null);
const newComment = ref('');
const comments = ref([]);
const isSubmitting = ref(false);

const GOOGLE_CLIENT_ID = "324096660255-rdo9ajg2fm1u05l9p3nj0sfdi8dgbh88.apps.googleusercontent.com";

// KONFIGURASI SUPABASE (Ganti dengan URL & Anon Key dari Supabase Anda)
const SUPABASE_URL = "https://lulqcbwyuhrwonnkxhzp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1bHFjYnd5dWhyd29ubmt4aHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxOTA1ODcsImV4cCI6MjA3NTc2NjU4N30.FjkYF7uqaEyQxwwIWPw6Sjw-mSxOd6vX9SoGjlSa2_I";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Decode JWT Token dari Google
const decodeJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

// Handle Callback Google Login
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

// Inisialisasi Google SDK
const initGoogleLogin = () => {
  if (typeof window !== 'undefined' && window.google) {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    });

    nextTick(() => {
      const btnEl = document.getElementById('google-login-btn');
      if (btnEl) {
        window.google.accounts.id.renderButton(btnEl, {
          theme: 'outline',
          size: 'large',
          text: 'signin_with'
        });
      }
    });
  }
};

// Ambil data komentar dari Supabase Online Database
const loadComments = async () => {
  if (!addon) return;
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('addon_id', addon.id)
    .order('created_at', { ascending: false });

  if (!error && data) {
    comments.value = data;
  }
};

// Kirim Komentar Baru ke Database
const addComment = async () => {
  if (!newComment.value.trim() || !user.value || !addon || isSubmitting.value) return;

  isSubmitting.value = true;

  const { error } = await supabase
    .from('comments')
    .insert([
      {
        addon_id: addon.id,
        user_name: user.value.name,
        user_photo: user.value.picture,
        text: newComment.value.trim()
      }
    ]);

  if (!error) {
    newComment.value = '';
    await loadComments(); // Reload komentar terbaru
  }

  isSubmitting.value = false;
};

// Format Tanggal
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Logout User
const logout = () => {
  user.value = null;
  if (process.client) {
    localStorage.removeItem('kraadev_user');
  }
  nextTick(() => {
    initGoogleLogin();
  });
};

onMounted(() => {
  if (process.client) {
    const savedUser = localStorage.getItem('kraadev_user');
    if (savedUser) {
      user.value = JSON.parse(savedUser);
    }
  }

  loadComments();

  // Load Google SDK
  if (process.client && !window.google) {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (!user.value) initGoogleLogin();
    };
    document.head.appendChild(script);
  } else if (!user.value) {
    initGoogleLogin();
  }
});
</script>
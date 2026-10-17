<template>
  <div class="min-h-screen bg-[#060913] text-slate-100 font-sans pb-20 relative">
    
    <!-- Tombol Kembali -->
    <div class="max-w-5xl mx-auto px-4 pt-8">
      <NuxtLink to="/" class="inline-flex items-center space-x-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition mb-6">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        <span>Kembali ke Marketplace</span>
      </NuxtLink>

      <div v-if="addon" class="space-y-10">
        
        <!-- CARD DETAIL ADDON -->
        <div class="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 lg:p-10 shadow-2xl">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div class="lg:col-span-6">
              <div class="rounded-2xl overflow-hidden border-2 border-blue-500/30 bg-slate-900 shadow-xl">
                <img :src="addon.image" :alt="addon.title" class="w-full h-auto object-cover" />
              </div>
            </div>

            <div class="lg:col-span-6 space-y-4">
              <h1 class="text-3xl font-black text-white">{{ addon.title }}</h1>
              <p class="text-xs text-slate-400">Dibuat oleh <strong class="text-blue-400">{{ addon.creator }}</strong></p>
              <p class="text-slate-300 text-sm leading-relaxed">{{ addon.description }}</p>

              <div class="pt-4">
                <a 
                  :href="addon.downloadLink" 
                  target="_blank"
                  class="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold rounded-xl flex items-center justify-center space-x-2 transition shadow-xl hover:scale-[1.01] active:scale-95"
                >
                  <span>Download Add-On</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        <!-- SECTION KOMENTAR ANIMASI KEREN -->
        <div class="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-6">
          <h2 class="text-xl font-bold text-white flex items-center space-x-2">
            <span>💬 Komentar Komunitas</span>
            <span class="text-xs text-blue-400">({{ comments.length }})</span>
          </h2>

          <!-- Form Input Komentar -->
          <div class="space-y-3 bg-[#060913] p-4 rounded-2xl border border-slate-800 focus-within:border-blue-500/80 transition duration-300">
            <textarea 
              v-model="newComment"
              rows="3"
              placeholder="Tulis pendapat atau tanggapan kamu mengenai add-on ini..."
              class="w-full bg-transparent text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
            ></textarea>
            <div class="flex justify-end">
              <button 
                @click="addComment" 
                :disabled="!newComment.trim() || isSubmitting"
                class="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 disabled:opacity-40 text-white font-bold text-xs rounded-xl transition shadow-lg"
              >
                {{ isSubmitting ? 'Mengirim...' : 'Kirim Komentar' }}
              </button>
            </div>
          </div>

          <!-- Daftar Komentar Beranimasi -->
          <div class="space-y-4">
            <transition-group name="list" tag="div" class="space-y-4">
              <div 
                v-for="item in comments" 
                :key="item.id"
                class="bg-[#060913]/80 border border-slate-800 rounded-2xl p-4 space-y-2 hover:border-blue-500/40 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div class="flex items-center space-x-3">
                  <img :src="item.user_photo" :alt="item.user_name" class="w-8 h-8 rounded-full border border-blue-400" />
                  <div>
                    <h4 class="text-sm font-bold text-slate-200">{{ item.user_name }}</h4>
                    <span class="text-[10px] text-slate-500">{{ formatDate(item.created_at) }}</span>
                  </div>
                </div>
                <p class="text-sm text-slate-300 pl-11 leading-relaxed">{{ item.text }}</p>
              </div>
            </transition-group>

            <div v-if="comments.length === 0" class="text-center py-6 text-slate-500 text-xs">
              Belum ada komentar. Jadilah yang pertama berkomentar!
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { createClient } from '@supabase/supabase-js';
import { addonsData } from '~/data/addons.js';

const route = useRoute();
const addon = addonsData.find(item => item.id === route.params.id);

const user = ref(null);
const newComment = ref('');
const comments = ref([]);
const isSubmitting = ref(false);

// SUPABASE URL & KEY TERISI LANGSUNG
const SUPABASE_URL = "https://lulqcbwyuhrwonnkxhzp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1bHFjYnd5dWhyd29ubmt4aHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxOTA1ODcsImV4cCI6MjA3NTc2NjU4N30.FjkYF7uqaEyQxwwIWPw6Sjw-mSxOd6vX9SoGjlSa2_I";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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
    await loadComments();
  }

  isSubmitting.value = false;
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
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
});
</script>

<style scoped>
/* CSS Animasi Transisi Masuk & Keluar Komentar */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
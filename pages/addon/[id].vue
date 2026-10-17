<template>
  <div class="min-h-screen bg-[#060913] text-slate-100 font-sans pb-20 relative">
    
    <!-- Navigation Back -->
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
              
              <!-- JUMLAH AKUN YANG SUDAH DOWNLOAD -->
              <div class="inline-flex items-center space-x-2 bg-blue-950/60 border border-blue-500/30 px-3 py-1.5 rounded-xl text-xs text-blue-300">
                <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <span><strong>{{ downloadCount }}</strong> Akun telah mendownload</span>
              </div>

              <p class="text-slate-300 text-sm leading-relaxed">{{ addon.description }}</p>

              <div class="pt-4">
                <a 
                  :href="addon.downloadLink" 
                  target="_blank"
                  @click="trackDownload"
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

          <!-- Form Input Komentar Baru -->
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
                class="bg-[#060913]/80 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-blue-500/40 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div class="flex items-center justify-between">
                  <!-- Profil Pengguna Komentar -->
                  <button @click="viewUserProfile(getCommentUser(item).name, getCommentUser(item).picture)" class="flex items-center space-x-3 text-left hover:opacity-80 transition">
                    <img :src="getCommentUser(item).picture" :alt="getCommentUser(item).name" class="w-8 h-8 rounded-full border border-blue-400 object-cover" />
                    <div>
                      <h4 class="text-sm font-bold text-slate-200">{{ getCommentUser(item).name }}</h4>
                      <span class="text-[10px] text-slate-500">{{ formatDate(item.created_at) }}</span>
                    </div>
                  </button>

                  <!-- Tombol Edit & Hapus (Hanya muncul jika komentar milik pengguna yang sedang login) -->
                  <div v-if="isMyComment(item)" class="flex items-center space-x-2">
                    <button @click="startEditComment(item)" class="text-xs text-blue-400 hover:text-blue-300 transition">
                      Edit
                    </button>
                    <span class="text-slate-600">•</span>
                    <button @click="deleteComment(item.id)" class="text-xs text-red-400 hover:text-red-300 transition">
                      Hapus
                    </button>
                  </div>
                </div>

                <!-- Tampilan Mode Edit Komentar -->
                <div v-if="editingCommentId === item.id" class="space-y-2 pt-1 pl-11">
                  <textarea 
                    v-model="editingText" 
                    rows="2"
                    class="w-full bg-[#0d1424] text-sm text-slate-200 border border-blue-500 rounded-xl p-2.5 focus:outline-none"
                  ></textarea>
                  <div class="flex justify-end space-x-2">
                    <button @click="editingCommentId = null" class="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-lg">Batal</button>
                    <button @click="saveEditComment(item.id)" class="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg">Simpan</button>
                  </div>
                </div>

                <!-- Tampilan Teks Komentar Biasa -->
                <p v-else class="text-sm text-slate-300 pl-11 leading-relaxed">{{ item.text }}</p>
              </div>
            </transition-group>

            <div v-if="comments.length === 0" class="text-center py-6 text-slate-500 text-xs">
              Belum ada komentar. Jadilah yang pertama berkomentar!
            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- MODAL PROFIL PUBLIK -->
    <div v-if="selectedProfile" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="bg-[#0f172a] border border-slate-700 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl relative">
        <button @click="selectedProfile = null" class="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
        
        <img :src="selectedProfile.photo" class="w-24 h-24 rounded-full border-2 border-blue-500 mx-auto object-cover shadow-lg" />
        <div>
          <h3 class="text-lg font-bold text-white">{{ selectedProfile.name }}</h3>
          <p class="text-xs text-blue-400 mt-0.5">Pengguna Terverifikasi KraaDev</p>
        </div>

        <button @click="selectedProfile = null" class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition">
          Tutup
        </button>
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
const usersMap = ref({});
const downloadCount = ref(0);
const isSubmitting = ref(false);
const selectedProfile = ref(null);

// State untuk Edit Komentar
const editingCommentId = ref(null);
const editingText = ref('');

const SUPABASE_URL = "https://lulqcbwyuhrwonnkxhzp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1bHFjYnd5dWhyd29ubmt4aHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxOTA1ODcsImV4cCI6MjA3NTc2NjU4N30.FjkYF7uqaEyQxwwIWPw6Sjw-mSxOd6vX9SoGjlSa2_I";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Memuat data profil dari tabel users
const loadUsers = async () => {
  const { data } = await supabase.from('users').select('*');
  if (data) {
    const map = {};
    data.forEach(u => {
      map[u.email] = u;
    });
    usersMap.value = map;
  }
};

const loadComments = async () => {
  if (!addon) return;
  await loadUsers();

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('addon_id', addon.id)
    .order('created_at', { ascending: false });

  if (!error && data) {
    comments.value = data;
  }
};

// Mengambil nama & foto terbaru dari tabel users
const getCommentUser = (item) => {
  if (item.user_email && usersMap.value[item.user_email]) {
    return {
      name: usersMap.value[item.user_email].name,
      picture: usersMap.value[item.user_email].picture
    };
  }
  return {
    name: item.user_name,
    picture: item.user_photo
  };
};

// Cek apakah komentar ini milik pengguna yang sedang login
const isMyComment = (item) => {
  if (!user.value) return false;
  return item.user_email === user.value.email || item.user_name === user.value.name;
};

const loadDownloadCount = async () => {
  if (!addon) return;
  const { count, error } = await supabase
    .from('addon_downloads')
    .select('*', { count: 'exact', head: true })
    .eq('addon_id', addon.id);

  if (!error) {
    downloadCount.value = count || 0;
  }
};

const trackDownload = async () => {
  if (!user.value || !addon) return;
  await supabase.from('addon_downloads').insert([
    { addon_id: addon.id, user_email: user.value.email }
  ]);
  await loadDownloadCount();
};

const addComment = async () => {
  if (!newComment.value.trim() || !user.value || !addon || isSubmitting.value) return;

  isSubmitting.value = true;

  const { error } = await supabase
    .from('comments')
    .insert([
      {
        addon_id: addon.id,
        user_email: user.value.email,
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

// Mulai Edit Komentar
const startEditComment = (item) => {
  editingCommentId.value = item.id;
  editingText.value = item.text;
};

// Simpan Hasil Edit Komentar
const saveEditComment = async (commentId) => {
  if (!editingText.value.trim()) return;

  const { error } = await supabase
    .from('comments')
    .update({ text: editingText.value.trim() })
    .eq('id', commentId);

  if (!error) {
    editingCommentId.value = null;
    await loadComments();
  }
};

// Hapus Komentar
const deleteComment = async (commentId) => {
  if (!confirm("Apakah kamu yakin ingin menghapus komentar ini?")) return;

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (!error) {
    await loadComments();
  }
};

const viewUserProfile = (name, photo) => {
  selectedProfile.value = { name, photo };
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
  loadDownloadCount();
});
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>s
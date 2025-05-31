<script setup>
  import { onMounted } from 'vue';
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { toast } from 'vue3-toastify';
  import loadingGif from '@/assets/images/Loading_icon_cropped.gif';
  //import config from "@/my_javascript_files/config";
  import { useAuth } from '~/composables/useAuth';

  definePageMeta({
    middleware: ['auth'],
  });

  const { token, isLoggedIn } = useAuth();

  //const apiUrl = config.apiBaseUrl;
  const apiUrl = useRuntimeConfig().public.apiBase;

  const router = useRouter();
  const route = useRoute();

  const dayjs = useDayjs();

  const noteId = route.params.id;
  let note = ref({});
  let tryingToLoadNote = ref(true);
  let showLoadingErrorMessage = ref(false);

  let reloadPage = () => {
    location.reload();
  }

  // On mounted, fetch note details
  onMounted(() => {

      /*const token = localStorage.getItem('authToken');
      const tokenExpiry = localStorage.getItem('tokenExpiry');*/

      //if (token && tokenExpiry > Date.now()) {
      if (token.value) {
          tryingToLoadNote.value = true;
          //const url = `/api/notes/view_note/${noteId}`;
          const url = `${apiUrl}/notes/view_note/${noteId}`;

          fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token.value}`,
          },
          })
          .then((response) => {
              if (!response.ok) {
                  //alert('Error getting the note. Please try again');

                  showLoadingErrorMessage.value = true;
              }
              return response.json();
          })
          .then((data) => {
              note.value = data['note'];

              // Format the created_at date here using dayjs
              if (note.value && note.value.created_at) {
                  note.value.formattedCreatedAt = dayjs(note.value.created_at).format('MMMM D, YYYY h:mm A');
              }

              // Format the created_at date here using dayjs
              if (note.value && note.value.updated_at) {
                  note.value.formattedUpdatedAt = dayjs(note.value.updated_at).format('MMMM D, YYYY h:mm A');
              }

              tryingToLoadNote.value = false;
          })
          .catch((error) => {
              console.error('Error:', error);

              showLoadingErrorMessage.value = true;
          });
      }
  });

  // Delete note function remains unchanged
  let deleteNote = async () => {
    let result = confirm('Are you sure you want to delete this item?');

    if (result) {

      if (token.value) {
        const url = `${apiUrl}/notes/${noteId}`;

        fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',

            'Accept': 'application/json',
            
            /*'Accept': 'application/json',
            'Content-Type': 'application/json'*/
          },
          credentials: 'include',
        })
          .then((response) => {
            if (!response.ok) {
              alert('Error in deleting the note. Please try again');
            }
            return response.json();
          })
          .then((data) => {
            let message = data['message'];
            if (message.type === 'success') {
              toast.success(message.text, {
                timeout: 3000, // Custom timeout for this toast
              });
              router.push('/users/view-notes');
            } else {
              alert('There was an error in deleting the note. Please try again.');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('An error has occurred. Please try again.');
          });
      }
    }
  };
</script>

<template>
    <Head>
      <Title>Nuxt JS Notes App - View Note</Title>
      <Meta name="description" :content="note.title" />
    </Head>

    <main class="page view-note">
        <div class="note-container" v-if="!tryingToLoadNote && note !== null">
            <h1 class="note-title align-left">{{ note.title }}</h1>
            <p class="note-content align-left">{{ note.content }}</p>
            <p class="note-date">Last Updated: {{ note.formattedUpdatedAt || 'Date not available' }}</p>
            <p class="note-date">Created on: {{ note.formattedCreatedAt || 'Date not available' }}</p>
            <div class="note-actions">
                <NuxtLink :to="`/users/edit-note/${note.id}`" class="btn btn-secondary">Edit Note</NuxtLink>
                <button class="btn btn-danger" @click="deleteNote">Delete Note</button>
            </div>
        </div>
        <div class="note-container" v-else-if="!tryingToLoadNote && note === null">
            <p class="note-content">Note does not exist</p>
        </div>
        <div class="note-container" v-else>
            
            <div class="note-content" v-if="showLoadingErrorMessage == false">
                <img :src="loadingGif" />
            </div>
            <div class="note-content" v-else="showLoadingErrorMessage == true">
                <div class="error-section">
                    <div class="error-message">
                        <strong>Error loading the note. Please try again.</strong>
                        </div>
                        <div>
                        <!--<NuxtLink 
                            :to="router.currentRoute.value.fullPath" 
                            class="reload-link">
                            Reload
                        </NuxtLink>-->
                        <!--<a href="javascript:void(0)" @click="reloadPage" class="reload-link">
                            Reload
                        </a>-->
                        <NuxtLink :to="router.currentRoute.value.fullPath" class="reload-link">Reload</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
  /* Some paragraphs I want left aligned */
  .align-left {
    text-align: left;
  }
</style>
  
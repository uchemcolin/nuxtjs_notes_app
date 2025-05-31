<script setup>
    import { onMounted } from 'vue';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import loadingGif from "@/assets/images/Loading_icon_cropped.gif";
    //import config from "@/my_javascript_files/config";
    import { useAuth } from '~/composables/useAuth';

    definePageMeta({
        middleware: ['auth'],
    });
    
    const { token, isLoggedIn } = useAuth();

    //const apiUrl = config.apiBaseUrl;
    const apiUrl = useRuntimeConfig().public.apiBase;

    const router = useRouter();

    let userDetails = ref({});

    let tryingToLoadUserDetails = ref(true);

    let showLoadingErrorMessage = ref(false);

    let reloadPage = () => {
        location.reload();
    }

    // In your main App.vue or a global mixin:
    onMounted(() => {
        /*const token = localStorage.getItem('authToken');
        const tokenExpiry = localStorage.getItem('tokenExpiry');*/

        console.log(token.value);

        //if (token && tokenExpiry > Date.now()) {
        if (token.value) {

            tryingToLoadUserDetails.value = true;

            const url = `${apiUrl}/users/profile`;

            fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',

                    'Accept': 'application/json',
                    
                    /*'Accept': 'application/json',
                    'Content-Type': 'application/json'*/
                },
                //body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    //throw new Error('Network response was not ok');

                    //alert("Error getting your account details. Please try again");

                    showLoadingErrorMessage.value = true;
                }

                return response.json();
            })
            .then(data => {

                userDetails.value = data["user"];

                console.log("userdetails: " + userDetails);

                tryingToLoadUserDetails.value = false;
            })
            .catch(error => {

                showLoadingErrorMessage.value = true;
            });
        }
    });
</script>

<template>

    <Head>
        <Title>Nuxt JS Notes App - View Profile</Title>
        <Meta name="description" content="View your profile" />
    </Head>
    <div class="profile-container" v-if="tryingToLoadUserDetails == false && userDetails !== null">
        <!--<img src="path/to/profile-photo.jpg" alt="Profile Photo" class="profile-photo">-->
        <h3>Your Profile</h3>
        <p class="profile-name">{{ userDetails.firstname }} {{ userDetails.lastname }}</p>
        <p class="profile-email">{{ userDetails.email }}</p>
        <!--<p class="profile-bio">A short bio about John Doe. Passionate about coding, design, and coffee.</p>-->
        <NuxtLink to="/edit-profile" class="btn-edit-profile">Edit Profile</NuxtLink>
    </div>
    <div class="profile-container" v-else-if="tryingToLoadUserDetails == false && userDetails === null">
        <p class="profile-name">
            Your account does not exist
        </p>
        <!--<a href="#" class="btn-edit-profile">Login</a>-->
    </div>
    <div class="profile-container" v-else>
        <div v-if="showLoadingErrorMessage == false">
            <img :src="loadingGif" />
        </div>
        <div v-else class="error-section">
            <div class="error-message">
              <strong>Error loading your profile. Please try again.</strong>
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
              <!--<NuxtLink to="/view-profile" class="reload-link">Reload</NuxtLink>-->
              <NuxtLink :to="router.currentRoute.value.fullPath" class="reload-link">Reload</NuxtLink>
            </div>
        </div>
    </div>
</template>
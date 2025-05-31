<script setup>
    import { toast } from 'vue3-toastify';
    import { useRouter } from 'vue-router';
    //import config from "@/my_javascript_files/config";
    import { useAuth } from '~/composables/useAuth';

    const { token, isLoggedIn, deleteLoggedInUserToken } = useAuth();

    //const apiUrl = config.apiBaseUrl;
    const apiUrl = useRuntimeConfig().public.apiBase;

    const router = useRouter();

    const loggingOut = ref(false);

    const logout = async () => {

        loggingOut.value = true;

        if(isLoggedIn.value == true) {

            const url = `${apiUrl}/logout`;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.value}`
                },
            })
            .then(response => {
                if (!response.ok) {

                    //alert("Error logging you out. Please try again");

                    loggingOut.value = false;
                }

                return response.json();
            })
            .then(data => {

                deleteLoggedInUserToken(); // Delete currently logged in user data

                loggingOut.value = false;

                toast.success("You have successfully logged out", {
                    timeout: 5000, // Custom timeout for this toast
                });

                // Redirect to login page after logout
                router.push('/login');
            })
            .catch(error => {
                console.error('Error:', error);

                //alert("There was an error in logging you out. Please try again.");

                loggingOut.value = false;

                toast.error("There was an error in logging you out. Please try again.", {
                    timeout: 5000, // Custom timeout for this toast
                });
            });
        } else {

            loggingOut.value = false;

            toast.success("You have successfully logged out", {
                timeout: 5000, // Custom timeout for this toast
            });

            // Redirect to login page after logout
            router.push('/login');
        }


    };
    
</script>

<template>
    <nav class="navbar">
        <NuxtLink to="/" class="logo">📝 NotesApp</NuxtLink>
        <ul class="nav-links">
            <li><NuxtLink to="/" class="nav-link">Home</NuxtLink></li>
            <li v-if="isLoggedIn"><NuxtLink to="/users/add-note" class="nav-link">Add Note</NuxtLink></li>
            <li v-if="isLoggedIn"><NuxtLink to="/users/view-notes" class="nav-link">View Notes</NuxtLink></li>
            <li><NuxtLink to="/about" class="nav-link">About</NuxtLink></li>
            <li v-if="isLoggedIn">
                <NuxtLink to="/users/view-profile" class="nav-link">Profile</NuxtLink>
            </li>
            <li v-if="isLoggedIn">
                <a href=""  class="nav-link" @click.prevent="logout">
                    <span v-if="loggingOut">Logging out... <font-awesome-icon icon="spinner" class="fa-spin" size="lg" /></span>
                    <span v-else>Logout</span>
                </a>
            </li>
            <li v-if="!isLoggedIn"><NuxtLink to="/register" class="nav-link">Register</NuxtLink></li>
            <li v-if="!isLoggedIn">
                <NuxtLink to="/login" class="nav-link">
                    Login
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>
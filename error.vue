<!-- Replaces default error page -->

<script setup>
    defineProps([
        "error"
    ]);

    const handleClearError = () => clearError({
        redirect: "/"
    })
</script>

<template>

    <main class="page not-found">
        <h1>{{ error.statusCode }}</h1>
        <!--<p>Oops! {{ error.message }}</p>-->
        <p>Oops! The page you are looking for doesn't exist.</p>
        <button class="btn btn-primary" @click="handleClearError">Back to Home</button>
    </main>
</template>
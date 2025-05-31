<script setup>
    
</script>

<template>
    <Head>
        <Title>Nuxt JS Notes App - Home</Title>
        <Meta name="description" content="Homepage of Nuxt JS Notes App" />
    </Head>

    <header class="hero page">
        <h1>Welcome to NotesApp</h1>
        <p>Organize your thoughts, ideas, and tasks in one place.</p>
        <NuxtLink to="/users/add-note" class="btn btn-primary">Add Your First Note</NuxtLink>
    </header>
</template>
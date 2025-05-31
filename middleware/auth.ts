export default defineNuxtRouteMiddleware((to, from) => {
    const { token } = useAuth(); // Assuming you have a useAuth composable that provides the token
  
    if (!token) {
      return navigateTo('/login');
    }
  });
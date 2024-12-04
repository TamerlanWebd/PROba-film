import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '~/api';
import { useAuthStore } from './useAuthStore.js';

export const useProfileStore = defineStore('profile', () => {
    const userData = ref(null);
    const reviewsData = ref([]);
    const authStore = useAuthStore();

    async function fetchUserData(id) {
        try {
            if (!authStore.authData?.token) {
                throw new Error('User is not authenticated');
            }
            const res = await api.get(`/users/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + authStore.authData.token,
                },
            });
            userData.value = res.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    async function fetchReviewsData() {
        try {
            if (!authStore.authData?.token) {
                throw new Error('User is not authenticated');
            }
            const res = await api.get(`/users/${authStore.authData.id}/reviews`, {
                headers: {
                    'Authorization': 'Bearer ' + authStore.authData.token,
                },
            });
            reviewsData.value = res.data.reviews;
        } catch (error) {
            console.error('Error fetching reviews data:', error);
        }
    }

    return {
        userData,
        reviewsData,
        fetchUserData,
        fetchReviewsData,
    };
});
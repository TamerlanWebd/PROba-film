import { defineStore } from 'pinia';
import { api } from '~/api';

export const useFilmsStore = defineStore('films', {
    state: () => ({
        films: [],
        page: 1,
        total: 0,
        isLoading: false,
        size: 10,
        params: {
            category: null,
            country: null,
            sortBy: 'name',
            sortDir: 'desc',
            size: 10,
            page: 1,
        },
    }),

    actions: {
        async fetchFilms() {
            this.isLoading = true;
            try {
                const response = await api.get('/films', { params: this.params });
                this.films = response.data.films;
                this.total = response.data.total;
            } catch (error) {
                console.error('Failed to fetch films:', error);
            } finally {
                this.isLoading = false;
            }
        },

        addCategoryToParams(category) {
            this.params.category = category;
            this.page = 1;
            this.params.page = 1;
            this.fetchFilms();
        },

        addCountryToParams(country) {
            this.params.country = country;
            this.page = 1;
            this.params.page = 1;
            this.fetchFilms();
        },

        addSortToParams(sortBy) {
            this.params.sortBy = sortBy;
            this.fetchFilms();
        },

        changePage(newPage) {
            this.page = newPage;
            this.params.page = newPage;
            this.fetchFilms();
        },
    },

    getters: {
        storeState() {
            return {
                films: this.films,
                total: this.total,
                page: this.page,
                size: this.size,
                isLoading: this.isLoading,
            };
        },
    },
});


import { defineStore } from "pinia";
import { api } from "~/api/index.js";

export const useCountryStore = defineStore("country", () => {
    const countries = ref([]);
    const fetchCountries = async () => {
        const res = await api.get("/countries"); // Эндпоинт должен возвращать список стран
        countries.value = res.data.countries;
    };

    fetchCountries();
    return {
        countries,
    };
});

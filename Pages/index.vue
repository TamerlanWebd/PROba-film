<script setup lang="ts">
import { ref, computed } from "vue";
import { useFilmStore } from "~/stores/film";
import { useCategoryStore } from "~/stores/category";
import { useCountryStore } from "~/stores/country";
const categoryStore = useCategoryStore();
const countryStore = useCountryStore();
const filmStore = useFilmStore();
const selectedGenre = ref(null);
const selectedCountry = ref(null);
const filteredFilms = computed(() => {
  return filmStore.films.filter((film) => {
    const matchesGenre =
        !selectedGenre.value ||
        film.categories.some((category) => category.id === selectedGenre.value);

    const matchesCountry =
        !selectedCountry.value || film.countryId === selectedCountry.value;

    return matchesGenre && matchesCountry;
  });
});
const resetFilter = () => {
  selectedGenre.value = null;
  selectedCountry.value = null;
};
</script>

<template>
  <div class="row mt-2">
    <div class="col-md-4">
      <select
          class="form-select"
          aria-label="Select Genre"
          v-model="selectedGenre"
      >
        <option :value="null" selected>All Genres</option>
        <option
            v-for="category in categoryStore.categories"
            :key="category.id"
            :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="col-md-4">
      <select
          class="form-select"
          aria-label="Select Country"
          v-model="selectedCountry"
      >
        <option :value="null" selected>All Countries</option>
        <option
            v-for="country in countryStore.countries"
            :key="country.id"
            :value="country.id"
        >
          {{ country.name }}
        </option>
      </select>
    </div>
    <div class="col-md-2">
      <select class="form-select" aria-label="Sort by">
        <option value="1">Name</option>
        <option value="2">Year</option>
        <option value="3">Rating</option>
      </select>
    </div>
    <div class="col-md-2">
      <button type="button" class="btn btn-outline-info" @click="resetFilter">
        Reset
      </button>
    </div>
  </div>
  <div v-if="!filmStore.isLoading" class="row row-cols-1 row-cols-md-3 g-4 mt-2">
    <div class="col" v-for="film in filteredFilms" :key="film.id">
      <div class="card h-100">
        <img
            v-if="film.link_img"
            :src="film.link_img"
            class="card-img-top"
            alt="..."
        />
        <img
            v-else
            src="https://artgallerynsk.ru/upload/iblock/25c/25c5bfba434540925e36313a39c6864e.jpg"
            class="card-img-top"
            alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">{{ film.name }}</h5>
          <p class="card-text">{{ film.raringAvg }}</p>
          <p class="card-text">{{ film.duration }} min.</p>
          <p class="card-text">
            <template
                v-for="(category, index) in film.categories"
                :key="category.id"
            >
              {{
                category.name +
                (index + 1 < film.categories.length ? ", " : "")
              }}
            </template>
          </p>
          <p class="card-text">Country: {{ film.countryName }}</p>
        </div>
        <button type="button" class="btn btn-success">Details</button>
      </div>
    </div>
  </div>
  <div v-else class="d-flex justify-content-center mt-4">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

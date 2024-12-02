<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"> Logo KinoTower</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        </ul>
        <button class="btn btn-outline-success me-2" type="submit">User</button>
        <button type="button" class="btn btn-outline-info">Exit</button>
      </div>
    </div>
  </nav>
  <div class="container">
    <slot />
  </div>
</template>
<script setup lang="ts">

</script>
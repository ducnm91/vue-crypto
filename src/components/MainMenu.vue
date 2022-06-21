<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/categories" class="nav-link">Category</router-link>
          </li>
          <li class="nav-item">
            <a href="https://www.coingecko.com/en/coins/compare?coin_ids=solana,near" class="nav-link" target="_blank">Compare coin</a>
          </li>
          <li class="nav-item">
            <a href="https://www.coinglass.com/LongShortRatio" class="nav-link" target="_blank">Long/Sort Ratio</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

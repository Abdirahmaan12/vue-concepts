<template>
  <div class="app" :style="{ backgroundImage: backgroundImageUrl }">
    <div class="content dark:bg-gray-900 dark:text-gray-200">
      <h2 class="mb-4">🌤️ Weather App</h2>

      <!-- Input -->
      <input
        v-model="city"
        class="input dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
        placeholder="Enter city name"
      />

      <!-- Button -->
      <button
        @click="getWeather"
        class="btn bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
      >
        Get Weather
      </button>

      <!-- Loading -->
      <div v-if="loading" class="loading dark:text-gray-400">Loading...</div>

      <!-- Weather Info -->
      <div
        v-if="weather"
        class="weather flex flex-col items-center justify-center gap-2 mt-4"
      >
        <img
          :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`"
          :alt="weather.weather[0].description"
          class="weather-icon"
        />
        <h3 class="text-xl font-semibold">{{ weather.name }}</h3>
        <p class="capitalize">{{ weather.weather[0].description }}</p>
        <p class="text-lg font-medium">{{ weather.main.temp.toFixed(1) }} °C</p>
      </div>

      <!-- Error -->
      <div v-if="error" class="error dark:text-red-400">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WeatherApp",
  data() {
    return {
      city: "",
      weather: null,
      loading: false,
      error: null,
    };
  },
  computed: {
    weatherType() {
      return this.weather ? this.weather.weather[0].main.toLowerCase() : "";
    },
    backgroundImageUrl() {
      switch (this.weatherType) {
        case "clear":
          return "url('https://images.unsplash.com/photo-1501973801540-537f08ccae7d?auto=format&fit=crop&w=1500&q=80')";
        case "clouds":
          return "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1500&q=80')";
        case "rain":
          return "url('https://images.unsplash.com/photo-1527766833261-b09c3163a791?auto=format&fit=crop&w=1500&q=80')";
        case "snow":
          return "url('https://images.unsplash.com/photo-1608889175119-27c1e7dbd17b?auto=format&fit=crop&w=1500&q=80')";
        case "thunderstorm":
          return "url('https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?auto=format&fit=crop&w=1500&q=80')";
        default:
          return "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1500&q=80')";
      }
    },
  },
  methods: {
    async getWeather() {
      if (!this.city.trim()) {
        this.error = "Please enter a city name";
        return;
      }

      this.loading = true;
      this.weather = null;
      this.error = null;

      try {
        const API_KEY = "836f564de55973ae52ef9afde222cdee"; // Ku beddel key-gaaga
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${API_KEY}&units=metric`
        );
        this.weather = res.data;
      } catch (err) {
        console.error(err.response?.data);
        this.error =
          err.response?.data?.message || "City not found or API error";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 320px;
  text-align: center;
  transition: background-color 0.3s ease;
}

.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.btn {
  width: 100%;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.weather-icon {
  width: 120px;
  height: 120px;
}

.capitalize {
  text-transform: capitalize;
}

.loading {
  color: #555;
  margin-top: 10px;
}

.error {
  margin-top: 10px;
  font-weight: 500;
}
</style>

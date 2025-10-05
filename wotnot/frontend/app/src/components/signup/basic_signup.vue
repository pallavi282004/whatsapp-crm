<template>
  <div class="bg-container">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
      <h2
        class="text-2xl sm:text-2xl font-semibold text-center text-gray-800 mb-4"
      >
        Get started with <span class="logo">WotNot</span>
      </h2>

      <hr class="my-3 border-gray-300" />

      <div class="space-y-4">
        <div class="w-full">
          <label for="username" class="block text-sm font-medium text-gray-700">Business Name</label>
          <input type="text" id="username" v-model="username" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div class="w-full">
          <label for="email" class="block text-sm font-medium text-gray-700">Business Email Address</label>
          <input type="email" id="email" v-model="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div class="w-full">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div class="w-full">
          <label for="WABAID" class="block text-sm font-medium text-gray-700">WABAID</label>
          <input type="text" id="WABAID" v-model="WABAID" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div class="w-full">
          <label for="PAccessToken" class="block text-sm font-medium text-gray-700">PAccessToken</label>
          <input type="text" id="PAccessToken" v-model="PAccessToken" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div class="w-full">
          <label for="Phone_id" class="block text-sm font-medium text-gray-700">Phone ID</label>
          <input type="text" id="Phone_id" v-model="Phone_id" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div class="mt-4 text-sm text-center">
          <p class="mb-2 text-sm">
            By signing up you agree to the
            <router-link
              to="/terms-and-privacy#terms-and-conditions"
              class="text-[#075e54] font-semibold"
              >Terms</router-link
            >
            and
            <router-link
              to="/terms-and-privacy#privacy-policy"
              class="text-[#075e54] font-semibold"
              >Privacy Policy</router-link
            >
          </p>
        </div>
      </div>

      <!-- Turnstile and Cloudflare challenge removed -->

      <div class="flex flex-col items-center">
        <button
          class="w-full bg-gradient-to-r from-[#075e54] via-[#089678] to-[#075e54] text-white px-6 py-3 rounded-lg shadow-lg font-medium flex items-center justify-center hover:from-[#078478] hover:via-[#08b496] hover:to-[#078478] transition-all duration-300"
          @click.prevent="handleSubmit"
        >
          Get Account
        </button>

        <p class="mt-4 text-center text-sm">
          Already have an account?
          <a
            href=""
            class="text-[#075e54] font-semibold mb-4"
            @click="redirectLogin"
            >Login</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      WABAID: "",
      PAccessToken: "",
      Phone_id: "",
    };
  },
  name: "BasicSignUpForm",
  mounted() {
  },
  methods: {
    async handleSubmit() {
      if (!this.username || !this.email || !this.password || !this.WABAID || !this.PAccessToken || !this.Phone_id) {
        alert("Please fill in all required fields.");
        return;
      }
      try {
        await axios.post("http://localhost:8000/api/signup/", {
          username: this.username,
          email: this.email,
          password: this.password,
          WABAID: this.WABAID,
          PAccessToken: this.PAccessToken,
          Phone_id: this.Phone_id,
        });
        alert("Account created successfully!");
        this.$router.push("/");
      } catch (error) {
        alert(error.response?.data?.detail || "Signup failed.");
      }
    },
    redirectLogin() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.logo {
  font-weight: 800;
  margin: 8px 0;
  padding-right: 30px;
  font-size: 30px;
  color: #075e54;
}
.bg-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url("@/assets/LoginPage.png");
  background-position: center;
  padding: 0 16px;
}

@media (min-width: 640px) {
  .container {
    padding: 0 24px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 32px;
  }
}
</style>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto mt-8">
    <h2 class="text-xl font-semibold mb-4 text-gray-800">WhatsApp Message Generator</h2>
    <div class="mb-4">
      <label for="prompt" class="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
      <input
        id="prompt"
        v-model="prompt"
        type="text"
        placeholder="e.g. Diwali greetings for customers"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
      />
    </div>
    <button
      @click="generateMessage"
      :disabled="isLoading || !prompt"
      class="bg-gradient-to-r from-green-700 via-green-500 to-green-700 text-white px-6 py-2 rounded-lg shadow font-medium hover:from-green-800 hover:via-green-600 hover:to-green-800 transition-all duration-300 mb-4"
    >
      <span v-if="!isLoading">Generate</span>
      <span v-else>Generating...</span>
    </button>
    <div v-if="message" class="mb-4">
      <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Generated Message</label>
      <textarea
        id="message"
        v-model="editableMessage"
        rows="4"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
      ></textarea>
      <button
        @click="copyMessage"
        class="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
      >Copy</button>
    </div>
    <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: "MessageGenerator",
  data() {
    return {
      prompt: "",
      message: "",
      editableMessage: "",
      isLoading: false,
      error: ""
    };
  },
  methods: {
    async generateMessage() {
      this.isLoading = true;
      this.error = "";
      try {
        const response = await fetch("/api/generate-message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: this.prompt })
        });
        const data = await response.json();
        if (data.message) {
          this.message = data.message;
          this.editableMessage = data.message;
        } else {
          this.error = data.detail || "Failed to generate message.";
        }
      } catch (err) {
        this.error = "Error connecting to backend.";
      } finally {
        this.isLoading = false;
      }
    },
    copyMessage() {
      navigator.clipboard.writeText(this.editableMessage);
      alert("Message copied!");
    }
  }
};
</script>

<style scoped>
.bg-white {
  background: #fff;
}
</style>

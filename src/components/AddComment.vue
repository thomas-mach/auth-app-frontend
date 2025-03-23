<template>
  <div class="container">
    <CardForm>
      <template #title>
        <p>Add Comment</p>
      </template>
      <template #message>
        <div class="message-placeholder">
          <p class="success-generic-message" v-if="successMessage">
            {{ successMessage }}
          </p>
          <p class="error-generic-message" v-if="errorMessage">
            {{ errorMessage }}
          </p>
        </div>
      </template>
      <template #form>
        <form novalidate @submit.prevent="handleCommentCreate">
          <textarea
            name="comment"
            placeholder="Type here..."
            id=""
            v-model="comment"
            :class="{ 'error-input': errorInput || errorMessage }"
          ></textarea>
          <div class="error-message-placeholder">
            <p class="error-message" v-if="errorInput">
              {{ errorInput }}
            </p>
          </div>
          <button class="btn">SEND</button>
        </form>
      </template>
    </CardForm>
  </div>
</template>

<script setup>
import CardForm from "../components/CardForm.vue";
import { ref } from "vue";
import { createComment } from "../api/commentService.js";

const comment = ref("");
const successMessage = ref("");
const errorMessage = ref("");
const errorInput = ref("");

const handleCommentCreate = async () => {
  successMessage.value = "";
  errorMessage.value = "";
  errorInput.value = "";
  try {
    const response = await createComment({
      content: comment.value,
    });
    successMessage.value = response.message;
    comment.value = "";
    setInterval(() => {
      successMessage.value = "";
    }, 3000);
  } catch (error) {
    errorMessage.value = error.response.data.message;
    errorInput.value = error.response.data.errors[0].message;
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 90%;
  max-width: 1024px;
  height: 100%;
  display: grid;
  place-items: center;
  /* border: 1px solid rgb(1, 2, 7); */
}

form {
  display: flex;
  flex-direction: column;
}

.btn {
  background-color: var(--clr-accent);
  border: none;
  padding: 1em;
  border-radius: 0.45em;
  font-size: var(--fs-body);
  font-weight: var(--fw-bold);
  letter-spacing: 1.2px;
  cursor: pointer;
  margin: 1em 0;
  color: white;
  border: 1px solid var(--clr-accent);
  transition: all 0.3s ease-in-out;
}

textarea {
  width: 100%;
  min-height: 10em;
  padding: 1em;
  border: none;
  border-radius: 0.45em;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  color: var(--clr-dark-light);
  letter-spacing: 1.3px;
  border: 2px solid white;
  resize: none;
}

.message-placeholder {
  min-height: var(--fs-body);
  margin: 0.5em 0 0.5em;
  color: var(--clr-error);
}

.success-generic-message {
  font-size: var(--fs-body);
  color: var(--clr-valid);
  font-weight: var(--fw-bold);
}

.error-generic-message {
  font-size: var(--fs-body);
  color: var(--clr-error);
  font-weight: var(--fw-bold);
}

.error-message {
  color: var(--clr-error);
  text-align: right;
  font-size: var(--fs-small);
  font-weight: var(--fw-bold);
}

.error-message-placeholder {
  height: var(--fs-small);
  margin: 0.5em 0 0.5em;
}

.error-input {
  border: 2px solid var(--clr-error);
}
</style>

<template>
  <div class="comments-wrapper">
    <div
      class="comment-wrapper"
      v-for="(comment, index) in comments"
      :key="index"
    >
      <div class="header">
        <div class="avatr-name-wrapper">
          <img :src="comment.author.avatar" alt="" />
          <p class="name">{{ comment.author.name }}</p>
        </div>
        <p class="date">{{ formatDate(comment.createdAt) }}</p>
      </div>
      <div class="main">
        <p>{{ comment.content }}</p>
        <button class="btn" @click="handleDeleteComments(comment._id)">
          <font-awesome-icon :icon="['fas', 'trash']" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getComments, deleteComment } from "../api/commentService.js";

const comments = ref([]);

const handleGetComments = async () => {
  try {
    const response = await getComments();
    comments.value = response.data;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteComments = async (commentId) => {
  try {
    const response = await deleteComment(commentId);
    handleGetComments();

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

onMounted(() => handleGetComments());
</script>

<style scoped>
.comments-wrapper {
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  height: 500px;
  padding-bottom: 350px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1em;
  overflow: auto;
  scrollbar-width: none;
  /* border: 1px solid lime; */
}

.comment-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  word-wrap: break-word;
  padding: 0.5em;
  width: 100%;
  background-color: var(--clr-light);
  border-radius: 0.5em;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
}

img {
  width: 2em;
}

.avatr-name-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.name {
  font-weight: var(--fw-bold);
}

.date {
  font-size: var(--fs-small);
}

.btn {
  border: none;
  background-color: inherit;
  padding-inline: 0.5em;
  font-size: var(--fs-body);
  cursor: pointer;
}

.btn:hover {
  color: red;
}

.main {
  display: flex;
  justify-content: space-between;
}

@media (min-width: 1765px) {
  .comments-wrapper {
    padding-bottom: 450px;
  }
}
</style>

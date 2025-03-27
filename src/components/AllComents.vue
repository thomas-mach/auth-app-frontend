<template>
  <div class="comments-wrapper">
    <div
      class="comment-wrapper"
      v-for="(comment, index) in comments"
      :key="index"
      :class="{ 'align-left': index % 2 === 0, 'align-right': index % 2 !== 0 }"
    >
      <div class="header">
        <div class="avatr-name-wrapper">
          <img :src="`${API_URL_AVATAR}/${comment.author.avatar}`" alt="" />
          <p class="name">{{ comment.author.name }}</p>
        </div>
        <p class="date">{{ formatDate(comment.createdAt) }}</p>
      </div>
      <p>{{ comment.content }}</p>
    </div>
  </div>
</template>

<script setup>
import { getAllComents } from "../api/commentService";
import { onMounted, ref } from "vue";

const API_URL_AVATAR = import.meta.env.VITE_API_URL_AVATAR;
const comments = ref([]);
const handleGetAllComents = async () => {
  try {
    const response = await getAllComents();
    comments.value = response.data.reverse();
    console.log(comments.value);
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

onMounted(() => {
  handleGetAllComents();
});
</script>

<style scoped>
.comments-wrapper {
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  flex-grow: 10;
  padding-bottom: 350px;
  display: flex;
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

.align-left {
  align-self: flex-start;
}

.align-right {
  align-self: flex-end;
}

@media (min-width: 1765px) {
  .comments-wrapper {
    padding-bottom: 450px;
  }
}
</style>

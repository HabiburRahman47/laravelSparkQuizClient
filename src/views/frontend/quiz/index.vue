<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div
            class="card-header d-flex justify-content-between align-items-center"
          >
            <h4>Quiz List</h4>
            <router-link to="/dashboard/quiz-create" class="btn btn-info"
              >Create Quiz</router-link
            >
          </div>

          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Slug</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(quiz, index) in quizzes" :key="quiz.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ quiz.name }}</td>
                  <td>{{ quiz.description }}</td>
                  <td>{{ quiz.slug }}</td>
                  <td>
                    <router-link
                      :to="{
                        name: 'quiz-edit',
                        params: { id: quiz.id },
                      }"
                      class="btn btn-primary"
                      >Edit</router-link
                    >
                    <button
                      class="btn btn-danger"
                      @click.prevent="deleteQuiz(quiz, index)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Axios from "axios";
  import Navbar from "../navbar";
  // import axois from "axios";
  export default {
    components: {
      Navbar,
    },
    data() {
      return {
        quizzes: [],
      };
    },
    methods: {
      quizList() {
        Axios.get("http://quiz.test/api/v1/admin/quizzes").then((response) => {
          this.quizzes = response.data.data;
        });
      },
      deleteQuiz(quiz, index) {
        Axios.delete(`/api/v1/admin/quizzes/${quiz.id}/delete`).then(() => {
          this.quizzes.slice(index, 1);
          console.log("successfully done");
        });
      },
    },
    mounted() {
      this.quizList();
    },
  };
</script>

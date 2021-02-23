<template>
  <div class="container-fluid">
    <div class="fade-in">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="card">
            <div class="card-header"><strong>Create</strong> a new Quiz</div>
            <div class="card-body">
              <form class="form-horizontal" @submit.prevent="submitform">
                <div class="form-group row">
                  <label class="col-md-3 col-form-label" for="text-input"
                    >Name</label
                  >
                  <div class="col-md-9">
                    <input
                      class="form-control"
                      id="text-input"
                      type="text"
                      v-model="quizForm.name"
                      :class="{
                        'is-invalid': quizForm.errors.has('name'),
                      }"
                      name="name"
                    />

                    <has-error :form="quizForm" field="name"></has-error>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-md-3 col-form-label" for="text-input"
                    >Description</label
                  >
                  <div class="col-md-9">
                    <input
                      class="form-control"
                      id="text-input"
                      type="text"
                      v-model="quizForm.description"
                      :class="{
                        'is-invalid': quizForm.errors.has('description'),
                      }"
                      name="description"
                    />

                    <has-error :form="quizForm" field="description"></has-error>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-md-3 col-form-label" for="catergory-input"
                    >Category_id</label
                  >
                  <div class="col-md-9">
                    <input
                      class="form-control"
                      id="text-input"
                      type="number"
                      v-model="quizForm.category_id"
                      :class="{
                        'is-invalid': quizForm.errors.has('category_id'),
                      }"
                      name="category_id"
                    />

                    <has-error :form="quizForm" field="category_id"></has-error>
                  </div>
                </div>

                <div class="form-group row">
                  <label class="col-md-3 col-form-label" for="text-input"
                    >Config</label
                  >
                  <div class="col-md-9">
                    <input
                      class="form-control"
                      id="text-input"
                      type="text"
                      v-model="quizForm.config"
                      :class="{
                        'is-invalid': quizForm.errors.has('config'),
                      }"
                      name="config"
                    />

                    <has-error :form="quizForm" field="config"></has-error>
                  </div>
                </div>

                <hr />
                <div class="form-actions">
                  <a class="btn btn-secondary" type="button" href="">Cancel</a>
                  <button class="btn btn-primary float-right" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Axios from "axios";
  import Form from "vform";
  export default {
    data() {
      return {
        quizForm: new Form({
          name: "",
          description: "",
          config: "",
          category_id: "",
        }),
        name: "",
        description: "",
        config: "",
        category_id: "",
      };
    },
    methods: {
      submitform() {
        Axios.post("http://quiz.test/api/v1/admin/quizzes", {
          name: this.name,
          description: this.description,
          config: this.config,
          category_id: this.category_id,
        }).then((response) => {
          console.log(response);
        });
        this.quizForm
          .post("http://quiz.test/api/v1/admin/quizzes")
          .then(({ data }) => {
            console.log(data);
          });
        this.$router.push({ name: "quiz-index" });
      },
    },
  };
</script>

<style></style>

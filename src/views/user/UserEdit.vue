<template>
  <section>
    <UserForm>
      <button class="btn" @click.prevent="updateUser">Atualizar Usuário</button>
    </UserForm>
  </section>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import { api } from "@/services/services.js";

export default {
  name: "UserEdit",
  components: {
    UserForm
  },
  methods: {
    updateUser() {
      api
        .put(
          `/usuario/${this.$store.state.usuario.id}`,
          this.$store.state.usuario
        )
        .then(() => {
          this.$store.dispatch("getUser");
          this.$router.push({ name: "user" });
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
};
</script>

<style>
</style>
<template>
  <section>
    <h2>Adicionar Produto</h2>
    <product-add/>
    <h2>Seus Produtos</h2>
    <transition-group v-if="user_products" name="list" tag="ul">
      <li v-for="(produto, index) in user_products" :key="index">
        <product-item :produto="produto">
          <p>{{produto.descricao}}</p>
        </product-item>
      </li>
    </transition-group>
  </section>
</template>

<script>
import ProductAdd from "@/components/ProductAdd.vue";
import ProductItem from "@/components/ProductItem.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "UserProducts",
  components: {
    ProductAdd,
    ProductItem
  },
  computed: {
    ...mapState(["login", "usuario", "user_products"])
  },
  methods: {
    ...mapActions(["getUserProducts"])
  },
  watch: {
    login() {
      this.getUserProducts();
    }
  },
  created() {
    if (this.login) {
      this.getUserProducts();
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
<template>
  <section>
    <h2>Adicionar Produto</h2>
    <product-add/>
    <h2>Seus Produtos</h2>
    <transition-group v-if="user_products" name="list" tag="ul">
      <li v-for="(produto, index) in user_products" :key="index">
        <product-item :produto="produto">
          <p>{{produto.descricao}}</p>
          <button class="btn_delete" @click="deleteProduct(produto.id)">Deletar</button>
        </product-item>
      </li>
    </transition-group>
  </section>
</template>

<script>
import ProductAdd from "@/components/ProductAdd.vue";
import ProductItem from "@/components/ProductItem.vue";
import { mapState, mapActions } from "vuex";
import { api } from "@/services/services.js"

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
    ...mapActions(["getUserProducts"]),
    deleteProduct(id) {
      const confirm = window.confirm("Deseja remover este produto?")
      if(confirm) {
        api
        .delete(`/produto/${id}`)
        .then(() => {
          this.getUserProducts()
        })
        .catch(error => {
          console.log(error.r)
        })
      }
    }
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

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.btn_delete {
  position: absolute;
  top: 0;
  right: 0;
  background: url("../../assets/remove.svg") no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}
</style>
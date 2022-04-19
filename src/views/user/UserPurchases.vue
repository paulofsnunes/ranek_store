<template>
  <section>
    <div v-if="compras">
      <h2>Compras</h2>
      <div class="produtos-wrapper" v-for="(compra, index) in compras" :key="index">
        <ProductItem v-if="compra.produto" :produto="compra.produto">
          <p class="vendedor">
            <span>Vendedor:</span>
            {{compra.vendedor_id}}
          </p>
        </ProductItem>
      </div>
    </div>
  </section>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import { api } from "@/services/services.js";
import { mapState } from "vuex";

export default {
  components: {
    ProductItem
  },
  data() {
    return {
      compras: null
    };
  },
  computed: {
    ...mapState(["usuario", "login"])
  },
  methods: {
    getCompras() {
      api.get(`/transacao?comprador_id=${this.usuario.id}`).then(r => {
        this.compras = r.data;
      });
    }
  },
  watch: {
    login() {
      this.getCompras();
    }
  },
  created() {
    if (this.login) {
      this.getCompras();
    }
  }
};
</script>

<style scoped>
.produto-wrapper {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>
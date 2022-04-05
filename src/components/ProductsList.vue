<template>
    <section class="product-container">
        <div v-for="produto in produtos" :key="produto.id">
            <img v-if="produto.fotos" :src="produto.fotos[0].src" :alt="produto.fotos[0].titulo">
            <p class="price">{{produto.preco}}</p>
            <h2 class="title">{{produto.nome}}</h2>
            <p class="description">{{produto.descricao}}</p>
        </div>
    </section>
</template>

<script>

import { api } from "@/services/services.js"
import { serialize } from "@/helpers/helpers.js"

export default {
    name: "ProductsList",
    data() {
        return {
            produtos: null,
            productsForPage: 9
        }
    },
    computed: {
        url() {
            const query = serialize(this.$route.query)
            return `/produto?_limit=${this.productsForPage}${query}`
        }
    },
    methods: {
        getProducts() {
            api.get(this.url)
            .then(r => {
                console.log(r)
                this.produtos = r.data
            })
        }
    },
    watch: {
        url() {
            this.getProducts()
        }
    },
    created() {
        this.getProducts()
    }
}
</script>

<style scoped>

</style>
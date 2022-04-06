<template>
    <section class="product-container">
        <div v-if="produtos && produtos.length" class="products">
            <div class="product" v-for="(produto, index) in produtos" :key="index">
                <router-link to="/">
                    <img v-if="produto.fotos" :src="produto.fotos[0].src" :alt="produto.fotos[0].titulo">
                    <p class="price">{{produto.preco}}</p>
                    <h2 class="title">{{produto.nome}}</h2>
                    <p class="description">{{produto.descricao}}</p>
                </router-link>
            </div>
            <products-page :productsTotal="productsTotal" :productsForPage="productsForPage"/>
        </div>
        <div v-else-if="produtos && produtos.length === 0">
            <p class="no-results">Busca sem resultados ☹️ Tente buscar outro termo.</p>
        </div>
    </section>
</template>

<script>

import ProductsPage from "@/components/ProductsPage.vue"
import { api } from "@/services/services.js"
import { serialize } from "@/helpers/helpers.js"

export default {
    name: "ProductsList",
    components: {
        ProductsPage
    },
    data() {
        return {
            produtos: null,
            productsForPage: 3,
            productsTotal: 0
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
                this.productsTotal = Number(r.headers["x-total-count"])
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
.product-container {
    max-width: 1000px;
    margin: 0 auto;
}

.products {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    margin: 30px;
}

.product {
    box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
    padding: 10px;
    background: #fff;
    border-radius: 4px;
    transition: all 0.2s;
}

.product:hover {
    box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
    transform: scale(1.1);
    position: relative;
    z-index: 1;
}

.product img {
    border-radius: 4px;
    margin-bottom: 20px;
}

.title {
    margin-bottom: 10px;
}

.price {
    color: #e80;
    font-weight: bold;
}

.no-results {
    text-align: center;
}
</style>
<template>
    <section>
        <div v-if="produto" class="product">
            <ul class="photo" v-if="produto.fotos">
                <li v-for="(foto, index) in produto.fotos" :key="index">
                    <img :src="foto.src" :alt="foto.titulo">
                </li>
            </ul>
            <div class="info">
                <h1>{{produto.nome}}</h1>
                <p class="price">{{produto.preco | numberPrice}}</p>
                <p class="description">{{produto.descricao}}</p>
                <button class="btn" v-if="produto.vendido === 'false'">Comprar</button>
                <button class="btn" v-else disabled>Produto vendido</button>
            </div>
        </div>
        <page-loading v-else/>
    </section>
</template>

<script>

import { api } from "@/services/services.js"
import PageLoading from '@/components/PageLoading.vue'

export default {
    components: { PageLoading },
    name: "ProductView",
    props: ["id"],
    data() {
        return {
            produto: null
        }
    },
    methods: {
        getProduct() {
            api.get(`/produto/${this.id}`).then(r => {
                this.produto = r.data
            })
        }
    },
    created() {
        this.getProduct()
    }
}
</script>

<style scoped>
.product {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
    max-width: 900px;
    padding: 60px 20px;
    margin: 0 auto;
}

.price {
    color: #e80;
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 40px;
}

.description {
    font-size: 1.2rem;
}

.btn {
    margin-top: 60px;
    width: 200px;
}
</style>
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
                <transition mode="out-in" v-if="produto.vendido === 'false'">
                    <button class="btn" v-if="!finalize" @click="finalize = true">Comprar</button>
                    <FinalizePurchase v-else :produto="produto"/>
                </transition>
                <button class="btn" v-else disabled>Produto vendido</button>
            </div>
        </div>
        <page-loading v-else/>
    </section>
</template>

<script>

import { api } from "@/services/services.js"
import FinalizePurchase from "@/components/FinalizePurchase.vue"

export default {
    name: "ProductView",
    props: ["id"],
    components: {
        FinalizePurchase
    },
    data() {
        return {
            produto: null,
            finalize: false
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
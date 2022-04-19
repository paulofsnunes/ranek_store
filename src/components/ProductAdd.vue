<template>
    <form class="addProduct">
        <label for="nome">Nome</label>
        <input id="nome" nome="nome" type="text" v-model="produto.nome">
        <label for="preco">Preço (R$)</label>
        <input id="preco" nome="preco" type="number" v-model="produto.preco">
        <label for="fotos">Fotos</label>
        <input id="fotos" nome="fotos" type="file" ref="fotos">
        <label for="preco">Descrição</label>
        <textarea id="preco" nome="preco" v-model="produto.descricao"></textarea>
        <input class="btn" type="button" value="Adicionar Produto" @click.prevent="addProduct">
    </form>
</template>

<script>
import { api } from "@/services/services.js";

export default {
    name: "ProductAdd",
    data() {
        return {
            produto: {
                nome: "",
                preco: "",
                descricao: "",
                fotos: null,
                vendido: "false"
            }
        };
    },
    methods: {
        formateProduct() {
            this.produto.usuario_id = this.$store.state.usuario.id;
        },
        addProduct() {
            this.formateProduct();
            api.post("/produto", this.produto).then(() => {
                this.$store.dispatch("getUserProducts");
            });
        }
    }
};
</script>

<style scoped>
.addProduct {
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    margin-bottom: 60px;
}

.btn {
    grid-column: 2;
}
</style>
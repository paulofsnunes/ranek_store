<template>
    <section class="user">
        <nav class="sidenav">
            <ul>
                <li>
                    <router-link :to="{name: 'user'}">Produtos</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'purchases'}">Compras</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'sales'}">Vendas</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'user-edit'}">Editar Usuário</router-link>
                </li>
                <li>
                    <button @click.prevent="exit">Sair</button>
                </li>
            </ul>
        </nav>
        <transition mode="out-in">
            <router-view></router-view>
        </transition>
    </section>
</template>

<script>
export default {
    name: "UserView",
    methods: {
        exit() {
        this.$store.dispatch("exitUser");
        this.$router.push("/login");
        }
    }
};
</script>

<style>
</style>
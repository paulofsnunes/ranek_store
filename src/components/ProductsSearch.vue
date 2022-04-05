<template>
    <form>
        <input name="search" id="search" type="text" v-model="search">
        <input type="submit" id="magnifier" value="Buscar" @click.prevent="searchProducts">
    </form>
</template>

<script>
export default {
    name: "ProductsSearch",
    data() {
        return {
            search: ""
        }
    },
    methods: {
        searchProducts() {
            this.$router.push({ query: { q: this.search } })
        }
    }
}
</script>

<style scoped>

</style>
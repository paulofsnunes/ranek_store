<template>
    <section>
        <h2>Endereço de Envio</h2>
        <UserForm>
        <button class="btn" @click.prevent="finalizePurchase">Finalizar Compra</button>
        </UserForm>
    </section>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import { api } from "@/services/services.js";
import { mapState } from "vuex";

export default {
    name: "FinalizePurchase",
    components: {
        UserForm
    },
    props: ["produto"],
    computed: {
        ...mapState(["usuario"]),
        compra() {
            return {
                comprador_id: this.usuario.email,
                vendedor_id: this.produto.usuario_id,
                produto: this.produto,
                endereco: {
                cep: this.usuario.cep,
                rua: this.usuario.rua,
                numero: this.usuario.numero,
                bairro: this.usuario.bairro,
                cidade: this.usuario.cidade,
                estado: this.usuario.estado
                }
            };
        }
    },
    methods: {
        createTransaction() {
        return api.post("/transacao", this.compra)
            .then(() => {
                this.$router.push({ name: "purchases" });
            });
        },
        async createUser() {
            try {
                await this.$store.dispatch("createUser", this.$store.state.usuario);
                await this.$store.dispatch(
                "getUser",
                this.$store.state.usuario.email
                );
                await this.createTransaction();
            } catch (error) {
                console.log(error);
            }
        },
        finalizePurchase() {
            if (this.$store.state.login) {
                this.createTransaction();
            } else {
                this.createUser();
            }
        }
    }
};
</script>

<style scoped>
h2 {
    margin-top: 40px;
    margin-bottom: 20px;
}

.btn {
    background: #e80;
}
</style>
<template>
    <div>
        <div class="q-gutter-y-sm">
            <q-toolbar class="bg-green-10 text-white">
                <q-space />
                <q-btn 
                 v-for="link in links" :key="link.id" 
                    flat 
                    :label="link.name" 
                    :to="link.to"
                />
                <q-space />
            </q-toolbar>
        </div>
        <q-page-scroller 
            position="bottom-right" 
            :scroll-offset="20" 
            :offset="[18, 18]"
        >
            <q-btn 
                fab 
                icon="keyboard_arrow_up" 
                color="accent" 
            />
        </q-page-scroller>
    </div>
</template>

<script>
export default {
    data() {
        return {
            links: [
                { to: "/home", name: "Home"},
                { to: "", name: "About us"},
                { to: "", name: "Contact us"},
                { to: "", name: "Products"}
            ]
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


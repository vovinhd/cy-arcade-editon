<script>
    import "../app.css";
</script>

<div class="safearea">
    <main>
        <slot />
    </main>
</div>


<style lang="scss">
    .safearea {
        @apply pt-2
    }
</style>
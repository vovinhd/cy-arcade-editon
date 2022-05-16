<script>
import OutA from "$lib/components/out-a.svelte";
let delay = false

setTimeout(() => delay = true, 1000)
</script>
<div>
    Soviel Treibhausgas wird pro 100g erzeugtem Protein ausgestoßen

    <div class="grid grid-flow-row gap-4 chart py-8">
        <div class="bar">
            <span class="transition-all {delay ? "text-white" : "text-zinc-800"}">Rindfleisch 49.89 kg</span>
            <div class="progress bg-heart-dark w-[100%] "/>
        </div>
        <div class="bar ">
            <span>Käse 10.82 kg</span>

            <div class="progress bg-heart  w-[21%] "/>
        </div>
        <div class="bar">
            <span>Eier 4.21kg</span>
            <div class="progress bg-heart-light  w-[8%] "/>
        </div>
        <div class="bar">
            <span>Tofu 1.98 kg</span>
            <div class="progress bg-nature-light  w-[4%] "/>
        </div>
        <div class="bar">
            <span>Erbsen 0.44 kg</span>
            <div class="progress bg-nature w-[1%] 1"/>
        </div>
    </div>
</div>

siehe <OutA href="https://ourworldindata.org/grapher/ghg-per-protein-poore">ourworldindata.org</OutA>
<style lang="scss">

.bar {
    @apply 
        bg-zinc-300
        rounded-sm
        shadow-sm
        py-2
        overflow-clip
        relative
        h-10;
    span {
        @apply ml-4 z-10
    }
    * {
        @apply absolute
    }
}

.progress {
    opacity: 0;
    animation: growIn 1s ease forwards;
    transform-origin: top left;
    @apply h-full  top-0
}



@for $i from 0 through 5 {
    .chart :nth-child(#{$i + 1}) {
        animation-delay: 150ms * $i + 1s;
    }
}

@keyframes growIn {
    from {
        opacity: 1;
        transform: scaleX(0);
    }
    to {
        opacity: 1;
        transform: scaleX(1);
    }
}
</style>
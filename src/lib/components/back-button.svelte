<script lang="ts">
</script>

<div
    class="absolute z-10 grid place-content-center top-0 left-8 mt-8 text-2xl p-1 "
>
    <button
        class=""
        on:click={(e) => {
            console.log('Header back');
            history.back();
        }}
        ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19l-7-7 7-7"
            />
        </svg></button
    >
</div>

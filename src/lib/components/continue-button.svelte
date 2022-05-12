<script lang="ts">
    export let ready = false;
</script>

<div class:ready>
    <svg
        width="120"
        height="100"
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g id="continue_button">
            <path
                id="light-1"
                d="M58.6564 45.4205C60.614 46.5831 60.614 49.4169 58.6564 50.5795L15.0318 76.4857C13.032 77.6733 10.5 76.2321 10.5 73.9063L10.5 22.0937C10.5 19.7679 13.032 18.3267 15.0318 19.5143L58.6564 45.4205Z"
                fill-opacity="0.6"
            />
            <g id="dark">
                <path
                    id="dark-1"
                    d="M73.6563 45.4205C75.6139 46.5831 75.6139 49.4169 73.6563 50.5795L30.0317 76.4857C28.032 77.6733 25.4999 76.2321 25.4999 73.9063L25.4999 22.0937C25.4999 19.7679 28.032 18.3267 30.0317 19.5143L73.6563 45.4205Z"
                    fill-opacity="0.6"
                />
                <path
                    id="dark-2"
                    d="M58.6564 45.4205C60.614 46.5831 60.614 49.4169 58.6564 50.5795L15.0318 76.4857C13.032 77.6733 10.5 76.2321 10.5 73.9063L10.5 22.0937C10.5 19.7679 13.032 18.3267 15.0318 19.5143L58.6564 45.4205Z"
                    fill-opacity="0.8"
                />
            </g>
        </g>
    </svg>
</div>

<style lang="scss">
    :root {
        --dark-color: #e50046;
        --light-color: #dc7997;
    }

    svg {
        opacity: 0;

        cursor: pointer;
        animation: reveal 3s ease forwards;
        animation-delay: 3s;

    }

    #dark {
        fill:  var(--dark-color);
    }

    #light-1 {
        fill: var(--light-color);
    }

    #dark-1,
    #dark-2,
    #light-1 {
        animation-delay: 5s;

    }

    .ready {
        @apply animate-pulse;
    }

    #dark-2 {
        animation: dark-2 8s ease forwards;
    }

    #light-1 {
        animation: light 8s ease forwards;
    }
    #dark-1 {
        animation: dark-1 8s ease forwards;

    }


    @keyframes dark-1 {
        from {
            transform: translateX(20%);
        }
        70% {
            transform: translateX(20%);
        }
        to {
            transform: translateX(100%);
        }
    }

    @keyframes dark-2 {
        from {
            transform: translateX(-100%);
        }
        70% {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(20%);
        }
    }

    @keyframes light {
        from {
            transform: translateX(20%);
        }
        70% {
            transform: translateX(20%);
        }
        to {
            transform: translateX(40%);
        }
    }

    @keyframes reveal {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
</style>

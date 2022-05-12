<div>
    <p>
        Eine Umfrage des Bundesverbandes der deutschen Luftfahrt ergab, dass in den letzten zwei Jahren nur 43 % der Befragten überhaupt geflogen waren.
        <br/>
        25 % der Befragten waren einmal oder zweimal geflogen und 15 % der Befragten drei
        bis neunmal. Vielflieger, also Menschen, die 10 oder mehr Mal geflogen
        waren, gab es „nur“ 3 %. <!-- wieso ist das nur in scare-quotes-->
    </p>
    <br/>
    <!-- <p>
        Aus England gibt es noch genauere Zahlen zur Verteilung von Flügen: Hier
        verursachen nur <b>15 %</b> der Bevölkerung
        <b>75 % des Luftverkehrs</b>.
    </p> -->

    <div class=" p-8 relative h-full grid grid-flow-col place-content-center">

        <legend class="absolute legend w-full h-full">
            <div id="l-0" class="pill absolute -top-2 left-64" style="background-color: #E40045; --order: 4">10 oder mehr</div>    
            <div id="l-1" class="pill absolute top-8 left-48" style="background-color: #EC3A70; --order: 3">3-9</div>
            <div id="l-2" class="pill absolute top-40 left-32" style="background-color: #DB8CA4; --order: 2">1-2</div>
            <div id="l-3" class="pill absolute top-4 right-40" style="background-color: #95C11E; --order: 0">noch nie</div>
            <div id="l-4" class="pill absolute top-40 right-28" style="background-color: #AED14F; --order: 1">keine</div>
        </legend>

        <div class=" grid grid-flow-col place-content-center">
            <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="never" style="--order: 0" d="M50.0022 50V1C62.1588 1 73.8814 5.51893 82.8925 13.6788L50.0022 50Z" fill="#95C11E" stroke=" #95C11E"/>
                <path id="two-years" style="--order: 1" d="M50.0022 49.9999L82.8925 13.6787C102.952 31.8435 104.488 62.8306 86.3234 82.8902C68.521 102.55 38.3081 104.476 18.1529 87.2372L50.0022 49.9999Z" fill="#AED14F" stroke=" #95C11E"/>
                <path id="one" style="--order: 2" d="M50.0022 49.9999L18.1529 87.2373C-0.183868 71.5538 -4.37375 44.8554 8.27726 24.3088L50.0022 49.9999Z" fill="#DB8CA4" stroke=" #E40045"/>
                <path id="three" style="--order: 3" d="M50.0022 50L8.27728 24.309C15.6597 12.3191 27.8433 4.08443 41.7212 1.70483L50.0022 50Z" fill="#EC3A70" stroke=" #E40045"/>
                <path id="more" style="--order: 4" d="M50.0022 50L41.7211 1.70482C44.4565 1.23579 47.2268 1 50.0022 1V50Z" fill="#E40045" stroke=" #E40045"/>
            </svg>
        </div>

        <!-- <legend class="grid grid-flow-row gap-4">
            <div style="color: #95C11E">noch nie</div>
            <div style="color: #AED14F">keine in den letzten 2 Jahren</div>
        </legend> -->

    </div>
</div>


<style lang="scss">
    #never,
    #two-years,
    #one,
    #three,
    #more {
        opacity: 0;
        animation: fadeInUp 1s ease forwards ;
        animation-delay: calc(var(--order) * 200ms + 1s) ;
    }

    #l-0,#l-1,#l-2,#l-3,#l-4 {
        opacity: 0;
        animation: fadeInDown 1s ease forwards ;
        animation-delay: calc(var(--order) * 200ms + 1s) ;

    }

    .pill {
        @apply rounded-full shadow-sm px-2 text-white
    }

    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-20%);
        }
        to {
            opacity: 1;
            transform: translateY(0%);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20%);
        }
        to {
            opacity: 1;
            transform: translateY(0%);
        }
    }
</style>
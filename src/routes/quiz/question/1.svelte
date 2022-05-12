<script lang="ts">
    import MultipleChoiceButton from "$lib/components/multiple-choice-button.svelte";

    import QuestionLayout from "$lib/components/question-layout.svelte";
</script>

<QuestionLayout id="1" let:selectAnswer>
    <div slot="question">
        Welche Proteinquelle hat den höchsten Treibhausgasaustoß?
    </div>
    <div class="grid grid-cols-2 answers" slot="answers" id="ans1">
        <div id="ans1" class="grid">
            <MultipleChoiceButton
                class="answer transition-colors p-8 rounded-md shadow-md bg-zinc-100 active:bg-zinc-300  ml-8 mr-4 mb-8 text-2xl"
                answer={{ answerText: "Tofu", correct: false }}
                callback={selectAnswer}
            />
        </div>
        <div id="ans2" class="grid">
            <MultipleChoiceButton
                class="answer transition-colors p-8 rounded-md shadow-md bg-zinc-100 active:bg-zinc-300  ml-4 mr-8 mb-8 text-2xl"
                answer={{ answerText: "Rindfleisch", correct: true }}
                callback={selectAnswer}
            />
        </div>

        <div id="ans3" class="grid">
            <MultipleChoiceButton
                class="answer transition-colors p-8 rounded-md shadow-md bg-zinc-100 active:bg-zinc-300  ml-8 mr-4 text-2xl"
                answer={{ answerText: "Eier", correct: true }}
                callback={selectAnswer}
            />
        </div>

        <div id="ans4" class="grid">
            <MultipleChoiceButton
                class="answer transition-colors p-8 rounded-md shadow-md bg-zinc-100 active:bg-zinc-300 ml-4 mr-8 text-2xl"
                answer={{ answerText: "Erbsen", correct: false }}
                callback={selectAnswer}
            />
        </div>
    </div>
</QuestionLayout>

<style lang="scss">


    .answers > * {
        opacity: 0;
        animation: fadeInUp 1s ease forwards;
        // animation-delay: calc(var(--transition-delay) * 250ms);
    }

    @for $i from 0 through 20 {
    .answers :nth-child(#{$i + 1}) {
      animation-delay: 150ms * $i;
    }
  }
</style>

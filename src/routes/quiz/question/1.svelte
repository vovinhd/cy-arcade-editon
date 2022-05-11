<script lang="ts">
    import QuestionLayout from "$lib/components/question-layout.svelte";
    import MultipleChoiceButton from "$lib/components/multiple-choice-button.svelte";
    let button1, button2, button3, button4;
</script>

<QuestionLayout id="1" let:selectAnswer>
    <span slot="question"> Frage 1 </span>
    <div class="grid grid-cols-2" slot="answers">
        <MultipleChoiceButton
            class="transition-colors p-8 rounded-md shadow-md bg-zinc-100 active:bg-zinc-300  ml-8 mr-4 mb-8"
            answer={{ answerText: "Antwort 1", correct: false }}
            callback={selectAnswer}
        />
        <MultipleChoiceButton
            class="transition-colors p-8 rounded-md shadow-md bg-zinc-100 active:bg-zinc-300  ml-4 mr-8 mb-8"
            answer={{ answerText: "Antwort 2", correct: true }}
            callback={selectAnswer}
        />
        <MultipleChoiceButton
            class="transition-colors p-8 rounded-md shadow-md bg-zinc-100 active:bg-zinc-300  ml-8 mr-4"
            answer={{ answerText: "Antwort 3", correct: false }}
            callback={selectAnswer}
        />
        <MultipleChoiceButton
            class="transition-colors p-8 rounded-md shadow-md bg-zinc-100 active:bg-zinc-300 ml-4 mr-8"
            answer={{ answerText: "Antwort 4", correct: false }}
            callback={selectAnswer}
        />
    </div>
</QuestionLayout>

<style lang="scss">
    .answer-button:active {
        @apply bg-zinc-300;
    }
</style>

<script lang="ts">
import MultipleChoiceButton from "$lib/components/multiple-choice-button.svelte";

    import QuestionLayout from "$lib/components/question-layout.svelte";
    const makeAnswer = (e: Event, correct) => {
        const eventTarget = <HTMLButtonElement>(e.target);
        const answerText  = eventTarget.innerText;
        console.log(answerText, correct);
        return {
            answerText, correct
        }
    }

</script>

<div>
<QuestionLayout id="2" let:selectAnswer>
    <span slot="question"> Wieviel Prozent der Bevölkerung ist in den letzten 2 Jahren geflogen? </span>
    <div class="grid grid-cols-2" slot="answers">
        <MultipleChoiceButton
            class="transition-colors p-8 rounded-md shadow-md bg-zinc-100 active:bg-zinc-300  ml-8 mr-4 mb-8"
            answer={{ answerText: "23%", correct: false }}
            callback={selectAnswer}
        />
        <MultipleChoiceButton
            class="transition-colors p-8 rounded-md shadow-md bg-zinc-100 active:bg-zinc-300  ml-4 mr-8 mb-8"
            answer={{ answerText: "43%", correct: true }}
            callback={selectAnswer}
        />
        <MultipleChoiceButton
            class="transition-colors p-8 rounded-md shadow-md bg-zinc-100 active:bg-zinc-300  ml-8 mr-4"
            answer={{ answerText: "69%", correct: true }}
            callback={selectAnswer}
        />
        <MultipleChoiceButton
            class="transition-colors p-8 rounded-md shadow-md bg-zinc-100 active:bg-zinc-300 ml-4 mr-8"
            answer={{ answerText: "87%", correct: false }}
            callback={selectAnswer}
        />
    </div>

</QuestionLayout>
</div>

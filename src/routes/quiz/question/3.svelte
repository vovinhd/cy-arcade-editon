<script lang="ts">
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
<QuestionLayout id="3" let:selectAnswer>
    <span slot="question"> Frage 3 </span>
    <div slot="answers">
        <button class="answer-button" on:click={(e) => selectAnswer(makeAnswer(e, false))}> Antwort 1 </button>
        <button class="answer-button" on:click={(e) => selectAnswer(makeAnswer(e, false))}> Antwort 2 </button>
        <button class="answer-button" on:click={(e) => selectAnswer(makeAnswer(e, false))}> Antwort 3 </button>
        <button class="answer-button" on:click={(e) => selectAnswer(makeAnswer(e, false))}> Antwort 4 </button>
    </div>
</QuestionLayout>
</div>

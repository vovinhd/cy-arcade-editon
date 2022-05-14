<script lang="ts">
    import MultipleChoiceButton from "$lib/components/multiple-choice-button.svelte";

    import QuestionLayout from "$lib/components/question-layout.svelte";
</script>

<div class="h-full relative pb-4 overflow-clip">
    <div class="absolute w-full h-full bg-gradient-to-tl from-white via-white to-[#e5f5ce] inset-0 rounded-md">
        <div class="absolute -top-8 -left-8 w-80 h-80 rounded-full overflow-clip opacity-20 -rotate-12">
            <img src="/Ernaehrung.jpeg" alt="Ernaehrung-logo" class="rounded-full" />
        </div>
        <QuestionLayout id="1" let:selectAnswer>
            <div slot="question">
                Welche dieser Proteinquellen hat den höchsten
                Treibhausgasaustoß?
            </div>
            <div
                class="grid grid-cols-2 answers stagger"
                slot="answers"
                id="ans1"
            >
                <div id="ans1" class="grid">
                    <MultipleChoiceButton
                        class="multiple-choice-answer"
                        answer={{ answerText: "Tofu", correct: false }}
                        callback={selectAnswer}
                    />
                </div>
                <div id="ans2" class="grid">
                    <MultipleChoiceButton
                        class="multiple-choice-answer"
                        answer={{ answerText: "Rindfleisch", correct: true }}
                        callback={selectAnswer}
                    />
                </div>

                <div id="ans3" class="grid">
                    <MultipleChoiceButton
                        class="multiple-choice-answer"
                        answer={{ answerText: "Eier", correct: false }}
                        callback={selectAnswer}
                    />
                </div>

                <div id="ans4" class="grid">
                    <MultipleChoiceButton
                        class="multiple-choice-answer"
                        answer={{ answerText: "Erbsen", correct: false }}
                        callback={selectAnswer}
                    />
                </div>
            </div>
        </QuestionLayout>
    </div>
</div>

<style lang="scss">
    .answers > * {
        opacity: 0;
        animation: fadeInUp 1s ease forwards;
        // animation-delay: calc(var(--transition-delay) * 250ms);
    }

    @for $i from 0 through 20 {
        .answers :nth-child(#{$i + 1}) {
            animation-delay: 200ms * $i;
        }
    }
</style>

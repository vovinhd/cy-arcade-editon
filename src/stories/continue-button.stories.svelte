<script>
  // @ts-ignore
  import { Meta, Story } from '@storybook/addon-svelte-csf'

  import ContinueButton from '../lib/components/continue-button.svelte'
</script>

<!-- Button.stories.svelte -->
<Meta title="components/ContinueButton" component={ContinueButton} />

<Story name="Primary">
  <ContinueButton ready />
</Story>

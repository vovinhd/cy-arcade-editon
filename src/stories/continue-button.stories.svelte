<!-- Button.stories.svelte -->

<script>
    import { Meta, Story } from '@storybook/addon-svelte-csf';
  
    import ContinueButton from '../lib/components/continue-button.svelte'
  </script>
  
<Meta title="components/ContinueButton" component={ContinueButton} />

<Story name="Primary">
<ContinueButton ready />
</Story>
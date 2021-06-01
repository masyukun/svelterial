<svelte:head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</svelte:head>


<script>
  import { onDestroy, onMount } from "svelte";
	import { createEventDispatcher } from 'svelte';

  import { MDCRipple } from "@material/ripple";
  import { MDCIconButtonToggle } from '@material/icon-button';


  // Svelte event dispatcher
  const dispatchSvelteEvent = createEventDispatcher();

  // Internal variables
  let isToggle;
  let iconButtonObject;
  let iconButtonRipple;
  let iconToggle;
  const debuggingMessages = false;

  // Props
  export let showRipple = true;
  export let ariaLabel = "icon-button";
  export let mdcIcon = undefined, imgIcon = undefined, svgIcon = undefined;
  export let ariaLabelToggled = undefined, mdcIconToggled = undefined, imgIconToggled = undefined, svgIconToggled = undefined;
  export let toggled = false;

  // If any of the toggle props are used, make the button toggleable
  $: isToggle = !!ariaLabelToggled || !!mdcIconToggled || !!imgIconToggled || !!svgIconToggled || false;


  // Component Initialization
  onMount(() => {
    // Use Material Ripple animations
    if (showRipple) {
      iconButtonRipple = new MDCRipple(iconButtonObject)
      iconButtonRipple.unbounded = true;
    }

    // Make it a toggle button
    if (isToggle) {
      iconToggle = new MDCIconButtonToggle(iconButtonObject);

      // Set the component's initial toggle state
      iconToggle.on = toggled;

      // Set the component's toggle event listener
      iconToggle.listen('MDCIconButtonToggle:change', (event) => {
        if (debuggingMessages) console.log(`Icon button toggle state changed!`);
        // if (debuggingMessages) console.log(`iconToggle.on = ${iconToggle.on}`);
        if (debuggingMessages) console.log(`event.detail = ${JSON.stringify(event.detail)}`);
        emitToggleState(event.detail);
      });
    }
  });

  onDestroy(() => {});

  // Emits a Svelte event "MDCIconButtonToggle" whenever the Icon-Button is toggled
  // Example payload = {"detail": {"isOn": boolean}}
	function emitToggleState(toggleState) {
		dispatchSvelteEvent('MDCIconButtonToggle', toggleState);
    toggled = toggleState.isOn;
	}


</script>


<button 
  bind:this={iconButtonObject} 
  on:click
  class="mdc-icon-button" 
  class:mdc-icon-button--on={toggled} 
  aria-label={ariaLabel} 
  data-aria-label-off={(!!ariaLabelToggled) ? ariaLabel : undefined} 
  data-aria-label-on={ariaLabelToggled || undefined} 
  aria-pressed={(!ariaLabelToggled) ? toggled : undefined} 
>
  <!-- Show the ripple animation or not -->
  {#if showRipple}
    <div class="mdc-icon-button__ripple"></div>
  {/if}

  <!-- Show a Material Design icon -->
  {#if !!mdcIcon}
    {#if !!mdcIconToggled}
      <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">{mdcIconToggled}</i>
    {/if}
    <i class="material-icons mdc-icon-button__icon">{mdcIcon}</i>
  
  <!-- Show an SVG icon -->
  {:else if !!svgIcon}
    {#if !!svgIconToggled}
      <svg class="mdc-icon-button__icon mdc-icon-button__icon--on"><path d={svgIconToggled}/></svg>
    {/if}
    <svg class="mdc-icon-button__icon"><path d={svgIcon}/></svg>

  <!-- Show an IMG element icon -->
  {:else if !!imgIcon}
    {#if !!imgIconToggled}
      <img src={imgIconToggled} class="mdc-icon-button__icon mdc-icon-button__icon--on" alt={ariaLabel} />
    {/if}
    <img src={imgIcon} class="mdc-icon-button__icon" alt={ariaLabel} />
  
  <!-- No icon specified -->
  {:else}
    &nbsp; 
  {/if}
</button>




<style lang="scss" global>

@use "@material/icon-button";
@use '@material/ripple';

</style>
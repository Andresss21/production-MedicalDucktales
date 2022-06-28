<script>
    import Icon from "./Icon.svelte";
    export let path;
    let crumbs;

    $: {
        // Remove zero-length tokens.
        const tokens = path.split('/').filter((t) => t !== '');

        // Create { label, href } pairs for each token.
        let tokenPath = '';
        crumbs = tokens.map((t) => {
            tokenPath += '/' + t;
            return {
                label: t,
                href: tokenPath,
            };
        });

        // Add a way to get home too.
        crumbs.unshift({ label: 'home', href: '/' });
    }
</script>

<Icon name="bookmark" width="1.5em" height="1.5em" stroke="currentColor" strokeWidth="2" />
<div class="text-sm breadcrumbs">
    <ul>
        {#each crumbs as c, i}
        {#if i == crumbs.length-1}
        <li><p> {c.label} </p></li>
        {:else}
        <li><p> {c.label} </p></li>
        {/if}
    {/each}
    </ul>
  </div>

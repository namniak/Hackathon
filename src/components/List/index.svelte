<script>
	import {currCountryOpen} from '../../stores.js';
	
	export let data;
</script>

{#if data}
	<ul class="List">
		{#each data as item, i}
			<li on:click={() => {
					$currCountryOpen = item;
				}} class="item">
				<img src={item?.flags?.svg} width="50px"/>
				<div class="copy">
					{item?.name?.common} <br/> {item?.continents}
				</div>
			</li>
		{/each}
	</ul>
{/if}

<style type="text/scss">
	@import './index';
</style>

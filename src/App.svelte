<script>
	import {get} from 'svelte/store';
	
	import List from "./components/List/index.svelte";
	import Country from "./components/Country/index.svelte";
	
	import {noResults, searchQuery, searchResults, pinnedList, currCountryOpen} from './stores.js';
	
	const API = 'https://restcountries.com/v3.1';
	
	let getDefaultList = async function () {
		if (get(searchQuery)) return;
		
		const list = await fetch(`${API}/all`)
				.then(response => response.json())
				.catch(error => {
					console.error('Fetch error:', error);
				});
		$searchResults = list.slice(0, 10);
	}
	
	let setCurrSearchResult = async function () {
		if (!get(searchQuery)) return;
		
		const list = await fetch(`${API}/name/${get(searchQuery)}`)
				.then(response => response.json())
				.catch(error => {
					console.error('Fetch error:', error);
				});
		
		if (list?.status === 404) {
			console.warn('not found');
			$noResults = true;
		} else {
			$noResults = false;
			$searchResults = list.slice(0, 10);
		}
	}
	
	$: {
		$searchResults = $searchResults.map(s => {
			const contains = $pinnedList?.filter(({cca2}) => cca2 === s.cca2);
			return contains.length ? null : s;
		}).filter(Boolean);
	}
	
	$: {
		if (!$searchQuery) {
			getDefaultList();
		}
	}
	
	$: {
		if (!$currCountryOpen) {
			$searchQuery = '';
			$noResults = false;
			getDefaultList();
		}
	}

</script>

<main>
	<nav>
		<div on:click={()=>{
			$currCountryOpen = null;
		}} class="home">
			<div>Countries of the world</div>
			<div>Hackathon</div>
		</div>
	</nav>
	
	{#if $currCountryOpen}
		<Country/>
	{:else}
		
		<input
				placeholder="Search for a country"
				on:input={(e)=> {
				$searchQuery = e.target.value;
				setCurrSearchResult();
			}} class="search"
		/>
		
		{#if $pinnedList.length}
			<h3 class="pinned">Pinned</h3>
			<List data={$pinnedList}/>
			<hr/>
		{/if}
		
		{#if $noResults}
			<h2 class="noresults">No results</h2>
		{:else}
			<List data={$searchResults}/>
		{/if}
	
	{/if}

</main>

<style type="text/scss">
	@import './App';
</style>


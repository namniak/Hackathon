<script>
	import {currCountryOpen, pinnedList} from "../../stores";
	
	let pinned = !!$pinnedList.filter(({cca2}) => cca2 === $currCountryOpen.cca2).length;
	let disabled = $pinnedList.length >= 5 && !pinned;
	
	let handlePin = function () {
		const tempList = [...$pinnedList];
		
		if (pinned) {
			$pinnedList = tempList?.filter(({cca2}) => cca2 !== $currCountryOpen.cca2);
			pinned = false;
			return;
		}
		
		if ($pinnedList.length >= 5) {
			console.warn('limit exceeded');
			return;
		}
		
		const matched = !!tempList.filter(({cca2}) => cca2 === $currCountryOpen.cca2).length;
		if (!matched) {
			tempList.push($currCountryOpen);
			$pinnedList = tempList;
			pinned = true;
		}
	}
</script>

{#if $currCountryOpen}
	<div class="Country">
		<button on:click={handlePin} {disabled}>{pinned ? 'Unpin it' : 'Pin it'}</button>
		<div class="block">
			<aside>
				<h1>{$currCountryOpen?.name?.common}</h1>
				<img src={$currCountryOpen?.flags?.svg} width="50px" alt={`flag ${$currCountryOpen?.name?.common}`}/>
			</aside>
			
			<article>
				<p><b>Native Name:</b> {$currCountryOpen?.name?.nativeName?.spa?.official ?? 'N/A'}</p>
				<p><b>Population:</b> {$currCountryOpen?.population ?? 'N/A'}</p>
				<p><b>Continents:</b> {$currCountryOpen?.continents ?? 'N/A'}</p>
				<p><b>Capital:</b> {$currCountryOpen?.capital ?? 'N/A'}</p>
				<p><b>Languages:</b> {Object.values($currCountryOpen?.languages)?.join(', ') ?? 'N/A'}</p>
				<p>
					<b>Currencies:</b> {Object.entries($currCountryOpen?.currencies)?.map(([key, value]) => `${key} (${value?.name})`)?.join(', ') ?? 'N/A'}
				</p>
				<p><b>Borders:</b> TODO</p>
			</article>
		</div>
	</div>
{/if}

<style type="text/scss">
	@import './index';
</style>


<script context="module">
  import { variables } from '../../../../variables';
  export async function load({ params, fetch, session, stuff }) {
    const url = variables.apiUri + `/products/${params.id}`;
    const url2 = variables.apiUri + `/inventory_types`;

    const response = await fetch(url);
    const response2 = await fetch(url2);

    return {
      status: response.status, 
      status2: response2.status2,
      props: {
        data: response.ok && (await response.json()),
        Optiondata: response2.ok && (await response2.json())
      }
    };
  }

</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import Icon from '../../../../components/helpers/Icon.svelte';
import { JSONAPISerializer } from 'miragejs';
import { each } from 'svelte/internal';
  export let data;
  export let Optiondata
  let result = null
	
	async function doPatch () {
    const url = variables.apiUri + `/products/${data.inventory.id}`;
    console.log(JSON.stringify(data.inventory));
		const res = await fetch(url, {
			method: 'PATCH',
			body: JSON.stringify(data.inventory),
		})
		
		const json = await res.json()
		result = JSON.stringify(json)
    goto('/inventory/products')
	}
</script>

<div class="card bg-neutral card-bordered w-100 lg:w-1/4 m-auto">
  <div class="card-body text-neutral-content">

    <div class="card-title">
      <a href="/inventory/products/" class="btn btn-active btn-ghost btn-xs">
        <Icon
          name="arrow-left"
          width="1.5em"
          height="1.5em"
          stroke="currentColor"
          strokeWidth="2"
        />
        Volver
      </a>
    </div>

    <div class="card-title mt-4">
      <Icon
        name="table"
        width="1.5em"
        height="1.5em"
        stroke="white"
        strokeWidth="1"
      />
      Editar producto 
    </div>
    <div class="overflow-x-auto">
      <div class="flex flex-col items-center">
        <div class="form-control w-full max-w-xs w-100">  
          <label for="name" class="label">
            <span class="label-text">Nombre</span>
          </label>
          <input name="name" type="text" placeholder="Nombre..." class="input w-full max-w-xs" bind:value="{data.inventory.product}">
        </div>
        <div class="form-control w-full max-w-xs w-100 mt-5">
          <label for="type" class="label">
            <span class="label-text">Presentación</span>
          </label>
          <select name="type" class="select w-full max-w-xs" bind:value="{data.inventory.typeInventoryId}">
            <option selected disabled>{data.inventory.typeInventoryId}</option>
            {#each Optiondata.inventoryTypes as row}
              <option value="{row.name}">{row.name}</option>
            {/each}
          </select>
        </div>
        <div class="form-control w-full max-w-xs w-100 mt-5">
          <label for="count" class="label">
            <span class="label-text">Cantidad</span>
          </label>
          <input name="count" type="number" min="1" step="1" placeholder="Cantidad..." class="input w-full max-w-xs" bind:value="{data.inventory.stock}">
        </div>
        <div class="form-control w-full max-w-xs w-100 mt-10">
          <button class="btn btn-accent btn-block" on:click={doPatch}>
            <Icon
              name="edit"
              width="1.5em"
              height="1.5em"
              stroke="currentColor"
              strokeWidth="1"
            />
            <span class="ml-2">  
              Editar producto
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

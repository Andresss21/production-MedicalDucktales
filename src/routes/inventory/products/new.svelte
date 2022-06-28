<script context="module">
  import { variables } from '../../../variables';
  export async function load({ params, fetch, session, stuff }) {
    const url = variables.apiUri + `/inventory_types`;

    const response = await fetch(url);

    return {
      status: response.status, 
      props: {
        Optiondata: response.ok && (await response.json())
      }
    };
  }
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import Icon from '../../../components/helpers/Icon.svelte';
  export let Optiondata
  let data = {
    inventory: {
      id: '',
      product: '',
      typeInventoryId: '',
      stock: ''
    }
  };
  let result = null
	
	async function doPost () {
    const url = variables.apiUri + `/products`;
    
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data.inventory),
		})
		
		const json = await res.json()
		result = JSON.stringify(json)
    console.log(result);
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
      Agregar producto 
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
            <option selected disabled>opcion...</option>
            {#each Optiondata.inventoryTypes as row}
              <option value="{row.name}">{row.name}</option>
            {/each}
            <!-- <option value="">Analgesico-solido</option>
            <option value="">somnifero-jarabe</option> -->
          </select>
        </div>
        <div class="form-control w-full max-w-xs w-100 mt-5">
          <label for="count" class="label">
            <span class="label-text">Cantidad</span>
          </label>
          <input name="count" type="number" min="0.5" step="0.5" placeholder="Cantidad..." class="input w-full max-w-xs" bind:value="{data.inventory.stock}">
        </div>
        <div class="form-control w-full max-w-xs w-100 mt-10">
          <button class="btn btn-accent btn-block" on:click={doPost}>
            <Icon
              name="plus"
              width="1.5em"
              height="1.5em"
              stroke="currentColor"
              strokeWidth="1"
            />
            <span class="ml-2">  
              Agregar producto
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

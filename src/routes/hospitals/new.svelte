<script context="module">
  import Cookies from 'js-cookie';
  import { variables } from '../../variables';
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import Icon from '../../components/helpers/Icon.svelte';
  let data = {
    id: '',
    name: '',
    address: ''
  };
	
	async function doPost () {
		await fetch(`${variables.apiUri}/hospitals`, {
			method: 'POST',
			body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": Cookies.get('token')
      }
		})

    goto('/hospitals')
	}
</script>

<div class="card bg-neutral card-bordered w-100 lg:w-1/4 m-auto">
  <div class="card-body text-neutral-content">

    <div class="card-title">
      <a href="/hospitals" class="btn btn-active btn-ghost btn-xs">
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
        name="home"
        width="1.5em"
        height="1.5em"
        stroke="white"
        strokeWidth="1"
      />
      Agregar hospital 
    </div>
    <div class="overflow-x-auto">
      <div class="flex flex-col items-center">
        <div class="form-control w-full max-w-xs w-100">
          <label for="name" class="label">
            <span class="label-text">Nombre</span>
          </label>
          <input name="name" type="text" placeholder="Nombre..." class="input w-full max-w-xs" bind:value="{data.name}">
        </div>
        <div class="form-control w-full max-w-xs w-100 mt-5">
          <label for="address" class="label">
            <span class="label-text">Dirección</span>
          </label>
          <textarea name="address" class="textarea" placeholder="Dirección..." bind:value="{data.address}"></textarea>
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
              Agregar hospital
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

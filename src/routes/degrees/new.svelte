<script context="module">
  import { variables } from '../../variables';
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import Icon from '../../components/helpers/Icon.svelte';
  let data = {
    degree: {
      id: '',
      degree: ''
    }
  };
  let result = null
	
	async function doPost () {
    const url = variables.apiUri + `/degrees`;
    console.log(JSON.stringify(data.degree));
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data.degree),
		})
		
		const json = await res.json()
		result = JSON.stringify(json)
    goto('/degrees')
	}
</script>

<div class="card bg-neutral card-bordered w-100 lg:w-1/4 m-auto">
  <div class="card-body text-neutral-content">

    <div class="card-title">
      <a href="/degrees" class="btn btn-active btn-ghost btn-xs">
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
      Agregar especialidad 
    </div>
    <div class="overflow-x-auto">
      <div class="flex flex-col items-center">
        <div class="form-control w-full max-w-xs w-100">
          <label for="name" class="label">
            <span class="label-text">Especialidad</span>
          </label>
          <input name="name" type="text" placeholder="Especialidad..." class="input w-full max-w-xs" bind:value="{data.degree.degree}">
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
              Agregar especialidad
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

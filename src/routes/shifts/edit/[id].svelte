<script context="module">
  import { variables } from '../../../variables';
  export async function load({ params, fetch, session, stuff }) {
    const url = variables.apiUri + `/shifts/${params.id}`;
    const response = await fetch(url);

    return {
      status: response.status,
      props: {
        data: response.ok && (await response.json())
      }
    };
  }
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import Icon from '../../../components/helpers/Icon.svelte';
  export let data;
  let result = null;
	
	async function doPatch () {
    const url = variables.apiUri + `/shifts/${data.shift.id}`;
    console.log(JSON.stringify(data.shift));
		const res = await fetch(url, {
			method: 'PATCH',
			body: JSON.stringify(data.shift),
		})
		
		const json = await res.json()
		result = JSON.stringify(json)
    goto('/shifts')
	}
</script>

<div class="card bg-neutral card-bordered w-100 lg:w-1/4 m-auto">
  <div class="card-body text-neutral-content">

    <div class="card-title">
      <a href="/shifts" class="btn btn-active btn-ghost btn-xs">
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
        name="calendar"
        width="1.5em"
        height="1.5em"
        stroke="white"
        strokeWidth="1"
      />
      Editar Horario 
    </div>
    <div class="overflow-x-auto">
      <div class="flex flex-col items-center">
        <div class="form-control w-full max-w-xs w-100">
          <label for="checkInTime" class="label">
            <span class="label-text">Hora de entrada</span>
          </label>
          <input name="checkInTime" type="time" placeholder="Hora de entrada..." class="input w-full max-w-xs" bind:value="{data.shift.checkInTime}">
        </div>
        <div class="form-control w-full max-w-xs w-100">
          <label for="checkOutTime" class="label">
            <span class="label-text">Hora de salida</span>
          </label>
          <input name="checkOutTime" type="time" placeholder="Hora de entrada..." class="input w-full max-w-xs" bind:value="{data.shift.checkOutTime}">
        </div>
        <div class="form-control w-full max-w-xs w-100 mt-5">
          <label for="test" class="label">
            <span class="label-text">Dias</span>
          </label>
          {#each Object.entries(data.shift.days) as [key, value]}
            <div>
              <input 
                type="checkbox"
                name="{key}" 
                bind:checked="{value}" 
                on:change="{() => { 
                  data.shift.days[key] = !data.shift.days[key] 
                }}"
              > 
              <label for="{key}" class="capitalize">{key}</label>
            </div>
          {/each}
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
              Editar Horario
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

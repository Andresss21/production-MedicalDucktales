<script context="module">
  import { variables } from '../../variables';
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import Icon from '../../components/helpers/Icon.svelte';
  let currentDate = new Date();
  let data = {
    shifts: {
      id: '',
      checkInTime: currentDate.getHours() + ':' + currentDate.getMinutes(),
      checkOutTime: currentDate.getHours() + ':' + currentDate.getMinutes(),
      days: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
      }
    }
  };
  let result = null
	
	async function doPost () {
    const url = variables.apiUri + `/shifts`;
    
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data.shifts),
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
      Agregar Horarios 
    </div>
    <div class="overflow-x-auto">
      <div class="flex flex-col items-center">
        <div class="form-control w-full max-w-xs w-100">
          <label for="checkInTime" class="label">
            <span class="label-text">Hora de entrada</span>
          </label>
          <input name="checkInTime" type="time" placeholder="Hora de entrada..." class="input w-full max-w-xs" bind:value="{data.shifts.checkInTime}">
        </div>
        <div class="form-control w-full max-w-xs w-100">
          <label for="checkOutTime" class="label">
            <span class="label-text">Hora de salida</span>
          </label>
          <input name="checkOutTime" type="time" placeholder="Hora de entrada..." class="input w-full max-w-xs" bind:value="{data.shifts.checkOutTime}">
        </div>
        <div class="form-control w-full max-w-xs w-100 mt-5">
          <label for="test" class="label">
            <span class="label-text">Dias</span>
          </label>
          {#each Object.entries(data.shifts.days) as [key, value]}
            <div>
              <input 
                type="checkbox"
                name="{key}" 
                bind:checked="{value}" 
                on:change="{() => { 
                  data.shifts.days[key] = !data.shifts.days[key] 
                }}"
              > 
              <label for="{key}" class="capitalize">{key}</label>
            </div>
          {/each}
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
              Agregar Horario
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

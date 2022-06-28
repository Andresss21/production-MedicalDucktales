<script context="module">
  import { variables } from '../../variables';
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
  import Icon from '../../components/helpers/Icon.svelte';
  export let data;
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
      Ver Horario 
    </div>
    <div class="overflow-x-auto">
      <div class="flex flex-col items-center">
        <div class="form-control w-full max-w-xs w-100">
          <label for="checkInTime" class="label">
            <span class="label-text">Hora de entrada</span>
          </label>
          <input name="checkInTime" type="time" placeholder="Hora de entrada..." class="input w-full max-w-xs" bind:value="{data.shift.checkInTime}" disabled>
        </div>
        <div class="form-control w-full max-w-xs w-100">
          <label for="checkOutTime" class="label">
            <span class="label-text">Hora de salida</span>
          </label>
          <input name="checkOutTime" type="time" placeholder="Hora de entrada..." class="input w-full max-w-xs" bind:value="{data.shift.checkOutTime}" disabled>
        </div> 
        <div class="form-control w-full max-w-xs w-100 mt-5">
          <label for="test" class="label">
            <span class="label-text">Dias</span>
          </label>
          <div class="flex flex-col">
              {#each Object.entries(data.shift.days) as [key, value]}
                {#if value}
                  <span class="bg-cyan-200 px-2 py-2 mx-1 my-2 rounded-2xl capitalize">
                    {value ? key : ''}
                  </span>
                {/if}
              {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

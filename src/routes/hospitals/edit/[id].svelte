<script context="module">
  import Cookies from 'js-cookie';
  import { variables } from '../../../variables';
  export async function load({ params, fetch }) {
    const response = await fetch(`${variables.apiUri}/hospitals/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Cookies.get('token')
      }
    });

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
	
	async function doPatch () {
    await fetch(`${variables.apiUri}/hospitals/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify(data)
    });
		
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
      Editar hospital 
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
          <button class="btn btn-accent btn-block" on:click={doPatch}>
            <Icon
              name="edit"
              width="1.5em"
              height="1.5em"
              stroke="currentColor"
              strokeWidth="1"
            /> 
            <span class="ml-2">  
              Editar hospital
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

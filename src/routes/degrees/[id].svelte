<script context="module">
  import { variables } from '../../variables';
  export async function load({ params, fetch, session, stuff }) {
    const url = variables.apiUri + `/degrees/${params.id}`;
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
      Ver especialidad 
    </div>
    <div class="overflow-x-auto">
      <div class="flex flex-col items-center">
        <div class="form-control w-full max-w-xs w-100">
          <label for="name" class="label">
            <span class="label-text">Especialidad</span>
          </label>
          <input name="name" type="text" placeholder="Especialidad..." class="input w-full max-w-xs" value="{data.degree.degree}" disabled>
        </div>
      </div>
    </div>
  </div>
</div>

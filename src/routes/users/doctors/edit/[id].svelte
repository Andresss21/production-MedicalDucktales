<script context="module">
    import { variables } from '../../../../variables';
    export async function load({ params, fetch, session, stuff }) {
      const url = variables.apiUri + `/doctors/${params.id}`;
      const url2 = variables.apiUri + `/users`;
      const url3 = variables.apiUri +  `/degrees`;

      const response = await fetch(url);
      const response2 = await fetch(url2);
      const response3 = await fetch(url3);
  
      return {
        status: response.status,
        status2: response2.status2, 
        status3: response3.status3,
        props: {
          data: response.ok && (await response.json()),
          Optiondata2: response2.ok && (await response2.json()),
          Optiondata3: response3.ok && (await response3.json())
        }
      };
    }
  </script>
  
  <script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import Icon from '../../../../components/helpers/Icon.svelte';
    export let data;
    export let Optiondata2;
    export let Optiondata3;
    let result = null
    

      async function doPatch () {

        const url = variables.apiUri + `/doctors/${data.doctor.id}`;

        console.log(JSON.stringify(data.doctor));
          const res = await fetch(url, {
              method: 'PATCH',
              body: JSON.stringify(data.doctor),
              
          })
          
          const json = await res.json()
          result = JSON.stringify(json)
        goto('/users/doctors')
      }
  </script>
  
  <div class="card bg-neutral card-bordered w-100 lg:w-1/2 m-auto">
    <div class="card-body text-neutral-content">
  
      <div class="card-title">
        <a href="/users/doctors/" class="btn btn-active btn-ghost btn-xs">
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
        Editar Doctor
      </div>
      <div class="overflow-x-auto">
        <div class="flex flex-col items-center">
            <div class="flex flex-wrap w-full pl-5 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="presentation" class="label">
                        <span class="label-text">Usuario</span>
                      </label>
                      <select name="type" class="select w-full max-w-xs" bind:value="{data.doctor.userId}">
                        <option selected disabled>{data.doctor.userId}</option>
                        {#each Optiondata2.users as row}
                          <option value="{row.name} {row.lastname}">{row.name} {row.lastname}</option>
                        {/each}
                      </select>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="presentation" class="label">
                        <span class="label-text">Especialidad</span>
                      </label>
                      <select name="type" class="select w-full max-w-xs" bind:value="{data.doctor.degreeId}">
                        <option selected disabled>{data.doctor.degreeId}</option>
                        {#each Optiondata3.degrees as row}
                          <option value="{row.degree}">{row.degree}</option>
                        {/each}
                      </select>
                </div>
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
                    Editar Doctor
                  </span>
                </button>
              </div>
        </div>
      </div>
    </div>
  </div>
  
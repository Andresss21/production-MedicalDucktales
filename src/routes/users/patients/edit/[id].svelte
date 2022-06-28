<script context="module">
    import { variables } from '../../../../variables';
    export async function load({ params, fetch, session, stuff }) {
      const url = variables.apiUri + `/patients/${params.id}`;
      const url2 = variables.apiUri + `/users`;

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
    import { onMount } from 'svelte';
    import Icon from '../../../../components/helpers/Icon.svelte';
    export let data;
    export let Optiondata;
    let result = null
    

      async function doPatch () {

        const url = variables.apiUri + `/patients/${data.patient.id}`;

        console.log(JSON.stringify(data.patient));
          const res = await fetch(url, {
              method: 'PATCH',
              body: JSON.stringify(data.patient),
              
          })
          
          const json = await res.json()
          result = JSON.stringify(json)
        goto('/users/patients')
      }
  </script>
  
  <div class="card bg-neutral card-bordered w-100 lg:w-1/2 m-auto">
    <div class="card-body text-neutral-content">
  
      <div class="card-title">
        <a href="/users/patients" class="btn btn-active btn-ghost btn-xs">
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
            <div class="flex flex-wrap w-full pl-5 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="presentation" class="label">
                        <span class="label-text">Usuario</span>
                      </label>
                      <select name="type" disabled class="select w-full max-w-xs" bind:value="{data.patient.userId}">
                        <option selected disabled>{data.patient.userId}</option>
                        {#each Optiondata.users as row}
                          <option value="{row.name} {row.lastname}">{row.name} {row.lastname}</option>
                        {/each}
                      </select>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap w-full pl-5 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label for="DUI" class="label">
                      <span class="label-text">DUI</span>
                    </label>
                    <input name="DUI" type="number" class="textarea" placeholder="DUI" bind:value="{data.patient.duiNumber}">
              </div>
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label for="ISSS" class="label">
                      <span class="label-text">ISSS</span>
                    </label>
                    <input name="ISSS" type="number" class="textarea" placeholder="ISSS" bind:value="{data.patient.isssNumber}">
              </div>
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label for="BirthDate" class="label">
                    <span class="label-text">Fecha de Nacimiento</span>
                  </label>
                  <input type="date" name="BirthDate" class="textarea" placeholder="Fecha de Nacimiento" bind:value="{data.patient.birthdate}">
              </div>
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label for="ValidThru" class="label">
                    <span class="label-text">Fecha de vencimiento</span>
                  </label>
                  <input type="date" name="ValidThru" class="textarea" placeholder="Fecha de Nacimiento" bind:value="{data.patient.validThru}">
              </div>
              <div class="w-full px-3 mb-6 md:mb-0">
                <label for="Details" class="label">
                    <span class="label-text">Detalles</span>
                  </label>
                  <textarea name="Details" class="textarea" placeholder="Detalles" bind:value="{data.patient.details}"></textarea>
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
                    Editar Usuario
                  </span>
                </button>
              </div>
        </div> 
      </div>
    </div>
  </div>
  
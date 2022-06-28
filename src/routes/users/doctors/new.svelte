<script context="module">
    import { variables } from '../../../variables';
    export async function load({ params, fetch, session, stuff }) {
      const url = variables.apiUri + `/users`;
      const url2 = variables.apiUri +  `/degrees`;

      const response = await fetch(url);
      const response2 = await fetch(url2);
  
      return {
        status: response.status, 
        status2: response2.status2,
        props: {
          Optiondata: response.ok && (await response.json()),
          Optiondata2: response2.ok && (await response2.json())
        }
      };
    }
  </script>
  
  <script lang="ts">
    import { goto } from '$app/navigation';
    import Icon from '../../../components/helpers/Icon.svelte';
    export let Optiondata
    export let Optiondata2
    let data = {
        doctor: {
        id: '',
        degreeId: '',
        userId: '',
        avatar: ''
      }
    };
    let result = null


      async function doPost () {
      const url = variables.apiUri + `/doctors`;

        data.doctor.avatar = 'https://cdn.donmai.us/sample/14/19/__jean_vicquemare_disco_elysium_drawn_by_cheetahman_1ddghfr78cswc__sample-1419cb0b21701488d09ec5f7473bf8c3.jpg'
          const res = await fetch(url, {
              method: 'POST',
              body: JSON.stringify(data.doctor),
          })
          
          const json = await res.json()
          result = JSON.stringify(json)
      console.log(result);
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
        Agregar doctor 
      </div>
      <div class="overflow-x-auto">
        <div class="flex flex-col items-center">
            <div class="flex flex-wrap w-full pl-5 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="presentation" class="label">
                      <span class="label-text">Usuario</span>
                    </label>
                    <select name="type" class="select w-full max-w-xs" bind:value="{data.doctor.userId}">
                      <option selected disabled>Seleccionar...</option>
                      {#each Optiondata.users as row}
                        <option value="{row.name} {row.lastname}">{row.name} {row.lastname}</option>
                      {/each}
                    </select>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="presentation" class="label">
                        <span class="label-text">Especialidad</span>
                      </label>
                      <select name="type" class="select w-full max-w-xs" bind:value="{data.doctor.degreeId}">
                        <option selected disabled>Seleccionar...</option>
                        {#each Optiondata2.degrees as row}
                          <option value="{row.degree}">{row.degree}</option>
                        {/each}
                      </select>
                </div>
            </div>
            
            <div class="form-control w-full max-w-xs w-100 mt-10">
              <button class="btn btn-accent btn-block" on:click={doPost}>
                <Icon
                  name="edit"
                  width="1.5em"
                  height="1.5em"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <span class="ml-2">  
                  Crear doctor
                </span>
              </button>
            </div>
        </div>
      </div>
    </div>
  </div>
  
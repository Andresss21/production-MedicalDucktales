<script context="module">
    import { variables } from '../../../../variables';
    export async function load({ params, fetch, session, stuff }) {
      const url = variables.apiUri + `/doctors/${params.id}`;
      const url2 = variables.apiUri + `/shift_doctors/doctor/${params.id}`;
      const url3 = variables.apiUri +  `/shifts`;

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
    import Icon from '../../../../components/helpers/Icon.svelte';
    export let data;
    export let Optiondata2;
    export let Optiondata3;
    
    const { shiftDoctor } = Optiondata2;
    
    console.log(shiftDoctor);
    let idToSelect = shiftDoctor?.shiftId || null;
    let result = null;

    async function doAction () {
      console.log(shiftDoctor);
      const url = variables.apiUri + `/shift_doctors` + (
        shiftDoctor?.id 
          ? `/${shiftDoctor?.id}` 
          : '');

      const method = shiftDoctor?.id ? 'PATCH' : 'POST';
      const body = shiftDoctor?.id 
              ? JSON.stringify({...shiftDoctor, shiftId: idToSelect}) 
              : JSON.stringify({
                  shiftId: idToSelect,
                  doctorId: data.doctor.id
                });

      console.log(url, method, body);
      const res = await fetch(url, {
        method: method,
        body: body,
      });

      const json = await res.json()
      result = JSON.stringify(json)
      goto('/users/doctors')
    }
  </script>
  
  <div class="card bg-neutral card-bordered w-100 lg:w-1/2 m-auto">
    <div class="card-body text-neutral-content">
      <div class="card-title">
        <a href="/inventory/products/" class="btn btn-active btn-ghost btn-xs">
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
                <div class="w-full">
                  <label for="presentation" class="label">
                    <span class="label-text">Usuario</span>
                  </label>
                  <select name="type" class="select w-full" bind:value="{data.doctor.userId}">
                    <option selected disabled>{data.doctor.userId}</option>
                  </select>
                </div>
                <div class="w-full overflow-x-auto mt-10">
                  <label for="shifs" class="label">
                    <span class="label-text">Horarios</span>
                  </label>
                  <table class="table w-full">
                    <!-- head -->
                    <thead>
                      <tr>
                        <th />
                        <th>Horas</th>
                        <th>Dias</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {#each Optiondata3.shifts as row, i}
                      <tr>
                        <th>{i+1}</th>
                        <td>{row.checkInTime} - {row.checkOutTime}</td>
                        <td>
                          <div class="flex flex-col text-center">
                            {#each Object.entries(row.days) as [key, value]}
                              {#if value}
                                <span class="bg-cyan-200 px-1 py-0.5 mx-0.5 my-1 rounded-2xl capitalize text-sm">
                                  {value ? key : ''}
                                </span>
                              {/if}
                            {/each}
                          </div>
                        </td>
                        <td class="text-sm text-gray-900 font-light whitespace-nowrap">
                          <div class="flex items-center w-full bg-neutral rounded-xl">
                            <div
                              class="flex flex-auto tooltip tooltip-success z-40"
                              data-tip="Seleccionar"
                            >
                              <label
                                for="delete-hospital"
                                class="flex flex-auto items-center justify-center py-4 hover:bg-success rounded-xl text-neutral-content hover:text-error-content"
                                on:click="{() => idToSelect = idToSelect == row.id ? null : row.id}"
                              >
                                <Icon
                                  name={idToSelect == row.id ? 'check-circle' : 'circle'}
                                  width="1.5em"
                                  height="1.5em"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                              </label>
                            </div>
                          </div>
                        </td>
                      </tr>
                      {/each}
                    </tbody>
                  </table>
                </div>
            </div>
            
              <div class="form-control w-full max-w-xs w-100 mt-10">
                <button class="btn btn-accent btn-block" on:click={doAction}>
                  <Icon
                    name="edit"
                    width="1.5em"
                    height="1.5em"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <span class="ml-2">  
                    Asignar Horario
                  </span>
                </button>
              </div>
        </div>
      </div>
    </div>
  </div>
  
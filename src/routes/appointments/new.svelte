<script context="module">
  import { goto } from '$app/navigation';
  import Icon from "../../components/helpers/Icon.svelte";
  import { variables } from '../../variables';
  export async function load({ params, fetch, session, stuff }) {
    const url = variables.apiUri + `/doctors`;
    const url2 = variables.apiUri + `/patients`;

    const response = await fetch(url);
    const response2 = await fetch(url2);

    return {
      status: response.status,
      status2: response2.status2,
      props: {
        doctors: response.ok && (await response.json()),
        patients: response2.ok && (await response2.json()),
      }
    };
  }
</script>
<script lang="ts">
    export let doctors;
    export let patients;
  
    let doctorSelectedId = null;
    let patientSelectedId = null;
    let dateString = null;

    let result = null;
    async function doPost () {
        const url = variables.apiUri + `/appointments`;
        
        const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            doctorId: doctorSelectedId,
            patientId: patientSelectedId,
            date: dateString,
            details: '',
            status: 1,
        }),
        })

        const json = await res.json();
        result = JSON.stringify(json)
        console.log(result);

        goto('/appointments');
  }
</script>

<div class="card bg-neutral card-bordered w-100 lg:w-1/2 m-auto">
  <div class="card-body text-neutral-content">
    <div class="card-title">
      <a href="/appointments" class="btn btn-active btn-ghost btn-xs">
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
        name="book-open"
        width="1.5em"
        height="1.5em"
        stroke="white"
        strokeWidth="1"
      />
      Agregar Cita
    </div>
    <div class="overflow-x-auto">
      <div class="flex flex-col items-center">
        <div class="w-full overflow-x-auto">
          <label for="shifs" class="label">
            <span class="label-text">Seleccione un paciente</span>
          </label>
          <table class="table w-full">
            <!-- head -->
            <thead>
              <tr>
                <th />
                <th>Paciente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {#each patients.patients as row, i}
              <tr>
                <th>{i+1}</th>
                <td>{row.userId}</td>
                <td class="text-sm text-gray-900 font-light whitespace-nowrap">
                  <div class="flex items-center w-full bg-neutral rounded-xl">
                    <div
                      class="flex flex-auto tooltip tooltip-success z-40"
                      data-tip="Seleccionar"
                    >
                      <label
                        for="delete-hospital"
                        class="flex flex-auto items-center justify-center py-4 hover:bg-success rounded-xl text-neutral-content hover:text-error-content"
                        on:click="{() => patientSelectedId = patientSelectedId === row.userId ? null : row.userId}"
                      >
                        <Icon
                          name={patientSelectedId === row.userId ? 'check-circle' : 'circle'}
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
      <div class="flex flex-col items-center">
        <div class="w-full overflow-x-auto">
          <label for="shifs" class="label">
            <span class="label-text">Seleccione un doctor</span>
          </label>
          <table class="table w-full">
            <!-- head -->
            <thead>
              <tr>
                <th />
                <th>Doctor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {#each doctors.doctors as row, i}
              <tr>
                <th>{i+1}</th>
                <td>{row.userId}</td>
                <td class="text-sm text-gray-900 font-light whitespace-nowrap">
                  <div class="flex items-center w-full bg-neutral rounded-xl">
                    <div
                      class="flex flex-auto tooltip tooltip-success z-40"
                      data-tip="Seleccionar"
                    >
                      <label
                        for="delete-hospital"
                        class="flex flex-auto items-center justify-center py-4 hover:bg-success rounded-xl text-neutral-content hover:text-error-content"
                        on:click="{() => doctorSelectedId = doctorSelectedId === row.userId ? null : row.userId}"
                      >
                        <Icon
                          name={doctorSelectedId === row.userId ? 'check-circle' : 'circle'}
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
    </div>

    <div class="form-control w-full  w-100 pb-3">
      <label for="name" class="label">
        <span class="label-text">Fecha</span>
      </label>
      <input
        type="dateTime-local"
        class="input w-full"
        bind:value="{dateString}"
      />
    </div>

    <div class="form-control w-full  w-100 mt-10">
      <button class="btn btn-accent btn-block" on:click="{doPost}">
        <Icon
          name="plus"
          width="1.5em"
          height="1.5em"
          stroke="currentColor"
          strokeWidth="1"
        />
        <span class="ml-2"> Agregar Cita </span>
      </button>
    </div>
  </div>
</div>

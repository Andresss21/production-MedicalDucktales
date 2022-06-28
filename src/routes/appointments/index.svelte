<script context="module">
  import { invalidate } from "$app/navigation";
  import Icon from "../../components/helpers/Icon.svelte";
  import { variables } from "../../variables";
  export async function load({ params, fetch, session, stuff }) {
    const url = variables.apiUri + `/appointments`;
    const response = await fetch(url);

    return {
      status: response.status,
      props: {
        data: response.ok && (await response.json()),
      },
    };
  }
</script>

<script lang="ts">
      export let data;

  let idToDelete = null;
  async function doDelete() {
    const res = await fetch(variables.apiUri + `/appointments/${idToDelete}`, {
      method: "DELETE",
    });

    invalidate("/appointments");
  }
</script>

<div class="card bg-neutral card-bordered">
  <div class="card-body text-neutral-content">
    <div class="card-title">
      <Icon
        name="book-open"
        width="1.5em"
        height="1.5em"
        stroke="white"
        strokeWidth="1"
      />
      Citas
      <a href="/appointments/new" class="btn btn-accent ml-auto">
        <Icon
          name="plus"
          width="1.5em"
          height="1.5em"
          stroke="currentColor"
          strokeWidth="1"
        />
        Agregar Nuevo
      </a>
    </div>
    <div class="overflow-x-auto">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th />
            <th>Doctor</th>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Detalles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- data row -->
          {#each data.appointments as row, i}
            <tr>
              <th>{i + 1}</th>
              <td>{row.doctorId}</td>
              <td>{row.patientId}</td>
              <td>{row.date}</td>
              <td>{
                  row.status === 1 ? 'Pendiente'
                  : (row.status === 2 
                    ? 'En proceso' 
                    : (row.status === 3 
                      ? 'Finalizado' 
                      : 'Desconocido'
                      )
                    )
                }
              </td>
              <td>{row.details}</td>
              <td
                class="text-sm text-gray-900 font-light whitespace-nowrap"
              >
                <div class="flex items-center w-full bg-neutral rounded-xl">
                  <div
                    class="flex flex-auto tooltip tooltip-primary z-40"
                    data-tip="Ver"
                  >
                    <a
                      href="/appointments/{row.id}"
                      class="flex flex-auto items-center justify-center py-4 hover:bg-primary rounded-xl text-neutral-content hover:text-primary-content"
                    >
                      <Icon
                        name="trello"
                        width="1.5em"
                        height="1.5em"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </a>
                  </div>

                  <div
                    class="flex flex-auto tooltip tooltip-warning z-40"
                    data-tip="Editar"
                  >
                    <a
                      href="/appointments/edit/{row.id}"
                      class="flex flex-auto items-center justify-center py-4 hover:bg-warning rounded-xl text-neutral-content hover:text-warning-content"
                    >
                      <Icon
                        name="edit"
                        width="1.5em"
                        height="1.5em"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </a>
                  </div>

                  <div
                    class="flex flex-auto tooltip tooltip-error z-40"
                    data-tip="Eliminar"
                  >
                    <label
                      for="delete-appointment"
                      class="flex flex-auto items-center justify-center py-4 hover:bg-error rounded-xl text-neutral-content hover:text-error-content"
                      on:click={() => (idToDelete = row.id)}
                    >
                      <Icon
                        name="trash-2"
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
  <!-- Put this part before </body> tag -->
  <input type="checkbox" id="delete-appointment" class="modal-toggle" />
  <div class="modal bg-white-500/75">
    <div class="modal-box w-11/12 max-w-5xl bg-error">
      <h3 class="font-bold text-lg">Advertenvcia!</h3>
      <p class="py-4">
        Esta a punto de eliminar un elemento, esta seguro de quere eliminarlo?
      </p>
      <div class="modal-action">
        <label for="delete-appointment" class="btn btn-ghost">Cancelar</label>
        <label for="delete-appointment" class="btn btn-primary" on:click={doDelete}>
          Eliminar
        </label>
      </div>
    </div>
  </div>
</div>

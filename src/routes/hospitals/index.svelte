<script context="module">
  import Cookies from 'js-cookie';
  import { variables } from '../../variables';
  export async function load({ fetch }) {
    const response = await fetch(`${variables.apiUri}/hospitals`, {
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
  import { invalidate } from "$app/navigation";
  import Icon from '../../components/helpers/Icon.svelte';
  export let data;

  let idToDelete = null;
	
	async function doDelete () {
    await fetch(`${variables.apiUri}/hospitals/${idToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Cookies.get('token')
      }
    });
    invalidate('/hospitals')
	}
</script>

<div class="card bg-neutral card-bordered">
  <div class="card-body text-neutral-content">
    <div class="card-title">
      <Icon
        name="home"
        width="1.5em"
        height="1.5em"
        stroke="white"
        strokeWidth="1"
      />
      Hospitales 
      
      <a href="/hospitals/new" class="btn btn-accent ml-auto">
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
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {#each data as row, i}
          <tr>
            <th>{i+1}</th>
            <td>{row.name}</td>
            <td>{row.address}</td>
            <td
              class="text-sm text-gray-900 font-light whitespace-nowrap"
            >
              <div class="flex items-center w-full bg-neutral rounded-xl">
                <div
                  class="flex flex-auto tooltip tooltip-primary z-40"
                  data-tip="Ver"
                >
                  <a
                    href="/hospitals/{row.id}"
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
                    href="/hospitals/edit/{row.id}"
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
                    for="delete-hospital"
                    class="flex flex-auto items-center justify-center py-4 hover:bg-error rounded-xl text-neutral-content hover:text-error-content"
                    on:click="{() => idToDelete = row.id}"
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

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="delete-hospital" class="modal-toggle">
    <div class="modal bg-white-500/75">
      <div class="modal-box w-11/12 max-w-5xl bg-accent">
        <h3 class="font-bold text-lg">Advertenvcia!</h3>
        <p class="py-4">Esta a punto de eliminar un elemento, esta seguro de quere eliminarlo?</p>
        <div class="modal-action">
          <label for="delete-hospital" class="btn btn-ghost">Cancelar</label>
          <label for="delete-hospital" class="btn btn-primary" on:click="{doDelete}">Eliminar</label>
        </div>
      </div>
    </div>
    
  </div>
</div>
